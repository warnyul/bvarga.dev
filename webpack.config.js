const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
//const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {htmlWebpackPluginTemplateCustomizer} = require('template-ejs-loader');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const MangleCssClassPlugin = require('mangle-css-class-webpack-plugin');

const glob = require('glob');
const path = require('path');
const context = path.join(__dirname, 'src');
const outputDir = path.join(__dirname, 'dist');

module.exports = {
  mode: "production",
    entry: {
        index: './src/js/app.js',
    },
    output: {
        path: outputDir,
        filename: '[name].[contenthash:8].js',
        sourceMapFilename: '[name].[contenthash:8].js.map',
        chunkFilename: '[id].[contenthash:8].js',
        clean: true,
    },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
        type: 'asset/resource',
      },
      {
        test: /\.ejs/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'template-ejs-loader',
          },
        ],
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: "postcss-loader",
            options: {
                sourceMap: true,
                postcssOptions: {
                  config: path.resolve(__dirname, "postcss.config.js"),
                },
            },
          },
          {
            loader: "sass-loader",
            options: {
                sourceMap: true,
                implementation: require("sass"),
            }
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          context: __dirname + "/src/asset/raw",
          from: "**",
        }
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css',
    }),
    // Remove Unused CSS
    new PurgeCSSPlugin({
      paths: () => glob.sync(`${context}/**/*`, { nodir: true }),
      safelist: ['fa-linkedin', 'fa-bluesky', 'fa-github', 'fa-arrow-up-right-from-square'],
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      template: htmlWebpackPluginTemplateCustomizer({
        templatePath: 'src/views/index.ejs',
        templateEjsLoaderOption: {
          data: {
            links: [
              {
                name: 'LinkedIn',
                url: 'https://www.linkedin.com/in/-balazs-varga-/'
              },
              {
                name: 'Bluesky',
                url: 'https://bsky.app/profile/balzsvarga.bsky.social'
              },
              {
                name: 'GitHub',
                url: 'https://github.com/warnyul'
              },
              {
                name: 'The Apter Blog',
                url: 'https://blog.apter.tech/'
              },
            ],
            socialLinks: [
              {
                icon: 'linkedin',
                name: 'LinkedIn',
                url: 'https://www.linkedin.com/in/-balazs-varga-/'
              },
              {
                icon: 'bluesky',
                name: 'Bluesky',
                url: 'https://bsky.app/profile/balzsvarga.bsky.social'
              },
              {
                icon: 'github',
                name: 'GitHub',
                url: 'https://github.com/warnyul'
              },
            ],
          },
        }
      }),
      filename: 'index.html',
      inject: true,
      hash: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true,
      }
    }),
    new MangleCssClassPlugin({
      classNameRegExp: '(fa|clazz)-([a-zA-Z0-9-]+)',
      mangleCssVariables: true,
      log: true,
    }),
    new HTMLInlineCSSWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: [
          {
              preset: 'advanced'
          },
        ],
        minify: [
          CssMinimizerPlugin.cssnanoMinify,
        ]
      }),
      new HtmlMinimizerPlugin(),
      new TerserPlugin({
          extractComments: true,
          terserOptions: {
            mangle: true,
            sourceMap: true
          }
      }),
    ],
  },
  devServer: {
    static: {
      directory: outputDir,
    },
    compress: true,
    port: 9000,
  },
};