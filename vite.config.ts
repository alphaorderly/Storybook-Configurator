/// <reference types="vitest" />
import { join, resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

import { peerDependencies } from './package.json';

export default defineConfig({
    plugins: [react(), dts({ rollupTypes: true }), tsconfigPaths(), cssInjectedByJsPlugin()],
    build: {
        target: 'esnext',
        minify: false,
        lib: {
            entry: resolve(__dirname, join('lib', 'index.ts')),
            fileName: 'index',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            // Exclude peer dependencies from the bundle to reduce bundle size
            external: ['react/jsx-runtime', ...Object.keys(peerDependencies)],
        },
    },
    test: {
        environment: 'jsdom',
        setupFiles: './lib/test/setup.ts',
        coverage: {
            all: false,
            enabled: true,
        },
    },
});
