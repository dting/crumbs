const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: ['./client/src/main.js'],
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './client/index.template.html',
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react'],
      },
    }, {
      test: /\.css/,
      loaders: [
        'style-loader',
        `css-loader?${JSON.stringify({ modules: true, minimize: true })}`,
        'postcss-loader',
      ],
    }],
  },
  postcss(bundler) {
    return [
      require('postcss-import')({ addDependencyTo: bundler }),
      require('postcss-custom-properties')(),
      require('postcss-calc')(),
      require('postcss-color-function')(),
      require('postcss-pseudoelements')(),
      require('postcss-selector-not')(),
      require('autoprefixer')(),
    ];
  },
};
