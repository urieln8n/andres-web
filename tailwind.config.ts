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
        gold: "#f5c776",
        electric: "#67e8f9",
      },
      boxShadow: {
        premium: "0 24px 80px rgba(0,0,0,.35)",
        glow: "0 0 80px rgba(103,232,249,.18)",
      },
      backgroundImage: {
        "radial-premium": "radial-gradient(circle at top left, rgba(103,232,249,.22), transparent 32%), radial-gradient(circle at 80% 20%, rgba(245,199,118,.16), transparent 30%), linear-gradient(180deg, #050816 0%, #0b1020 50%, #050816 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
