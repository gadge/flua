import source from 'vinyl-source-stream';
import vinylBuffer from 'vinyl-buffer';
import size from 'gulp-size';

const makeVinyl = function (...contents) {
  const {
    filename
  } = this;
  const stream = source(filename);

  for (let element of contents) stream.write(element);

  stream.end();
  return stream.pipe(vinylBuffer()).pipe(size({
    title: filename
  }));
};

const vinylize = (filename, ...contents) => makeVinyl.apply({
  filename
}, contents);

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

class WritableVinyl {
  /** @property {WritableStream} */
  constructor(filename) {
    _defineProperty(this, "stream", void 0);

    this.filename = filename;
    this.stream = source(filename);
  }
  /** @return {WritableVinyl} */


  p(content) {
    return this.stream.write(content), this;
  }

  pipe(fn) {
    return this.rest().pipe(fn);
  }

  rest() {
    this.stream.end();
    return this.stream.pipe(vinylBuffer()).pipe(size({
      title: this.filename
    }));
  }

}
const Vinylize = filename => new WritableVinyl(filename);

export { Vinylize, WritableVinyl, vinylize };
