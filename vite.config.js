import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/Project-web/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        emptyOutDir: true,
    }
})
