import * as crypto from 'crypto';

export default (s: string) => {
  // normalize string to account for indentation & alphabetization deltas
  const input = s.split('\n').map(l => l.trim()).sort().join('').replace(/[\s\t\r\n]/gim, '');
  // console.log('-'); console.log(input.substr(0, 50)); console.log(crypto.createHash('md5').update(input).digest("hex"));
  return crypto.createHash('md5').update(input).digest("hex");
};