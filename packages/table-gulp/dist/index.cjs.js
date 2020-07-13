'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var enumMutabilities = require('@analys/enum-mutabilities');
var enumPivotMode = require('@analys/enum-pivot-mode');
var table = require('@analys/table');
var utils = require('@flua/utils');
var vinylize = require('@flua/vinylize');
var says = require('@palett/says');
var phrasing = require('@spare/phrasing');
var verse = require('@spare/verse');
var rename = require('@vect/rename');
var gulp = _interopDefault(require('gulp'));
var pluralize = _interopDefault(require('pluralize'));

/**
 * @typedef {number|string} str
 */

/**
 *
 * @param {Object} options
 * @param {Table}  options.[table] - if set, options.target and options.prop will be omitted.
 * @param {Table}  options.[target]
 * @param {Table}  options.[prop]
 * @param {string} options.key
 * @param {string} options.field
 * @param {number} [options.mode=ACCUM]
 * @param {Object} [options.config] - config for Verse.entries
 * @param {Object} [options.filter] - config for table.find
 * @param {string} [options.dest]
 * @param {string} [options.filename]
 * @param {string} [options.varname]
 * @return {Function}
 */

const TableChips = options => {
  var _tableChips$bind;

  return _tableChips$bind = tableChips.bind(options), rename.Rename(says.ros(options.key) + ' -> ' + says.ros(options.field))(_tableChips$bind);
};
const tableChips = function () {
  /** @type {Table} */
  let table$1 = this.table || this.target[this.prop];
  /** @type {string} */

  const key = this.key;
  /** @type {string} */

  const field = this.field;
  /** @type {number} */

  const mode = this.mode || enumPivotMode.ACCUM;
  /** @type {Object} */

  const config = this.config || {};
  /** @type {Object} */

  const filter = this.filter;
  /** @type {string} */

  const dest = this.dest;
  /** @type {string} */

  const filename = this.filename || phrasing.snakeToPascal(`${key}-to-${pluralize(field)}`);
  /** @type {string} */

  const varname = this.varname || filename;
  if (filter) table$1 = table.Table.from(table$1).find(filter, enumMutabilities.IMMUTABLE);
  const chips = table$1.chips({
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
 * @param {Table}  options.[table] - if set, options.target and options.prop will be omitted.
 * @param {Table}  options.[target]
 * @param {Table}  options.[prop]
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
  var _tableLookup$bind;

  return _tableLookup$bind = tableLookup.bind(options), rename.Rename(says.ros(options.key) + ' -> ' + says.ros(options.field))(_tableLookup$bind);
};
const tableLookup = function () {
  /** @type {Table} */
  let table$1 = this.table || this.target[this.prop];
  /** @type {string} */

  const key = this.key;
  /** @type {string} */

  const field = this.field;
  /** @type {Object} */

  const config = this.config || {};
  /** @type {Object} */

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
