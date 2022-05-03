module.exports = {
  core: {
    builder: 'webpack5',
  },
  stories: ['../src/**/*.stories.@(jsx|tsx)'],
  typescript: {
    reactDocgen: 'react-docgen-typescript'
  },
  addons: ['storybook-dark-mode','@storybook/addon-essentials',
  {
    name: '@storybook/addon-docs',
    options: {
      configureJSX: true,
    },
  },],
  webpackFinal: (config) => {

    delete config.resolve.alias['emotion-theming'];
    delete config.resolve.alias['@emotion/styled'];
    delete config.resolve.alias['@emotion/core'];
  
    const configWithoutEmotionAliases = {
      ...config,
      resolve: {
        ...config.resolve,
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      module: {
        ...config.module,
        rules: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: ['babel-loader'],
          },
          {
            test: /\.tsx?$/,
            exclude: /node_modules(\\|\/)(?!(@centreon))/,
            use: [
              'babel-loader',
              {
                loader: 'ts-loader',
                options: {
                  allowTsInNodeModules: true,
                },
              },
            ],
          },
        ],
      },
    }

    return configWithoutEmotionAliases;
  }
};
