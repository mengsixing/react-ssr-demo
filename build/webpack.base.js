module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: ['url-loader']
      }
    ]
  }
};
