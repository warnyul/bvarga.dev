#!/usr/bin/env bash

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR=$BASEDIR/..

set -a
VERSION="latest"
source ${PROJECTDIR}/.env 2> /dev/null
source ${PROJECTDIR}/.env.dev
set +a

$BASEDIR/build.sh

docker stack deploy $DOCKER_STACK \
    -c ${PROJECTDIR}/docker-compose.yml