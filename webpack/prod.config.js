/* eslint-disable import/no-extraneous-dependencies */
const merge = require('webpack-merge');
const workboxPlugin = require('workbox-webpack-plugin');

const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new workboxPlugin.GenerateSW({
      cacheId: 'movx',
      swDest: 'sw.js',
      navigateFallback: '/index.html',
      clientsClaim: true,
      skipWaiting: true
    })
  ]
});
