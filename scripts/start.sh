#!/usr/bin/env bash

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR=$BASEDIR/..
IMAGE_NAME="warnyul/bvarga.dev"

set -a
IMAGE=localhost:5000/bvarga.dev
source ${PROJECTDIR}/.env 2> /dev/null
source ${PROJECTDIR}/.env.dev
set +a

# TODO find a better way to check registry is runnig
docker run -d -p 5000:5000 --restart=always --name registry registry 2> /dev/null

$BASEDIR/build.sh

docker tag $IMAGE_NAME $IMAGE
docker push $IMAGE

docker stack deploy $DOCKER_STACK \
    -c ${PROJECTDIR}/docker-compose.yml