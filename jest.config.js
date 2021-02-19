module.exports = {
  collectCoverageFrom: [
    '<rootDir>/src/funcoes/**/*.js',
  ],
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^Utils$': '<rootDir>/src/utils',
    '^Modelos$': '<rootDir>/modelos',
  },
};
