#!/usr/bin/env bash

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR=$BASEDIR/..
IMAGE_NAME="warnyul/bvarga.dev"

docker build -t "$IMAGE_NAME" $PROJECTDIR