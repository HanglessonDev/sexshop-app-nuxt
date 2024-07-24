import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        '**/node_modules/**',
        '**/*.cjs',
        '.nuxt/**',
        '**/dist/**',
        '**/cypress/**',
        '**/tests/**',
        '**/*.d.ts',
        'tests/**',
        '**/*.spec.ts',
        '**/*.test.ts',
        '**/*.config.{js,ts}',
      ],
      reportsDirectory: './tests/coverage',
    },
  },
})
