const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack'); 
const path = require('path');

const paths = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build')
}

const pathsToCopy = [
  {
    context: path.join(paths.src),
    from: path.join(paths.src, 'css/*'),
    to: paths.build
  },
  {
    context: path.join(paths.src),
    from: path.join(paths.src, 'images/*'),
    to: paths.build
  }
]

const uglifyConfig = {
  sourceMap: true,
  mangle: false,
  minimize: true
}

module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true
  },
  output: {
    path: paths.build,
    filename: 'bundle.[chunkhash].js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(ts)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useCache: false,
          }
        }
      },
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(uglifyConfig),
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new ExtractTextPlugin('styles.[contenthash].css'),
    new CleanWebpackPlugin([paths.build]),
    new CopyWebpackPlugin(pathsToCopy),
    new OptimizeCssAssetsPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)@angular/,
      './src',
      {}
    )
  ]
};