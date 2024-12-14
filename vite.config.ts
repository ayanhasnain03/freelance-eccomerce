import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import viteCompression from "vite-plugin-compression"; // To enable compression

export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: 'brotliCompress',  // Correct Brotli compression method from zlib
      ext: '.br', // Extension for Brotli-compressed files
      threshold: 10240, // Compress files larger than 10KB
    }),
  ],
  build: {
    minify: 'terser', // Enable JS minification
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
      },
    },
    chunkSizeWarningLimit: 500, // Avoid warnings for large chunks
  },
  server: {
    // Add this for better dev-server performance
    hmr: true,
  },
  optimizeDeps: {
    include: [
      // List libraries you want to optimize during development (optional)
    ],
    exclude: [
      // List libraries you don't want to optimize (optional)
    ],
  },
});
