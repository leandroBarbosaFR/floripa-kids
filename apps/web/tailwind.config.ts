import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        fadeUp:    { from: { opacity: '0', transform: 'translateY(22px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:    { from: { opacity: '0' }, to: { opacity: '1' } },
        scaleIn:   { from: { opacity: '0', transform: 'scale(0.90)' }, to: { opacity: '1', transform: 'scale(1)' } },
        slideDown: { from: { opacity: '0', transform: 'translateY(-12px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        float:     { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-6px)' } },
      },
      animation: {
        'fade-up':    'fadeUp 0.55s ease-out both',
        'fade-in':    'fadeIn 0.45s ease-out both',
        'scale-in':   'scaleIn 0.45s ease-out both',
        'slide-down': 'slideDown 0.4s ease-out both',
        'float':      'float 3s ease-in-out infinite',
      },
      colors: {
        brand: {
          coral: '#faa198',
          yellow: '#f5df86',
          blue: '#96C9D7',
          cream: '#FDF8C3',
          green: '#C0ECD9',
          pink: '#F9C4C8',
        },
      },
    },
  },
  plugins: [],
}

export default config
