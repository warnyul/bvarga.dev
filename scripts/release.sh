#!/usr/bin/env bash

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR=$BASEDIR/..
VERSION=$(git describe --tags)
IMAGE_NAME="warnyul/bvarga.dev"

$BASEDIR/build.sh

docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}

docker tag $IMAGE_NAME "$IMAGE_NAME:$VERSION"

docker push $IMAGE_NAME

docker logout