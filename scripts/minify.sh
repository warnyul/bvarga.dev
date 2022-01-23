#!/usr/bin/env bash

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR=$BASEDIR/..
BUILDDIR=$PROJECTDIR/dist

# Clean
rm -rf $BUILDDIR
mkdir -p $BUILDDIR

$PROJECTDIR/node_modules/html-minifier/cli.js \
    --collapse-whitespace \
    --remove-comments \
    --remove-optional-tags \
    --remove-redundant-attributes \
    --remove-script-type-attributes \
    --remove-tag-whitespace \
    --use-short-doctype \
    --minify-css true \
    --minify-js true \
    --minify-urls true \
    --sort-attributes \
    --sort-class-name \
    --use-short-doctype \
    --input-dir $PROJECTDIR/src/html \
    --output-dir $BUILDDIR

# Copy fonts to dist folder
cp -a $PROJECTDIR/src/assets/. $BUILDDIR