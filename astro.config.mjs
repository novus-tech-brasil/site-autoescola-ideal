// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

const site = 'https://autoescolaidealjales.com.br';

export default defineConfig({
  site,
  vite: {
    plugins: [tailwindcss()],
  },
});