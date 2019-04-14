/**
 * tests for https://github.com/cnojima/vscode-extension-readable-indent/issues/8
 */

import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'assert';
import Indenter from '../Indenter';
import hash from '../util/hash';

const supportPath = path.resolve(__dirname, '../../src/test/support');
const raw1 = fs.readFileSync(path.resolve(supportPath, 'github-12-raw.txt'), 'utf-8');
const raw2 = fs.readFileSync(path.resolve(supportPath, 'github-12.1-raw.txt'), 'utf-8');
const expected1 = fs.readFileSync(path.resolve(supportPath, 'github-12-expected.txt'), 'utf-8');
const expected2 = fs.readFileSync(path.resolve(supportPath, 'github-12.1-expected.txt'), 'utf-8');

suite('Github Issue #12 Tests', () => {
  test('subsequent RI functions should use reset value, pivots, etc.', () => {
    const ind = new Indenter();
    const res1 = ind.indent(raw1);
    const res2 = ind.indent(raw2);

    assert.equal(res1, expected1);
    assert.equal(res2, expected2);
  });
});
