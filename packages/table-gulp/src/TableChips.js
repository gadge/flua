import { IMMUTABLE }     from '@analys/enum-mutabilities'
import { ACCUM }         from '@analys/enum-pivot-mode'
import { Table }         from '@analys/table'
import { esvar }         from '@flua/utils'
import { Vinylize }      from '@flua/vinylize'
import { ros }           from '@palett/says'
import { snakeToPascal } from '@spare/phrasing'
import { Verse }         from '@spare/verse'
import { Rename }        from '@ject/rename'
import gulp              from 'gulp'
import pluralize         from 'pluralize'

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
export const TableChips = (options) =>
  tableChips.bind(options)
    |> Rename(ros(options.key) + ' -> ' + ros(options.field))

export const tableChips = function () {
  /** @type {Table} */  let table = this.table || this.target[this.prop]
  /** @type {string} */ const key = this.key
  /** @type {string} */ const field = this.field
  /** @type {number} */ const mode = this.mode || ACCUM
  /** @type {Object} */ const config = this.config || {}
  /** @type {Object} */ const filter = this.filter
  /** @type {string} */ const dest = this.dest
  /** @type {string} */ const filename = this.filename || snakeToPascal(`${ key }-to-${ pluralize(field) }`)
  /** @type {string} */ const varname = this.varname || filename

  if (filter) table = Table.from(table).find(filter, IMMUTABLE)
  const chips = table.chips({ key, field, mode, objectify: false })
  const vinylBuffer = Vinylize(filename + '.js')
    .p(esvar(varname))
    .p(Verse.entries(chips, config))
  return dest // if provided, save to dest/filename. if omitted, return vinyl buffer.
    ? vinylBuffer.pipe(gulp.dest(dest))
    : vinylBuffer.rest()
}
