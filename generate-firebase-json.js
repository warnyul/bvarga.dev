const cheerio = require('cheerio');
const get = require('lodash/get');
const transformerFirebase = require('./transformer-firebase.js');
const { sources } = require('webpack');

/**
 * The default function for adding the CSP to the head of a document
 * Can be overwritten to allow the developer to process the CSP in their own way
 * @param {string} builtPolicy
 * @param {object} htmlPluginData
 * @param {object} $
 */
const defaultProcessFn = (builtPolicy, htmlPluginData, $) => {
    let metaTag = $('meta[http-equiv="Content-Security-Policy"]');
  
    // Add element if it doesn't exist.
    if (!metaTag.length) {
        metaTag = cheerio.load('<meta http-equiv="Content-Security-Policy">')(
            'meta'
        );
        metaTag.prependTo($('head'));
    }
  
    // build the policy into the context attr of the csp meta tag
    metaTag.attr('content', builtPolicy);
  
    // eslint-disable-next-line no-param-reassign
    htmlPluginData.html = get(htmlPluginData, 'plugin.options.xhtml', false)
        ? $.xml()
        : $.html();
};

var cspHeadersForSourceGlob = [];

const generateFirebaseJson = (
    builtPolicy,
    htmlPluginData,
    $,
    compilation,
) => {
    const sourceGlob = htmlPluginData.outputName
        .replace(/\.html/, '')
        .replace(/index/, '/')
        .replace(/404/, '**/*');
    cspHeadersForSourceGlob = [
        {
            source: sourceGlob,
            headers: [
                {
                    key: 'Content-Security-Policy',
                    value: builtPolicy,                    
                }  
            ],
        }
    ].concat(cspHeadersForSourceGlob);

    transformerFirebase(cspHeadersForSourceGlob);

    defaultProcessFn(builtPolicy, htmlPluginData, $, compilation);
};

module.exports = generateFirebaseJson;