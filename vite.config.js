import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    base: './',
    plugins: [
        react(),
        VitePWA({
            injectRegister: 'auto',
        }),
    ],
    test: {
        include: ['**/*.test.js'],
        globals: true,
    },
})
