<img src="assets/avatar.png" align="right" width="180px"> <h1>Thimble Bot</h1>

A fast, small, and highly extensible general-purpose bot built using
[discord-akairo](https://github.com/discord-akairo/discord-akairo) and
TypeScript. Currently WIP.

## Requirements

- Node.js (v12 or higher)
- ffmpeg
- a Firebase project
- Chrome headless for puppeteer (screenshot command)

## Installation

**1. Clone the repository and install the dependencies.**

```sh
git clone git@github.com:thimble-bot/thimble-bot.git
cd thimble-bot
npm i
```

**2. Copy the example configuration and edit the configuration files:**

```
cp -r config/example config/development
nvim config/development/bot.json
nvim config/development/firebase.json
```

**3. Start the bot in development mode:**

```
npm run dev
```

## Before committing

Contribution is welcome, but before opening a PR, make sure that your changes pass linting.

```
npm run lint
```

## License

MIT. Thimble (character and design) is the property of József Sallai. You may NOT use the character or its name without the owner's written approval. Discord is the property of Discord, Inc.

*(avatar by [Ch-Chau](https://www.deviantart.com/ch-chau/))*
