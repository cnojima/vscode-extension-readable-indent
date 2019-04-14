import * as assert from 'assert';
import Indenter from '../Indenter';

suite("Config.minimumWhitespaceBeforePivot Tests", () => {
  const rep = new Indenter();

  test("minimumWhitespaceBeforePivot value should indent to the specified value", () => {
    const input = '{\n  \"a\": \"foo\"\n}';
    const expected = '{\n  \"a\"      : \"foo\"\n}';

    rep.configOptions = {
      minimumWhitespaceBeforePivot : 10
    };

    assert.equal(rep.indent(input), expected);
  });

  test("minimumWhitespaceBeforePivot should be abrogated by a higher pivot value", () => {
    const input = '{\n  \"abcdefgh\": \"foo\"\n}';
    const expected = '{\n  \"abcdefgh\" : \"foo\"\n}';

    rep.configOptions = {
      minimumWhitespaceBeforePivot : 3
    };

    assert.equal(rep.indent(input), expected);
  });
});
