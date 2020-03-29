#!/usr/bin/env bash

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR=$BASEDIR/..
IMAGE_NAME="warnyul/bvarga.dev"
VERSION=$(date +%s)

docker build -t "$IMAGE_NAME:$VERSION" $PROJECTDIR