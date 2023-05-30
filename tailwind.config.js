/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './component/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        "primary":"#ff5d00",
        "primary": {
            100: '#ffefe6',
            200: '#ffdfcc',
            300: '#ffbe99',
            400: '#ffae80',
            500: '#ff9e66',
            600: '#ff8e4d',
            700: '#ff7d33',
            800: '#ff6d1a',
            900: '#ff5d00',
        }
       }
    },
  },
  plugins: [],
}
