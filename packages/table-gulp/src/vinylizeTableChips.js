import gulp from 'gulp'
import { vinylize } from '@flua/vinylize'
import { esvar } from '@flua/utils'
import { ACCUM } from '@analys/enum-pivot-mode'
import { Verse } from '@spare/verse'
import { Table } from '@analys/table'
import { wordsToPascal } from '@spare/phrasing'

export const vinylizeTableChips = function () {
  /** @type {string} */ const dest = this.dest // if provided, save to dest/filename. if omitted, return vinyl buffer.
  /** @type {Table} */  const table = this.table
  /** @type {string} */ const key = this.key
  /** @type {string} */ const field = this.field
  /** @type {number} */ const mode = this.mode || ACCUM
  /** @type {string} */ const filename = this.filename || wordsToPascal([key, 'to', field]).join('')

  const chips = table.chips({ key, field, mode, objectify: false })
  const vinylBuffer = vinylize(filename + '.js',
    esvar(filename),
    Verse.entriesAsObject(chips, {
      keyRead: x => '\'' + x + '\'',
      read: Verse.vector,
      quote: null,
    }))
  return dest
    ? vinylBuffer.pipe(gulp.dest(dest))
    : vinylBuffer
}

// x => isNumeric(x) ? '\'' + x + '\'' : x,
// x => isNumeric(x) ? +x : x.replace('\'', '\\\'')
