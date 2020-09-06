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

/**
 * stream is an instance of Transform
 * stream.Transform extends stream.Duplex, which extends stream.Readable and implement stream.Writable
 * according to stream from module:stream.internal
 */

class WritableVinyl {
  /** @property {Transform} */
  //
  constructor(filename) {
    _defineProperty(this, "stream", void 0);

    this.filename = filename;
    this.stream = source(filename);
  }
  /** @return {Transform} */


  p(content) {
    return this.stream.write(content), this;
  }

  pipe(fn) {
    return this.rest().pipe(fn);
  }

  asyncPipe(fn) {
    return new Promise((pass, veto) => {
      return this.rest().pipe(fn).on('end', pass).on('error', veto);
    });
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
