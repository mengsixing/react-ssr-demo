const path = require('path');
const merge = require('webpack-merge');
// 避免把node_modules中的包输出
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.base.js');

const serverConfig = {
  mode: process.env.NODE_ENV,
  entry: path.resolve('./src/server/index.js'),
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: true,
            },
          },
          {
            loader: 'less-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/server/server.cert', to: './' },
      { from: './src/server/server.key', to: './' },
    ]),
  ],
  watch: process.env.NODE_ENV === 'development',
};

module.exports = merge(baseConfig, serverConfig);
