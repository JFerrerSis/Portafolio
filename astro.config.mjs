import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      // Esto obliga a Vite a procesar los archivos .astro dentro de la librería
      noExternal: ['lucide-astro'],
    }
  },
});