[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# readable-indent README

Indents imports, KVPs (like object literals) with a pivot point, padding whitespace for easy scanability.

## Features

Simple indentation will make your code easier to visually scan.  This extension will indent two common patterns on a pivot character:
1. `=`
2. `:`
![intro](docs/intro.gif)

When applying readable-indent, use the pattern that makes the code snippet most readable:
### Left-justified readable-indent
![left-justified](docs/indent.gif)

### Center-justified readable-indent
![center-justified](docs/indent-with-pivot.gif)

## Extension Settings

TODO:
This extension contributes the following settings:

* `readableIndent.alphabetize`: set to `true` to alpha-order the snippet being readble-indented

## Known Issues

Due to conflicting prioritization of whitespace between left & center-justified readable-indentation, toggling between the two will incrementally further indent the snippet.  The workaround is to undo the readable-indent before trying the other.

Obviously this indentation is conflicted with OOTB rules for `prettier`.  Pedagogy is out of scope for this extension ;).

## Release Notes

### < 0.1.0

* POC
* Documentation
* tests

### 0.1.0

Initial release on VSCE, dogfooding.
