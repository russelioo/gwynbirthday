import { fileURLToPath } from 'node:url';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig(({ mode }) => {
    const isLaravelBuild = mode === 'laravel';
    const isVercelBuild = process.env.VERCEL === '1';

    return {
        root,
        base: isLaravelBuild ? '/birthday-site/' : isVercelBuild ? '/' : '/gwynbirthday/',
        publicDir: 'public',
        plugins: [
            react(),
            babel({
                presets: [reactCompilerPreset()],
            }),
            tailwindcss(),
        ],
        build: {
            outDir: isLaravelBuild
                ? '../public/birthday-site'
                : isVercelBuild
                  ? 'dist'
                  : '../dist',
            emptyOutDir: true,
        },
    };
});
