const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js');

const clientConfig = {
  entry: './src/client/index.js',
  mode: 'development',
  output: {
    filename: 'client.js',
    path: path.resolve(__dirname, '../dist/public')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          }
        ]
      }
    ]
  }
};

module.exports = merge(baseConfig, clientConfig);
