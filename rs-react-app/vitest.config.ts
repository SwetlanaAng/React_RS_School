import path from 'node:path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'next/navigation': path.resolve(
        __dirname,
        './src/test/mocks/next-navigation.ts'
      ),
      'next/image': path.resolve(__dirname, './src/test/mocks/next-image.tsx'),
    },
  },
  test: {
    globals: true,
    include: ['**/*.test.tsx', '**/*.test.ts'],
    environment: 'jsdom',
    setupFiles: './src/test/setup.tsx',
    coverage: {
      provider: 'v8',
      include: ['src/**/**.{js,jsx,ts,tsx}'],
      exclude: [
        'src/**/*.test.{js,jsx,ts,tsx}',
        'src/**/*.spec.{js,jsx,ts,tsx}',
        'src/**/*.d.ts',
        'src/index.{js,jsx,ts,tsx}',
        'src/setupTests.{js,ts}',
      ],
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
  },
});
