const { resolve } = require('path')

const {
  optimize: { CommonsChunkPlugin },
  EnvironmentPlugin,
} = require('webpack')
const HappyPack = require('happypack')
const HtmlPlugin = require('html-webpack-plugin')


const { NODE_ENV = 'development' } = process.env
const IS_PROD = NODE_ENV === 'production'
const IS_DEV = NODE_ENV === 'development'
const DIST = resolve(__dirname, '..', 'dist')
const SRC = resolve(__dirname, '..', 'src')

const config = {
  context: SRC,
  target: 'web',

  entry: [
    './src/index.js'
  ],

  output: {
    path: DIST,
    publicPath: '/',
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      }
    ]
  },

  plugins: [
    new HappyPack({
      loaders: ['babel-loader'],
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['index'],
      filename: IS_DEV ? '[name].js' : '[name]-[chunkhash].js',
      minChunks: (module) => module.context && module.context.indexOf('node_modules') !== -1,
    }),
    new CommonsChunkPlugin({
      name: 'index',
      filename: IS_DEV ? '[name].js' : '[name]-[chunkhash].js',
      children: true,
      minChunks: 2,
    }),
    new EnvironmentPlugin({
      NODE_ENV,
    }),
  ],

  stats: {
    colors: true,
    children: false,
  },
}

module.exports = {
  config,

  IS_DEV,
  IS_PROD,
  IS_TEST,

  DIST,
  SRC,
}
