// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: '@svgr/webpack/lib/index.js',
        options: {
          throwIfNamespace: false,
        },
      },
    ],
  },
};
