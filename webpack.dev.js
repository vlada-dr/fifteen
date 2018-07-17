const merge = require('webpack-merge');
const webpack = require('webpack');
const commonConfig = require('./webpack.common.js');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },
  devServer: {
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), 
  ],
});