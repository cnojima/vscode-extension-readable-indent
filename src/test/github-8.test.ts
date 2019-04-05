/**
 * tests for https://github.com/cnojima/vscode-extension-readable-indent/issues/8
 */

import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'assert';
import Indenter from '../Indenter';
import hash from '../util/hash';

const supportPath          = path.resolve(__dirname, '../../src/test/support');
const indented             = fs.readFileSync(path.resolve(supportPath, 'github-8.1.txt'), 'utf-8');
const indentedAlphabetized = fs.readFileSync(path.resolve(supportPath, 'github-8.txt'), 'utf-8');
const noIndentionNoAlpha   = fs.readFileSync(path.resolve(supportPath, 'github-4-raw.txt'), 'utf-8');

suite('Github Issue #8', () => {
  test('hash util returns identical digest for strings with different whitespace', () => {
    assert.equal(hash(indented), hash(indentedAlphabetized));
    assert.equal(hash(indentedAlphabetized), hash(noIndentionNoAlpha));
    assert.equal(hash(indented), hash(noIndentionNoAlpha));
  });

  test('Indenter preserves original code string', () => {
    const ind = new Indenter();

    const res1 = ind.indent(noIndentionNoAlpha);
    const originHash1 = ind.originHash;

    ind.alphabetize = true;
    const res2 = ind.indent(noIndentionNoAlpha);
    const originHash2 = ind.originHash;

    ind.centerJustify = true;
    const res3 = ind.indent(noIndentionNoAlpha);
    const originHash3 = ind.originHash;

    assert.equal(originHash1, originHash2);
    assert.equal(originHash1, originHash3);
    assert.equal(originHash3, originHash2);
    
    assert.notEqual(res1, res2);
    assert.notEqual(res1, res3);
    assert.notEqual(res3, res2);
  });
});