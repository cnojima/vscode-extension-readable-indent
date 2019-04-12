/**
 * tests for https://github.com/cnojima/vscode-extension-readable-indent/issues/8
 */

import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'assert';
import Indenter from '../Indenter';
import hash from '../util/hash';

const supportPath = path.resolve(__dirname, '../../src/test/support');
const data = require(`${supportPath}/github-13.json`);

suite('Github Issue #13', () => {
  test('RI should also consider parens for determining pivot char', () => {
    const ind = new Indenter();
    const res = ind.indent(data.raw);
console.log(res);
    assert.equal(res, data.expected);
  });
});
