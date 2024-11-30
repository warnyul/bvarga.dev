const HtmlWebpackPlugin = require('html-webpack-plugin');

class HtmlNewLineRemoverPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap('HtmlNewLineRemoverPlugin', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
        'HtmlNewLineRemoverPlugin',
        (data, cb) => {
          data.html = data.html.replace(/(\r)?\n|\r/g, '');
          cb(null, data);
        }
      );
    });
  }
}

module.exports = HtmlNewLineRemoverPlugin;