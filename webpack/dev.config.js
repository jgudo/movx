/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.TMDB_KEY': JSON.stringify(process.env.TMDB_KEY)
    })
  ],  
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, '../public'),
    publicPath: '/',
    historyApiFallback: true
  }
});
