import * as assert from 'assert';
import Indenter from '../Indenter';

suite("Config.pavPivot Tests", () => {
  const rep = new Indenter();

  test("pivotPadding should add spaces padding the pivot character", () => {
    const input = '{\n  \"a\"  :  \"foo\"\n}';
    const expected = '{\n  \"a\" : \"foo\"\n}';

    rep.configOptions = {
      minimumWhitespaceBeforePivot : 0,
      pivotPadding: true
    };

    assert.equal(rep.indent(input), expected);
  });

  test("pivotPadding should not add spaces padding the pivot character", () => {
    const input = '{\n  \"a\"  :  \"foo\"\n}';
    const expected = '{\n  \"a\":\"foo\"\n}';

    rep.configOptions = {
      minimumWhitespaceBeforePivot : 0,
      pivotPadding: false
    };

    assert.equal(rep.indent(input), expected);
  });
});
