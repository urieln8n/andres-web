import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#050816",
        night: "#070A12",
        steel: "#0B1220",
        petrol: "#0E7490",
        gold: "#D6B25E",
        electric: "#22D3EE",
      },
      boxShadow: {
        premium: "0 24px 80px rgba(0,0,0,.42)",
        glow: "0 0 56px rgba(34,211,238,.12)",
      },
      backgroundImage: {
        "radial-premium": "radial-gradient(circle at top left, rgba(34,211,238,.12), transparent 32%), radial-gradient(circle at 80% 20%, rgba(214,178,94,.10), transparent 30%), linear-gradient(180deg, #050816 0%, #070A12 50%, #050816 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
