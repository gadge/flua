'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var says = require('@palett/says');
var deco = require('@spare/deco');
var rename = require('@vect/rename');
var del = require('del');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var del__default = /*#__PURE__*/_interopDefaultLegacy(del);

const Clean = (...patterns) => {
  var _ref, _patterns;

  return _ref = async () => await del__default['default'](patterns), rename.Rename(says.ros('clean') + ' ' + (_patterns = patterns, deco.deco(_patterns)))(_ref);
};

exports.Clean = Clean;
