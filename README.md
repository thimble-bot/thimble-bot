<img src="assets/avatar.png" align="right" width="180px"> <h1>Thimble Bot</h1>

[![Thimble Bot](https://img.shields.io/badge/thimble-bot-blue.svg)](https://bot.thimble.cx)
[![Build Status](https://travis-ci.org/jozsefsallai/thimble-bot.svg?branch=master)](https://travis-ci.org/jozsefsallai/thimble-bot)
[![Dependency Status](https://david-dm.org/jozsefsallai/thimble-bot.svg)](https://david-dm.org/jozsefsallai/thimble-bot)

A fast and small general-purpose bot, mainly for my own uses. List of commands can be found [here](https://bot.thimble.cx/commands).

## Requirements

At the moment, the only requirements are Node.js (preferably 10.2.x or higher) and MySQL. Chrome headless is required for puppeteer (the screenshot command).

Before installing the bot, make sure you have a user created for it, which you will configure properly in the config file.

```sql
CREATE USER username@localhost IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON database_name.* TO username@localhost;
FLUSH PRIVILEGES;
```

## Installation

Clone the repository and install the dependencies using Yarn.

```sh
git clone git@github.com:jozsefsallai/thimble-bot
cd thimble-bot
npm i -g yarn
yarn
```

Then run the setup script:

```sh
yarn setup
```

Create and configure the database:

```sh
node bin/createDatabase
node bin/migrate
```

You might also want to specify the path to the bot in the `THIMBLE_ROOT` environmental variable inside `/etc/profile`.
```sh
export THIMBLE_ROOT="/path/to/thimble-bot"
```

To create a new command you can run the included generator script:

```sh
node bin/createCommand
```

## Before committing

Contribution is welcome, but before opening a PR, make sure that your changes pass linting.

```
yarn lint
```

## License

All rights reserved. (for now)

*If you want to use this bot on your Discord server, let me know first by contacting me via email or other mediums.*

*(avatar by [Ch-Chau](https://www.deviantart.com/ch-chau/))*
