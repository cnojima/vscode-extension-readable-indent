/**
 * tests for https://github.com/cnojima/vscode-extension-readable-indent/issues/20
 */

import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'assert';
import Indenter from '../Indenter';
import hash from '../util/hash';

const supportPath = path.resolve(__dirname, '../../src/test/support');
const raw         = fs.readFileSync(path.resolve(supportPath, 'github-020-raw.txt'), 'utf-8');
const expected1    = fs.readFileSync(path.resolve(supportPath, 'github-020.1-expected.txt'), 'utf-8');
const expected2    = fs.readFileSync(path.resolve(supportPath, 'github-020.2-expected.txt'), 'utf-8');
const expected3    = fs.readFileSync(path.resolve(supportPath, 'github-020.3-expected.txt'), 'utf-8');
const expected4    = fs.readFileSync(path.resolve(supportPath, 'github-020.4-expected.txt'), 'utf-8');

suite('Github Issue #20 Tests', () => {
  test('RI should handle fat-arrow as a pivot char sequence', () => {
    const ind  = new Indenter();
    const res = ind.indent(raw);

    assert.equal(res, expected1);
  });

  test('RI should handle fat-arrow as a pivot char sequence, alphabetical', () => {
    const ind  = new Indenter();
    ind.alphabetize = true;

    const res = ind.indent(raw);

    assert.equal(res, expected2);
  });

  test('RI should handle fat-arrow as a pivot char sequence, centered', () => {
    const ind  = new Indenter();
    ind.centerJustify = true;

    const res = ind.indent(raw);

    assert.equal(res, expected3);
  });

  test('RI should handle fat-arrow as a pivot char sequence, centered alphabetically', () => {
    const ind  = new Indenter();
    ind.alphabetize = true;
    ind.centerJustify = true;

    const res = ind.indent(raw);

    assert.equal(res, expected4);
  });
});
