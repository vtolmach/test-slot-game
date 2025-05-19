module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'js'],
  testMatch: ['**/tests/**/*.test.(ts|js)'],
  globals: {
    "transform": {
      'ts-jest': {
        tsconfig: 'tsconfig.json',
      },
    }
  },
};