# Thimble Bot - Commands

## Moderation

| Command                                               | Description                                      | Example                                             |
|-------------------------------------------------------|--------------------------------------------------|-----------------------------------------------------|
| `purge [2-100]`<br>`clean [2-100]`<br>`clear [2-100]` | Mass removal of messages.                        | `purge 20`                                          |
| `kick [user] [reason?]`                               | Kick a user from the server. Reason is optional. | `kick @hello#1234`<br>`kick @hello#1234 he was bad` |
| `ban [user] [reason?]`                                | Ban a user from the server. Reason is optional.  | `ban @hello#1234`<br>`ban @hello#1234 he was bad`   |

## Fun

| Command                                                            | Description                                                                                                                           | Example                      |
|--------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------|------------------------------|
| `reverse [text]`                                                   | Reverses a string.                                                                                                                    | `reverse yrotS evaC`         |
| `dog`<br>`randomdog`                                               | Sends a random picture, GIF, or video of a dog.                                                                                       |                              |
| `cat`<br>`randomcat`                                               | Same as `dog`, but with cats.                                                                                                         |                              |
| `user [@username#discrim?]`<br>`profile [...]`<br>`userinfo [...]` | Prints out some information about a specified user. If no user is specified, the information will be about the sender of the message. | `user @hello#1234`<br>`user` |

## Utilities

| Command                   | Description                                                                                                                                                                                                                                                                     | Example                                            |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------|
| `ss`<br>`serverstatus`    | Checks through a list of websites and reports back whether any of them is down.<br> This is also available as a worker, meaning that it will continuously perform checks at a given interval.                                                                                   |                                                    |
| `movies`                  | Looks through a database of Hungarian and Romanian TV channels, and if there are movies that fulfill the criteria specified in the config file, it will report back.<br> This is also available as a worker, meaning that it will perform checks every day at a specified time. |                                                    |
| `activity [text/"reset"]` | Sets the bot's activity to whatever text you've specified. If the text is "reset", it will reset to the one from the config file.<br> This command is only available for the bot owner.                                                                                         | `activity dancing all night long` `activity reset` |

*Note: The `serverstatus/ss` and `movies` commands are disabled by default. In order to enable them, you need to create the necessary configuration files.*
