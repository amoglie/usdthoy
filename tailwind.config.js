/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    './src/**/*.{js,jsx,ts,tsx}', // Ajusta la ruta según tu estructura de proyecto
    // Agrega las clases dinámicas aquí para que Tailwind CSS las detecte
    './components/quote-card.tsx',
  ],
  theme: {
    extend: {
      colors: {
        background: "#1a1a1a",
        foreground: "hsl(var(--foreground))",
        border: "#4B5563",
        card: "#1E1E1E",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        blue: {
          500: '#3b82f6',
          600: '#2563eb',
        },
        indigo: {
          500: '#6366f1',
          600: '#4f46e5',
        },
        emerald: {
          500: '#10b981',
          600: '#059669',
        },
        violet: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
        amber: {
          500: '#f59e0b',
          600: '#d97706',
        },
      },
      borderOpacity: {
        50: '0.5',
      },
      backgroundOpacity: {
        20: '0.2',
      },
    },
  },
  plugins: [],
};
