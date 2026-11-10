/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#fff8f3',
          dim: '#dfd9d4',
          bright: '#fff8f3',
          lowest: '#ffffff',
          low: '#f9f2ed',
          container: '#f3ede7',
          high: '#ede7e2',
          highest: '#e7e1dc',
          variant: '#e7e1dc',
        },
        'on-surface': {
          DEFAULT: '#1d1b18',
          variant: '#4e453a',
        },
        'inverse-surface': '#32302d',
        'inverse-on-surface': '#f6f0ea',
        outline: {
          DEFAULT: '#807568',
          variant: '#d2c4b5',
        },
        'surface-tint': '#795824',
        primary: {
          DEFAULT: '#775622',
          container: '#926e38',
          ochre: '#96723B',
          fixed: '#ffddb0',
          'fixed-dim': '#ebbf81',
        },
        'on-primary': {
          DEFAULT: '#ffffff',
          container: '#fffbff',
          fixed: '#291800',
          'fixed-variant': '#5f410e',
        },
        'inverse-primary': '#ebbf81',
        secondary: {
          DEFAULT: '#28628f',
          container: '#97ccfe',
          celesta: '#75AADB',
          fixed: '#cee5ff',
          'fixed-dim': '#97ccfe',
        },
        'on-secondary': {
          DEFAULT: '#ffffff',
          container: '#175683',
          fixed: '#001d32',
          'fixed-variant': '#004a75',
        },
        tertiary: {
          DEFAULT: '#006b33',
          container: '#008742',
          mint: '#5AE386',
          'mint-hover': '#4CD476',
          fixed: '#75fd9d',
          'fixed-dim': '#56e083',
        },
        'on-tertiary': {
          DEFAULT: '#ffffff',
          container: '#f6fff3',
          fixed: '#00210b',
          'fixed-variant': '#005226',
        },
        error: {
          DEFAULT: '#ba1a1a',
          container: '#ffdad6',
        },
        'on-error': {
          DEFAULT: '#ffffff',
          container: '#93000a',
        },
        neutral: {
          dark: '#1F1D1A',
        },
        hairline: '#d2c4b5',
      },
      fontFamily: {
        serif: ['"Libre Caslon Text"', 'Georgia', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '0px',
      },
      boxShadow: {
        subtle: '0 8px 24px -4px rgba(31, 29, 26, 0.08)',
      },
      letterSpacing: {
        'label-md': '0.08em',
        'label-sm': '0.12em',
      },
    },
  },
  plugins: [],
}
