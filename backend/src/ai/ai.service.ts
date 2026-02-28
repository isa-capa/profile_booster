import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI, Schema } from '@google/generative-ai';
import { PrismaService } from '../prisma/prisma.service';
import { AITaskType, AiStatus } from '@prisma/client';
import { z } from 'zod';

@Injectable()
export class AiService {
    private readonly logger = new Logger(AiService.name);
    private genAI: GoogleGenerativeAI;

    constructor(
        private configService: ConfigService,
        private prisma: PrismaService,
    ) {
        const apiKey = this.configService.get<string>('GEMINI_API_KEY');
        if (!apiKey) {
            this.logger.warn('GEMINI_API_KEY is not defined. AI runs will fail or fallback.');
        }
        this.genAI = new GoogleGenerativeAI(apiKey || 'unconfigured');
    }

    async generateStructuredJson<T>(
        applicationId: string,
        taskType: AITaskType,
        systemPrompt: string,
        userPrompt: string,
        zodSchema: z.ZodType<T>,
        responseSchema?: Schema,
    ): Promise<T> {
        const startTime = Date.now();
        let modelName = this.configService.get<string>('GEMINI_MODEL') || 'gemini-3.1-pro';

        // Initial run record
        const run = await this.prisma.aiRun.create({
            data: {
                applicationId,
                taskTypeEnum: taskType,
                providerName: 'gemini',
                promptVersion: '1.0',
                modelName,
                status: AiStatus.RUNNING,
            }
        });

        try {
            let result = await this.tryGenerate(modelName, systemPrompt, userPrompt, responseSchema);
            let parsed = this.parseAndValidate(result, zodSchema);

            if (!parsed.success) {
                this.logger.warn(`Initial validation failed for task ${taskType}. Retrying with corrective prompt...`);
                const correctivePrompt = `${userPrompt}\n\nIMPORTANT: Return VALID JSON ONLY matching the schema. Do not wrap in markdown blocks like \`\`\`json. Fix this error: ${parsed.error.message}`;
                result = await this.tryGenerate(modelName, systemPrompt, correctivePrompt, responseSchema);
                parsed = this.parseAndValidate(result, zodSchema);

                if (!parsed.success) {
                    throw new Error(`Fallback validation failed: ${parsed.error.message}`);
                }
            }

            this.logger.log(`Task ${taskType} completed successfully.`);

            await this.prisma.aiRun.update({
                where: { id: run.id },
                data: {
                    status: AiStatus.COMPLETED,
                    latencyMs: Date.now() - startTime,
                    outputJson: parsed.data as any,
                }
            });

            return parsed.data as T;

        } catch (error) {
            if (error.message.includes('model') && error.message.includes('not found')) {
                this.logger.warn(`Model ${modelName} not found. Falling back to next available...`);
                modelName = 'gemini-3.1-pro-preview';
                try {
                    const result = await this.tryGenerate(modelName, systemPrompt, userPrompt, responseSchema);
                    const parsed = this.parseAndValidate(result, zodSchema);
                    if (!parsed.success) throw new Error(parsed.error.message);

                    await this.prisma.aiRun.update({
                        where: { id: run.id },
                        data: {
                            status: AiStatus.COMPLETED,
                            latencyMs: Date.now() - startTime,
                            modelName,
                            outputJson: parsed.data as any,
                        }
                    });
                    return parsed.data as T;
                } catch (fallbackError) {
                    return this.handleFallback(run.id, startTime, fallbackError, modelName);
                }
            }

            return this.handleFallback(run.id, startTime, error, modelName);
        }
    }

    private async tryGenerate(modelName: string, systemPrompt: string, userPrompt: string, responseSchema?: Schema): Promise<string> {
        const model = this.genAI.getGenerativeModel({
            model: modelName,
            generationConfig: {
                responseMimeType: 'application/json',
                ...(responseSchema ? { responseSchema } : {}),
            },
            systemInstruction: systemPrompt
        });

        const response = await model.generateContent(userPrompt);
        return response.response.text();
    }

    private parseAndValidate<T>(text: string, schema: z.ZodType<T>): { success: true, data: T } | { success: false, error: Error } {
        try {
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
            const obj = JSON.parse(cleanJson);
            const parsed = schema.safeParse(obj);
            if (parsed.success) {
                return { success: true, data: parsed.data };
            }
            return { success: false, error: new Error(parsed.error.message) };
        } catch (e) {
            return { success: false, error: new Error(`JSON Parse Error: ${e.message}`) };
        }
    }

    private async handleFallback(runId: string, startTime: number, error: any, modelName: string): Promise<never> {
        this.logger.error(`AI task failed: ${error.message}`);
        await this.prisma.aiRun.update({
            where: { id: runId },
            data: {
                status: AiStatus.FAILED,
                latencyMs: Date.now() - startTime,
                errorMessage: error.message,
                modelName,
            }
        });
        // Deterministic fallback (simple structure depending on context, handled by caller typically, 
        // but here we throw to let the worker handle it or fallback manually)
        throw new Error(`Generative AI Failed: ${error.message}`);
    }
}
