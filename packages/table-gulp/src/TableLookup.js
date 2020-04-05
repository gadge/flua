import gulp from 'gulp'
import { esvar } from '@flua/utils'
import { Vinylize } from '@flua/vinylize'
import { Verse } from '@spare/verse'
import { snakeToPascal } from '@spare/phrasing'
import { Rename } from '@vect/rename'
import { says } from '@palett/says'
import { Table } from '@analys/table'
import { IMMUTABLE } from '@analys/enum-mutabilities'

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
export const TableLookup = (options) =>
  tableLookup.bind(options)
    |> Rename(says.roster(options?.key ?? '') + ' -> ' + says.roster(options?.field ?? ''))

export const tableLookup = function () {
  /** @type {Table} */  let table = this.table
  /** @type {string} */ const key = this.key
  /** @type {string} */ const field = this.field
  /** @type {Object} */ const config = this.config || {}
  /** @type {string} */ const filter = this.filter
  /** @type {string} */ const dest = this.dest
  /** @type {string} */ const filename = this.filename || snakeToPascal(`${key}-to-${field}`)
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
