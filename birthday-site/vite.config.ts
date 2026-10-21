import { fileURLToPath } from 'node:url';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
    root,
    base: '/gwynbirthday/',
    publicDir: 'public',
    plugins: [
        react(),
        babel({
            presets: [reactCompilerPreset()],
        }),
        tailwindcss(),
    ],
    build: {
        outDir: '../dist',
        emptyOutDir: true,
    },
});
