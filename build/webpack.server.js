const path = require('path');
const merge = require('webpack-merge');
// 避免把node_modules中的包输出
const nodeExternals = require('webpack-node-externals');
const baseConfig = require('./webpack.base.js');

const serverConfig = {
  entry: path.resolve('./src/server/index.js'),
  mode: 'development',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, '../dist')
  }
};

module.exports = merge(baseConfig, serverConfig);
