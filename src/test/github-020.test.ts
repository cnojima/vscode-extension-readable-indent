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
const expected    = fs.readFileSync(path.resolve(supportPath, 'github-020-expected.txt'), 'utf-8');
const raw1         = fs.readFileSync(path.resolve(supportPath, 'github-020.1-raw.txt'), 'utf-8');
const expected1    = fs.readFileSync(path.resolve(supportPath, 'github-020.1-expected.txt'), 'utf-8');

suite('Github Issue #20 Tests', () => {
  test('RI should handle fat-arrow as a pivot char sequence', () => {
    const ind  = new Indenter();
    const res = ind.indent(raw);

    assert.equal(res, expected);
  });

  test('RI should handle fat-arrow as a pivot char sequence with exisiting indentation', () => {
    const ind  = new Indenter();
    const res = ind.indent(raw1);

    assert.equal(res, expected1);
  });
});
