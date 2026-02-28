import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AtsService {
    constructor(private prisma: PrismaService) { }

    async calculateScore(applicationId: string) {
        const app = await this.prisma.application.findUnique({
            where: { id: applicationId },
            include: { jobPost: true, cvVersions: { orderBy: { versionNumber: 'desc' }, take: 1 } }
        });

        if (!app || !app.jobPost || !app.cvVersions.length) {
            throw new NotFoundException('Cannot calculate score. Missing data.');
        }

        const jdJson = app.jobPost.extractedJson as any;
        const cv = app.cvVersions[0];
        const cvKeywords = (cv.keywordsUsedJson as string[]) || [];

        const mustHaves = jdJson?.mustHaveSkills || [];
        const niceToHaves = jdJson?.niceToHaveSkills || [];

        let score = 0;
        const missing: string[] = [];
        const found: string[] = [];

        // Simple heuristic
        for (const skill of mustHaves) {
            if (cvKeywords.some((k: string) => k.toLowerCase().includes(skill.toLowerCase()))) {
                score += 10;
                found.push(skill);
            } else {
                missing.push(skill);
            }
        }

        for (const skill of niceToHaves) {
            if (cvKeywords.some((k: string) => k.toLowerCase().includes(skill.toLowerCase()))) {
                score += 5;
                found.push(skill);
            } else {
                // not penalizing missing nice-to-haves heavily, just recording
            }
        }

        // Cap the score at 100
        const finalScore = Math.min(100, Math.max(0, score));

        return this.prisma.atsScore.upsert({
            where: { applicationId },
            update: {
                scoreTotal: finalScore,
                missingKeywordsJson: missing,
                recommendedKeywordsJson: niceToHaves.filter((s: string) => !found.includes(s)),
                breakdownJson: { mustHavesFound: found.length, totalMustHaves: mustHaves.length }
            },
            create: {
                applicationId,
                scoreTotal: finalScore,
                missingKeywordsJson: missing,
                recommendedKeywordsJson: niceToHaves.filter((s: string) => !found.includes(s)),
                breakdownJson: { mustHavesFound: found.length, totalMustHaves: mustHaves.length }
            }
        });
    }
}
