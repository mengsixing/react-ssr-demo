const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const browserConfig = {
  entry: './src/browser/index.js',
  mode: 'development',
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, '../dist/public')
  }
};

module.exports = merge(baseConfig, browserConfig);
