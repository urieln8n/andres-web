import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

// Identidad: negro profundo, blanco y un único acento lima eléctrico.
// "cyan", "gold", "electric" y "petrol" se mantienen como alias del acento para que toda la web cambie a la vez.
const lima = {
  50: "#F8FFE5",
  100: "#EFFFC4",
  200: "#E0FF8F",
  300: "#C6FF3D",
  400: "#B4F01F",
  500: "#9AD60F",
  600: "#77A80A",
  700: "#5A7F0E",
  800: "#476412",
  900: "#3B5314",
  950: "#1E2E05",
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
      },
      boxShadow: {
        premium: "0 30px 80px rgba(0,0,0,.55)",
        glow: "0 0 60px rgba(198,255,61,.16)",
      },
      backgroundImage: {
        "radial-premium": "radial-gradient(60rem 30rem at 50% -10%, rgba(198,255,61,.07), transparent 70%), linear-gradient(180deg, #080808 0%, #0A0A0A 50%, #080808 100%)",
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
