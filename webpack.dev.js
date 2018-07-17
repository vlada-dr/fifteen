const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    './src/index.js'
  ],
  devServer: {
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), 
  ],
});