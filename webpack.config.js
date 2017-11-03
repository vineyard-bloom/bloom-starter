const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const BUILD_DIR = path.join(__dirname, '/dist/')
const APP_DIR = path.join(__dirname, '/src/')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')

module.exports = {
  entry: ['babel-polyfill', APP_DIR + 'index.js'],
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
    publicPath: '/'
  },

  devtool: 'eval-source-map',

  devServer: {
    publicPath: '/',
    contentBase: './public',
    port: 8080,
    host: '0.0.0.0',
    open: false,
    historyApiFallback: true,
    disableHostCheck: true
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
        include: [path.join(__dirname, 'src/images/inline-svgs')],
        loader: 'raw-loader'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'env'],
          'plugins': [
            'transform-object-rest-spread',
            'transform-class-properties'
          ]
        }
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader',
            options: {
              plugins: function() {
                return [autoprefixer]
              }
            }
          },
          { loader: 'sass-loader' }
        ]
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CopyWebpackPlugin([
      { from: 'public/index.html' }
    ]),
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ],

  resolve: {
    alias: {  // aliases allow you to import with cleaner paths like '/images/spinner.png' versus '../../images/spinner.png'
      config:       path.resolve(__dirname, 'config'),
      containers:   path.resolve(__dirname, 'src/js/containers'),
      helpers:      path.resolve(__dirname, 'src/js/util/helpers'),
      icons:        path.resolve(__dirname, 'src/js/icons'),
      images:       path.resolve(__dirname, 'src/images'),
      js:           path.resolve(__dirname, 'src/js'),
      language:     path.resolve(__dirname, 'config/en.json'),
      lib:          path.resolve(__dirname, 'lib'),
      pages:        path.resolve(__dirname, 'src/js/pages'),
      presentation: path.resolve(__dirname, 'src/js/presentation'),
      'redux-store':path.resolve(__dirname, 'src/js/redux-store'),
      requests:     path.resolve(__dirname, 'src/js/util/requests'),
      services:     path.resolve(__dirname, 'src/js/services'),
      stubs:        path.resolve(__dirname, 'src/js/stubs'),
      styles:       path.resolve(__dirname, 'src/styles'),
      types:        path.resolve(__dirname, 'src/js/util/types'),
      util:         path.resolve(__dirname, 'src/js/util'),
      validator:    path.resolve(__dirname, 'src/js/util/validator')
    },
    extensions: ['.js', '.jsx', '.scss', '.html']
  }
}