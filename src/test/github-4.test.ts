/**
 *  tests for https://github.com/cnojima/vscode-extension-readable-indent/issues/3
 */
import * as assert from 'assert';
import Indenter from '../Indenter';
import * as vscode from 'vscode';

const fs = require('fs');
const path = require('path');

const supportPath = path.resolve(__dirname, '../../src/test/support');

suite("Github Issue 4", function () {
  const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration('readableIndent');

  test('Github Issue 4 test', () => {
    const code = fs.readFileSync(path.resolve(supportPath, 'github-4-raw.txt'), 'utf-8');
    const expected = fs.readFileSync(path.resolve(supportPath, 'github-4-expected.txt'), 'utf-8');
    let foo;

    const ind = new Indenter(code, { alphabetize: false });
    foo = ind.indent();
    assert.equal(foo, expected);
  });
});