'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rename = require('@vect/rename');
var gulp = _interopDefault(require('gulp'));
var tap = _interopDefault(require('gulp-tap'));
var tableInit = require('@analys/table-init');

const assignTable = function () {
  const {
    target,
    src,
    filename
  } = this;
  return gulp.src(src + '/' + filename).pipe(tap(file => {
    var _JSON$parse;

    const {
      head,
      rows
    } = (_JSON$parse = JSON.parse(file.contents), tableInit.matchSlice(_JSON$parse));
    if (head && rows) Object.assign(target, {
      head,
      rows
    });
  }));
};

function assignObject() {
  let {
    target,
    base,
    src,
    filename,
    convert
  } = this;
  src = base ? base + '/' + src : src;
  return gulp.src(src + '/' + filename).pipe(tap(file => {
    let o = JSON.parse(file.contents);
    if (convert) o = convert(o);
    Object.assign(target, o);
  }));
}

function Assign({
  target,
  base,
  src,
  filename,
  convert,
  rename: rename$1 = 'assignObject'
} = {}) {
  var _assignObject$bind;

  return _assignObject$bind = assignObject.bind({
    target,
    base,
    src,
    filename,
    convert
  }), rename.Rename(rename$1)(_assignObject$bind);
}
function AssignTable({
  target,
  src,
  filename,
  rename: rename$1 = 'assignTable'
} = {}) {
  var _assignTable$bind;

  return _assignTable$bind = assignTable.bind({
    target,
    src,
    filename
  }), rename.Rename(rename$1)(_assignTable$bind);
}

exports.Assign = Assign;
exports.AssignTable = AssignTable;
exports.assignTable = assignTable;
