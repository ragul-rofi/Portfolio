import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    environment: 'jsdom',
    // Allow CommonJS require() in test files
    globals: false,
  },
});
