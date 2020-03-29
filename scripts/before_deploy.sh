#!/usr/bin/env bash

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR="$BASEDIR/.."
DOCKER_CONFIG_DIR=$PROJECTDIR/.docker

mkdir -p $DOCKER_CONFIG_DIR

echo $DOCKER_CA | base64 --decode > $DOCKER_CONFIG_DIR/ca.pem
echo $DOCKER_CERT | base64 --decode > $DOCKER_CONFIG_DIR/cert.pem
echo $DOCKER_KEY | base64 --decode > $DOCKER_CONFIG_DIR/key.pem
echo $ENVIRONMENT | base64 --decode > $PROJECTDIR/.env