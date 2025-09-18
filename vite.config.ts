import react from '@vitejs/plugin-react';
import vike from 'vike/plugin';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-styled-components']],
      },
    }),
    vike({ prerender: true }),
  ],
  ssr: {
    noExternal: ['styled-components', '@emotion/*'],
  },
});
