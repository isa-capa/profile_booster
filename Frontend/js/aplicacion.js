import { authenticatedFetch } from '../config.js';

// Simulated dynamic data
const currentUser = {
    name: "ApplySmart AI",
    plan: "Pro Plan",
    avatarUrl: ""
};

const pageContent = {
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

    const titleEl = document.getElementById("page-title");
    if (titleEl) titleEl.textContent = pageContent.title;

    const subtitleEl = document.getElementById("page-subtitle");
    if (subtitleEl) subtitleEl.textContent = pageContent.subtitle;

    const btnGenerate = document.getElementById("btn-generate-text");
    if (btnGenerate) btnGenerate.textContent = pageContent.generateButtonText;

    // Handle file upload UI feedback
    let selectedFile = null;
    const cvUploadInput = document.getElementById("cv-upload");
    const uploadStatusText = document.getElementById("upload-status-text");

    if (cvUploadInput) {
        cvUploadInput.addEventListener("change", (e) => {
            if (e.target.files && e.target.files.length > 0) {
                selectedFile = e.target.files[0];
                if (uploadStatusText) {
                    uploadStatusText.innerHTML = `<span class="text-primary font-bold">✓ Archivo seleccionado:</span> ${selectedFile.name}`;
                }
            } else {
                selectedFile = null;
                if (uploadStatusText) {
                    uploadStatusText.textContent = "Arrastra y suelta tu PDF aquí o haz clic para buscar";
                }
            }
        });
    }

    // Handle form submission
    const generateLink = btnGenerate?.closest('a');
    if (generateLink) {
        generateLink.addEventListener('click', async (e) => {
            e.preventDefault();

            const baseCvText = document.getElementById("cv-text")?.value || "";
            const companyName = document.querySelector('input[placeholder="Ej: Google, Spotify"]')?.value || "";
            const jobTitle = document.querySelector('input[placeholder="Ej: Diseñador de Producto"]')?.value || "";
            const jdText = document.getElementById("jd-text")?.value || "";

            if (!companyName || !jobTitle || !jdText) {
                alert("Por favor, llena Nombre de Empresa, Puesto y Descripción del Puesto.");
                return;
            }

            if (!selectedFile && !baseCvText.trim()) {
                alert("Por favor, sube tu CV en formato PDF o pega el texto en el área indicada.");
                return;
            }

            try {
                // Change UI state
                const originalText = btnGenerate.textContent;
                btnGenerate.textContent = "Procesando...";
                generateLink.classList.add("pointer-events-none", "opacity-70");

                // 1. Upload CV (PDF or Text)
                if (selectedFile) {
                    const formData = new FormData();
                    formData.append('file', selectedFile);

                    const uploadRes = await authenticatedFetch('/profile/upload-cv-pdf', {
                        method: 'POST',
                        body: formData // No Content-Type header so browser sets multipart boundary
                    });
                    if (!uploadRes.ok) {
                        const err = await uploadRes.json().catch(() => ({}));
                        throw new Error(`Error subiendo el PDF: ${err.message || uploadRes.statusText}`);
                    }
                } else {
                    const uploadRes = await authenticatedFetch('/profile/upload-cv-text', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ cvText: baseCvText })
                    });
                    if (!uploadRes.ok) {
                        const err = await uploadRes.json().catch(() => ({}));
                        throw new Error(`Error enviando el texto del CV: ${err.message || uploadRes.statusText}`);
                    }
                }

                // 2. Create Application
                const appRes = await authenticatedFetch('/applications', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ companyName, jobTitle, jdText })
                });

                if (!appRes.ok) throw new Error("Error creando aplicación");
                const application = await appRes.json();
                const appId = application.id;

                // 3. Trigger Async Generation Process
                const genRes = await authenticatedFetch(`/applications/${appId}/generate`, {
                    method: 'POST'
                });

                if (!genRes.ok) throw new Error("Error iniciando generación de IA");

                // 4. Redirect to Results page to poll
                window.location.href = `estrategiaRes.html?appId=${appId}`;

            } catch (error) {
                console.error("Error en flujo de aplicación:", error);
                alert("Ocurrió un error al procesar tu solicitud. Intenta nuevamente. Detalle: " + error.message);
                btnGenerate.textContent = pageContent.generateButtonText;
                generateLink.classList.remove("pointer-events-none", "opacity-70");
            }
        });
    }
});
