import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import svgLoader from 'vite-svg-loader'
export default defineConfig({
  plugins: [vue(),
    svgLoader({
      svgo: true,
    }),
  ],
  server: {
    port: 3000,
  },
   resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // @ → src
    },
  },
   css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/styles/variables" as *;`
      }
    }
  }
})
