#!/usr/bin/env bash

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR=$BASEDIR/..

set -a
source ${PROJECTDIR}/.env 2> /dev/null
source ${PROJECTDIR}/.env.dev
set +a

docker build -t "bvarga/bvarga.dev" $PROJECTDIR

docker stack deploy $DOCKER_STACK \
    -c ${PROJECTDIR}/docker-compose.yml