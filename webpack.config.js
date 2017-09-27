/**
 * Created by fed on 2017/9/27.
 */
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extract1 = new ExtractTextPlugin('a.css');
const extract2 = new ExtractTextPlugin('b.css');

module.exports = {
  entry: './src/entry',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: path.join(__dirname, 'loader') + `?theme[]=${path.join(__dirname, 'src', 'a.theme.scss')}&theme[]=${path.join(path.join(__dirname, 'src', 'b.theme.scss'))}`,
      },
      {
        test: /\.scss-1$/,
        use: extract1.extract(['css-loader', 'sass-loader']),
      },
      {
        test: /\.scss-0$/,
        use: extract2.extract(['css-loader', 'sass-loader']),
      },
    ]
  },
  plugins: [
    extract1,
     extract2,
  ]
};
