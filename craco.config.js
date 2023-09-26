// craco.config.js

module.exports = {
  webpack: {
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
  },
};
