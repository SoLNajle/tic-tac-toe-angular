module.exports = function(config) {
  config.set({
    files: [
      { pattern: 'src/**/*.spec.ts', watched: false }
    ],
    preprocessors: {
      'src/**/*.spec.ts': ['karma-typescript']
    },
    frameworks: ['jasmine', 'karma-typescript'],
    reporters: ['progress', 'karma-typescript'],
  });
};