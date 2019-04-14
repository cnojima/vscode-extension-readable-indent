/**
 *  tests for https://github.com/cnojima/vscode-extension-readable-indent/issues/7
 */
import * as fs from 'fs';
import * as path from 'path';
import * as assert from 'assert';
import Indenter from '../Indenter';

const supportPath = path.resolve(__dirname, '../../src/test/support');

suite("Github Issue #7 Tests", function () {
  test('Permutations of Readable Intent unexpectedly selects trailing newline', () => {
    const code = fs.readFileSync(path.resolve(supportPath, 'github-4-raw.txt'), 'utf-8');

    const ind1 = new Indenter();
    ind1.alphabetize = false;
    const foo = ind1.indent(code);
    
    const ind2 = new Indenter();
    ind2.alphabetize = false;
    const fooPermutation = ind2.indent(foo);

    const ind3 = new Indenter();
    ind3.alphabetize = true;
    const bar = ind3.indent(fooPermutation);

    assert.equal(foo.split('\n').length, fooPermutation.split('\n').length);
    assert.equal(foo.split('\n').length, bar.split('\n').length);
    assert.equal(fooPermutation.split('\n').length, bar.split('\n').length);
  });
});