<img src="assets/avatar.png" align="right" width="180px"> <h1>Thimble Bot</h1>

A fast and small general-purpose bot, mainly for my own uses. List of commands can be found [here](https://github.com/jozsefsallai/thimble-bot/blob/master/COMMANDS.md).

## Requirements

At the moment, the only requirements are Node.js (preferably 8.6.x or higher) and MySQL.

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

By default, the bot will disable the `serverstatus` and `movies` commands, assuming that most people will not need them. If you want to enable them, you need to configure them properly. Or let the app configure it for you during the initial setup:

```sh
node bin/setup -s   # for serverstatus
node bin/setup -m   # for movies
node bin/setup -sm  # for both
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
