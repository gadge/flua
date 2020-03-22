import gulp from 'gulp'
import { JsonReader } from '@flua/json-reader'
import del from 'del'
import { Table } from '@analys/table'
import { decoTable, logger } from '@spare/logger'
import { vinylize } from '@flua/vinylize'
import { esvar } from '@flua/utils'
import { Verse } from '@spare/verse'
import { Rename } from '@vect/rename'

const SRC = 'static'
const DEST = 'output'
const RAW = 'aeroEngines.json'

const SKU = 'sku', MAXTHRUST_WA = 'maxtwa'
const table = new Table()

const clean = () => del([DEST])

const loadTable = async () => {
  const { head, rows } = await JsonReader.load({ src: SRC, filename: RAW })
  Object.assign(table, { head, rows })
}

const checkTable = async () => {
  await (table |> decoTable |> logger)
}

const LookupTable = ({ target, key, field }) => (async () => {
  const lkup = await target.lookupTable(key, field, false)
  const filename = `${key}_${field}.js`
  vinylize(filename, esvar(filename), Verse.entries(lkup))
    .pipe(gulp.dest(DEST))
}) |> Rename('lookupTable')

export const jsonReader = gulp.series(
  clean,
  loadTable,
  checkTable,
  LookupTable({ target: table, key: SKU, field: MAXTHRUST_WA })
)

export default jsonReader
