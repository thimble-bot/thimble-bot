# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.4.0 - 2019-07-18
### Added
- Hug command (alias of Boop/interact)
- Highfive command (alias of Boop/interact)
- FLAME command
- Todo command and database migrations
- RNG-based "when" command

### Fixed
- Missing condition on the poll command

### Changed
- Reworked boop database structure
- Turned boop command into "interaction", allowing multiple interactions to be added
- Bumped lodash to v4.17.14
- Added command metadata for easier command details fetching

## 0.3.5 - 2019-06-14
### Added
- Custom workers
- Parameters for the color command
- Website uptime command
- Poll command

### Fixed
- Attachment permission issues
- Bad condition check in custom command library

### Changed
- Custom commands refactoring
- Bumped axios
- Bumped js-yaml

### Deleted
- ServerStatus command
- Movies command

## 0.3.4 - 2019-05-02
### Added
- Anagram command
- Ship command
- Random color command
- **Custom command support** (experimental)

### Changed
- Bee Movie command: small refactoring
- Changed group of `userinfo` command from Fun to Utilities
- Added badges to readme

## 0.3.3b - 2019-04-21
### Added
- Custom help command
- Website: https://thimblebot.xyz

### Fixed
- Small filtering issue in the randompony command

## 0.3.3 - 2019-04-20
### Added
- Boop command group
- Avatar to README
- Throttling for the `boop` and `toggleboop` commands
- randompony command
- 8ball command
- Dogeify command
- ASCII command
- LMGTFY command
- Hyphen/xkcd37 command
- Guilds model (storing guild-specific settings in a database)
- StalinSort command
- Command list generator script

### Changed
- Refactored boop command
- Better version output
- README update
- Updated travis requirement settings

## 0.3.2 - 2019-04-11
### Added
- Boop leaderboard and command
- Remote echo command
- Toggle boops command
- Image upscale commands (imageresize and upscale)
- Bee movie command
- Server info command

### Changed
- Updated sequelize to 5.3.0

## 0.3.1 - 2019-03-21
### Added
- Remote echo command

### Fixed
- Ordinal in boop command for 11 and 12

## 0.3.0 - 2019-03-11
### Added
- Database
- Database creator script
- Migration creator script
- Migration script
- Boopcount command
- Default Commando commands

### Changed
- Made commands that require a user as an argument a little tidier
- Renamed "utils" group to "util"
- Updated command descriptions and examples
- Better security for owner-only commands
- Made boop and boopcount commands guild-only
- Readme now contains database-specific configuration steps
- Updated `post-deploy.sh` to run the migrations after deployment

### Deleted
- Deprecated `ping` command (using commando's built-in one now)

## 0.2.1 - 2019-03-10
### Added
- Avatar command
- Random rabbit command
- Command creator

## 0.2.0 - 2019-03-02
### Added
- Random bird command
- Changelog file

### Changed
- Image source for the random cat command
- Allow usage of ServerStatus and MovieTracker commands in a DM

### Fixed
- Fix restriction of certain commands to guild channels only. Affected comands: user,
ban, kick, purge, purgefrom, emoji, emojidelete, emojiupload

## 0.1.9 - 2019-02-24
### Added
- Boop command

## 0.1.8 - 2019-02-24
### Added
- `purgefrom` command

## 0.1.7 - 2019-02-24
### Added
- SSH command

### Changed
- Changed to better update strategy

## 0.1.6 - 2019-02-24
### Added
- Update script and command

## 0.1.5 - 2019-02-06
### Changed
- Use the [`discord.js-minesweeper` library](https://npmjs.com/discord.js-minesweeper)

## 0.1.4 - 2019-02-05
### Added
- `copiable` argument to the Minesweeper command

## 0.1.3 - 2019-02-05
### Added
- Minesweeper command

### Changed
- Include numbers and underscores in emoji names

## 0.1.2 - 2019-02-03
### Added
- Emoji command
- Add emoji command
- Delete emoji command

## 0.1.1 - 2019-01-16
### Added
- Command logging
- Reverse text command
- User info command
- Random dog and cat commands
- Kick and ban commands
- Ping, uptime, and version commands
- Sentry integration

### Changed
- Aliases to the `purge` command: clean, clear
- Made serverstatus and movies commands optional

### Fixed
- ServerStatus: Fix notification appearing when it's not supposed to
- Fix MovieTracker duplicate issues
- Fix ServerStatus worker issues

## 0.1.0 - 2019-01-04
First public version.

### Added
- Setup script
- Purge command
- Activity command
- MovieTracker command and worker
- ServerStatus command and worker
