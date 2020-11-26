#!/usr/bin/env bash

version="$(node -p "require('./package.json').version")"
commit="$(git rev-parse HEAD)"
timestamp="$(node -p "(new Date()).getTime()")"

cat >src/environments/version.ts <<__EOF__
// THIS FILE IS AUTO GENERATED, DO NOT CHANGE IT
// USE "npm version <major | minor | patch>" INSTEAD
export const VERSION = {
  version: "${version}",
  commit: "${commit}",
  timestamp: "${timestamp}",
};
__EOF__
