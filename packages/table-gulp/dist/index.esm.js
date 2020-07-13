import { IMMUTABLE } from '@analys/enum-mutabilities';
import { ACCUM } from '@analys/enum-pivot-mode';
import { Table } from '@analys/table';
import { esvar } from '@flua/utils';
import { Vinylize } from '@flua/vinylize';
import { ros } from '@palett/says';
import { snakeToPascal } from '@spare/phrasing';
import { Verse } from '@spare/verse';
import { Rename } from '@vect/rename';
import gulp from 'gulp';
import pluralize from 'pluralize';

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

  return _tableChips$bind = tableChips.bind(options), Rename(ros(options.key) + ' -> ' + ros(options.field))(_tableChips$bind);
};
const tableChips = function () {
  /** @type {Table} */
  let table = this.table || this.target[this.prop];
  /** @type {string} */

  const key = this.key;
  /** @type {string} */

  const field = this.field;
  /** @type {number} */

  const mode = this.mode || ACCUM;
  /** @type {Object} */

  const config = this.config || {};
  /** @type {Object} */

  const filter = this.filter;
  /** @type {string} */

  const dest = this.dest;
  /** @type {string} */

  const filename = this.filename || snakeToPascal(`${key}-to-${pluralize(field)}`);
  /** @type {string} */

  const varname = this.varname || filename;
  if (filter) table = Table.from(table).find(filter, IMMUTABLE);
  const chips = table.chips({
    key,
    field,
    mode,
    objectify: false
  });
  const vinylBuffer = Vinylize(filename + '.js').p(esvar(varname)).p(Verse.entries(chips, config));
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

  return _tableLookup$bind = tableLookup.bind(options), Rename(ros(options.key) + ' -> ' + ros(options.field))(_tableLookup$bind);
};
const tableLookup = function () {
  /** @type {Table} */
  let table = this.table || this.target[this.prop];
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

  const filename = this.filename || snakeToPascal(`${key}-to-${field}`);
  /** @type {string} */

  const varname = this.varname || filename;
  if (filter) table = Table.from(table).find(filter, IMMUTABLE);
  const lookups = table.lookupTable(key, field, config === null || config === void 0 ? void 0 : config.objectify);
  const vinylBuffer = Vinylize(filename + '.js').p(esvar(varname)).p(((config === null || config === void 0 ? void 0 : config.objectify) ? Verse.object : Verse.entries)(lookups, config));
  return dest ? vinylBuffer.pipe(gulp.dest(dest)) : vinylBuffer.rest();
};

export { TableChips, TableLookup };
