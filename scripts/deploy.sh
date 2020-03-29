#!/usr/bin/env bash

# Variables
BASEDIR=$(dirname "$0")
PROJECTDIR=$BASEDIR/..

set -a
source ${PROJECTDIR}/.env
set +a

$BASEDIR/build.sh