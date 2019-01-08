# Thimble Bot

A fast and small general-purpose bot, mainly for my own uses.

## Requirements

Node (>=8.6.x).

## Installation

```sh
git clone git@github.com:jozsefsallai/thimble-bot
cd thimble-bot
npm i -g yarn
yarn
yarn setup
```

By default, the bot will disable the `.serverstatus` and `.movies` commands, assuming that most people will not need them. If you want to enable them, you need to configure them properly. Or let the app configure it for you during the initial setup:

```sh
node bin/setup -s   # for serverstatus
node bin/setup -m   # for movies
node bin/setup -sm  # for both
```

## Before committing

Make sure lint passes.

```
yarn lint
```

## License

All rights reserved.
