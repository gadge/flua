import del from 'del';
import { JsonReader } from '@flua/json-reader';
import { Table } from '@analys/table';
import { matchSlice } from '@analys/table-init';
import { deca } from '@spare/logger';
import { says } from '@palett/says';
import { rename } from '@vect/rename';
import gulp from 'gulp';
import { vinylize } from '@flua/vinylize';
import { ACCUM } from '@analys/enum-pivot-mode';
import { Verse } from '@spare/verse';
import { wordsToPascal } from '@spare/phrasing';
import { NUM, STR } from '@typen/enum-data-types';
import { ARRAY } from '@typen/enum-object-types';
import { isNumeric, inferType } from '@typen/num-strict';

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

  const mode = this.mode || ACCUM;
  /** @type {string} */

  const filename = this.filename || wordsToPascal([key, 'to', field]).join('');
  const chips = table.chips({
    key,
    field,
    mode,
    objectify: false
  });
  const vinylBuffer = vinylize(filename + '.js', `export const ${filename} = `, Verse.entriesAsObject(chips, {
    keyAbstract: x => '\'' + x + '\'',
    abstract: Verse.vector,
    quote: null
  }));
  return dest ? vinylBuffer.pipe(gulp.dest(dest)) : vinylBuffer;
}; // x => isNumeric(x) ? '\'' + x + '\'' : x,
// x => isNumeric(x) ? +x : x.replace('\'', '\\\'')

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

  const filename = this.filename || wordsToPascal([key, 'to', field]).join('');
  const entries = Object.entries(table.lookupTable(key, field));
  const vinylBuffer = vinylize(filename + '.js', `export const ${filename} = `, Verse.entriesAsObject(entries, {
    keyAbstract: x => isNumeric(x) ? '\'' + x + '\'' : x,
    abstract: x => {
      const t = inferType(x);
      if (t === NUM) return +x;
      if (t === STR) return '\'' + x.replace('\'', '\\\'') + '\'';
      if (t === ARRAY) return x.length ? Verse.vector(x) : '[]';
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
  constructor(src, dest, table) {
    _table.set(this, {
      writable: true,
      value: void 0
    });

    _defineProperty(this, "src", void 0);

    _defineProperty(this, "dest", void 0);

    this.src = src;
    this.dest = dest;

    _classPrivateFieldSet(this, _table, Table.from(table || {}));
  }

  get table() {
    return _classPrivateFieldGet(this, _table);
  }

  set table(value) {
    var _value;

    Object.assign(_classPrivateFieldGet(this, _table), (_value = value, matchSlice(_value)));
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
    }, deca({
      wo: 128
    })(_src$dest)), says['TableGulp'].p('build')(_ref);
    return new TableGulp(src, dest, table);
  }

  CleanDest() {
    const clean = () => del([this.dest]);

    return rename(clean, says.roster('clean') + ' ' + this.dest);
  }

  Read(filename) {
    const {
      src,
      table
    } = this;
    return JsonReader.TableReader({
      table,
      src,
      raw: filename,
      name: says.roster('read') + ' ' + filename
    });
  }

  TableLookup({
    key,
    field,
    filename
  }) {
    const {
      dest,
      table
    } = this;
    const method = vinylizeTableLookup.bind({
      dest,
      table,
      key,
      field,
      filename
    });
    return rename(method, says.roster(key) + ' -> ' + says.roster(field));
  }

  TableChips({
    key,
    field,
    mode,
    filename
  }) {
    const {
      dest,
      table
    } = this;
    const method = vinylizeTableChips.bind({
      dest,
      table,
      key,
      field,
      mode,
      filename
    });
    return rename(method, says.roster(key) + ' -> ' + says.roster(field));
  }

}

var _table = new WeakMap();

export { TableGulp };
