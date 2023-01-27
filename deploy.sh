#!/usr/bin/env bash

yarn clean
yarn build
yarn pack --filename package.tgz
tar -xvf package.tgz
rimraf package.tgz
push-dir --dir=package --branch=lib --cleanup --verbose