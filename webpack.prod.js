const merge = require('webpack-merge');
var path = require('path');
var webpack = require('webpack');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'production',
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    filename: 'static/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  

  devtool: 'source-map',

  plugins: [],
});