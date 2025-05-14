import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      branches: 55,
      functions: 55,
      lines: 65,
      statements: 65,
    },
  },
};

export default config;
