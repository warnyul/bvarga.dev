#!/usr/bin/env bash

set -e

git fetch
git checkout master
git pull
git checkout deploy/prod
git pull
git merge master --ff
git push
git checkout master