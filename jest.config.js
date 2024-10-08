export default {
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest',
    },
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  };
  