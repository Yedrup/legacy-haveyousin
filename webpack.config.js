const path = require('path');
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  devServer: {
    compress: true,
    port: 9000
  },
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: './src/index.html'
    }),
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
        test: /\.(eot|woff|woff2|tff)$/,
        use: [{
          loader: 'file-loader',
          options: {}
        }]
      }
    ]
  }
};