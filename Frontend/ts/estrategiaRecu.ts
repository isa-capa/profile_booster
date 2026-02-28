export interface RecommendedReading {
    imageUrl: string;
    imageAlt: string;
    tagType: 'Artículo' | 'Guía' | 'Case Study';
    tagClasses: string;
    readTime: string;
    title: string;
    description: string;
}

export interface InterestingCourse {
    imageUrl: string;
    imageAlt: string;
    rating: string;
    level: 'Principiante' | 'Intermedio' | 'Avanzado';
    levelClasses: string;
    duration: string;
    title: string;
    description: string;
    price: string;
    priceClasses: string;
    buttonText: string;
}

export interface UsefulTool {
    icon: string;
    iconClasses: string;
    title: string;
    subtitle: string;
}

// Simulated data
const recommendedReadings: RecommendedReading[] = [
    {
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCsHm--mDTeKNCE65K2-THfwkfcDe8bUK4cKXqegihje4npVg-V2GKEbbazANDszO2BzCXax7Yds7LpHlZgUXJxJSZpiUfWltcgoGbrosbWZOtC6XiIh0tYnONjfDz4l5Y6EEx_hN7iJrT77E_Lfpl4GRB1-liX93LjfeBGkVQVjaY091EsTR0koFW5CAj3o5W8X-8Vhd3l_AIM3O8LTkgRKqxFSdGjGEMkPxSLkYAEgq2kkcYxuFoTNgaZAF_fNXLaEMLAVR6o1Bzc",
        imageAlt: "Person working on a sleek computer setup",
        tagType: "Artículo",
        tagClasses: "bg-primary/20 text-primary",
        readTime: "8 min lectura",
        title: "El Futuro de la IA en la Gestión de Proyectos",
        description: "Explora cómo las herramientas generativas están cambiando el rol del Project Manager moderno."
    },
    {
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGGl54TDPmlW7iDp734AcKTX2vxhmwFclS8lsDaAsQGIZCKpwSoeUghKmCt2HagEO7f8VxPuwaYogow_OaWzkYScv0tNBMZo1CJepX64d3nsfjeHgPG4od1BSx5-XfjWdq4_YRIz5yorPZhH1qkZSuwwgkBA52-9QKik_kNhxIiexQKMjQ4Dl07PLCpminlEtfoVsWd5l6LiuXpU51O7wu3hCHpmsNhYp1vwBT9-XWl_60xzy5OzRIYMxvV3Gj6A060Ww7vsxu0lV0",
        imageAlt: "Open resume and professional accessories",
        tagType: "Guía",
        tagClasses: "bg-primary/20 text-primary",
        readTime: "15 min lectura",
        title: "Estrategias de Negociación Salarial en Tech",
        description: "Aprende a valorar tus habilidades y conseguir la compensación que mereces en el mercado actual."
    },
    {
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHaxrsLSQYQ9iIZP4cZuPKBVo6Jqp3ipm6zJpBZSGJ7L0CBwtBBPLhESCAjsON7X3KV34Cqccz58Nirj8gGur0t2GSBkdOiWdzT25oTjenAoHkUnnORuQ11caVFZVOq4qVszM63x2nItGLU1R7dTXJIT9pM5-vA3qOH2OTaIyB7DjkI0qofsEawLJ01P_9N4ntdauPWco86zcvhpsxHduCl7Xn3Cyryy9YUX2o278BbJs5IZQm4bhc_C2HDtWRVUbqLrZBnScqPG7y",
        imageAlt: "Team brainstorming session around a table",
        tagType: "Case Study",
        tagClasses: "bg-primary/20 text-primary",
        readTime: "12 min lectura",
        title: "Cultura y Liderazgo en Empresas Unicornio",
        description: "Un análisis profundo de las dinámicas de equipo en las startups más exitosas de Silicon Valley."
    }
];

const interestingCourses: InterestingCourse[] = [
    {
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuChPI6LXVDlqTi0MN6qegrhCzPZkNWMg37lI3_6zleOZ83kWr7a3UHazQ4jwFoZoIX9Nq3Y7UVRlg4jHo7WjqiyvzpJmRZNXhHqle4jMbb14SA4xI1-dbAzCBlxJJf2btWi7BMj6k3qDm_BpbRMpn85Je_pRk2H6xX0bLP0GfQNc0PyI1GdIVERm1-BLi7R6OnJr7mLBys88ZPdxCiaW45YSdlrXVi3e_C5YfBRojSnj7Fn2ROQ_genAUNaSYa26I9_O12Rl7U2TSUR",
        imageAlt: "People learning together in modern classroom",
        rating: "4.8 ★",
        level: "Intermedio",
        levelClasses: "bg-emerald-500/20 text-emerald-400",
        duration: "14 horas",
        title: "Mastering React & Design Systems",
        description: "Aprende a construir interfaces escalables con componentes reutilizables.",
        price: "Gratis",
        priceClasses: "text-primary font-bold",
        buttonText: "Inscribirse"
    },
    {
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFFH2Sncm8s3kErosq2ef-VbBzngDRQVHk6Sb3_GCTq5zPfJw03g4oWcCjf6pRkulekodvfigS3xVXQWh27ZfKCbQIA-yLEG7s4qJsslOuTm57feTcoKKAlQY1oAgqakrpMIiludCd-NmoVdQB1cgwIfUgbSZ4vtioQnf69lLTzezH__4yHhT8d3zEZ-y8hV-6zeZrl-d5aAnbZGzFMrEvJsV_ZjV9UBfQ4UhrVUFkssXdxZ3cXU-FBneioKTVglLRWvmRoM1rrhlY",
        imageAlt: "Data visualizations on a laptop screen",
        rating: "4.9 ★",
        level: "Avanzado",
        levelClasses: "bg-orange-500/20 text-orange-400",
        duration: "22 horas",
        title: "Big Data Analysis for Decision Makers",
        description: "Domina el análisis de datos para tomar decisiones estratégicas de negocio.",
        price: "$24.99",
        priceClasses: "text-slate-300 font-bold",
        buttonText: "Comprar"
    },
    {
        imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOfO9-1kwJ4hq72SIjg1DoQwq0Y597B7mQAnrr_R1SExGWiXhX08nmXiXEC3UVqLa1QTJpQbKQzzGDotysiynFv9rOUpnlrBkFdbcnqq_-sUq4KyTY0uWiTQfVa7rkK8x9vfcByHKSG-kAB_xvsH16U4hqwnyZk4tAOj_T3XAeRl1mFkb0_uXHGDxUY-KwZPBsjtmwfRvI1C5hFebM8favDhLARo1gng8rqjtra_MKVExjyBPT2-IhvOM5Hb0EsNLvmlKR-SI4aziP",
        imageAlt: "Designer sketching app layout on tablet",
        rating: "4.7 ★",
        level: "Principiante",
        levelClasses: "bg-blue-500/20 text-blue-400",
        duration: "8 horas",
        title: "UX Research: Fundamentos y Métodos",
        description: "Descubre cómo investigar y entender las necesidades reales de tus usuarios.",
        price: "Gratis",
        priceClasses: "text-primary font-bold",
        buttonText: "Inscribirse"
    }
];

const usefulTools: UsefulTool[] = [
    {
        icon: "code",
        iconClasses: "from-blue-500 to-indigo-600",
        title: "VS Code Extensions",
        subtitle: "Pack de productividad"
    },
    {
        icon: "token",
        iconClasses: "from-pink-500 to-rose-600",
        title: "Figma Templates",
        subtitle: "UI Kits profesionales"
    },
    {
        icon: "terminal",
        iconClasses: "from-emerald-500 to-teal-600",
        title: "CLI Cheat Sheet",
        subtitle: "Comandos esenciales"
    },
    {
        icon: "psychology",
        iconClasses: "from-amber-500 to-orange-600",
        title: "AI Prompts Library",
        subtitle: "Guía de optimización"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // Populate Recommended Reading
    const readingContainer = document.getElementById("recommended-reading-container");
    if (readingContainer) {
        readingContainer.innerHTML = recommendedReadings.map(item => `
            <div class="group bg-neutral-dark/30 rounded-xl overflow-hidden border border-neutral-dark hover:border-primary/50 transition-all cursor-pointer">
                <div class="h-44 bg-cover bg-center" data-alt="${item.imageAlt}" style="background-image: url('${item.imageUrl}');"></div>
                <div class="p-5">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${item.tagClasses}">${item.tagType}</span>
                        <span class="text-slate-400 text-xs">${item.readTime}</span>
                    </div>
                    <h3 class="font-bold text-lg mb-2 group-hover:text-primary transition-colors">${item.title}</h3>
                    <p class="text-slate-400 text-sm line-clamp-2">${item.description}</p>
                </div>
            </div>
        `).join("");
    }

    // Populate Interesting Courses
    const coursesContainer = document.getElementById("interesting-courses-container");
    if (coursesContainer) {
        coursesContainer.innerHTML = interestingCourses.map(course => `
            <div class="group bg-neutral-dark/30 rounded-xl overflow-hidden border border-neutral-dark hover:border-primary/50 transition-all cursor-pointer">
                <div class="relative h-44 bg-cover bg-center" data-alt="${course.imageAlt}" style="background-image: url('${course.imageUrl}');">
                    <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span class="material-symbols-outlined text-white text-5xl">play_circle</span>
                    </div>
                    <div class="absolute bottom-3 right-3 bg-black/70 text-white text-[10px] px-2 py-1 rounded font-bold">${course.rating}</div>
                </div>
                <div class="p-5">
                    <div class="flex items-center gap-2 mb-3">
                        <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded ${course.levelClasses}">${course.level}</span>
                        <span class="text-slate-400 text-xs">${course.duration}</span>
                    </div>
                    <h3 class="font-bold text-lg mb-2 group-hover:text-primary transition-colors">${course.title}</h3>
                    <p class="text-slate-400 text-sm mb-4">${course.description}</p>
                    <div class="flex items-center justify-between">
                        <span class="${course.priceClasses}">${course.price}</span>
                        <button class="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-1.5 rounded-lg text-xs font-bold transition-all">${course.buttonText}</button>
                    </div>
                </div>
            </div>
        `).join("");
    }

    // Populate Useful Tools
    const toolsContainer = document.getElementById("useful-tools-container");
    if (toolsContainer) {
        toolsContainer.innerHTML = usefulTools.map(tool => `
            <div class="bg-neutral-dark/20 p-4 rounded-xl border border-neutral-dark hover:bg-neutral-dark/40 transition-all flex items-center gap-4 cursor-pointer">
                <div class="size-12 rounded-lg bg-gradient-to-br flex items-center justify-center shadow-lg ${tool.iconClasses}">
                    <span class="material-symbols-outlined text-white">${tool.icon}</span>
                </div>
                <div>
                    <h4 class="font-bold text-sm">${tool.title}</h4>
                    <p class="text-xs text-slate-400">${tool.subtitle}</p>
                </div>
            </div>
        `).join("");
    }
});
