#!/bin/bash

POST_UPDATE="$1"
UPDATE_GUILD="$2"
UPDATE_CHANNEL="$3"

. /etc/profile
yarn

if [ $# -eq 0 ]; then
  pm2 startOrRestart /var/ecosystems/thimble-bot.json --env production
  exit 0
fi

if [ $POST_UPDATE=="--post-update" ]; then
  if [ -z $UPDATE_GUILD -o -z $UPDATE_CHANNEL ]; then
    exit 0
  else
    pm2 startOrRestart /var/ecosystems/thimble-bot.json --env production
    NODE_ENV=production node "${THIMBLE_ROOT}/bin/post-update" -g $UPDATE_GUILD -c $UPDATE_CHANNEL
  fi
fi
