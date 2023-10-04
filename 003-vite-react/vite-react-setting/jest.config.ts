export default {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  // testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.svg$': 'jest-transformer-svg',
    // process `*.tsx` files with `ts-jest`
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
