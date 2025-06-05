import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}',"./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'red-main': '#E97C85',
      },
      transitionProperty: {
        'custom': 'all 0.3s ease-in-out', // 👈 nếu bạn dùng `transition-custom`
      }
    },
  },
  plugins: [],
};

export default config;
