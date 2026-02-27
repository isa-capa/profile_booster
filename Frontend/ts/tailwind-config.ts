import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#6324eb",
                "primary-hover": "#501ac7",
                "primary-dark": "#1d4ed8",
                "background-light": "#f6f6f8",
                "background-dark": "#161121",
                "surface-dark": "#1E293B",
                "surface-darker": "#131118",
                "surface-hover": "#334155",
                "text-secondary": "#94a3b8",
                "border-color": "#334155",
                "border-dark": "#2d2839",
                "text-muted": "#a69db9",
                "slate-custom": "#1e1a2b",
                "slate-border": "#2d2839",
                "neutral-dark": "#2d2839",
            },
            fontFamily: {
                "display": ["Inter", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.5rem",
                "lg": "1rem",
                "xl": "1.5rem",
                "2xl": "1.5rem",
                "full": "9999px"
            },
        },
    },
};

export default config;
