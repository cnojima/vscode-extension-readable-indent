/**
 * tests for https://github.com/cnojima/vscode-extension-readable-indent/issues/20
 */

import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'assert';
import Indenter from '../Indenter';
import hash from '../util/hash';

const supportPath = path.resolve(__dirname, '../../src/test/support');
const raw         = fs.readFileSync(path.resolve(supportPath, 'github-20-raw.txt'), 'utf-8');
const expected    = fs.readFileSync(path.resolve(supportPath, 'github-20-expected.txt'), 'utf-8');

suite('Github Issue #12 Tests', () => {
  test('subsequent RI functions should use reset value, pivots, etc.', () => {
    const ind  = new Indenter();
    const res = ind.indent(raw);

    assert.equal(res, expected);
  });
});
