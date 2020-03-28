import gulp from 'gulp'
import pluralize from 'pluralize'
import { vinylize } from '@flua/vinylize'
import { esvar } from '@flua/utils'
import { ACCUM } from '@analys/enum-pivot-mode'
import { Verse } from '@spare/verse'
import { Table } from '@analys/table'
import { snakeToPascal } from '@spare/phrasing'
import { Rename } from '@vect/rename'
import { says } from '@palett/says'

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
export const TableChips = (options) =>
  tableChips.bind(options)
    |> Rename(says.roster(options.key) + ' -> ' + says.roster(options.field))

export const tableChips = function () {
  /** @type {Table} */  const table = this.table
  /** @type {string} */ const key = this.key
  /** @type {string} */ const field = this.field
  /** @type {number} */ const mode = this.mode || ACCUM
  /** @type {Object} */ const config = this.config || {}
  /** @type {string} */ const dest = this.dest
  /** @type {string} */ const filename = this.filename
    || snakeToPascal(`${key}-to-${pluralize(field)}`)

  const chips = table.chips({ key, field, mode, objectify: false })
  const vinylBuffer = vinylize(filename + '.js',
    esvar(filename),
    Verse.entries(chips, config))
  return dest // if provided, save to dest/filename. if omitted, return vinyl buffer.
    ? vinylBuffer.pipe(gulp.dest(dest))
    : vinylBuffer
}
