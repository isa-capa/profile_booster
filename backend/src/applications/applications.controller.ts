import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
        email: string;
    };
}

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
    constructor(private readonly applicationsService: ApplicationsService) { }

    @Post()
    create(@Req() req: AuthenticatedRequest, @Body() body: { companyName: string; jobTitle: string; jobLink?: string; jdText?: string }) {
        return this.applicationsService.create(req.user.userId, body.companyName, body.jobTitle, body.jobLink, body.jdText);
    }

    @Get()
    findAll(@Req() req: AuthenticatedRequest) {
        return this.applicationsService.findAll(req.user.userId);
    }

    @Get(':id')
    findOne(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
        return this.applicationsService.findOne(id, req.user.userId);
    }

    @Post(':id/generate')
    generate(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
        return this.applicationsService.generate(id, req.user.userId);
    }

    @Get(':id/results')
    getResults(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
        return this.applicationsService.getResults(id, req.user.userId);
    }
}
