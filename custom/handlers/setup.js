// Here you can define custom event handlers.
// Please only define event handlers for events that are not already defined in
// the base bot (src/lib/registerEvents.ts).
//
// This file should *always* exist and it should export a default function that
// takes an IThimbleBot as its only parameter. Then you can use client.on() to
// define your own event handlers. You will also gain direct access to the
// Discord.js client instance, as well as other public APIs exposed by Thimble
// bot.
//
// See: https://anidiots.guide/understanding/events-and-handlers for more info
// on how to work with events.

module.exports = function (client) {
  // for example:

  // client.on('guildMemberAdd', e => {
  //   console.log(e);
  //   // or:
  //   require('./something/submodule.js')(client, e);
  //   // depending on your setup
  // });
};
