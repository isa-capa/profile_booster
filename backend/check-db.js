const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    try {
        const app = await prisma.application.findFirst({
            orderBy: { createdAt: 'desc' }
        });
        console.log("Latest App ID:", app?.id);

        if (app) {
            try {
                const runs = await prisma.aiRun.findMany({
                    where: { applicationId: app.id },
                    orderBy: { createdAt: 'desc' }
                });
                console.log("AI Runs:", JSON.stringify(runs, null, 2));
            } catch (e) { console.error("Error reading AI Runs:", e.message); }

            try {
                const user = await prisma.userProfile.findUnique({
                    where: { userId: app.userId }
                });
                console.log("Profile Base CV Len:", user?.baseCvText?.length);
            } catch (e) { console.error("Error reading Profile:", e.message); }
        }
    } catch (e) {
        console.error("Global Error:", e.message);
    } finally {
        await prisma.$disconnect();
    }
}
check();
