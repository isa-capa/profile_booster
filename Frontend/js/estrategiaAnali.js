const mockAnalysisData = {
    companyName: "CloudTech Solutions",
    roleName: "Senior DevOps Engineer",
    matchRate: 82,
    matchTrend: "+17% vs Promedio",
    matchSummary: "Tu perfil supera el umbral mínimo (75%) para esta posición. Estás entre el top 5% de candidatos.",
    categories: [
        { name: "Hard Skills", score: 90, type: "Hard Skills" },
        { name: "Soft Skills", score: 65, type: "Soft Skills" },
        { name: "Experiencia", score: 78, type: "Experiencia" },
        { name: "Educación", score: 85, type: "Educación" }
    ],
    missingHardSkills: [
        { name: "Kubernetes (K8s)", icon: "lock" },
        { name: "Terraform IaC", icon: "lock" },
        { name: "Go (Golang)", icon: "lock" },
        { name: "AWS Solutions Architect", icon: "lock" }
    ],
    missingSoftSkills: [
        {
            name: "Liderazgo de Equipos",
            status: "Parcial",
            statusColor: "text-amber-500",
            description: "Has gestionado proyectos, pero la vacante requiere experiencia directa supervisando equipos de 5+ personas."
        },
        {
            name: "Comunicación Ejecutiva",
            status: "Requerido",
            statusColor: "text-red-500",
            description: "Falta evidencia en tu CV sobre presentaciones a stakeholders o niveles directivos (C-Level)."
        }
    ],
    experienceGaps: [
        {
            title: "Años en el Rol",
            icon: "history_edu",
            current: "4 años",
            required: "6+ años req.",
            description: "Te faltan aproximadamente 2 años de experiencia senior para cumplir el perfil ideal."
        },
        {
            title: "Industria Específica",
            icon: "domain",
            current: "No se detectó",
            isAlert: true,
            description: "No se detectó experiencia previa en el sector <strong>FinTech</strong>. La empresa valora conocimiento en regulaciones bancarias y seguridad financiera."
        },
        {
            title: "Escalabilidad",
            icon: "trending_up",
            current: "Infraestructuras medianas",
            description: "Has trabajado con infraestructuras medianas. La vacante requiere gestión de sistemas con más de 1M de usuarios concurrentes."
        }
    ],
    aiRecommendation: `"Aunque te faltan 2 años de experiencia cronológica, tus proyectos en Open Source compensan gran parte de la brecha técnica. Enfócate en destacar tu conocimiento en Docker en la entrevista para mitigar la falta de Kubernetes."`
};
document.addEventListener("DOMContentLoaded", () => {
    // Header
    const companySpan = document.getElementById("company-name");
    if (companySpan && mockAnalysisData.companyName) {
        companySpan.textContent = `- ${mockAnalysisData.companyName}`;
        companySpan.classList.remove("hidden");
    }
    const subtitleEl = document.getElementById("page-subtitle");
    if (subtitleEl) {
        subtitleEl.innerHTML = `Comparativa detallada entre tu CV actual y los requisitos de la vacante: <span class="text-primary font-semibold">${mockAnalysisData.roleName} @ ${mockAnalysisData.companyName}</span>.`;
    }
    // Match Rate
    const trendBadge = document.getElementById("match-trend-badge");
    if (trendBadge)
        trendBadge.textContent = mockAnalysisData.matchTrend;
    const rateText = document.getElementById("match-rate-text");
    if (rateText)
        rateText.textContent = `${mockAnalysisData.matchRate}%`;
    const rateBar = document.getElementById("match-rate-bar");
    if (rateBar)
        rateBar.style.width = `${mockAnalysisData.matchRate}%`;
    const rateSummary = document.getElementById("match-rate-summary");
    if (rateSummary)
        rateSummary.textContent = mockAnalysisData.matchSummary;
    // Categories Chart
    const chartContainer = document.getElementById("category-chart-container");
    if (chartContainer) {
        chartContainer.innerHTML = mockAnalysisData.categories.map(cat => `
            <div class="flex-1 flex flex-col items-center gap-3">
                <div class="w-full bg-primary/20 rounded-t-lg relative group h-full">
                    <div class="absolute bottom-0 left-0 w-full bg-primary rounded-t-lg transition-all duration-500" style="height: ${cat.score}%"></div>
                    <div class="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-primary">${cat.score}%</div>
                </div>
                <span class="text-xs font-semibold text-slate-500 uppercase tracking-tighter text-center">${cat.name}</span>
            </div>
        `).join("");
    }
    // Missing Hard Skills
    const hardSkillsContainer = document.getElementById("missing-hard-skills-container");
    if (hardSkillsContainer) {
        hardSkillsContainer.innerHTML = mockAnalysisData.missingHardSkills.map(skill => `
            <div class="flex items-center gap-3 p-4 bg-slate-100 dark:bg-primary/5 border border-transparent dark:hover:border-primary/30 rounded-xl transition-all">
                <span class="material-symbols-outlined text-primary">${skill.icon}</span>
                <span class="text-sm font-medium">${skill.name}</span>
            </div>
        `).join("");
    }
    // Missing Soft Skills
    const softSkillsContainer = document.getElementById("missing-soft-skills-container");
    if (softSkillsContainer) {
        softSkillsContainer.innerHTML = mockAnalysisData.missingSoftSkills.map(skill => `
            <div class="p-5 bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-primary/10 rounded-xl">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-bold">${skill.name}</span>
                    <span class="text-xs font-bold ${skill.statusColor} uppercase">${skill.status}</span>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400">${skill.description}</p>
            </div>
        `).join("");
    }
    // Experience Gaps
    const expGapsContainer = document.getElementById("experience-gaps-container");
    if (expGapsContainer) {
        expGapsContainer.innerHTML = mockAnalysisData.experienceGaps.map(gap => {
            if (gap.isAlert) {
                return `
                    <div class="relative pl-8 border-l-2 border-slate-200 dark:border-primary/20 pb-2">
                        <div class="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full border-4 border-background-light dark:border-background-dark"></div>
                        <h4 class="text-sm font-bold text-primary mb-1 uppercase tracking-wider">${gap.title}</h4>
                        <div class="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 p-4 rounded-xl mt-3">
                            <p class="text-sm text-amber-800 dark:text-amber-200">${gap.description}</p>
                        </div>
                    </div>
                `;
            }
            return `
                <div class="relative pl-8 border-l-2 border-slate-200 dark:border-primary/20 pb-2">
                    <div class="absolute -left-[9px] top-0 w-4 h-4 bg-primary rounded-full border-4 border-background-light dark:border-background-dark"></div>
                    <h4 class="text-sm font-bold text-primary mb-1 uppercase tracking-wider">${gap.title}</h4>
                    ${gap.required ? `
                        <div class="flex items-center gap-4 mt-1">
                            <div class="text-2xl font-black">${gap.current}</div>
                            <span class="material-symbols-outlined text-slate-400">arrow_forward</span>
                            <div class="text-2xl font-black text-slate-400">${gap.required}</div>
                        </div>
                    ` : ''}
                    <p class="text-sm text-slate-500 mt-2">${gap.description}</p>
                </div>
            `;
        }).join("");
    }
    // AI Recommendation
    const aiRecText = document.getElementById("ai-recommendation-text");
    if (aiRecText)
        aiRecText.textContent = mockAnalysisData.aiRecommendation;
});
