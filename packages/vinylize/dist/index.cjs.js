'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var source = _interopDefault(require('vinyl-source-stream'));
var vinylBuffer = _interopDefault(require('vinyl-buffer'));
var size = _interopDefault(require('gulp-size'));

const vinylize = (filename, ...contents) => {
  const stream = source(filename);

  for (let element of contents) stream.write(element);

  stream.end();
  return stream.pipe(vinylBuffer()).pipe(size({
    title: filename
  }));
};

exports.vinylize = vinylize;
