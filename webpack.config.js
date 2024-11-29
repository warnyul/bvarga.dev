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
const HtmlInlineScriptWebpackPlugin = require('html-inline-script-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const SitemapWebpackPlugin = require('sitemap-webpack-plugin').default;
const HtmlNewLineRemoverPlugin = require('./html-new-line-remover-plugin.js');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');

const { interpolateName } = require('loader-utils');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const context = path.join(__dirname, 'src');
const outputDir = path.join(__dirname, 'dist');
const baseUrl = 'https://bvarga.dev';

const links = function() {
  const links = fs.readFileSync(`${context}/data/links.json`);
  return JSON.parse(links);
}();

module.exports = {
    mode: "production",
    entry: {
        index: './src/js/index.js',
        pageNotFound: './src/js/404.js',
    },
    output: {
        path: outputDir,
        publicPath: '',
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
        use: ['html-loader', 'template-ejs-loader'],
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
          context: __dirname + "/src/assets/raw",
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
      scriptLoading: 'blocking',
      chunks: ['index'],
      template: htmlWebpackPluginTemplateCustomizer({
        templatePath: 'src/views/index.ejs',
        templateEjsLoaderOption: {
          data: {
            baseUrl: baseUrl,
            profilePictureUrlPath: function() {
              const pngPath = path.resolve(__dirname, 'src/assets/images/profile.png');
              const pngContent = fs.readFileSync(pngPath);
              return interpolateName(
                { resourcePath: pngPath },
                "[md4:contenthash:hex:20].[ext]",
                {
                  context: context,
                  content: pngContent,
                }
              );
            }(),
            ...links,
          },
        }
      }),
      filename: 'index.html',
      inject: 'body',
      hash: false,
      minify: {
        collapseWhitespace: true,
        removeComments: false,
        minifyCSS: true,
        minifyJS: true,
      }
    }),
    new HtmlWebpackPlugin({
      alwaysWriteToDisk: true,
      scriptLoading: 'blocking',
      chunks: ['pageNotFound'],
      template: htmlWebpackPluginTemplateCustomizer({
        templatePath: 'src/views/404.ejs',
        templateEjsLoaderOption: {
          data: {
          },
        }
      }),
      filename: '404.html',
      inject: 'body',
      hash: false,
      minify: {
        collapseWhitespace: true,
        removeComments: false,
        minifyCSS: true,
        minifyJS: true,
      }
    }),
    new MangleCssClassPlugin({
      classNameRegExp: '(fa|clazz)-([a-zA-Z0-9-]+)',
      reserveClassName: ['fa', 'fab'],
      mangleCssVariables: true,
      log: true,
    }),
    new HTMLInlineCSSWebpackPlugin(),
    new HtmlInlineScriptWebpackPlugin({
      scriptMatchPattern: [/.*\.js?$/], // Match hashed JS files
    }),
    new SitemapWebpackPlugin({
      base: baseUrl,
      paths: [
        {
          path: '/', 
        }
      ],
      options: {
        lastmod: true,
      }
    }),
    new HtmlNewLineRemoverPlugin(),
    new CspHtmlWebpackPlugin(
      {
        'default-src': "'self'",
        'script-src': ["'self'", "https://googletagmanager.com"],
        'style-src': ["'self'"],
        'img-src': ["'self'"],
        'font-src': ["'self'"],
        'connect-src': ["'self'", "https://google-analytics.com", "https://firebase.googleapis.com", "https://firebaseinstallations.googleapis.com"],
      },
      {
        hashingMethod: 'sha256',
        enabled: true,
      }
    ),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
           preset: [
            'advanced',
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        },
        minify: [
          CssMinimizerPlugin.cssnanoMinify,
        ]
      }),
      new HtmlMinimizerPlugin(),
      new TerserPlugin({
          extractComments: true,
          terserOptions: {
            compress: {
              arguments: true,
              passes: 3,
            },
            mangle: true,
            toplevel: true,
            sourceMap: true,
            nameCache: {},
          }
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              "imagemin-gifsicle",
              "imagemin-mozjpeg",
              "imagemin-pngquant",
              "imagemin-svgo",
            ],
          },
        },
        generator: [
          {
            // You can apply generator using `?as=webp`, you can use any name and provide more options
            preset: "webp",
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ["imagemin-webp"],
            },
          },
        ],
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
  ignoreWarnings: [
    {
      module: /.*node_modules.*/
    }
  ],
};