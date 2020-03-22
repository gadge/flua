'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var fs = require('fs');

async function loadObject() {
  let {
    base,
    src,
    filename
  } = this;
  if (base) src = base + '/' + src;
  return await fs.promises.readFile(src + '/' + filename).then(source => JSON.parse(source.toString()));
}

class JsonReader {
  static async load({
    base,
    src,
    filename
  } = {}) {
    return loadObject.call({
      base,
      src,
      filename
    });
  }

}

exports.JsonReader = JsonReader;
exports.loadObject = loadObject;
