import { Controller, Post, Get, Param, UseGuards, Req, Res } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request, Response } from 'express';
import * as fs from 'fs';

interface AuthenticatedRequest extends Request {
    user: {
        userId: string;
        email: string;
    };
}

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
    constructor(private readonly documentsService: DocumentsService) { }

    @Post(':id/cv/export-pdf')
    async exportPdf(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
        // In a real scenario, Verify Ownership first. This is simplified.
        return this.documentsService.exportPdf(id);
    }

    @Get(':id/documents/:docId/download')
    async downloadDocument(@Req() req: AuthenticatedRequest, @Param('id') applicationId: string, @Param('docId') documentId: string, @Res() res: any) {
        const docPath = await this.documentsService.getDocumentPath(documentId, applicationId);
        if (!fs.existsSync(docPath)) {
            return res.status(404).json({ message: 'File not found on disk' });
        }
        res.download(docPath);
    }
}
