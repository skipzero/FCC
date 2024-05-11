module.exports = {
  entry: './src/index.js',
  output: {
    path: `${__dirname}/dist`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          target: 'es2015'
        }
      },
      // { 
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   loader: 'esnext' 
      // },
    ],
  },
  resolve: {
    extensions: ['*', '.js'],
  },
  devServer: {
    contentBase: './dist',
  },
};
