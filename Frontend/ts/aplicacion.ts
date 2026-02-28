export interface UserProfile {
    name: string;
    plan: string;
    avatarUrl: string;
}

export interface ApplicationPageContent {
    title: string;
    subtitle: string;
    generateButtonText: string;
}

export interface ApplicationFormData {
    baseCvText: string;
    companyName: string;
    jobTitle: string;
    jobLink: string;
    jobDescription: string;
    linkedinUrl?: string;
    githubUrl?: string;
    portfolioUrl?: string;
}

// Simulated dynamic data
const currentUser: UserProfile = {
    name: "ApplySmart AI",
    plan: "Pro Plan",
    avatarUrl: ""
};

const pageContent: ApplicationPageContent = {
    title: "Configuración de Nueva Aplicación",
    subtitle: "Paso 1: Sube tu CV y los detalles del puesto para generar una estrategia personalizada.",
    generateButtonText: "Generar Estrategia"
};

document.addEventListener("DOMContentLoaded", () => {
    // Populate User Profile
    const userNameEl = document.getElementById("user-name");
    if (userNameEl) userNameEl.textContent = currentUser.name;

    const userPlanEl = document.getElementById("user-plan");
    if (userPlanEl) userPlanEl.textContent = currentUser.plan;

    // Note: Avatar background image is kept from the CSS class by default, 
    // but could be overridden here with currentUser.avatarUrl if provided.

    // Populate Page Text
    const titleEl = document.getElementById("page-title");
    if (titleEl) titleEl.textContent = pageContent.title;

    const subtitleEl = document.getElementById("page-subtitle");
    if (subtitleEl) subtitleEl.textContent = pageContent.subtitle;

    const btnGenerate = document.getElementById("btn-generate-text");
    if (btnGenerate) btnGenerate.textContent = pageContent.generateButtonText;

    // Optional: Ready for data extraction when the form is submitted
    /*
    const extractFormData = (): ApplicationFormData => {
        return {
            baseCvText: (document.getElementById("cv-text") as HTMLTextAreaElement)?.value || "",
            companyName: (document.querySelector('input[placeholder="Ej: Google, Spotify"]') as HTMLInputElement)?.value || "",
            jobTitle: (document.querySelector('input[placeholder="Ej: Diseñador de Producto"]') as HTMLInputElement)?.value || "",
            jobLink: (document.querySelector('input[type="url"]:not(#link-linkedin):not(#link-github):not(#link-portfolio)') as HTMLInputElement)?.value || "",
            jobDescription: (document.getElementById("jd-text") as HTMLTextAreaElement)?.value || "",
            linkedinUrl: (document.getElementById("link-linkedin") as HTMLInputElement)?.value || "",
            githubUrl: (document.getElementById("link-github") as HTMLInputElement)?.value || "",
            portfolioUrl: (document.getElementById("link-portfolio") as HTMLInputElement)?.value || ""
        };
    };
    */
});
