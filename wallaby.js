module.exports = function (wallaby) {

  // change this expression to reflect your naming conventions
  const testPathExp = 'src/**/*.test.ts?(x)';

  return {
    files: [
      'tsconfig.json',
      'tsconfig.test.json',
      'src/**/*.+(ts|tsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)',
      `!${testPathExp}`,
    ],

    tests: [testPathExp],

    env: {
      type: 'node',
      runner: 'node',
    },

    compilers: {
      '**/*.js?(x)': wallaby.compilers.babel({
        babel: require('babel-core'),
        presets: ['react-app'],
      }),
      '**/*.ts?(x)': wallaby.compilers.typeScript({
        module: 'commonjs',
        jsx: 'React',
      }),
    },

    setup: (wallaby) => {
      wallaby.testFramework.configure({
        setupTestFrameworkScriptFile: "<rootDir>/testSetupECMA.js",
        moduleNameMapper: {
          '^.+\\.(jpg|jpeg|png|gif|svg)$': require.resolve('react-scripts-ts/config/jest/fileTransform.js'),
          '^.+\\.css$': require.resolve('react-scripts-ts/config/jest/cssTransform.js')
        }
      });
    },

    testFramework: 'jest',
  };
}
