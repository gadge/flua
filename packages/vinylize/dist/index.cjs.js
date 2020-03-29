'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var source = _interopDefault(require('vinyl-source-stream'));
var vinylBuffer = _interopDefault(require('vinyl-buffer'));
var size = _interopDefault(require('gulp-size'));

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
    return this.endNote().pipe(fn);
  }

  endNote() {
    this.stream.end();
    return this.stream.pipe(vinylBuffer()).pipe(size({
      title: this.filename
    }));
  }

}
const Vinylize = filename => new WritableVinyl(filename);

exports.Vinylize = Vinylize;
exports.WritableVinyl = WritableVinyl;
exports.vinylize = vinylize;
