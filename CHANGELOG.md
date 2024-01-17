# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.3.0](https://github.com/cnojima/vscode-extension-readable-indent/compare/v1.3.0...v1.3.1) (2024-01-17)

### Features

* **Double-colon Support:** add support for double-colon as pivot sequence


### [1.2.2](https://github.com/cnojima/vscode-extension-readable-indent/compare/v1.2.1...v1.2.2) (2020-05-13)


### Bug Fixes

* npm audit fixes ([97860ff](https://github.com/cnojima/vscode-extension-readable-indent/commit/97860ff183a2fa76fded23402d8691b86a6f0998))


### [1.2.1](https://github.com/cnojima/vscode-extension-readable-indent/compare/v1.2.0...v1.2.1) (2020-07-11)


### Documentation

* **Docs:** Fix typo, add info about future support



# [1.2.0](https://github.com/cnojima/vscode-extension-readable-indent/compare/v1.1.0...v1.2.0) (2019-07-11)


### Features

* **Fat-arrow Support:** Add support for `=>` fat-arrow indentation pivot points.



# [1.1.0](https://github.com/cnojima/vscode-extension-readable-indent/compare/v1.0.1...v1.1.0) (2019-04-14)


### Features

* **Indenter:** Add support for `minimumWhitespaceBeforePivot` ([d3a80b1](https://github.com/cnojima/vscode-extension-readable-indent/commit/d3a80b1)), closes [#16](https://github.com/cnojima/vscode-extension-readable-indent/issues/16)



## [1.0.1](https://github.com/cnojima/vscode-extension-readable-indent/compare/v1.0.0...v1.0.1) (2019-04-12)


### Bug Fixes

* **#12:** reset pivots, chars, etc. before subsequent RI indent ops to ensure expected indentation ([6e2f850](https://github.com/cnojima/vscode-extension-readable-indent/commit/6e2f850)), closes [#12](https://github.com/cnojima/vscode-extension-readable-indent/issues/12)
* **Indenter:** Handle parens when considering chars for pivot. ([48faa17](https://github.com/cnojima/vscode-extension-readable-indent/commit/48faa17)), closes [#13](https://github.com/cnojima/vscode-extension-readable-indent/issues/13)
* **Indenter:** reset pivots, chars, etc. before subsequent RI indent ops to ensure expected indentation ([d242a27](https://github.com/cnojima/vscode-extension-readable-indent/commit/d242a27))



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