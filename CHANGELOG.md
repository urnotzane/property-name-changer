# Change Log

All notable changes to the "property-name-changer" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## Change log rules
- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

## [1.2.0] - 2020-01-13
### Added
- 通过JSON生成转义函数。

## [1.1.11] - 2020-01-09
### Fixed
- 修复Command Not Found。

## [1.1.0] - 2019-12-29
### Added
- 新增根据JSON生成typescript的interface。
### Changed
- 现在JSON转驼峰或底杠后还是JSON，不会删除它的双引号了。

## [1.0.0] - 2019-12-16
### Added
- 添加JSON转义。
- 使用webpack打包。
### Fixed
- 用webpack打包来修复node_modules不能用的问题。

## [0.3.1] - 2019-12-13
### Fixed
- Fixed string Array item.
- Fixed delete quote menu.

## [0.3.0] - 2019-12-13
### Added
- Support recursive modification of property names.
- Two commands added.

## [0.2.1] - 2019-12-09
### Fixed
- Change CN command line to EN.

## [0.2.0] - 2019-12-09
### Changed
- Change icon file path.

## [0.1.0] - 2019-12-09
### Added
- Support context menu.
- A simple icon for this extension.

### Changed
- Convenient keybindings than before.

## [0.0.1] - 2019-12-09
### Added
- You can change bottom line string to Hump.
- You can change hump string to bottom line.
- You can delete quotation mark quickly in your text.
- All the above functions,support `cmd/ctrl+shift+P` command line and keybindings!
- If you want to know more info,please read [README.md](https://github.com/urnotzane/property-name-changer/blob/master/README.md).