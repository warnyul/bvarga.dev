#!/usr/bin/env bash

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR=$BASEDIR/..
IMAGE_NAME="warnyul/bvarga.dev"
BUILDDIR=$PROJECTDIR/dist

# Clean
rm -rf $BUILDDIR
mkdir -p $BUILDDIR

# Install dependencies
npm ci

# Minify css
$PROJECTDIR/node_modules/css-minify/bin/css-minify.js css-minify -d  $PROJECTDIR/src/css
mv $PROJECTDIR/css-dist $BUILDDIR/css

$PROJECTDIR/node_modules/html-minifier/cli.js \
    --collapse-whitespace \
    --remove-comments \
    --remove-optional-tags \
    --remove-redundant-attributes \
    --remove-tag-whitespace \
    --use-short-doctype \
    --minify-css true \
    --minify-js true \
    --input-dir $PROJECTDIR/src/html \
    --output-dir $BUILDDIR

# Copy fonts to dist folder
cp -R $PROJECTDIR/src/assets/ $BUILDDIR

docker build -t "$IMAGE_NAME" $PROJECTDIR