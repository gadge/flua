'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var rename = require('@vect/rename');
var gulp = require('gulp');
var tap = require('gulp-tap');
var tableInit = require('@analys/table-init');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var gulp__default = /*#__PURE__*/_interopDefaultLegacy(gulp);
var tap__default = /*#__PURE__*/_interopDefaultLegacy(tap);

const assignTable = function () {
  const {
    target,
    src,
    filename
  } = this;
  return gulp__default['default'].src(src + '/' + filename).pipe(tap__default['default'](file => {
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
  return gulp__default['default'].src(src + '/' + filename).pipe(tap__default['default'](file => {
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
