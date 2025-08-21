// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import react from '@astrojs/react';

const site = 'https://autoescolaidealjales.com.br';

export default defineConfig({
  site,

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react()],
});