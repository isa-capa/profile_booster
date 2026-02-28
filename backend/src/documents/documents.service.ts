import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as fs from 'fs';
import * as path from 'path';
import { DocumentType } from '@prisma/client';

@Injectable()
export class DocumentsService {
    private readonly logger = new Logger(DocumentsService.name);

    constructor(private prisma: PrismaService) { }

    async exportPdf(applicationId: string) {
        const app = await this.prisma.application.findUnique({
            where: { id: applicationId },
            include: { cvVersions: { orderBy: { versionNumber: 'desc' }, take: 1 } }
        });
        if (!app || !app.cvVersions.length) throw new NotFoundException('Application or CV Version not found');

        const cv = app.cvVersions[0];
        const htmlContent = cv.cvHtml || '<html><body>Missing generated HTML</body></html>';

        // Mocking PDF generation for now to avoid Puppeteer dependency if strict,
        // but typically we'd launch Puppeteer here:
        // const browser = await puppeteer.launch();
        // const page = await browser.newPage();
        // await page.setContent(htmlContent);
        // const pdfBuffer = await page.pdf({ format: 'A4' });

        const pdfBuffer = Buffer.from('Mock PDF Content representing generating CV for ' + app.jobTitle);

        const storageDir = path.join(process.cwd(), 'storage');
        if (!fs.existsSync(storageDir)) fs.mkdirSync(storageDir, { recursive: true });

        const storageKey = `cv_${applicationId}_v${cv.versionNumber}.pdf`;
        const fullPath = path.join(storageDir, storageKey);

        fs.writeFileSync(fullPath, pdfBuffer);

        // Record document
        const doc = await this.prisma.document.create({
            data: {
                applicationId,
                typeEnum: DocumentType.CV_PDF,
                storageKey,
                mimeType: 'application/pdf',
                sizeBytes: pdfBuffer.length
            }
        });

        return { documentId: doc.id, storageKey };
    }

    async getDocumentPath(documentId: string, applicationId: string) {
        const doc = await this.prisma.document.findFirst({
            where: { id: documentId, applicationId }
        });
        if (!doc) throw new NotFoundException('Document not found');
        return path.join(process.cwd(), 'storage', doc.storageKey);
    }
}
