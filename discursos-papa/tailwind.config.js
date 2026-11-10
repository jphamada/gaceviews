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
          DEFAULT: '#f9f9ff',
          dim: '#d3daef',
          bright: '#f9f9ff',
          lowest: '#ffffff',
          low: '#f1f3ff',
          container: '#e9edff',
          high: '#e1e8fd',
          highest: '#dce2f7',
          variant: '#dce2f7',
        },
        'on-surface': {
          DEFAULT: '#141b2b',
          variant: '#414752',
        },
        'inverse-surface': '#293040',
        'inverse-on-surface': '#edf0ff',
        outline: {
          DEFAULT: '#727784',
          variant: '#c1c6d4',
        },
        'surface-tint': '#005eb5',
        primary: {
          DEFAULT: '#0265c2',
          container: '#004d97',
          fixed: '#d6e3ff',
          'fixed-dim': '#a8c8ff',
        },
        'on-primary': {
          DEFAULT: '#ffffff',
          container: '#d9e5ff',
          fixed: '#001b3d',
          'fixed-variant': '#00468a',
        },
        'inverse-primary': '#a8c8ff',
        secondary: {
          DEFAULT: '#b91c1c',
          container: '#d9352f',
          fixed: '#ffdad6',
          'fixed-dim': '#ffb4ab',
        },
        'on-secondary': {
          DEFAULT: '#ffffff',
          container: '#fffbff',
          fixed: '#410002',
          'fixed-variant': '#93000b',
        },
        tertiary: {
          DEFAULT: '#0f766e',
          container: '#04726a',
          fixed: '#9cf2e8',
          'fixed-dim': '#80d5cb',
        },
        'on-tertiary': {
          DEFAULT: '#ffffff',
          container: '#9df3e9',
          fixed: '#00201d',
          'fixed-variant': '#00504a',
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
          core: '#111827',
          dark: '#141b2b',
          secondary: '#4b5563',
          caption: '#6b7280',
        },
        hairline: '#e2e8f0',
      },
      fontFamily: {
        display: ['"Work Sans"', 'system-ui', 'sans-serif'],
        sans: ['"Public Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Libre Caslon Text"', 'Georgia', 'serif'],
      },
      borderRadius: {
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
      boxShadow: {
        segment: '0 1px 2px rgba(17, 24, 39, 0.08)',
        subtle: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      },
      letterSpacing: {
        'label-caps': '0.06em',
      },
    },
  },
  plugins: [],
}
