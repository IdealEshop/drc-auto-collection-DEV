import formsPlugin from '@tailwindcss/forms';
import typographyPlugin from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  plugins: [formsPlugin, typographyPlugin],
  theme:{
    fontFamily: {
      serif: ["Poppins"],
    },
    extend: {
      colors: {
        'green_direct_darker': '#98A300',
        'green_direct': '#BECD00',
        'green_direct_50': '#DFE680',
        'green_direct_25': '#E9EDB8',
        'green_direct_10': '#F2F5CC',
        'body_text_off_black': '#444444',
        'black_50': '#808080',
        'white_alpha_75': 'rgba(255,255,255,0.75)',
        'gray_warm': '#757575',
        'gray_1': '#65676E',
        'gray_1_50': '#A4A5A9',
        'gray_2': '#A9ABBD',
        'gray_3': '#D9DCE3',
        'gray_4': '#E1E4EB',
        'gray_5': '#EEEEEE',
        'gray_6': '#F7F7F7',
        'gray_7': '#F5F5F5',
        'gray_8': '#FFFFFF',
        'indigo_1': '#5A2382',
        'red_1': '#F01C19',
        'red_1_70': '#F5605E',
        'red_3': '#FEECEC',
        'purple_1': '#5A2382',
      }
    },
  }
};