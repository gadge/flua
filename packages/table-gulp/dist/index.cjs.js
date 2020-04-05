'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var gulp = _interopDefault(require('gulp'));
var pluralize = _interopDefault(require('pluralize'));
var vinylize = require('@flua/vinylize');
var utils = require('@flua/utils');
var enumPivotMode = require('@analys/enum-pivot-mode');
var verse = require('@spare/verse');
var phrasing = require('@spare/phrasing');
var rename = require('@vect/rename');
var says = require('@palett/says');
var table = require('@analys/table');
var enumMutabilities = require('@analys/enum-mutabilities');

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
 * @param {string} [options.varname]
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

  const filename = this.filename || phrasing.snakeToPascal(`${key}-to-${pluralize(field)}`);
  /** @type {string} */

  const varname = this.varname || filename;
  const chips = table.chips({
    key,
    field,
    mode,
    objectify: false
  });
  const vinylBuffer = vinylize.Vinylize(filename + '.js').p(utils.esvar(varname)).p(verse.Verse.entries(chips, config));
  return dest // if provided, save to dest/filename. if omitted, return vinyl buffer.
  ? vinylBuffer.pipe(gulp.dest(dest)) : vinylBuffer.rest();
};

/**
 *
 * @param {Object} options
 * @param {Table}  options.table
 * @param {string} options.key
 * @param {string} options.field
 * @param {Object} [options.config] - config for Verse.entries
 * @param {Object} [options.filter] - config for table.find
 * @param {string} [options.dest]
 * @param {string} [options.filename]
 * @param {string} [options.varname]
 * @return {Function}
 */

const TableLookup = options => {
  var _tableLookup$bind, _options$key, _options$field;

  return _tableLookup$bind = tableLookup.bind(options), rename.Rename(says.says.roster((_options$key = options === null || options === void 0 ? void 0 : options.key) !== null && _options$key !== void 0 ? _options$key : '') + ' -> ' + says.says.roster((_options$field = options === null || options === void 0 ? void 0 : options.field) !== null && _options$field !== void 0 ? _options$field : ''))(_tableLookup$bind);
};
const tableLookup = function () {
  /** @type {Table} */
  let table$1 = this.table;
  /** @type {string} */

  const key = this.key;
  /** @type {string} */

  const field = this.field;
  /** @type {Object} */

  const config = this.config || {};
  /** @type {string} */

  const filter = this.filter;
  /** @type {string} */

  const dest = this.dest;
  /** @type {string} */

  const filename = this.filename || phrasing.snakeToPascal(`${key}-to-${field}`);
  /** @type {string} */

  const varname = this.varname || filename;
  if (filter) table$1 = table.Table.from(table$1).find(filter, enumMutabilities.IMMUTABLE);
  const lookups = table$1.lookupTable(key, field, config === null || config === void 0 ? void 0 : config.objectify);
  const vinylBuffer = vinylize.Vinylize(filename + '.js').p(utils.esvar(varname)).p(((config === null || config === void 0 ? void 0 : config.objectify) ? verse.Verse.object : verse.Verse.entries)(lookups, config));
  return dest ? vinylBuffer.pipe(gulp.dest(dest)) : vinylBuffer.rest();
};

exports.TableChips = TableChips;
exports.TableLookup = TableLookup;
