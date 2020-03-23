'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var gulp = _interopDefault(require('gulp'));
var vinylize = require('@flua/vinylize');
var utils = require('@flua/utils');
var enumPivotMode = require('@analys/enum-pivot-mode');
var verse = require('@spare/verse');
require('@analys/table');
var phrasing = require('@spare/phrasing');
var rename = require('@vect/rename');
var says = require('@palett/says');
var logger = require('@spare/logger');

/**
 * @typedef {number|string} str
 */

/**
 *
 * @param {Object} options
 * @param {Table}  options.table
 * @param {string} options.key
 * @param {string} options.field
 * @param {number} [options.mode=ACCUM]
 * @param {Object} [options.config] - config for Verse.entries
 * @param {string} [options.dest]
 * @param {string} [options.filename]
 * @return {Function}
 */

const TableChips = options => {
  var _tableChips$bind;

  return _tableChips$bind = tableChips.bind(options), rename.Rename(says.says.roster(options.key) + ' -> ' + says.says.roster(options.field))(_tableChips$bind);
};
const tableChips = function () {
  /** @type {Table} */
  const table = this.table;
  /** @type {string} */

  const key = this.key;
  /** @type {string} */

  const field = this.field;
  /** @type {number} */

  const mode = this.mode || enumPivotMode.ACCUM;
  /** @type {Object} */

  const config = this.config || {};
  /** @type {string} */

  const dest = this.dest;
  /** @type {string} */

  const filename = this.filename || phrasing.snakeToPascal(`${key}-to-${field}`);
  config.read = config.read || verse.Verse.vector;
  const chips = table.chips({
    key,
    field,
    mode,
    objectify: false
  });
  const vinylBuffer = vinylize.vinylize(filename + '.js', utils.esvar(filename), verse.Verse.entries(chips, config));
  return dest // if provided, save to dest/filename. if omitted, return vinyl buffer.
  ? vinylBuffer.pipe(gulp.dest(dest)) : vinylBuffer;
};

/**
 *
 * @param {Object} options
 * @param {Table}  options.table
 * @param {string} options.key
 * @param {string} options.field
 * @param {Object} [options.config] - config for Verse.entries
 * @param {string} [options.dest]
 * @param {string} [options.filename]
 * @return {Function}
 */

const TableLookup = options => {
  var _tableLookup$bind;

  return _tableLookup$bind = tableLookup.bind(options), rename.Rename(says.says.roster(options.key) + ' -> ' + says.says.roster(options.field))(_tableLookup$bind);
};
const tableLookup = function () {
  var _objectify, _lookups, _Verse$object;

  /** @type {Table} */
  const table = this.table;
  /** @type {string} */

  const key = this.key;
  /** @type {string} */

  const field = this.field;
  /** @type {string} */

  const dest = this.dest;
  /** @type {Object} */

  const config = this.config || {};
  /** @type {string} */

  const filename = this.filename || phrasing.snakeToPascal(`${key}-to-${field}`);
  const {
    objectify
  } = config;
  const stringify = objectify ? verse.Verse.object : verse.Verse.entries;
  _objectify = objectify, logger.delogger(_objectify);
  const lookups = table.lookupTable(key, field, !!objectify);
  _lookups = lookups, logger.delogger(_lookups);
  _Verse$object = verse.Verse.object(lookups), logger.delogger(_Verse$object);
  const vinylBuffer = vinylize.vinylize(filename + '.js', utils.esvar(filename), stringify(lookups, config));
  return dest ? vinylBuffer.pipe(gulp.dest(dest)) : vinylBuffer;
};

exports.TableChips = TableChips;
exports.TableLookup = TableLookup;
