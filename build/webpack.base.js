module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: ['url-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
};
