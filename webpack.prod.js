const merge = require('webpack-merge');
const {resolve} = require('path');

const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'bundle.[hash].min.js',
    path: resolve(__dirname, '/dist'),
    publicPath: '/',
  },
  plugins: [],
});