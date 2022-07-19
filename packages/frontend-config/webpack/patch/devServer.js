module.exports = ({ port, optionalConfig }) => ({
  devServer: {
    ...optionalConfig,
    compress: true,
    hot: true,
    port,
  },
});
