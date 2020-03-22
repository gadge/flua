'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var del = _interopDefault(require('del'));
var gulpInit = require('@flua/gulp-init');
var table = require('@analys/table');
var tableInit = require('@analys/table-init');
var logger = require('@spare/logger');
var says = require('@palett/says');
var rename = require('@vect/rename');
var gulp = _interopDefault(require('gulp'));
var vinylize = require('@flua/vinylize');
var utils = require('@flua/utils');
var enumPivotMode = require('@analys/enum-pivot-mode');
var verse = require('@spare/verse');
var phrasing = require('@spare/phrasing');
var enumDataTypes = require('@typen/enum-data-types');
var enumObjectTypes = require('@typen/enum-object-types');

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = privateMap.get(receiver);

  if (!descriptor) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }

  return value;
}

const vinylizeTableChips = function () {
  /** @type {string} */
  const dest = this.dest; // if provided, save to dest/filename. if omitted, return vinyl buffer.

  /** @type {Table} */

  const table = this.table;
  /** @type {string} */

  const key = this.key;
  /** @type {string} */

  const field = this.field;
  /** @type {number} */

  const mode = this.mode || enumPivotMode.ACCUM;
  /** @type {string} */

  const filename = this.filename || phrasing.wordsToPascal([key, 'to', field]).join('');
  const chips = table.chips({
    key,
    field,
    mode,
    objectify: false
  });
  const vinylBuffer = vinylize.vinylize(filename + '.js', utils.esvar(filename), verse.Verse.entriesAsObject(chips, {
    keyRead: x => '\'' + x + '\'',
    read: verse.Verse.vector,
    quote: null
  }));
  return dest ? vinylBuffer.pipe(gulp.dest(dest)) : vinylBuffer;
}; // x => isNumeric(x) ? '\'' + x + '\'' : x,
// x => isNumeric(x) ? +x : x.replace('\'', '\\\'')

/**
 *
 * @type {Function|function(*):string}
 */
const protoType = Function.prototype.call.bind(Object.prototype.toString);
/**
 * const rxObj = /^\[object (.*)]$/
 * Equivalent to: Object.prototype.stringify.call(o).match(rxObj)[1]
 * @param {*} o
 * @return {string}
 */

const typ = o => protoType(o).slice(8, -1);

const isNumeric = x => !isNaN(x - parseFloat(x));

const inferType = x => {
  const t = typeof x;
  return t === enumDataTypes.STR ? isNumeric(x) ? enumDataTypes.NUM : enumDataTypes.STR : t === enumDataTypes.OBJ ? typ(x) : t;
};

const vinylizeTableLookup = function () {
  /** @type {string} */
  const dest = this.dest; // if provided, save to dest/filename. if omitted, return vinyl buffer.

  /** @type {Table} */

  const table = this.table;
  /** @type {string} */

  const key = this.key;
  /** @type {string} */

  const field = this.field;
  /** @type {string} */

  const filename = this.filename || phrasing.wordsToPascal([key, 'to', field]).join('');
  const entries = Object.entries(table.lookupTable(key, field));
  const vinylBuffer = vinylize.vinylize(filename + '.js', utils.esvar(filename), verse.Verse.entriesAsObject(entries, {
    read: x => {
      const t = inferType(x);
      if (t === enumDataTypes.NUM) return +x;
      if (t === enumDataTypes.STR) return '\'' + x.replace('\'', '\\\'') + '\'';
      if (t === enumObjectTypes.ARRAY) return x.length ? verse.Verse.vector(x) : '[]';
      return String(x);
    },
    quote: false
  }));
  return dest ? vinylBuffer.pipe(gulp.dest(dest)) : vinylBuffer;
};

class TableGulp {
  /** @type {Table} */

  /** @type {string} */

  /** @type {string} */
  constructor(src, dest, table$1) {
    _table.set(this, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "src", void 0);

    _defineProperty(this, "dest", void 0);

    this.src = src;
    this.dest = dest;

    _classPrivateFieldSet(this, _table, table.Table.from(table$1 || {}));
  }

  get table() {
    return _classPrivateFieldGet(this, _table);
  }

  set table(value) {
    var _value;

    Object.assign(_classPrivateFieldGet(this, _table), (_value = value, tableInit.matchSlice(_value)));
  }

  static build({
    src,
    dest,
    table = {}
  }) {
    var _ref, _src$dest;

    _ref = (_src$dest = {
      src,
      dest
    }, logger.deca({
      wo: 128
    })(_src$dest)), says.says['TableGulp'].p('build')(_ref);
    return new TableGulp(src, dest, table);
  }

  CleanDest() {
    var _ref2;

    return _ref2 = () => del([this.dest]), rename.Rename(says.says.roster('clean') + ' ' + this.dest)(_ref2);
  }

  Read(filename) {
    const {
      src,
      table
    } = this;
    return gulpInit.AssignTable({
      target: table,
      src,
      filename,
      rename: says.says.roster('read') + ' ' + filename
    });
  }

  TableLookup({
    key,
    field,
    filename,
    readKey,
    readField
  }) {
    var _vinylizeTableLookup$;

    const {
      dest,
      table
    } = this;
    return _vinylizeTableLookup$ = vinylizeTableLookup.bind({
      dest,
      table,
      key,
      field,
      filename
    }), rename.Rename(says.says.roster(key) + ' -> ' + says.says.roster(field))(_vinylizeTableLookup$);
  }

  TableChips({
    key,
    field,
    mode,
    filename
  }) {
    var _vinylizeTableChips$b;

    const {
      dest,
      table
    } = this;
    return _vinylizeTableChips$b = vinylizeTableChips.bind({
      dest,
      table,
      key,
      field,
      mode,
      filename
    }), rename.Rename(says.says.roster(key) + ' -> ' + says.says.roster(field))(_vinylizeTableChips$b);
  }

}

var _table = new WeakMap();

exports.TableGulp = TableGulp;
