import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
                brand: {
          50:  '#eef6fb',
          100: '#d9eaf5',
          200: '#badbf0',
          300: '#8dc3e7',
          400: '#58a5da',
          500: '#368bc8',
          600: '#266fa8',
          700: '#045a94',
          800: '#1b4d75',
          900: '#194162',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
      },
            keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05) translate(-1%, -1%)' },
          '100%': { transform: 'scale(1)' },
        },
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.03' },
          '50%': { opacity: '0.08' },
        }
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        kenburns: 'kenburns 30s ease-in-out infinite',
        'reveal-up': 'revealUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulseSlow 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};

export default config;