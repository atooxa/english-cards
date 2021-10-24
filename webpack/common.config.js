const path = require('path');
const webpack = require('webpack');

module.exports = {
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat',
      client: path.resolve(__dirname, '../app/client'),
      common: path.resolve(__dirname, '../app/common'),
      server: path.resolve(__dirname, '../app/server'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  devtool: 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  plugins: [
    new webpack.ProvidePlugin({
      Fragment: ['preact', 'Fragment'],
    }),
  ],
};
