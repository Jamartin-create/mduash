/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.(js|jsx)?$': 'babel-jest', // 遇到 js jsx 等转成 es5
  },
}

export default config
