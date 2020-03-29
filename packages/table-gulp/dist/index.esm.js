import gulp from 'gulp';
import pluralize from 'pluralize';
import { Vinylize } from '@flua/vinylize';
import { esvar } from '@flua/utils';
import { ACCUM } from '@analys/enum-pivot-mode';
import { Verse } from '@spare/verse';
import { snakeToPascal } from '@spare/phrasing';
import { Rename } from '@vect/rename';
import { says } from '@palett/says';

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

  return _tableChips$bind = tableChips.bind(options), Rename(says.roster(options.key) + ' -> ' + says.roster(options.field))(_tableChips$bind);
};
const tableChips = function () {
  /** @type {Table} */
  const table = this.table;
  /** @type {string} */

  const key = this.key;
  /** @type {string} */

  const field = this.field;
  /** @type {number} */

  const mode = this.mode || ACCUM;
  /** @type {Object} */

  const config = this.config || {};
  /** @type {string} */

  const dest = this.dest;
  /** @type {string} */

  const filename = this.filename || snakeToPascal(`${key}-to-${pluralize(field)}`);
  const chips = table.chips({
    key,
    field,
    mode,
    objectify: false
  });
  const vinylBuffer = Vinylize(filename + '.js').p(esvar(filename)).p(Verse.entries(chips, config));
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
 * @param {string} [options.dest]
 * @param {string} [options.filename]
 * @return {Function}
 */

const TableLookup = options => {
  var _tableLookup$bind;

  return _tableLookup$bind = tableLookup.bind(options), Rename(says.roster(options.key) + ' -> ' + says.roster(options.field))(_tableLookup$bind);
};
const tableLookup = function () {
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

  const filename = this.filename || snakeToPascal(`${key}-to-${field}`);
  const {
    objectify
  } = config;
  const lookups = table.lookupTable(key, field, objectify);
  const vinylBuffer = Vinylize(filename + '.js').p(esvar(filename)).p((objectify ? Verse.object : Verse.entries)(lookups, config));
  return dest ? vinylBuffer.pipe(gulp.dest(dest)) : vinylBuffer.rest();
};

export { TableChips, TableLookup };
