const mockCV = {
    name: "Isaura Casas Plascencia",
    role: "Desarrollador Java Full Stack Jr.",
    contact: "+52 3331906460 | icapla.92@gmail.com | ZMG, México",
    links: "Linkedin: isadev | Github: isa-capa | Portafolio: isadev",
    profile: "Desarrollador Java Full Stack Jr. con sólida base en Administración y Análisis de Datos. Experiencia en la creación de aplicaciones web escalables utilizando Java, Spring Boot, MySQL, JavaScript y Python. Por mi visión de negocios y mis habilidades técnicas para desarrollar software eficiente, busco integrarme a un equipo que tenga en sus objetivos el usuario al centro de cualquier desarrollo tecnológico.",
    techSkills: "CSS | HTML | Bootstrap | JavaScript | Python | Java | Postman | Git / GitHub | SCRUM | Figma | Jira | Excel | Spring Boot | MySQL | Anaconda | REST APIs",
    softSkills: "Resolución de Problemas | Aprendizaje Ágil | Colaboración Interfuncional | Adaptabilidad y Resiliencia | Comunicación Asertiva | Comunicación Técnica y de Negocio | SDLC",
    projects: [
        "<b>Red social que conecta turismo con experiencias locales (lead project dev) | Kim Conecta</b> (Ene 2026 - Mar 2026)",
        "<b>Sistema de facturación (Dev) | Private Aviation Billing System</b> (Sep 2025 - Ene 2026)",
        "<b>Plataforma interactiva de reservas de vuelos (Dev) | AeroBooking</b> (Jun 2025 - Nov 2025)",
        "<b>Aplicación web real-time para monitorear vuelos (Dev) | Flight Monitor Dashboard</b> (Jun 2025 - Dic 2025)",
        "<b>Simulador de reservas (Dev) | Flight Reservation Simulator</b> (Ene 2025 - Ago 2025)"
    ],
    experience: [
        {
            title: "<b>Consultor de Desarrollo de Software y Datos | Consultant (Freelance)</b>",
            date: "(Jun 24 - Actualidad)",
            bullets: [
                "Desarrollé soluciones tecnológicas integrales (End-to-End) utilizando Python, Java y JavaScript, creando plataformas web y simuladores para el sector de aviación y turismo.",
                "Construí dashboards interactivos y herramientas digitales que procesan datos complejos de conectividad aérea, facilitando la toma de decisiones estratégicas.",
                "Implementé pipelines de ingeniería de datos y geointeligencia para analizar mercados, transformando grandes volúmenes de información en insights accionables."
            ]
        },
        {
            title: "<b>Gerente de Proyectos Técnicos (Technical Project Manager) | ApoloD (Fintech)</b>",
            date: "(Ene. 2019 - Dic. 2024)",
            bullets: [
                "Lideré el ciclo de vida de desarrollo de software para una plataforma fintech, colaborando estrechamente con equipos de desarrollo para definir la arquitectura y lógica de negocio.",
                "Traduje necesidades financieras complejas en requerimientos técnicos funcionales (User Stories), asegurando la viabilidad técnica y la escalabilidad del producto.",
                "Implementé estrategias <i>data-driven</i> y sistemas de KPIs para automatizar procesos operativos y mejorar la experiencia de usuario en la plataforma digital."
            ]
        },
        {
            title: "<b>Director Comercial & Desarrollador IoT | Argo Systems</b>",
            date: "(2016 - 2018)",
            bullets: [
                "Programé módulos de IoT y sistemas de domótica, integrando lógica de control y protocolos de comunicación entre dispositivos inteligentes.",
                "Definí requerimientos funcionales para soluciones de automatización, asegurando la correcta integración entre el hardware y el software de control.",
                "Colaboré con equipos de ingeniería para diseñar procesos escalables basados en datos de uso de los dispositivos."
            ]
        }
    ],
    education: [
        "<b>Bootcamp Desarrollador Java Full Stack Jr.</b> | Generation México (Dic 2025 - Mar 2026)",
        "<b>Licenciatura en Administración y Dirección de empresas</b> | Universidad Panamericana (Ene 2012 - Ene 2016)",
        "<b>Ingeniería en Datos e Inteligencia Artificial</b> | Universidad IEU (Sep 2025 - Ago 2028)"
    ],
    courses: [
        "<b>Java Developer</b> | Accenture (2025)",
        "<b>Introducción a la Geointeligencia Computacional y Python</b> | Centro de Investigación en Ciencias de Información Geoespacial, A.C. (Nov. - Dic. 2025)",
        "<b>Control de Versiones (Git/GitHub) y Fundamentos de Software</b> | Platzi (2025)"
    ],
    languages: [
        "Ingles | B2"
    ]
};
const mockSidebar = {
    matchScore: 87,
    matchScoreTrend: "+12%",
    detectedKeywords: ["SaaS", "Agile", "Product Management", "SQL", "Jira"],
    missingKeywords: ["Python", "API Rest", "B2C"]
};
document.addEventListener("DOMContentLoaded", () => {
    // Populate CV Header
    const cvName = document.getElementById("cv-name");
    const cvRole = document.getElementById("cv-role");
    const cvContact = document.getElementById("cv-contact");
    const cvLinks = document.getElementById("cv-links");
    if (cvName)
        cvName.textContent = mockCV.name;
    if (cvRole)
        cvRole.textContent = mockCV.role;
    if (cvContact)
        cvContact.textContent = mockCV.contact;
    if (cvLinks)
        cvLinks.textContent = mockCV.links;
    // Populate Paragraphs
    const cvProfile = document.getElementById("cv-profile");
    const cvTechSkills = document.getElementById("cv-tech-skills");
    const cvSoftSkills = document.getElementById("cv-soft-skills");
    if (cvProfile)
        cvProfile.textContent = mockCV.profile;
    if (cvTechSkills)
        cvTechSkills.textContent = mockCV.techSkills;
    if (cvSoftSkills)
        cvSoftSkills.textContent = mockCV.softSkills;
    // Populate Lists Arrays
    const cvProjects = document.getElementById("cv-projects");
    if (cvProjects) {
        cvProjects.innerHTML = mockCV.projects.map(p => `<li>${p}</li>`).join("");
    }
    const cvEducation = document.getElementById("cv-education");
    if (cvEducation) {
        cvEducation.innerHTML = mockCV.education.map(e => `<li>${e}</li>`).join("");
    }
    const cvCourses = document.getElementById("cv-courses");
    if (cvCourses) {
        cvCourses.innerHTML = mockCV.courses.map(c => `<li>${c}</li>`).join("");
    }
    const cvLanguages = document.getElementById("cv-languages");
    if (cvLanguages) {
        cvLanguages.innerHTML = mockCV.languages.map(l => `<li>${l}</li>`).join("");
    }
    // Populate Experience Object Array
    const cvExperience = document.getElementById("cv-experience");
    if (cvExperience) {
        cvExperience.innerHTML = mockCV.experience.map(exp => `
            <div>
                <p class="text-xs mb-1">${exp.title} ${exp.date}</p>
                <ul class="list-disc list-inside text-xs space-y-1 ml-2">
                    ${exp.bullets.map(b => `<li>${b}</li>`).join("")}
                </ul>
            </div>
        `).join("");
    }
    // Populate Sidebar Stats
    const matchScoreText = document.getElementById("matchScore-text");
    if (matchScoreText && !document.getElementById("match-score-text")) {
        // Fallback for ID typo in case
        matchScoreText.textContent = `${mockSidebar.matchScore}%`;
    }
    const properMatchScoreText = document.getElementById("match-score-text");
    if (properMatchScoreText)
        properMatchScoreText.textContent = `${mockSidebar.matchScore}%`;
    const matchScoreTrend = document.getElementById("match-score-trend");
    if (matchScoreTrend) {
        matchScoreTrend.innerHTML = `<span class="material-symbols-outlined text-base">trending_up</span> ${mockSidebar.matchScoreTrend}`;
    }
    const matchScoreBar = document.getElementById("match-score-bar");
    if (matchScoreBar) {
        matchScoreBar.style.width = `${mockSidebar.matchScore}%`;
    }
    // Populate Keywords
    const detectedCountText = document.getElementById("detected-count-text");
    const detectedContainer = document.getElementById("detected-keywords-container");
    if (detectedCountText)
        detectedCountText.textContent = `Detectadas (${mockSidebar.detectedKeywords.length})`;
    if (detectedContainer) {
        detectedContainer.innerHTML = mockSidebar.detectedKeywords.map(kw => `<span class="px-2.5 py-1 bg-green-500/10 text-green-700 dark:text-green-300 text-xs font-medium rounded border border-green-500/20">${kw}</span>`).join("");
    }
    const missingCountText = document.getElementById("missing-count-text");
    const missingContainer = document.getElementById("missing-keywords-container");
    if (missingCountText)
        missingCountText.textContent = `Faltantes (${mockSidebar.missingKeywords.length})`;
    if (missingContainer) {
        missingContainer.innerHTML = mockSidebar.missingKeywords.map(kw => `<span class="px-2.5 py-1 bg-orange-500/10 text-orange-700 dark:text-orange-300 text-xs font-medium rounded border border-orange-500/20 dashed border-dashed">${kw}</span>`).join("");
    }
});
export {};
