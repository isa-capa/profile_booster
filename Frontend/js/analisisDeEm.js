// Datos simulados inicializados vacíos listos para ser recibidos del backend
const data = {
    companyName: "TechGlobal Inc.",
    businessModel: "TechGlobal opera bajo un modelo SaaS B2B centrado en infraestructura cloud elástica. Su flujo de ingresos principal proviene de suscripciones anuales con un enfoque fuerte en escalabilidad horizontal.",
    sectorContext: "Lideran el cuadrante de innovación en Edge Computing. El sector enfrenta una consolidación agresiva, donde TechGlobal destaca por su arquitectura 'zero-trust' integrada.",
    strategicPriorities: [
        "Expansión en el mercado LATAM con enfoque en banca digital.",
        "Integración de IA Generativa para optimización de despliegues."
    ],
    corporateMission: "Democratizar el acceso a la computación de alto rendimiento para acelerar el progreso humano.",
    values: [
        { icon: "groups", title: "Obsesión por el Cliente", description: "No solo escuchamos, anticipamos necesidades. Cada línea de código debe resolver un problema real del usuario final." },
        { icon: "bolt", title: "Moverse Rápido", description: "Preferimos la velocidad con aprendizaje sobre la perfección lenta. Valoramos la agilidad en la toma de decisiones." },
        { icon: "shield_person", title: "Sentido de Propiedad", description: "Ownership total. Actuamos en nombre de toda la empresa, más allá de nuestro propio equipo." }
    ],
    targetPersona: 'Buscan un "Pragmático Visionario": alguien que entienda la arquitectura compleja pero que priorice la entrega de valor inmediata.',
    positioning: [
        "Enfatiza tu experiencia en sistemas distribuidos.",
        "Menciona casos donde tomaste decisiones bajo ambigüedad."
    ],
    commonErrors: 'No mostrar interés por el negocio. TechGlobal descarta ingenieros que "solo quieren programar" sin entender el impacto en el cliente.',
    insightPro: "Recientemente han migrado sus microservicios a Rust. Mencionar tu curiosidad o experiencia en lenguajes de bajo nivel te dará puntos extra."
};
document.addEventListener("DOMContentLoaded", () => {
    // Inject headers
    const nameBreadcrumb = document.getElementById("company-name-breadcrumb");
    if (nameBreadcrumb)
        nameBreadcrumb.textContent = data.companyName;
    const nameTitle = document.getElementById("company-name-title");
    if (nameTitle)
        nameTitle.textContent = data.companyName;
    // Inject executive summary
    const bmText = document.getElementById("business-model-text");
    if (bmText)
        bmText.textContent = data.businessModel;
    const sectorText = document.getElementById("sector-context-text");
    if (sectorText)
        sectorText.textContent = data.sectorContext;
    const prioritiesList = document.getElementById("strategic-priorities-list");
    if (prioritiesList) {
        prioritiesList.innerHTML = data.strategicPriorities.map(priority => `
            <li class="flex items-start gap-2">
                <span class="material-symbols-outlined text-primary text-sm mt-1">check_circle</span>
                <span>${priority}</span>
            </li>
        `).join("");
    }
    // Inject philosophy
    const missionText = document.getElementById("corporate-mission-text");
    if (missionText)
        missionText.textContent = `"${data.corporateMission}"`;
    const valuesContainer = document.getElementById("values-container");
    if (valuesContainer) {
        valuesContainer.innerHTML = data.values.map(val => `
            <div class="p-6 rounded-xl bg-slate-custom border border-slate-border hover:border-primary/50 transition-all group">
                <div class="size-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <span class="material-symbols-outlined">${val.icon}</span>
                </div>
                <h3 class="font-bold text-lg text-white mb-2">${val.title}</h3>
                <p class="text-sm text-slate-400 leading-relaxed">${val.description}</p>
            </div>
        `).join("");
    }
    // Inject guide
    const personaText = document.getElementById("target-persona-text");
    if (personaText)
        personaText.textContent = data.targetPersona;
    const posList = document.getElementById("positioning-list");
    if (posList) {
        posList.innerHTML = data.positioning.map(pos => `
            <li class="text-sm text-slate-400 flex gap-2">
                <span class="text-primary">•</span>
                ${pos}
            </li>
        `).join("");
    }
    const errorsText = document.getElementById("common-errors-text");
    if (errorsText)
        errorsText.textContent = data.commonErrors;
    const insightText = document.getElementById("insight-pro-text");
    if (insightText)
        insightText.textContent = data.insightPro;
});
export {};
