import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary 60% - Warm Sand
        'warm-sand': '#D4C4B0',
        'soft-khaki': '#E8DDD0',
        'warm-sand-dark': '#C4B4A0',
        
        // Secondary 30% - Sage Green
        'sage-green': '#8A9A7B',
        'sage-green-dark': '#7A8B6B',
        'sage-green-light': '#A8B898',
        'olive-muted': '#7A8B6B',
        
        // Accent 10% - Terracotta
        'terracotta': '#C47C5C',
        'terracotta-dark': '#B86B4A',
        'terracotta-light': '#D4967C',
        'muted-clay': '#B86B4A',
        
        // Neutrals
        'soft-black': '#2D2D2D',
        'text-secondary': '#5A5A5A',
        'text-muted': '#8A8A8A',
        'warm-border': '#E8E0D8',
        'warm-white': '#FAF9F6',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      boxShadow: {
        'warm': '0 4px 24px rgba(138, 154, 123, 0.08), 0 1px 4px rgba(138, 154, 123, 0.04)',
        'warm-lg': '0 8px 32px rgba(138, 154, 123, 0.12)',
        'terracotta': '0 2px 8px rgba(196, 124, 92, 0.2)',
        'terracotta-lg': '0 4px 16px rgba(196, 124, 92, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'marquee': 'marquee 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
