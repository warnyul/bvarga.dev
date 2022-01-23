#!/usr/bin/env bash

# Install dependencies
npm ci
npm run build --if-present
npm run test --if-present