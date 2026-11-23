import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

// Identidad: negro profundo, blanco y un único acento azul trencadís (el azul de los mosaicos de Barcelona).
// La escala se sigue llamando "lima" para no tocar cada clase de la web.
// "cyan", "gold", "electric" y "petrol" se mantienen como alias del acento para que toda la web cambie a la vez.
const lima = {
  50: "#EEF2FF",
  100: "#DCE3FF",
  200: "#B9C7FF",
  300: "#8EA6FF",
  400: "#6683FF",
  500: "#3F5BFF",
  600: "#2A3FE6",
  700: "#2131B3",
  800: "#1C2A8C",
  900: "#1B276E",
  950: "#0F1440",
};

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#080808",
        night: "#0D0D0D",
        steel: "#141414",
        petrol: lima[600],
        gold: lima[300],
        electric: lima[300],
        lima,
        cyan: lima,
        slate: colors.neutral,
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
        display: ["var(--font-display)", "var(--font-geist-sans)", "sans-serif"],
      },
      boxShadow: {
        premium: "0 30px 80px rgba(0,0,0,.55)",
        glow: "0 0 60px rgba(142,166,255,.18)",
      },
      backgroundImage: {
        "radial-premium": "radial-gradient(60rem 30rem at 50% -10%, rgba(142,166,255,.08), transparent 70%), linear-gradient(180deg, #080808 0%, #0A0A0A 50%, #080808 100%)",
      },
      keyframes: {
        marquesina: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: {
        marquesina: "marquesina 38s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
