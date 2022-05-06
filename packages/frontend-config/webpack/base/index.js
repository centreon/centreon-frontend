const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

const getBasicConfig = ({ moduleName, moduleFederationConfig }) => ({
  cache: false,
  module: {
    rules: [
      {
        parser: { system: false },
        test: /\.[cm]?(j|t)sx?$/,
      },
      {
        exclude:
          /node_modules(\\|\/)(?!(centreon-frontend(\\|\/)packages(\\|\/)(ui-context|centreon-ui)))/,
        test: /\.(j|t)sx?$/,
        use: [
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              allowTsInNodeModules: true,
              transpileOnly: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  output: {
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    filename: '[name].[chunkhash:8].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new ModuleFederationPlugin({
      name: moduleName,
      shared: [
        {
          '@centreon/ui-context': {
            requiredVersion: '22.4.0',
            singleton: true,
          },
        },
        {
          jotai: {
            requiredVersion: '1.x',
            singleton: true,
          },
        },
        {
          react: {
            requiredVersion: '18.x',
            singleton: true,
          },
        },
        {
          'react-dom': {
            requiredVersion: '18.x',
            singleton: true,
          },
        },
        {
          'react-i18next': {
            requiredVersion: '11.x',
            singleton: true,
          },
        },
        {
          'react-router-dom': {
            requiredVersion: '6.x',
            singleton: true,
          },
        },
      ],
      ...moduleFederationConfig,
    }),
  ],
  resolve: {
    alias: {
      '@centreon/ui': path.resolve(
        './node_modules/centreon-frontend/packages/centreon-ui',
      ),
      '@centreon/ui-context': path.resolve(
        './node_modules/centreon-frontend/packages/ui-context',
      ),
      react: path.resolve('./node_modules/react'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
});

module.exports = {
  getBasicConfig,
};
