# Thimble Bot Customization

Thimble Bot is a very extensible and customizable Discord bot. It's especially useful when you want to self-host an instance of Thimble Bot, but at the same time you also want to add extra functionality to it without affecting the original code. This way you can enjoy all the new features of the base bot while also having the advantages of using your custom functions. At the moment, Thimble Bot can offer **custom commands** and **custom event workers**.

## Prerequisites

**WARNING:** Before you proceed any further, please make sure that you:

  - Know how a Discord bot works
  - Know how to code a Discord bot
  - Know how to write JavaScript/Node.js code
  - Have a general understanding on [discord.js](https://discord.js.org/#/docs/) and [discord.js-commando](https://discord.js.org/#/docs/commando)
  - Have a server to host your custom Thimble Bot instance on

## Everything Custom

There is a designated folder called `custom` which holds everything that has anything to do with custom hackery. It should have the following structure:

```sh
.
├── commands/
│   └── [group]/
│       ├── [command].js
└── workers/
    ├── _guildCreate/
    ├── _guildDelete/
    ├── _message/
    │   └── [WorkerName].js
    ├── _ready/
    │   ├── [WorkerName].js
    │   └── [OtherWorker].js
    └── setup.js
```

Obviously, the directory can contain other items as well, but these are the most important.

## Custom Commands

Custom commands can be created using the setup utility. Just run the following command, and specify `custom` as the group name:

```sh
node bin/createCommand
```

Custom commands can be either available globally on the current Thimble Bot instance or limited to specific guilds. The `CustomCommand` class extends Commando's `Command` class, so every property and method that's available there will also be available here.

### Properties

**`isGlobalCommand`** `(boolean)`

If set to `true`, the custom command will be available on the global Thimble Bot instance, including DMs and group chats.

---

**`guilds`** `(string[])`

A list of guild IDs where the command should be allowed to run. When specifying this property, `isGlobalCommand` should be set to `false`.

---

### Methods

**`runCommand(message, args)`**

This is where you'll specify what the custom command should do. It works just like Commando's `Command#run` method.

## Custom Workers

Thimble Bot allows you to run your custom functions at any client event using **workers**. These can be defined in `custom/workers`. The structure of this directory consists of folders that correspond to each built-in event (the directories that start with an underscore). The application will load each JavaScript file from each folder accordingly. For example, if you have a worker called `Hello.js` that you want to run every time the bot is added to a server, you should put the worker in the `_guildCreate` folder.

Every other folder and file can be used for other events (that are not defined in the bot's starter script).

### Sample Workers

#### `_ready`

```js
const Worker = client => {
  // do something when the client is ready
};

module.exports = Worker; // this is important
```

#### `_message`

```js
const Worker = (client, message) => {
  // do something with message
};

module.exports = Worker; // this is important
```

#### `_guildCreate` and `_guildDelete`

```js
const Worker = (client, guild) => {
  // do something with guild
};

module.exports = Worker; // this is important
```

### Additional Event Handlers

The `custom/setup.js` file allows you to define your own additional event handlers, as long as they haven't been defined already in the bot's main entry point (`index.js`). Please read [this guide](https://anidiots.guide/understanding/events-and-handlers) for reference on how to define bot events.
