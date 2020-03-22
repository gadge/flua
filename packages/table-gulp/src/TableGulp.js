import del from 'del'
import { AssignTable } from '@flua/gulp-init'
import { Table } from '@analys/table'
import { matchSlice } from '@analys/table-init'
import { deca } from '@spare/logger'
import { says } from '@palett/says'
import { Rename } from '@vect/rename'
import { vinylizeTableChips } from './vinylizeTableChips'
import { vinylizeTableLookup } from './vinylizeTableLookup'

export class TableGulp {
  /** @type {Table} */ #table
  /** @type {string} */ src
  /** @type {string} */ dest

  constructor (src, dest, table,) {
    this.src = src
    this.dest = dest
    this.#table = Table.from(table || {})
  }
  get table () { return this.#table }
  set table (value) { Object.assign(this.#table, value |> matchSlice) }

  static build ({ src, dest, table = {} }) {
    ({ src, dest }) |> deca({ wo: 128 }) |> says['TableGulp'].p('build')
    return new TableGulp(src, dest, table)
  }

  CleanDest () {
    return (() => del([this.dest]))
      |> Rename(says.roster('clean') + ' ' + this.dest)
  }

  Read (filename) {
    const { src, table } = this
    return AssignTable({ target: table, src, filename, rename: says.roster('read') + ' ' + filename })
  }

  TableLookup ({ key, field, filename, readKey, readField }) {
    const { dest, table } = this
    return vinylizeTableLookup
      .bind({ dest, table, key, field, filename })
      |> Rename(says.roster(key) + ' -> ' + says.roster(field))
  }

  TableChips ({ key, field, mode, filename }) {
    const { dest, table } = this
    return vinylizeTableChips.bind({ dest, table, key, field, mode, filename })
      |> Rename(says.roster(key) + ' -> ' + says.roster(field))
  }
}



