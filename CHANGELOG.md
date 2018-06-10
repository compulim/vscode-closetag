# Change Log
All notable changes to the "vscode-closetag" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## Unreleased
### Fixed
- ([#11](https://github.com/compulim/vscode-closetag/issues/11)) Fix in-place should not move cursor, by [`@rbolsius`](https://github.com/rbolsius) in [PR #12](https://github.com/compulim/vscode-closetag/pull/12)

## [1.1.1](https://github.com/compulim/vscode-closetag/releases/tag/v1.1.1) - 2018-06-09
### Fixed
- ([#15](https://github.com/compulim/vscode-closetag/issues/15)) Fix broken under VSCode 1.24.0

## [1.1.0](https://github.com/compulim/vscode-closetag/releases/tag/v1.1.0) - 2017-04-29
### Added
- ([#9](https://github.com/compulim/vscode-closetag/issues/9)) New configuration option `closeTag.ignoreTags` to ignore tags, possibilities are:
  - `null` (ignore nothing)
  - `'html'` (ignore [HTML void elements](https://www.w3.org/TR/html/syntax.html#void-elements))
  - `{ br: true, img: true }` (custom set of tags)

## [1.0.0](https://github.com/compulim/vscode-closetag/releases/tag/v1.0.0) - 2017-04-29
### Added
- Integration tests

### Changed
- Updated scaffolding with `vscode@^1.11.0`

### Fixed
- ([#8](https://github.com/compulim/vscode-closetag/issues/8)) Should skip tags not closed properly

## [0.1.2](https://github.com/compulim/vscode-closetag/releases/tag/0.1.2) - 2016-09-21
### Fixed
- Not closing `<h1>` properly

## [0.1.0](https://github.com/compulim/vscode-closetag/releases/tag/0.1.0) - 2016-09-13
### Added
- Close React JSX elements and other non-standard XML elements

### Fixed
- Will now close elements spanning across multiple lines

## [0.0.9](https://github.com/compulim/vscode-closetag/releases/tag/0.0.9) - 2016-05-05
### Added
- Close tag in-place and lock current cursor positions

## [0.0.8](https://github.com/compulim/vscode-closetag/releases/tag/0.0.8) - 2016-04-22
### Fixed
- Not closing elements with value-less attributes

## [0.0.7](https://github.com/compulim/vscode-closetag/releases/tag/0.0.7) - 2016-04-19
### Added
- Close multiple tags

### Fixed
- Not closing correctly when element name contains `.`, `-`, `_`, `:`

## [0.0.6](https://github.com/compulim/vscode-closetag/releases/tag/0.0.6) - 2016-03-25
### Changed
- Will no longer highlight newly added close tag

### Fixed
- When a tag span across multiple lines, the close tag is incorrect
- When the cursor is in the middle of the line, the close tag is incorrect

## [0.0.5](https://github.com/compulim/vscode-closetag/releases/tag/0.0.5) - 2016-02-09
### Changed
- Updated to use new API reference, technically `vscode^0.11.x`, to align with VS Code 0.10.8 (January 2016)
