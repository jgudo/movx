/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const workboxPlugin = require('workbox-webpack-plugin');

const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  plugins: [
    
    new workboxPlugin.GenerateSW({
      cacheId: 'boilerplate',
      swDest: 'sw.js',
      navigateFallback: '/index.html',
      clientsClaim: true,
      skipWaiting: true
    })
  ]
});
