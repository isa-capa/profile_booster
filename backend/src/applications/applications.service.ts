import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class ApplicationsService {
    constructor(
        private prisma: PrismaService,
        @InjectQueue('generation') private generationQueue: Queue,
    ) { }

    async create(userId: string, companyName: string, jobTitle: string, jobLink?: string, jdText?: string) {
        const application = await this.prisma.application.create({
            data: {
                userId,
                companyName,
                jobTitle,
                jobLink,
                jobPost: jdText ? {
                    create: { jdText }
                } : undefined
            }
        });
        return application;
    }

    async findAll(userId: string) {
        return this.prisma.application.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
    }

    async findOne(id: string, userId: string) {
        const app = await this.prisma.application.findFirst({
            where: { id, userId },
            include: {
                jobPost: true,
                cvVersions: { orderBy: { versionNumber: 'desc' }, take: 1 },
                atsScore: true,
                companyBrief: true,
                prepPlan: true,
            }
        });
        if (!app) throw new NotFoundException('Application not found');
        return app;
    }

    async generate(id: string, userId: string) {
        // Verify ownership
        await this.findOne(id, userId);

        // Add job to BullMQ
        const job = await this.generationQueue.add('generate-cv', { applicationId: id });
        return { jobId: job.id, status: 'QUEUED' };
    }

    async getResults(id: string, userId: string) {
        const app = await this.findOne(id, userId);

        // Check if jobs are active
        const jobs = await this.generationQueue.getJobs(['active', 'wait', 'delayed']);
        const isPending = jobs.some(j => j.data.applicationId === id);

        // If there is an output CV version, it's ready.
        if (app.cvVersions && app.cvVersions.length > 0) {
            return { status: 'READY', data: app };
        }

        if (isPending) {
            return { status: 'PENDING' };
        }

        // Could check failed state here by querying aiRuns
        const aiRuns = await this.prisma.aiRun.findMany({ where: { applicationId: id } });
        if (aiRuns.some(run => run.status === 'FAILED')) {
            return { status: 'FAILED' };
        }

        return { status: 'NEW' };
    }
}
