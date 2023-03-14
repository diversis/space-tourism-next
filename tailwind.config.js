const { fontFamily } = require("tailwindcss/defaultTheme");
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    future: {
        hoverOnlyWhenSupported: true,
    },
    theme: {
        extend: {
            screens: {
                xs: { raw: "(min-width: 320px)" },
                over9000: { raw: "(min-width: 1920px)" },
                // => @media (min-width: 1920px) { ... }
            },
            colors: {
                primary: "hsl(230, 35%, 7%)",
                accent: "hsl(231, 77%, 90%)",
                secondary: "hsl(0, 0%, 100%)",
            },
            fontFamily: {
                barlow: ["Barlow", ...fontFamily.sans],
                condensed: ["Barlow Condensed", ...fontFamily.sans],
                bellefair: ["Bellefair", ...fontFamily.serif],
            },
            fontSize: {
                xs: "0.875rem",
                sm: "0.9375rem",
                base: "1rem",
                lg: "1.125rem",
                xl: "1.75rem",
                "2xl": "2rem",
                "3xl": "2.5rem",
                "4xl": "3.5rem",
                "5xl": "5rem",
                "6xl": "6.25rem",
                "7xl": "9.375rem",
            },
            letterSpacing: {
                exp: "2px",
                wide: "2.35px",
                wider: "2.7px",
                widest: "4.75px",
            },
            gridTemplateRows: {
                home: "1fr 10rem",
            },
            backgroundImage: {
                conic: "conic-gradient(from 0turn at 50% 50%,hsla(0deg, 0%, 100%,1) 0%,hsla(231deg, 77%, 90%,1) 30%,hsla(0deg, 0%, 100%,0.2) 35%,hsla(181, 100%, 51%, 1) 50%,hsla(181, 100%, 51%, 1) 70%,hsla(0deg, 0%, 100%,0.2) 75%,hsla(0deg, 0%, 100%,1) 80%)",
                "repeating-conic":
                    "repeating-conic-gradient(from 0turn at 50% 50%,hsl(231, 77%, 90%) 0%,hsla(0deg, 0%, 100%,0.1) 10%,hsla(0deg, 0%, 100%,0) 20%)",
            },
            animation: {
                "fade-in":
                    "fade-in 1s forwards cubic-bezier(0.01365, 0.014, 0.24, 0.1)",
                "bg-slide": "bg-slide 25s ease-in infinite",
            },
            keyframes: {
                "fade-in": {
                    "0%": "opacity: 0",
                    "100%": "opacity: 1",
                },
                "bg-slide": {
                    "0%, 100%": { "background-position": "top left" },
                    "25%": { "background-position": "top right" },
                    "50%": { "background-position": "bottom right" },
                    "75%": { "background-position": "bottom left" },
                },
            },
            boxShadow: {
                exp: "0 0 1rem 0.3em hsla(231, 77%, 90%, 0.3), inset 5px -5px 1em 0.25em hsla(230, 35%, 7%, 0.1)",
            },
        },
    },
    plugins: [],
};
