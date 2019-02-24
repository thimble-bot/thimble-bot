# Thimble Bot - Commands

## Table of Contents

 * [Fun](#fun)<br>*cat, boop, dog, minesweeper, reverse, user*
 * [Maintenance](#maintenance)<br>*ssh*, *update*
 * [Moderation](#moderation)<br>*ban, kick, purge, purgefrom*
 * [Utilities](#utilities)<br>*activity, emoji, emojidelete, emojiupload, movies, ping, serverstatus, uptime, version*

## Fun

 * `cat` - Same as `dog`, but with cats.<br>*Aliases: `randomcat`*
 * `boop [null|user|username|nickname]` - Boop someone or yourself.<br>*Example: `boop @someone#1234`, `boop someone`, `boop`*
 * `dog` - Sends a random picture, GIF, or video of a dog.<br>*Aliases: `randomdog`*
 * `minesweeper [rows(4-20)] [columns(4-20)] [mines(1+)] [copiable?]` - Generates a minesweeper mine field using Discord spoiler tags. The `copiable` argument specifies whether the generated mine field should be copiable (in a code block) or playable; it defaults to 0, and any other number will turn the setting on.<br>Example: `minesweeper 5 10 12`, `minesweeper 5 10 12 1`
 * `reverse [text]` - Reverses a string.<br>Example: `reverse yrotS evaC`
 * `user @username#discrim?` - Prints out some information about a specified user. If no user is specified, the information will be about the author of the message.<br>*Aliases: `profile`, `userinfo`*<br>Example: `user @someone#1234`

## Maintenance
 * `ssh [command]` - Send single SSH commands to the server.
 * `update` - Update Thimble Bot from GitHub.

*Note: These commands can only be used by the bot's owner.*

## Moderation

 * `ban [@user#discrim] [reason?]` - Ban a user from the server. Reason is optional.<br>Example: `kick @someone#1234`, `kick @someone#1234 they were still bad`
 * `kick [@user#discrim] [reason?]` - Kick a user from the server. Reason is optional.<br>Example: `kick @someone#1234`, `kick @someone#1234 they were bad`
 * `purge [2-100]` - Clear up to `n` messages.<br>*Aliases: `clean`, `clear`*<br>Example: `purge 20`
 * `purgefrom [id]` - Delete all messages starting from a specific message ID.<br>*Aliases: `clearfrom`, `deletefrom`*<br>Example: `purgefrom 546619989147516948`

## Utilities

 * `activity [text/"reset"]` - Sets the bot's activity to whatever text you've specified. If the text is `reset`, it will reset to the one from the config file.<br>This command is only available for the bot owner.<br>Example: `activity dancing all night long`, `activity reset`
 * `emoji [emoji]` - Returns the original size of the emoji. Discord emojis (Twemoji) will be converted to a 512x512 PNG image.<br>*Aliases: `e`, `getemoji`, `emote`, `getemote`*<br>Example: `e :ok_hand:`
 * `emojidelete [emoji|emoji_name]` - Deletes an emoji from the server. You can either provide an actual emoji or just the name of the emoji. Requires the `MANAGE_EMOJIS` permissions both for the bot and the user sending the command.<br>*Aliases: `emojidel, emotedelete, emotedel`*<br>Example: `emojidelete :whatever_emoji:`, `emojidelete whatever_emoji`
 * `emojiupload [emoji_name] + attachment` - Uploads the attached image as an emoji to the server. Requires the `MANAGE_EMOJIS` permissions both for the bot and the user sending the command.<br>*Aliases: `emojiup`, `emoteupload`, `emoteup`, `addemoji`, `addemote`*
 * `movies` - Looks through a database of Hungarian and Romanian TV channels, and if there are movies that fulfill the criteria specified in the config file, it will report back.<br>This is also available as a worker, meaning that it will perform checks every day at a specified time.
 * `ping` - Get ping data from the bot.
 * `serverstatus` - Checks through a list of websites and reports back whether any of them is down.<br> This is also available as a worker, meaning that it will continuously perform checks at a given interval.<br>*Aliases: `ss`*
 * `uptime` - Check the uptime of the bot.
 * `version` - The version of the bot.

*Note: The `serverstatus/ss` and `movies` commands are disabled by default. In order to enable them, you need to create the necessary configuration files.*
