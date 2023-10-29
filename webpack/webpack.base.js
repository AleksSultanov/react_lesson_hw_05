const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const stylesExportType = isProduction
  ? MiniCssExtractPlugin.loader
  : 'style-loader';

module.exports = {
  mode: process.env.NODE_ENV,

  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
    clean: true,
    assetModuleFilename: 'assets/[name][ext]',
  },
  devServer: {
    static: path.resolve(__dirname, '../dist'),
    watchFiles: [path.resolve(__dirname, '../src', 'index.html'),
    path.resolve(__dirname, '../src/styles', 'index.scss'),
  ],
    hot: true,
    client: {
      overlay: false,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../src', 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css',
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, '../src', 'assets'),
    //       to: 'assets',
    //     },
    //   ],
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.(sass|scss|css)$/,
        use: [stylesExportType, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      // {
      //   test: /\.svg$/i,
      //   type: 'asset/resource',
      // },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      modules: path.resolve(__dirname, '../src/modules'),
    },
    extensions: ['.js', '.css'],
  },
};