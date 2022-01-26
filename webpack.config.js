const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = {
  mode: "production",
  entry: './src/js/index.js',
  output: {
    strictModuleErrorHandling: true,
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          context: __dirname + "/src",
          from: "*.html",
        },
        {
          context: __dirname + "/src/assets",
          from: "**",
        }
      ],
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin(),
      new TerserPlugin({
          extractComments: true,
          terserOptions: {
            ecma: undefined,
            parse: {},
            compress: {},
            mangle: true,
            module: false,
            // Deprecated
            output: null,
            format: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: false,
            sourceMap: true,
          }
      }),
    ],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
  },
};