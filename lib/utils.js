let path = require('path');
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

module.exports.componentize = function componentize (str) {
  return path.basename(str[0].toUpperCase() + str.slice(1))
    .replace(path.extname(str), '')
    .replace(/[^a-zA-Z_$0-9]+/g, '_')
    .replace(/^_/, '')
    .replace(/_$/, '')
    .replace(/^(\d)/, '_$1');
};

module.exports.push = function push (arr, items) {
  for (let item of items) {
    if (!arr.includes(item)) arr.push(item);
  }

  return arr;
};
