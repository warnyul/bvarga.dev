const cheerio = require('cheerio');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const flatten = require('lodash/flatten');
const get = require('lodash/get');

/**
 * InlineScriptCspHtmlWebpackPlugin
 * An extension of CspHtmlWebpackPlugin to handle Content Security Policies (CSPs).
 * This class only modifies a single property (`_useHtmlParser2`) in the Cheerio configuration 
 * to customize how HTML is parsed.
 */
class InlineScriptCspHtmlWebpackPlugin extends CspHtmlWebpackPlugin {
  /**
   * Constructor
   * Calls the base class constructor to set up the plugin with user-defined or default policies and options.
   * @param {object} policy - CSP policy object, typically defining 'script-src' and 'style-src'.
   * @param {object} additionalOpts - Additional options for nonce/hash generation and processing.
   */
  constructor(policy = {}, additionalOpts = {}) {
    super(policy, additionalOpts);
  }

  /**
   * Processes HtmlWebpackPlugin's HTML output to inject the Content Security Policy.
   * The key difference from the base class is setting `_useHtmlParser2: false` in the Cheerio configuration.
   * @param {object} compilation - Webpack's compilation object.
   * @param {object} htmlPluginData - Data object from HtmlWebpackPlugin containing the generated HTML.
   * @param {function} compileCb - Callback to continue Webpack's compilation process.
   */
  processCsp(compilation, htmlPluginData, compileCb) {
    const $ = cheerio.load(htmlPluginData.html, {
      decodeEntities: false,
      _useHtmlParser2: false, // *** Changed from 'true' in the base class to 'false' ***
      xmlMode: get(htmlPluginData, 'plugin.options.xhtml', false),
    });

    // if not enabled, remove the empty tag
    if (!this.isEnabled(htmlPluginData)) {
      return compileCb(null, htmlPluginData);
    }

    // get all nonces for script and style tags
    const scriptNonce = this.setNonce($, 'script-src', 'script[src]');
    const styleNonce = this.setNonce($, 'style-src', 'link[rel="stylesheet"]');

    // get all shas for script and style tags
    const scriptShas = this.getShas($, 'script-src', 'script:not([src])');
    const styleShas = this.getShas($, 'style-src', 'style:not([href])');

    const builtPolicy = this.buildPolicy({
      ...this.policy,
      'script-src': flatten([this.policy['script-src']]).concat(
        scriptShas,
        scriptNonce
      ),
      'style-src': flatten([this.policy['style-src']]).concat(
        styleShas,
        styleNonce
      ),
    });

    this.processFn(builtPolicy, htmlPluginData, $, compilation);

    return compileCb(null, htmlPluginData);
  }
}

module.exports = InlineScriptCspHtmlWebpackPlugin;