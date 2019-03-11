. /etc/profile
yarn
NODE_ENV=production node bin/migrate
pm2 startOrRestart /var/ecosystems/thimble-bot.json --env production
