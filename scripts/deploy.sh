#!/usr/bin/env bash

if [ -z ${FIREBASE_HOSTING_CHANNEL_ID+x} ]; then
    FIREBASE_HOSTING_CHANNEL_ID="development"
fi

./node_modules/firebase-tools/lib/bin/firebase.js hosting:channel:deploy "${FIREBASE_HOSTING_CHANNEL_ID}"