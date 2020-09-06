'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var source = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var size = require('gulp-size');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var source__default = /*#__PURE__*/_interopDefaultLegacy(source);
var vinylBuffer__default = /*#__PURE__*/_interopDefaultLegacy(vinylBuffer);
var size__default = /*#__PURE__*/_interopDefaultLegacy(size);

const makeVinyl = function (...contents) {
  const {
    filename
  } = this;
  const stream = source__default['default'](filename);

  for (let element of contents) stream.write(element);

  stream.end();
  return stream.pipe(vinylBuffer__default['default']()).pipe(size__default['default']({
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
    this.stream = source__default['default'](filename);
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
    return this.stream.pipe(vinylBuffer__default['default']()).pipe(size__default['default']({
      title: this.filename
    }));
  }

}
const Vinylize = filename => new WritableVinyl(filename);

exports.Vinylize = Vinylize;
exports.WritableVinyl = WritableVinyl;
exports.vinylize = vinylize;
