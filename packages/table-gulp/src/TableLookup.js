import gulp from 'gulp'
import { esvar } from '@flua/utils'
import { Vinylize } from '@flua/vinylize'
import { Verse } from '@spare/verse'
import { snakeToPascal } from '@spare/phrasing'
import { Rename } from '@vect/rename'
import { says } from '@palett/says'

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
export const TableLookup = (options) =>
  tableLookup.bind(options)
    |> Rename(says.roster(options.key) + ' -> ' + says.roster(options.field))

export const tableLookup = function () {
  /** @type {Table} */  const table = this.table
  /** @type {string} */ const key = this.key
  /** @type {string} */ const field = this.field
  /** @type {string} */ const dest = this.dest
  /** @type {Object} */ const config = this.config || {}
  /** @type {string} */ const filename = this.filename || snakeToPascal(`${key}-to-${field}`)
  const { objectify } = config

  const lookups = table.lookupTable(key, field, objectify)
  const vinylBuffer = Vinylize(filename + '.js')
    .p(esvar(filename))
    .p((objectify ? Verse.object : Verse.entries)(lookups, config))
  return dest
    ? vinylBuffer.pipe(gulp.dest(dest))
    : vinylBuffer.rest()
}
