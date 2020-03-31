#!/usr/bin/env bash

# Fail fast
set -e

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR=$BASEDIR/..
DOCKER_CONFIG_DIR=$PROJECTDIR/.docker
IMAGE_NAME="warnyul/bvarga.dev"
VERSION=$(git describe --tags)

set -a
IMAGE="$IMAGE_NAME:$VERSION"
source ${PROJECTDIR}/.env
set +a

docker \
  --tlsverify \
  -H=$HOST:2376 \
  --tlscacert=$DOCKER_CONFIG_DIR/ca.pem \
  --tlscert=$DOCKER_CONFIG_DIR/cert.pem \
  --tlskey=$DOCKER_CONFIG_DIR/key.pem \
  stack deploy $DOCKER_STACK \
  -c $PROJECTDIR/docker-compose.yml