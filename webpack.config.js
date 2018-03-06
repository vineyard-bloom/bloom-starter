const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

const APP_DIR = path.join(__dirname, '/src/')
const BUILD_DIR = path.join(__dirname, '/dist/')
const config = require(path.join(__dirname, '/config/config.json'))

const baseConfig = {
  entry: {
    bundle: ['babel-polyfill', APP_DIR + 'index.js']
  },
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    path: BUILD_DIR,
    publicPath: '/'
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
        NODE_ENV: JSON.stringify(config.app.environment)
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new webpack.optimize.CommonsChunkPlugin('manifest'),
    new CopyWebpackPlugin([
      { from: 'public/index.html' }
    ]),
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ],

  resolve: {
    alias: {
      config:       path.resolve(__dirname, 'config'),
      components:   path.resolve(__dirname, 'src/js/components'),
      helpers:      path.resolve(__dirname, 'src/js/util/helpers'),
      icons:        path.resolve(__dirname, 'src/js/icons'),
      images:       path.resolve(__dirname, 'src/images'),
      js:           path.resolve(__dirname, 'src/js'),
      language:     path.resolve(__dirname, 'config/en.json'),
      layout:       path.resolve(__dirname, 'src/js/components/presentation/layout'),
      lib:          path.resolve(__dirname, 'lib'),
      pages:        path.resolve(__dirname, 'src/js/pages'),
      presentation: path.resolve(__dirname, 'src/js/components/presentation'),
      'redux-store':path.resolve(__dirname, 'src/js/redux-store'),
      requests:     path.resolve(__dirname, 'src/js/util/requests'),
      routes:       path.resolve(__dirname, 'src/js/routes'),
      services:     path.resolve(__dirname, 'src/js/services'),
      stubs:        path.resolve(__dirname, 'src/js/stubs'),
      styles:       path.resolve(__dirname, 'src/styles'),
      types:        path.resolve(__dirname, 'src/js/util/types'),
      util:         path.resolve(__dirname, 'src/js/util'),
      validator:    path.resolve(__dirname, 'src/js/util/validator')
    },
    extensions: ['.jsx', '.js', '.html', '.scss']
  }
}

if (config.app && config.app.environment && (config.app.environment === 'development')) {
  baseConfig.devtool = 'eval-source-map'
  baseConfig.devServer = {
    publicPath: '/',
    contentBase: './public',
    port: config.devServer.port || 8080,
    host: '0.0.0.0',
    open: false,
    historyApiFallback: true,
    disableHostCheck: true
  }
  baseConfig.plugins = [
    new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: 'butter',
            entry: 'https://cdnjs.buttercms.com/buttercms-1.1.0.min.js',
            global: 'Butter'
          }
        ]
      })
    ].concat(baseConfig.plugins)
} else if (config.app && config.app.environment && (config.app.environment === 'production')) {
  baseConfig.plugins = [
    new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: 'react',
            entry: 'https://cdnjs.cloudflare.com/ajax/libs/react/16.2.0/umd/react.production.min.js',
            global: 'React'
          },
          {
            module: 'react-dom',
            entry: 'https://cdnjs.cloudflare.com/ajax/libs/react-dom/16.2.0/cjs/react-dom.production.min.js',
            global: 'ReactDOM'
          },
          {
            module: 'moment',
            entry: 'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js',
            global: 'moment'
          },
          {
            module: 'butter',
            entry: 'https://cdnjs.buttercms.com/buttercms-1.1.0.min.js',
            global: 'Butter'
          }
        ]
      })
    ].concat(baseConfig.plugins).concat([
      new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ])
} else {
  console.log('%s\n\nNo Config Environment Set. Please edit config.json and restart.\n\n', 'color: red')
}

module.exports = baseConfig
