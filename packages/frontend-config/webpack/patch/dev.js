const getSwcLoaderRule = require('../getSwcLoaderRule');

module.exports = {
  cache: true,
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      getSwcLoaderRule({
        react: {
          refresh: true,
          runtime: 'automatic',
        },
      }),
    ],
  },
  optimization: {
    splitChunks: false,
  },
  output: {
    filename: '[name].js',
  },
};
