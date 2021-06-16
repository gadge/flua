import gulp from 'gulp'
import { JsonReader } from '@flua/json-reader'
import del from 'del'
import { Table } from '@analys/table'
import { decoTable, logger } from '@spare/logger'
import { esvar } from '@flua/utils'
import { Verse } from '@spare/verse'
import { Rename } from '@vect/rename'
import { snakeToCamel } from '@spare/phrasing'
import { Vinylize } from '@flua/vinylize'

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
  const filename = snakeToCamel(`${key}-to-${field}`)
  Vinylize(filename + '.js')
    .p(esvar(filename))
    .p(Verse.entries(lkup))
    .pipe(gulp.dest(DEST))
}) |> Rename('lookupTable')

export const jsonReader = gulp.series(
  clean,
  loadTable,
  checkTable,
  LookupTable({ target: table, key: SKU, field: MAXTHRUST_WA })
)

export default jsonReader
