'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var del = _interopDefault(require('del'));
var rename = require('@vect/rename');
var says = require('@palett/says');
var deco = require('@spare/deco');

const Clean = (...patterns) => {
  var _ref, _patterns;

  return _ref = async () => await del(patterns), rename.Rename(says.says.roster('clean') + ' ' + (_patterns = patterns, deco.deco(_patterns)))(_ref);
};

exports.Clean = Clean;
