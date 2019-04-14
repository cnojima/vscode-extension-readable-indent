/**
 *  tests for https://github.com/cnojima/vscode-extension-readable-indent/issues/4
 */
import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'assert';
import Indenter from '../Indenter';

const supportPath = path.resolve(__dirname, '../../src/test/support');

suite("Github Issue #4 Tests", function () {
  test('Gracefully handle pivot chars when more than 1 instance is found :: left-justified', () => {
    const code = fs.readFileSync(path.resolve(supportPath, 'github-4-raw.txt'), 'utf-8');
    const expected = fs.readFileSync(path.resolve(supportPath, 'github-4-expected.txt'), 'utf-8');
    let foo;

    const ind = new Indenter();
    ind.alphabetize = false;
    foo = ind.indent(code);
    assert.equal(foo, expected);
  });

  test('Gracefully handle pivot chars when more than 1 instance is found :: center-justified', () => {
    const code = fs.readFileSync(path.resolve(supportPath, 'github-4.1-raw.txt'), 'utf-8');
    const expected = fs.readFileSync(path.resolve(supportPath, 'github-4.1-expected.txt'), 'utf-8');
    let foo;

    const ind = new Indenter();
    ind.alphabetize = false;
    ind.centerJustify = true;
    foo = ind.indent(code);
    assert.equal(foo, expected);
  });
});