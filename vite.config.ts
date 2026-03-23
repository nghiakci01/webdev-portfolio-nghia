import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Code splitting configuration for better caching and parallel downloads
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries into their own chunks
          vendor: [
            'react',
            'react-dom',
            'react-router-dom',
            'react-hook-form',
            '@hookform/resolvers',
            'zod',
          ],
          // UI components library in separate chunk
          ui: [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-popover',
            '@radix-ui/react-select',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-accordion',
            'lucide-react',
          ],
          // Utilities in separate chunk
          utils: [
            'sonner',
            '@tanstack/react-query',
            'next-themes',
          ],
        },
      },
    },
    // Image optimization settings
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB
    copyPublicDir: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
      },
    },
  },
  // Optimization for images via Vite's native handling
  // Use ?w=X query parameter for responsive images: import img from './img.png?w=480'
  // Use ?format=webp or ?format=avif for format conversion
  // Use ?url for explicit URL or ?raw for raw content
}));
