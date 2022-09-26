import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest/context.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
};

export default config;
