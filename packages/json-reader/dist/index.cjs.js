'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var gulp = _interopDefault(require('gulp'));
var tap = _interopDefault(require('gulp-tap'));
var tableInit = require('@analys/table-init');
var rename = require('@vect/rename');
var fs = require('fs');

class JsonReader {
  static table({
    table,
    src,
    raw
  }) {
    return gulp.src(src + '/' + raw).pipe(tap(file => {
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
  }

  static TableReader({
    table,
    src,
    raw,
    name
  }) {
    const method = tableReader.bind({
      table,
      src,
      raw
    });
    return name ? rename.rename(method, name) : method;
  }

}

class JsonReaderAsync {
  static async table({
    table,
    src,
    raw
  }) {
    return await fs.promises.readFile(process.cwd() + '/' + src + '/' + raw).then(source => {
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

const tableReader$1 = function () {
  const {
    table,
    src,
    raw
  } = this;
  return gulp.src(src + '/' + raw).pipe(tap(file => {
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

exports.JsonReader = JsonReader;
exports.JsonReaderAsync = JsonReaderAsync;
exports.tableReader = tableReader$1;
