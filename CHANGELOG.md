# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

# [1.0.0](https://github.com/cnojima/vscode-extension-readable-indent/compare/v0.2.0...v1.0.0) (2019-04-04)


### Bug Fixes

* **#7:** Fix RI incorrectly selecting following lines when indenting.  Handle n+1 permutations when ([21ebd1a](https://github.com/cnojima/vscode-extension-readable-indent/commit/21ebd1a)), closes [#7](https://github.com/cnojima/vscode-extension-readable-indent/issues/7)
* **#8:** Fix Indenter adding whitespace indentation when permuting readable-intent. ([aeb2442](https://github.com/cnojima/vscode-extension-readable-indent/commit/aeb2442)), closes [#8](https://github.com/cnojima/vscode-extension-readable-indent/issues/8)



# [0.2.0](https://github.com/cnojima/vscode-extension-readable-indent/compare/v0.1.4...v0.2.0) (2019-04-03)


### Features

* **alphabetize:** Enable alphabetizing from commands (menu, keyboard, command prompt).  Redact conf ([cd4583a](https://github.com/cnojima/vscode-extension-readable-indent/commit/cd4583a))



## [0.1.4](https://github.com/cnojima/vscode-extension-readable-indent/compare/v0.1.3...v0.1.4) (2019-04-02)


### Bug Fixes

* **contributes:** Fix typo in key-bindings for OSX users; instead of the `ctrl-i cmd-a` sequence, it ([9dd7179](https://github.com/cnojima/vscode-extension-readable-indent/commit/9dd7179))



## [0.1.3](https://github.com/cnojima/vscode-extension-readable-indent/compare/v0.1.2...v0.1.3) (2019-04-02)


### Bug Fixes

* **Indenter:** Rudenmentary parsing of lines to determine if a given pivot character is eligible for ([607f3bb](https://github.com/cnojima/vscode-extension-readable-indent/commit/607f3bb)), closes [#4](https://github.com/cnojima/vscode-extension-readable-indent/issues/4)



## [0.1.2](https://github.com/cnojima/vscode-extension-readable-indent/compare/v0.1.1...v0.1.2) (2019-04-02)


### Bug Fixes

* **alphabetize:** Refactor [].sort(custom) to a external sort mechanism to correctly preserve newlin ([5b0abf2](https://github.com/cnojima/vscode-extension-readable-indent/commit/5b0abf2)), closes [#3](https://github.com/cnojima/vscode-extension-readable-indent/issues/3)



## [0.1.1](https://github.com/cnojima/vscode-extension-readable-indent/compare/v0.1.0...v0.1.1) (2019-04-02)


### Bug Fixes

* **tests:** Address typescript errors in tests ([7ce8c5d](https://github.com/cnojima/vscode-extension-readable-indent/commit/7ce8c5d))



## [0.0.6](https://github.com/cnojima/vscode-extension-readable-indent/compare/v0.0.5...v0.0.6) (2019-04-02)


### Bug Fixes

* **decruft:** Fix map() usage, remove commented code. ([6dfc2d5](https://github.com/cnojima/vscode-extension-readable-indent/commit/6dfc2d5))
* **Indenter:** Fix Indenter sort function to keep ([33b5267](https://github.com/cnojima/vscode-extension-readable-indent/commit/33b5267))



## [0.0.5](https://github.com/cnojima/vscode-extension-readable-indent/compare/v0.0.4...v0.0.5) (2019-03-31)

### Features
* **alphabetize**: Add configuration, sort snippet lines before indentation.  Default is `false`.



## [0.0.3](https://github.com/cnojima/vscode-extension-readable-indent/compare/v0.0.2...v0.0.3) (2019-03-31)

### Misc
* **license**: Add MIT license

## [0.0.2](https://github.com/cnojima/vscode-extension-readable-indent/compare/v0.0.1...v0.0.2) (2019-03-31)

### Bug Fixes
* **tabs**: Handle tab chars when reflowing for indentation.
* **editor**: Change editor effective granularity to line-level.

## [0.0.1](https://github.com/cnojima/vscode-extension-readable-indent/compare/v0.0.2...v0.0.3) (2019-03-29)

### Initial release