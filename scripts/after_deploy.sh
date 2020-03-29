#!/usr/bin/env bash

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR=$BASEDIR/..
DOCKER_CONFIG_DIR=$PROJECTDIR/.docker

rm -rf $DOCKER_CONFIG_DIR 2> /dev/null
rm -rf $PROJECTDIR/.env 2> /dev/null