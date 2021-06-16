import { IMMUTABLE }     from '@analys/enum-mutabilities'
import { Table }         from '@analys/table'
import { esvar }         from '@flua/utils'
import { Vinylize }      from '@flua/vinylize'
import { ros }           from '@palett/says'
import { snakeToPascal } from '@spare/phrasing'
import { Verse }         from '@spare/verse'
import { Rename }        from '@ject/rename'
import gulp              from 'gulp'

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
export const TableLookup = (options) => {
  return tableLookup
    .bind(options)
    |> Rename(ros(options.key) + ' -> ' + ros(options.field))
}

export const tableLookup = function () {
  /** @type {Table} */  let table = this.table || this.target[this.prop]
  /** @type {string} */ const key = this.key
  /** @type {string} */ const field = this.field
  /** @type {Object} */ const config = this.config || {}
  /** @type {Object} */ const filter = this.filter
  /** @type {string} */ const dest = this.dest
  /** @type {string} */ const filename = this.filename || snakeToPascal(`${ key }-to-${ field }`)
  /** @type {string} */ const varname = this.varname || filename

  if (filter) table = Table.from(table).find(filter, IMMUTABLE)
  const lookups = table.lookupTable(key, field, config?.objectify)
  const vinylBuffer = Vinylize(filename + '.js')
    .p(esvar(varname))
    .p((config?.objectify ? Verse.object : Verse.entries)(lookups, config))
  return dest
    ? vinylBuffer.pipe(gulp.dest(dest))
    : vinylBuffer.rest()
}
