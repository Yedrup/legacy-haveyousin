'use strict';

var path = require('path');
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  
  resolve: {
    alias: {
      materialize: path.join(__dirname, 'node_modules/materialize-css/dist/css/materialize.min.css'),
      fontAwesome: path.join(__dirname, 'node_modules/font-awesome/css/font-awesome.min.css')
    }
  },
  devServer: {
    compress: true,
    port: 9000
  },
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  node: {
    fs: 'empty'
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: './src/index.html',
      baseUrl: isProduction ? '/legacy-haveyousin/' : '/#'
    }),
    new CopyWebpackPlugin([{
      from: 'src/**/*.html',
      to: '.',
      ignore: 'index.html'
    }]),
    new CopyWebpackPlugin([{
      from: '.htaccess',
      to: '.'
    }]),
    new ExtractTextPlugin("styles.css")
  ],

  module: {
    rules: [{
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg|gif|svg|eot|woff|woff2|tff)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]'
          }
        }]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff",
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
    ]
  }
};