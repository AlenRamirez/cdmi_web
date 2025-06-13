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
        manifest: true,
        outDir: 'public/build',
        emptyOutDir: true, // 🔥 esto evita que Vite meta todo en .vite/
        rollupOptions: {
            input: 'resources/app.jsx',
        },
    },
    server: {
        https: true,
    }
});
