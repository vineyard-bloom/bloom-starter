const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const BUILD_DIR = path.join(__dirname, '/dist/')
const APP_DIR = path.join(__dirname, '/src/')
const webpack = require('webpack')

module.exports = {
  entry: APP_DIR + 'index.js',
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2|svg)$/,
        loader: 'url-loader',
        include: [
          path.join(__dirname, 'src/images'),
          path.join(__dirname, 'public/fonts')
        ],
        exclude: [
          path.join(__dirname, 'src/images/inline-svgs')
        ],
        options: {
          limit: 10000
        }
      },
      {
        test: /\.svg$/,
        include: [
          path.join(__dirname, 'src/images/inline-svgs')
        ],
        loader: 'raw-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015', 'stage-0', 'stage-2']
        }
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: 'public/index.html' }
    ]),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new webpack.optimize.UglifyJsPlugin({ minimize: true})
  ],

  resolve: {
    alias: {
      config:       path.resolve(__dirname, 'config'),
      containers:   path.resolve(__dirname, 'src/js/components/containers'),
      helpers:      path.resolve(__dirname, 'src/js/util/helpers'),
      images:       path.resolve(__dirname, 'src/images'),
      js:           path.resolve(__dirname, 'src/js'),
      language:     path.resolve(__dirname, 'config/en.json'),
      lib:          path.resolve(__dirname, 'lib'),
      pages:        path.resolve(__dirname, 'src/js/components/pages'),
      presentation: path.resolve(__dirname, 'src/js/components/presentation'),
      'redux-store':path.resolve(__dirname, 'src/js/redux-store'),
      requests:     path.resolve(__dirname, 'src/js/util/requests'),
      services:     path.resolve(__dirname, 'src/js/services'),
      stubs:        path.resolve(__dirname, 'src/js/stubs'),
      styles:       path.resolve(__dirname, 'src/styles'),
      types:        path.resolve(__dirname, 'src/js/util/types'),
      validator:    path.resolve(__dirname, 'src/js/util/validator')
    },
    extensions: ['.webpack.js', '.web.js', '.jsx', '.js', '.html', '.scss']
  }
}