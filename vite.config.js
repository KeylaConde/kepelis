import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'logo-social', 'apple-touch-icon.png'],
      manifest: {
        name: 'Kepelis - Recomendaciones de Películas y Series',
        short_name: 'Kepelis',
        description: 'Descubre y sigue tus películas y series favoritas.',
        theme_color: '#141414',
        background_color: '#141414',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/kepelis_logo_social.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: '/kepelis_logo_social',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
