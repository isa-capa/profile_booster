import { Controller, Get, Put, Post, Body, UseGuards, Req, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
const pdfParse = require('pdf-parse');

interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
        email: string;
    };
}

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Get()
    getProfile(@Req() req: AuthenticatedRequest) {
        return this.profileService.getProfile(req.user.userId);
    }

    @Put()
    updateProfile(@Req() req: AuthenticatedRequest, @Body() body: any) {
        return this.profileService.updateProfile(req.user.userId, body);
    }

    @Post('upload-cv-text')
    uploadCvText(@Req() req: AuthenticatedRequest, @Body('cvText') cvText: string) {
        if (!cvText) throw new BadRequestException('cvText is required');
        return this.profileService.uploadCvText(req.user.userId, cvText);
    }

    @Post('upload-cv-pdf')
    @UseInterceptors(FileInterceptor('file'))
    async uploadCvPdf(@Req() req: AuthenticatedRequest, @UploadedFile() file: Express.Multer.File) {
        if (!file) throw new BadRequestException('PDF file is required');
        if (file.mimetype !== 'application/pdf') throw new BadRequestException('Only PDF files are allowed');

        try {
            const parsedData = await pdfParse(file.buffer);
            const text = parsedData.text;
            if (!text || text.trim() === '') {
                throw new BadRequestException('Could not extract valid text from this PDF');
            }
            return this.profileService.uploadCvText(req.user.userId, text);
        } catch (e) {
            throw new BadRequestException(`Failed to parse PDF: ${e.message}`);
        }
    }
}
