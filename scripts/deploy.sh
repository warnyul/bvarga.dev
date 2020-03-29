#!/usr/bin/env bash

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR=$BASEDIR/..
DOCKER_CONFIG_DIR=$PROJECTDIR/.docker

set -a
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