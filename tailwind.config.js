/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['animate-float', 'animate-float-slow', 'text-primary', 'bg-primary'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1rem', md: '2rem', lg: '3rem', xl: '4rem' },
    },
    extend: {
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['Ovelion', 'Cormorant Garamond', 'Playfair Display', 'Georgia', 'ui-serif', 'serif'],
        ovelion: ['Ovelion', 'Cormorant Garamond', 'serif'],
        angelone: ['Cormorant Garamond', 'serif'],
      },
      colors: {
        primary: "#E6B566",
        dark: "#0B0F0C",
      },
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        floatSlow: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
          '100%': { transform: 'translateY(0px)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 9s ease-in-out infinite',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
};
