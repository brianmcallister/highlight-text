/* eslint-env node */

const path = require('path');

const { NODE_ENV: env = 'development' } = process.env;

module.exports = {
  mode: env,
  entry: './src/highlightNode',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'highlightNode.js',
    libraryTarget: 'umd',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },
};
