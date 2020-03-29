#!/usr/bin/env bash

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR=$BASEDIR/..

docker build -t "warnyul/bvarga.dev" $PROJECTDIR