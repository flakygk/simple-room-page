const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const path                 = require('path');


const htmlLoaderOptions = {
  sources: {
    list: [
      {
        tag: 'img',
        attribute: 'src',
        type: 'src',
      },
      {
        tag: 'link',
        attribute: 'href',
        type: 'src',
      },
    ],
  },
};

let mode   = 'development';
let target = 'web';

if (process.env.NODE_ENV === 'production') {
  mode   = 'production';
  target = 'browserslist';
}


module.exports = {

  mode: mode,
  // ? For ".browserslistrc" bug, check out the documentation
  target: target,

  entry: {
    index: path.resolve(__dirname, 'src', 'index.js'),
  },

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      filename: path.resolve(__dirname, 'dist', 'index.html'),
    }),
    new MiniCssExtractPlugin(),
  ],

  // ? Nice one as well
  devtool: 'source-map',
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 8080,
    // ? Hot reloading is really nice. Also be sure to check the docs
    hot: true,
  },

  module: {
    rules: [

      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          // ? This loader below extracts CSS into a single CSS file
          // ! You actually may use "style-loader", just put it instead of "MiniCs..."
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },

      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: htmlLoaderOptions,
      },

      {
        test: /\.(png|svg|jpe?g|gif)$/i,
        type: 'asset/resource',
      },

      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },

    ],
  },
};
