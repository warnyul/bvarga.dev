#!/usr/bin/env bash

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR=$BASEDIR/..
VERSION=$(cat "${PROJECTDIR}/VERSION")

set -a
source ${PROJECTDIR}/.env
set +a

docker build -t "warnyul/bvarga.dev" $PROJECTDIR

docker login -u ${DOCKER_USER} -p {DOCKER_PASSWORD}

docker tag "warnyul/bvarga.dev" "warnyul/bvarga.dev":""