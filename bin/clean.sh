#!/bin/bash

# echo "$VERSION"

watchman watch-del-all
rm -rf node_modules/
rm -rf /tmp/metro-bundler-cache-*
rm -rf /tmp/metro-*
npm install --cache /tmp/empty-cache
react-native start --reset-cache