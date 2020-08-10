var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.join(__dirname, 'public');
var APP_DIR = path.join(__dirname, 'src');

var VENDOR_LIBS = ['react', 'react-dom'];

module.exports = {
  entry: {
    bundle: APP_DIR + '/index.js',
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['*', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx'],
        },
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};
