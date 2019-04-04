[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Readable Indent VS Code Extension

Indents imports, KVPs (like object literals) with a pivot point, padding whitespace for easy scanability.


## Features

Simple indentation will make your code easier to visually scan.  This extension will indent two common patterns on a pivot character:  **`=`** or  **`:`**

When applying readable-indent, use the pattern that makes the code snippet most readable:

### Left-justified readable-indent
![left-justified](docs/indent.gif)

### Left-justified, alphabetized readable-indent
![left-justified](docs/indent-alpha.gif)

### Center-justified readable-indent
![center-justified](docs/indent-center.gif)

### Center-justified, alphabetized readable-indent
![center-justified](docs/indent-center-alpha.gif)

## Usage
1. Select code snippet to make readable.
2. Use context menu (right|ctrl click) or key mapping to apply readable-indent

|                              	| Mac OSX             	| Windows/Linux         	|
|------------------------------	|---------------------	|-----------------------	|
| Indent                       	| `cmd-i cmd-a`       	| `ctrl-i ctrl-a`       	|
| Indent Alphabetized          	| `cmd-i cmd-shift-a` 	| `ctrl-i ctrl-shift-a` 	|
| Indent Centered              	| `cmd-i cmd-b`       	| `ctrl-i ctrl-b`       	|
| Indent Centered Alphabetized 	| `cmd-i cmd-shift-b` 	| `ctrl-i ctrl-shift-b` 	|


## Known Issues

Obviously this indentation is conflicted with OOTB rules for `prettier`.  Pedagogy is out of scope for this extension ;).

## Release Notes

### < 0.1.0

* POC
* Documentation
* tests

### 0.1.0

Initial release on VSCE, dogfooding.

### 0.2.0

All Readable Indent functionality exposed via menus, keyboard-chords, and command prompt.