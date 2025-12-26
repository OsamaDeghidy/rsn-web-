import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                gold: {
                    400: "#D4AF37",
                    500: "#C5A065",
                    600: "#B8860B",
                },
                navy: {
                    900: "#0A192F",
                    950: "#020c1b",
                },
            },
            fontFamily: {
                heading: ["var(--font-playfair)", "serif"],
                sans: ["var(--font-inter)", "sans-serif"],
                arabic: ["var(--font-ibm-arabic)", "sans-serif"],
            },
            backgroundImage: {
                'luxury-gradient': 'linear-gradient(to bottom right, #020c1b, #0A192F)',
            },
        },
    },
    plugins: [],
};
export default config;
