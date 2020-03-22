import { promises } from 'fs';

async function loadObject() {
  let {
    base,
    src,
    filename
  } = this;
  if (base) src = base + '/' + src;
  return await promises.readFile(src + '/' + filename).then(source => JSON.parse(source.toString()));
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

export { JsonReader, loadObject };
