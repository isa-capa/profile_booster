import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProfileService {
    constructor(private prisma: PrismaService) { }

    async getProfile(userId: string) {
        const profile = await this.prisma.userProfile.findUnique({
            where: { userId }
        });
        if (!profile) throw new NotFoundException('Profile not found');
        return profile;
    }

    async updateProfile(userId: string, data: any) {
        return this.prisma.userProfile.update({
            where: { userId },
            data
        });
    }

    async uploadCvText(userId: string, baseCvText: string) {
        return this.prisma.userProfile.update({
            where: { userId },
            data: { baseCvText }
        });
    }
}
