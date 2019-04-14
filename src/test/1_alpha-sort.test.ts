import * as assert from 'assert';
import customAlphaSort from '../util/alpha-sort';

suite("Custom Sort Tests", () => {
  test('normal alphabeticals', () => {
    const expected = ['a','b','c'];
    const foo      = ['b','c','a'];
    assert.deepEqual(customAlphaSort(foo), expected);
  });

  test('normal alphabeticals, preserve whitespace', () => {
    const expected = ['a   ', '  b ', '   c'];
    const foo      = ['  b ', '   c', 'a   '];
    assert.deepEqual(customAlphaSort(foo), expected);
  });

  test('alphabetize, handling newlines', () => {
    const expected = ['', '', 'a', '', 'b', 'c', ''];
    const foo      = ['', '', 'c', '', 'a', 'b', ''];
    assert.deepEqual(customAlphaSort(foo), expected);
  });
});