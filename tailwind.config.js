import { heroui } from "@heroui/theme";


/** @type {import('tailwindcss').Config} */
export const content = [
  // single component styles
  "./node_modules/@heroui/theme/dist/components/button.js",
  // or you can use a glob pattern (multiple component styles)
  './node_modules/@heroui/theme/dist/components/(button|snippet|code|input).js'
];
export const theme = {
  extend: {
    textShadow: {
      sm: '1px 1px 2px #000000',
      md: '2px 2px 4px rgba(0, 0, 0, 0.7)',
      lg: '4px 4px 8px rgba(0, 0, 0, 0.5)',
      'primary': '0 0 8px rgba(0, 111, 238 , 0.8)',
    },
  },
};
export const darkMode = "class";
export const plugins = [heroui()];