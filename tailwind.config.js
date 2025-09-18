// tailwind.config.js
import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export const content = [
  // single component styles
  "./node_modules/@heroui/theme/dist/components/button.js",
  // or you can use a glob pattern (multiple component styles)
  './node_modules/@heroui/theme/dist/components/(button|snippet|code|input).js'
];
export const theme = {
  extend: {},
};
export const darkMode = "class";
export const plugins = [heroui()];