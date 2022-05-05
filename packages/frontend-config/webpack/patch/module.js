const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = ({ assetPublicPath, outputPath }) => ({
  output: {
    library: '[chunkhash:8]',
    path: outputPath,
    uniqueName: `wpJsonp-${assetPublicPath}`,
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [`${outputPath}/**/*.js`],
      dangerouslyAllowCleanPatternsOutsideProject: true,
      dry: false,
    }),
    new CopyPlugin({
      patterns: [{ from: './moduleFederation.json', to: '.' }],
    }),
  ],
});
