/**
 *  tests for https://github.com/cnojima/vscode-extension-readable-indent/issues/3
 */
import * as assert from 'assert';
import Indenter from '../Indenter';
import * as vscode from 'vscode';

const fs = require('fs');
const path = require('path');

const supportPath = path.resolve(__dirname, '../../src/test/support');

suite("Github Issue #7", function () {
  const config: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration('readableIndent');

  test('selected range does not add following lines on indentation', () => {
    const cfg = { alphabetize: false };
    const code = fs.readFileSync(path.resolve(supportPath, 'github-4-raw.txt'), 'utf-8');

    const ind1 = new Indenter(code, cfg);
    const foo = ind1.indent();
    
    const ind2 = new Indenter(foo, cfg);
    const fooPermutation = ind2.indent();

    const ind3 = new Indenter(fooPermutation, { alphabetize: true });
    const bar = ind3.indent();

    assert.equal(foo.split('\n').length, fooPermutation.split('\n').length);
    assert.equal(foo.split('\n').length, bar.split('\n').length);
    assert.equal(fooPermutation.split('\n').length, bar.split('\n').length);
  });
});