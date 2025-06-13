import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/app.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'resources/src'),
        },
    },
    build: {
        manifest: true, // 👈 importante para producción
        outDir: 'public/build', // 👈 asegura que los assets estén donde Laravel los espera
        rollupOptions: {
            input: 'resources/app.jsx', // 👈 importante para producción
        },
    },
    server: {
        https: true, // 👈 ayuda en local, pero no afecta en Render
    }
});
