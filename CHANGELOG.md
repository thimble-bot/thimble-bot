# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
