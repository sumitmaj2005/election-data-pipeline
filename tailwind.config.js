/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b', // Deep Indian election indelible ink
        },
        paper: {
          50: '#ffffff',
          100: '#f8fafc',
          200: '#f1f5f9',
          300: '#e2e8f0',
          800: '#1e293b',
          900: '#0f172a',
          950: '#090d16',
        },
        status: {
          teal: {
            light: '#ccfbf1',
            DEFAULT: '#0d9488',
            dark: '#115e59',
          },
          amber: {
            light: '#fef3c7',
            DEFAULT: '#d97706',
            dark: '#92400e',
          },
          slate: {
            light: '#f1f5f9',
            DEFAULT: '#64748b',
            dark: '#334155',
          }
        }
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
