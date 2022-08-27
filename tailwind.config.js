module.exports = {
  content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'home-hero': "url('/A99I3830-(ZF-5269-01547-1-001).jpg')",
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['light'],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
  },
};
