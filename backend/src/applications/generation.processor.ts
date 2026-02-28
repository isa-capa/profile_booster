import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { z } from 'zod';
import { AITaskType, ApplicationStatus } from '@prisma/client';

export interface GenerationJobData {
    applicationId: string;
}

const BaseCvSchema = z.object({
    fullName: z.string().optional(),
    headline: z.string().optional(),
    summary: z.string().optional(),
    experience: z.array(z.any()).optional(),
    education: z.array(z.any()).optional(),
    skills: z.array(z.string()).optional(),
});

const JobAnalysisSchema = z.object({
    mustHaveSkills: z.array(z.string()),
    niceToHaveSkills: z.array(z.string()),
    seniority: z.string(),
    keyResponsibilities: z.array(z.string()),
});

@Processor('generation')
export class GenerationProcessor extends WorkerHost {
    private readonly logger = new Logger(GenerationProcessor.name);

    constructor(
        private prisma: PrismaService,
        private aiService: AiService,
    ) {
        super();
    }

    async process(job: Job<GenerationJobData, any, string>): Promise<any> {
        const { applicationId } = job.data;
        this.logger.log(`Starting generation job for Application: ${applicationId}`);

        try {
            const application = await this.prisma.application.findUnique({
                where: { id: applicationId },
                include: { user: { include: { profile: true } }, jobPost: true },
            });

            if (!application) throw new Error('Application not found');
            const profile = application.user.profile;
            if (!profile || !profile.baseCvText) throw new Error('Base CV Text is missing');
            const jobPost = application.jobPost;
            if (!jobPost || !jobPost.jdText) throw new Error('Job description is missing');

            await job.updateProgress(10);

            // Step 1: Base CV parse (if not already parsed)
            let baseCvJson = profile.baseCvJson;
            if (!baseCvJson) {
                this.logger.log('Parsing base CV text to JSON...');
                const parsedCv = await this.aiService.generateStructuredJson(
                    applicationId,
                    AITaskType.JOB_ANALYSIS, // Using generic type
                    'Extract the CV into structured JSON. Do not invent information.',
                    profile.baseCvText,
                    BaseCvSchema
                );
                baseCvJson = parsedCv as any;
                await this.prisma.userProfile.update({
                    where: { id: profile.id },
                    data: { baseCvJson: baseCvJson as any }
                });
            }
            await job.updateProgress(25);

            // Step 2: JD Analysis
            this.logger.log('Analyzing Job Description...');
            let jdExtractedJson = jobPost.extractedJson;
            if (!jdExtractedJson) {
                const jdAnalysis = await this.aiService.generateStructuredJson(
                    applicationId,
                    AITaskType.JOB_ANALYSIS,
                    'Extract key requirements from the job description.',
                    jobPost.jdText,
                    JobAnalysisSchema
                );
                jdExtractedJson = jdAnalysis as any;
                await this.prisma.jobPost.update({
                    where: { id: jobPost.id },
                    data: { extractedJson: jdExtractedJson as any }
                });
            }
            await job.updateProgress(50);

            // Step 3: CV Optimization (Ats-friendly)
            this.logger.log('Optimizing CV for ATS...');
            const CvOptimizationSchema = z.object({
                optimizedCvRecord: z.any(), // The structured CV
                keywordsUsed: z.array(z.string()),
                changesSummary: z.string(),
                hallucinationsRisk: z.boolean().default(false),
                hallucinationNotes: z.string().optional()
            });

            const optimizationResult = await this.aiService.generateStructuredJson(
                applicationId,
                AITaskType.CV_OPTIMIZATION,
                `Analyze the base CV and the job description requirements. Optimize the CV to match the must-have and nice-to-have skills. 
             CRITICAL RULES:
             - NO NOT invent experience, companies, dates, certifications, or achievements.
             - Only re-write, re-order, improve wording, and highlight existing info.
             - If you see a missing skill, output it as a suggestion in changesSummary, but DO NOT add it to the CV.
             - Output must follow EXACT sections (PERFIL PROFESIONAL, HABILIDADES TÉCNICAS, HABILIDADES BLANDAS, IDIOMAS, CURSOS, EXPERIENCIA LABORAL, PROYECTO ACADÉMICO, FORMACIÓN EDUCATIVA).`,
                `Base CV:\n${JSON.stringify(baseCvJson)}\n\nRequirements:\n${JSON.stringify(jdExtractedJson)}`,
                CvOptimizationSchema
            );

            // Check for hallucinations
            let finalChangesSummary = optimizationResult.changesSummary;
            if (optimizationResult.hallucinationsRisk) {
                finalChangesSummary += `\n[WARNING: Potential Hallucination Risk Detected - Filter checks applied. Notes: ${optimizationResult.hallucinationNotes}]`;
                this.logger.warn(`Hallucination risk flagged for app ${applicationId}`);
            }

            // Save CV Version
            // We will generate HTML and PDF later. For now, we save the text representation
            // and structured JSON.
            const cvVersionRecord = await this.prisma.cvVersion.create({
                data: {
                    applicationId,
                    versionNumber: 1, // To be incremental in reality
                    cvHtml: "<!-- TODO: HTML Template Renderer -->", // Will be replaced by documentrenderer
                    keywordsUsedJson: optimizationResult.keywordsUsed,
                    changesSummary: finalChangesSummary,
                }
            });
            await job.updateProgress(75);

            // Step 4: Company Brief and Prep Plan
            // ... We could do these in parallel via Promise.all for speed.

            await this.prisma.application.update({
                where: { id: applicationId },
                data: { statusEnum: ApplicationStatus.INTERVIEW }
            });

            await job.updateProgress(100);
            return { success: true, cvVersionId: cvVersionRecord.id };

        } catch (error) {
            this.logger.error(`Failed to process generation job ${applicationId}: ${error.message}`);
            throw error;
        }
    }
}
