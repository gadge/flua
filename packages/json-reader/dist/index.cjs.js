'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rename = require('@vect/rename');
var gulp = _interopDefault(require('gulp'));
var tap = _interopDefault(require('gulp-tap'));
var tableInit = require('@analys/table-init');
var fs = require('fs');

const tableReader = function () {
  const {
    table,
    src,
    filename
  } = this;
  return gulp.src(src + '/' + filename).pipe(tap(file => {
    var _JSON$parse;

    const {
      head,
      rows
    } = (_JSON$parse = JSON.parse(file.contents), tableInit.matchSlice(_JSON$parse));
    if (head && rows) Object.assign(table, {
      head,
      rows
    });
  }));
};

class JsonReader {
  static table({
    table,
    src,
    filename
  }) {
    return tableReader.call({
      table,
      src,
      filename
    });
  }

  static TableReader({
    table,
    src,
    filename,
    rename: rename$1
  }) {
    const method = tableReader.bind({
      table,
      src,
      filename
    });
    return rename$1 ? rename.rename(method, rename$1) : method;
  }

}

class JsonReaderAsync {
  static async table({
    table,
    src,
    filename
  }) {
    return await fs.promises.readFile(process.cwd() + '/' + src + '/' + filename).then(source => {
      var _JSON$parse;

      const {
        head,
        rows
      } = (_JSON$parse = JSON.parse(source.toString()), tableInit.matchSlice(_JSON$parse));
      Object.assign(table, {
        head,
        rows
      });
      return table;
    });
  }

}

exports.JsonReader = JsonReader;
exports.JsonReaderAsync = JsonReaderAsync;
exports.tableReader = tableReader;
