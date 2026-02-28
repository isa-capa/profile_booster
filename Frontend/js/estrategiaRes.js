import { authenticatedFetch } from '../config.js';

const mockSummaryData = {
    companyName: "Google",
    pageSubtitle: "Estrategia de aplicación personalizada para tu perfil profesional.",
    heroBadge: "Estrategia Recomendada",
    heroTitle: "Enfoque: Liderazgo Técnico en IA Escalable",
    heroDescription: "Tu perfil destaca por una sólida base técnica en Inteligencia Artificial y una trayectoria probada en arquitecturas distribuidas. Nuestra IA sugiere centrar tu narrativa en la escalabilidad y la eficiencia operativa.",
    strengths: [
        {
            id: "str-1",
            icon: "psychology",
            iconBgColor: "bg-emerald-500/10",
            iconTextColor: "text-emerald-500",
            title: "Deep Learning Avanzado",
            description: "Experiencia demostrable en optimización de transformers y despliegue en edge computing."
        },
        {
            id: "str-2",
            icon: "groups",
            iconBgColor: "bg-blue-500/10",
            iconTextColor: "text-blue-500",
            title: "Mentoria y Liderazgo",
            description: "Historial gestionando equipos ágiles de +5 desarrolladores con altos índices de entrega."
        },
        {
            id: "str-3",
            icon: "language",
            iconBgColor: "bg-amber-500/10",
            iconTextColor: "text-amber-500",
            title: "Dominio de Inglés (C2)",
            description: "Capacidad para negociar y liderar presentaciones técnicas ante stakeholders internacionales."
        }
    ],
    nextSteps: [
        {
            id: 1,
            title: "Optimizar LinkedIn",
            description: "Ajustar palabras clave para algoritmos de reclutamiento de empresas FAANG.",
            statusBadge: "Pendiente - 15 min",
            isPrimary: true
        },
        {
            id: 2,
            title: "Preparar Caso de Estudio",
            description: "Documentar el proyecto de IA generativa de 2023 usando el método STAR.",
            isPrimary: false
        },
        {
            id: 3,
            title: "Simulación de Entrevista",
            description: "Realizar primer mock interview con el agente de IA especializado en cultura europea.",
            isPrimary: false
        }
    ],
    stats: [
        { label: "Perfil AI Score", value: "92/100", valueColor: "text-primary" },
        { label: "Gap Técnico", value: "-4%", valueColor: "text-emerald-500" },
        { label: "Días para Meta", value: "18", valueColor: "text-slate-900 dark:text-white" },
        { label: "Competencia", value: "Baja", valueColor: "text-amber-500" }
    ]
};

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const appId = urlParams.get('appId');

    const subtitleElement = document.getElementById("page-subtitle");
    const heroTitle = document.getElementById("hero-title");

    if (!appId) {
        if (subtitleElement) subtitleElement.textContent = "Vista Modo Demo (No ID)";
        renderData(mockSummaryData);
        return;
    }

    if (subtitleElement) subtitleElement.textContent = "Nuestra Inteligencia Artificial está analizando tu perfil y la vacante...";
    if (heroTitle) heroTitle.textContent = "⏳ Generando tu estrategia (Esto tomará unos segundos)...";

    pollResults(appId);
});

async function pollResults(appId) {
    try {
        const res = await authenticatedFetch(`/applications/${appId}/results`);
        if (!res.ok) throw new Error("Network error");
        const json = await res.json();

        if (json.status === 'READY') {
            const data = json.data;
            const brief = data.companyBrief?.content ? JSON.parse(data.companyBrief.content) : null;
            const cv = data.cvVersions?.[0]?.content ? JSON.parse(data.cvVersions[0].content) : null;

            const liveData = {
                companyName: data.companyName || mockSummaryData.companyName,
                pageSubtitle: "Estrategia de aplicación personalizada para tu perfil profesional.",
                heroBadge: "Estrategia Generada por IA",
                heroTitle: cv?.professionalSummary ? `Enfoque: ${cv.professionalSummary.substring(0, 70)}...` : mockSummaryData.heroTitle,
                heroDescription: brief?.companyCulture ? brief.companyCulture : mockSummaryData.heroDescription,
                strengths: mockSummaryData.strengths,
                nextSteps: mockSummaryData.nextSteps,
                stats: mockSummaryData.stats
            };

            if (data.atsScore) {
                liveData.stats[0].value = `${data.atsScore.score}/100`;
            }

            renderData(liveData);

        } else if (json.status === 'FAILED') {
            const subtitleElement = document.getElementById("page-subtitle");
            if (subtitleElement) subtitleElement.textContent = "Ocurrió un error al generar la IA para esta aplicación.";
            const heroTitle = document.getElementById("hero-title");
            if (heroTitle) heroTitle.textContent = "❌ Error en Generación";
        } else {
            // PENDING, QUEUED, NEW
            setTimeout(() => pollResults(appId), 3000);
        }
    } catch (e) {
        console.error("Polling error", e);
        setTimeout(() => pollResults(appId), 5000);
    }
}

function renderData(data) {
    const companySpan = document.getElementById("company-name");
    if (companySpan && data.companyName) {
        companySpan.textContent = `- ${data.companyName}`;
        companySpan.classList.remove("hidden");
    }
    const subtitleElement = document.getElementById("page-subtitle");
    if (subtitleElement) subtitleElement.textContent = data.pageSubtitle;
    const heroBadge = document.getElementById("hero-badge");
    if (heroBadge) heroBadge.innerHTML = `<span class="material-symbols-outlined text-[14px] fill-1">verified</span> ${data.heroBadge}`;
    const heroTitle = document.getElementById("hero-title");
    if (heroTitle) heroTitle.textContent = data.heroTitle;
    const heroDescription = document.getElementById("hero-description");
    if (heroDescription) heroDescription.innerHTML = data.heroDescription;

    const strengthsContainer = document.getElementById("strengths-container");
    if (strengthsContainer && data.strengths) {
        strengthsContainer.innerHTML = data.strengths.map(strength => `
            <div class="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/20 flex items-start gap-4">
                <div class="size-12 rounded-lg ${strength.iconBgColor} ${strength.iconTextColor} flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined">${strength.icon}</span>
                </div>
                <div>
                    <h4 class="text-slate-900 dark:text-white font-bold mb-1">${strength.title}</h4>
                    <p class="text-slate-600 dark:text-slate-400 text-sm">${strength.description}</p>
                </div>
            </div>
        `).join("");
    }

    const nextStepsContainer = document.getElementById("next-steps-container");
    if (nextStepsContainer && data.nextSteps) {
        nextStepsContainer.innerHTML = data.nextSteps.map((step, index) => {
            const isLast = index === data.nextSteps.length - 1;
            const badgeColor = step.isPrimary ? 'bg-primary text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-500';
            const lineColor = step.isPrimary ? 'bg-primary/30' : 'bg-slate-200 dark:bg-slate-800';
            const statusHtml = step.statusBadge ? `<span class="text-xs text-primary font-bold mt-1 inline-block">${step.statusBadge}</span>` : '';
            return `
                <div class="flex gap-4">
                    <div class="flex flex-col items-center">
                        <div class="size-8 rounded-full ${badgeColor} flex items-center justify-center text-sm font-bold">${step.id}</div>
                        ${!isLast ? `<div class="w-0.5 grow ${lineColor} my-1"></div>` : ''}
                    </div>
                    <div class="${!isLast ? 'pb-4' : ''}">
                        <h4 class="text-slate-900 dark:text-white font-bold">${step.title}</h4>
                        <p class="text-slate-600 dark:text-slate-400 text-sm">${step.description}</p>
                        ${statusHtml}
                    </div>
                </div>
            `;
        }).join("");
    }

    const statsContainer = document.getElementById("quick-stats-container");
    if (statsContainer && data.stats) {
        statsContainer.innerHTML = data.stats.map(stat => `
            <div class="p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/20 text-center">
                <p class="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">${stat.label}</p>
                <p class="${stat.valueColor} text-3xl font-black">${stat.value}</p>
            </div>
        `).join("");
    }

    const exportBtn = document.getElementById("btn-export-report");
    if (exportBtn) {
        exportBtn.addEventListener("click", () => window.print());
    }
}
