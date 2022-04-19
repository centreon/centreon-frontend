const excludeNodeModulesExceptCentreonUi =
  /node_modules(\\|\/)(?!(centreon-frontend(\\|\/)packages(\\|\/)(ui-context|centreon-ui)))/;

const getSwcLoaderRule = (transform) => {
  return {
    exclude: excludeNodeModulesExceptCentreonUi,
    test: /\.(j|t)sx?$/,
    use: {
      loader: 'swc-loader',
      options: {
        jsc: {
          parser: {
            syntax: 'typescript',
          },
          transform,
        },
      },
    },
  };
};

module.exports = getSwcLoaderRule;
