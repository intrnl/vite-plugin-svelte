let { Readable } = require('stream');


module.exports.readBody = function readBody (stream) {
  if (stream instanceof Readable) {
    return new Promise((resolve, reject) => {
      let res = '';

      stream.on('data', (chunk) => (res += chunk))
        .on('error', reject)
        .on('end', () => resolve(res));
    });
  } else {
    return !stream || typeof stream === 'string'
      ? stream
      : stream.toString();
  }
};
