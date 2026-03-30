// vite.config.ts
import { defineConfig } from "file:///C:/laragon/www/webdev-portfolio-nghia/node_modules/vite/dist/node/index.js";
import react from "file:///C:/laragon/www/webdev-portfolio-nghia/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/laragon/www/webdev-portfolio-nghia/node_modules/lovable-tagger/dist/index.js";
import Sitemap from "file:///C:/laragon/www/webdev-portfolio-nghia/node_modules/vite-plugin-sitemap/dist/index.js";
var __vite_injected_original_dirname = "C:\\laragon\\www\\webdev-portfolio-nghia";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    }
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    Sitemap({
      hostname: "https://yourportfolio.com",
      dynamicRoutes: ["/"]
    })
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    // Code splitting configuration for better caching and parallel downloads
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries into their own chunks
          vendor: [
            "react",
            "react-dom",
            "react-router-dom",
            "react-hook-form",
            "@hookform/resolvers",
            "zod"
          ],
          // UI components library in separate chunk
          ui: [
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-select",
            "@radix-ui/react-tabs",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-accordion",
            "lucide-react"
          ],
          // Utilities in separate chunk
          utils: [
            "sonner",
            "@tanstack/react-query",
            "next-themes"
          ]
        }
      }
    },
    // Image optimization settings
    assetsInlineLimit: 4096,
    // Inline assets smaller than 4KB
    copyPublicDir: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: mode === "production"
      }
    }
  }
  // Optimization for images via Vite's native handling
  // Use ?w=X query parameter for responsive images: import img from './img.png?w=480'
  // Use ?format=webp or ?format=avif for format conversion
  // Use ?url for explicit URL or ?raw for raw content
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxsYXJhZ29uXFxcXHd3d1xcXFx3ZWJkZXYtcG9ydGZvbGlvLW5naGlhXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxsYXJhZ29uXFxcXHd3d1xcXFx3ZWJkZXYtcG9ydGZvbGlvLW5naGlhXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9sYXJhZ29uL3d3dy93ZWJkZXYtcG9ydGZvbGlvLW5naGlhL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2NcIjtcclxuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcclxuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XHJcbmltcG9ydCBTaXRlbWFwIGZyb20gXCJ2aXRlLXBsdWdpbi1zaXRlbWFwXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogXCI6OlwiLFxyXG4gICAgcG9ydDogODA4MCxcclxuICAgIGhtcjoge1xyXG4gICAgICBvdmVybGF5OiBmYWxzZSxcclxuICAgIH0sXHJcbiAgfSxcclxuICBwbHVnaW5zOiBbXHJcbiAgICByZWFjdCgpLCBcclxuICAgIG1vZGUgPT09IFwiZGV2ZWxvcG1lbnRcIiAmJiBjb21wb25lbnRUYWdnZXIoKSxcclxuICAgIFNpdGVtYXAoe1xyXG4gICAgICBob3N0bmFtZTogXCJodHRwczovL3lvdXJwb3J0Zm9saW8uY29tXCIsXHJcbiAgICAgIGR5bmFtaWNSb3V0ZXM6IFtcIi9cIl0sXHJcbiAgICB9KSxcclxuICBdLmZpbHRlcihCb29sZWFuKSxcclxuXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgYnVpbGQ6IHtcclxuICAgIC8vIENvZGUgc3BsaXR0aW5nIGNvbmZpZ3VyYXRpb24gZm9yIGJldHRlciBjYWNoaW5nIGFuZCBwYXJhbGxlbCBkb3dubG9hZHNcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICAvLyBTZXBhcmF0ZSB2ZW5kb3IgbGlicmFyaWVzIGludG8gdGhlaXIgb3duIGNodW5rc1xyXG4gICAgICAgICAgdmVuZG9yOiBbXHJcbiAgICAgICAgICAgICdyZWFjdCcsXHJcbiAgICAgICAgICAgICdyZWFjdC1kb20nLFxyXG4gICAgICAgICAgICAncmVhY3Qtcm91dGVyLWRvbScsXHJcbiAgICAgICAgICAgICdyZWFjdC1ob29rLWZvcm0nLFxyXG4gICAgICAgICAgICAnQGhvb2tmb3JtL3Jlc29sdmVycycsXHJcbiAgICAgICAgICAgICd6b2QnLFxyXG4gICAgICAgICAgXSxcclxuICAgICAgICAgIC8vIFVJIGNvbXBvbmVudHMgbGlicmFyeSBpbiBzZXBhcmF0ZSBjaHVua1xyXG4gICAgICAgICAgdWk6IFtcclxuICAgICAgICAgICAgJ0ByYWRpeC11aS9yZWFjdC1kaWFsb2cnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LWRyb3Bkb3duLW1lbnUnLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXBvcG92ZXInLFxyXG4gICAgICAgICAgICAnQHJhZGl4LXVpL3JlYWN0LXNlbGVjdCcsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdGFicycsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtdG9vbHRpcCcsXHJcbiAgICAgICAgICAgICdAcmFkaXgtdWkvcmVhY3QtYWNjb3JkaW9uJyxcclxuICAgICAgICAgICAgJ2x1Y2lkZS1yZWFjdCcsXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgICAgLy8gVXRpbGl0aWVzIGluIHNlcGFyYXRlIGNodW5rXHJcbiAgICAgICAgICB1dGlsczogW1xyXG4gICAgICAgICAgICAnc29ubmVyJyxcclxuICAgICAgICAgICAgJ0B0YW5zdGFjay9yZWFjdC1xdWVyeScsXHJcbiAgICAgICAgICAgICduZXh0LXRoZW1lcycsXHJcbiAgICAgICAgICBdLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gSW1hZ2Ugb3B0aW1pemF0aW9uIHNldHRpbmdzXHJcbiAgICBhc3NldHNJbmxpbmVMaW1pdDogNDA5NiwgLy8gSW5saW5lIGFzc2V0cyBzbWFsbGVyIHRoYW4gNEtCXHJcbiAgICBjb3B5UHVibGljRGlyOiB0cnVlLFxyXG4gICAgbWluaWZ5OiAndGVyc2VyJyxcclxuICAgIHRlcnNlck9wdGlvbnM6IHtcclxuICAgICAgY29tcHJlc3M6IHtcclxuICAgICAgICBkcm9wX2NvbnNvbGU6IG1vZGUgPT09ICdwcm9kdWN0aW9uJyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxuICAvLyBPcHRpbWl6YXRpb24gZm9yIGltYWdlcyB2aWEgVml0ZSdzIG5hdGl2ZSBoYW5kbGluZ1xyXG4gIC8vIFVzZSA/dz1YIHF1ZXJ5IHBhcmFtZXRlciBmb3IgcmVzcG9uc2l2ZSBpbWFnZXM6IGltcG9ydCBpbWcgZnJvbSAnLi9pbWcucG5nP3c9NDgwJ1xyXG4gIC8vIFVzZSA/Zm9ybWF0PXdlYnAgb3IgP2Zvcm1hdD1hdmlmIGZvciBmb3JtYXQgY29udmVyc2lvblxyXG4gIC8vIFVzZSA/dXJsIGZvciBleHBsaWNpdCBVUkwgb3IgP3JhdyBmb3IgcmF3IGNvbnRlbnRcclxufSkpO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXlTLFNBQVMsb0JBQW9CO0FBQ3RVLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyx1QkFBdUI7QUFDaEMsT0FBTyxhQUFhO0FBSnBCLElBQU0sbUNBQW1DO0FBT3pDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLElBQ1g7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixTQUFTLGlCQUFpQixnQkFBZ0I7QUFBQSxJQUMxQyxRQUFRO0FBQUEsTUFDTixVQUFVO0FBQUEsTUFDVixlQUFlLENBQUMsR0FBRztBQUFBLElBQ3JCLENBQUM7QUFBQSxFQUNILEVBQUUsT0FBTyxPQUFPO0FBQUEsRUFFaEIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBO0FBQUEsSUFFTCxlQUFlO0FBQUEsTUFDYixRQUFRO0FBQUEsUUFDTixjQUFjO0FBQUE7QUFBQSxVQUVaLFFBQVE7QUFBQSxZQUNOO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUE7QUFBQSxVQUVBLElBQUk7QUFBQSxZQUNGO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQTtBQUFBLFVBRUEsT0FBTztBQUFBLFlBQ0w7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsbUJBQW1CO0FBQUE7QUFBQSxJQUNuQixlQUFlO0FBQUEsSUFDZixRQUFRO0FBQUEsSUFDUixlQUFlO0FBQUEsTUFDYixVQUFVO0FBQUEsUUFDUixjQUFjLFNBQVM7QUFBQSxNQUN6QjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
