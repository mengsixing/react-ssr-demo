const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const clientConfig = {
  entry: './src/client/index.js',
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, '../dist/public')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true
            }
          },
          {
            loader: 'less-loader' // compiles Less to CSS
          }
        ]
      }
    ]
  }
};

module.exports = merge(baseConfig, clientConfig);
