#!/usr/bin/env bash

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR=$BASEDIR/..
VERSION=latest

set -a
source ${PROJECTDIR}/.env 2> /dev/null
source ${PROJECTDIR}/.env.dev
set +a

$BASEDIR/build.sh

docker stack deploy $DOCKER_STACK \
    -c ${PROJECTDIR}/docker-compose.yml