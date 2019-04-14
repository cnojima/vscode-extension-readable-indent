import * as crypto from 'crypto';
import * as assert from 'assert';
import hash from '../util/hash';

suite('Hash Utility Tests', () => {
  test('md5 is reasonable', () => {
    const str = 'This is a string';
    const squished = 'Thisisastring';
    const md5_1 = crypto.createHash('md5');
    const md5_2 = crypto.createHash('md5');

    assert.notEqual(md5_1.update(str).digest('hex'), hash(str));
    assert.equal(md5_2.update(squished).digest('hex'), hash(str));
  });
});