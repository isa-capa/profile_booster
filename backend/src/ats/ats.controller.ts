import { Controller, Get, Param, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { AtsService } from './ats.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class AtsController {
    constructor(private readonly atsService: AtsService, private prisma: PrismaService) { }

    @Get(':id/ats')
    async getAtsScore(@Param('id') id: string) {
        const score = await this.prisma.atsScore.findUnique({ where: { applicationId: id } });
        if (!score) throw new NotFoundException('Score not available yet');
        return score;
    }
}
