import gulp from 'gulp'
import { Verse } from '@spare/verse'
import { wordsToPascal } from '@spare/phrasing'
import { inferType, isNumeric } from '@typen/num-strict'
import { NUM, STR } from '@typen/enum-data-types'
import { ARRAY } from '@typen/enum-object-types'
import { vinylize } from '@flua/vinylize'

export const vinylizeTableLookup = function () {
  /** @type {string} */ const dest = this.dest // if provided, save to dest/filename. if omitted, return vinyl buffer.
  /** @type {Table} */  const table = this.table
  /** @type {string} */ const key = this.key
  /** @type {string} */ const field = this.field
  /** @type {string} */ const filename = this.filename || wordsToPascal([key, 'to', field]).join('')

  const entries = Object.entries(table.lookupTable(key, field))
  const vinylBuffer = vinylize(
    filename + '.js',
    `export const ${filename} = `,
    Verse.entriesAsObject(entries, {
      keyAbstract: x => isNumeric(x) ? '\'' + x + '\'' : x,
      abstract: x => {
        const t = inferType(x)
        if (t === NUM) return +x
        if (t === STR) return '\'' + x.replace('\'', '\\\'') + '\''
        if (t === ARRAY) return x.length ? Verse.vector(x) : '[]'
        return String(x)
      },
      quote: false
    }))
  return dest
    ? vinylBuffer.pipe(gulp.dest(dest))
    : vinylBuffer
}
