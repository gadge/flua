import del from 'del'
import { JsonReader } from '@flua/json-reader'
import { Table } from '@analys/table'
import { matchSlice } from '@analys/table-init'
import { deca } from '@spare/logger'
import { says } from '@palett/says'
import { rename } from '@vect/rename'
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
    const clean = () => del([this.dest])
    return rename(clean, says.roster('clean') + ' ' + this.dest)
  }

  Read (filename) {
    const { src, table } = this
    return JsonReader.TableReader({
      table,
      src,
      raw: filename,
      name: says.roster('read') + ' ' + filename
    })
  }

  TableLookup ({ key, field, filename }) {
    const { dest, table } = this
    const method = vinylizeTableLookup.bind({ dest, table, key, field, filename })
    return rename(method, says.roster(key) + ' -> ' + says.roster(field))
  }

  TableChips ({ key, field, mode, filename }) {
    const { dest, table } = this
    const method = vinylizeTableChips.bind({ dest, table, key, field, mode, filename })
    return rename(method, says.roster(key) + ' -> ' + says.roster(field))
  }
}



