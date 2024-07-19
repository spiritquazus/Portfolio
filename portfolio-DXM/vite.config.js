import { defineConfig } from 'vite';
import { resolve } from 'path';
import vitePluginString from 'vite-plugin-string';

export default defineConfig({
  root: './',  // Root directory where your HTML and JavaScript files are located
  server: {
    open: true,  // Automatically open your browser on server start
    // Serve static files from both 'public' and 'gallery' directories
    serve: {
      '/': [resolve(__dirname, 'public'), resolve(__dirname, 'gallery')],
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, '3js/index.html')  // Ensure this points to your main HTML file in the 3js directory
      }
    },
    outDir: 'dist',  // Output directory for build files
  },
  plugins: [
    vitePluginString()
  ]
});