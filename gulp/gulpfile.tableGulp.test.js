import gulp from 'gulp'
import { Clean } from '@flua/clean'
import { Table } from '@analys/table'
import { AssignTable } from '@flua/gulp-init'
import { TableChips, TableLookup } from '@flua/table-gulp'
import { decoTable, logger } from '@spare/logger'

const SRC = 'static'
const DEST = 'output'
const RAW = 'aeroEngines.json'

const SKU = 'sku', MAXTHRUST_WA = 'maxtwa'
const PLANT = 'plant'
const table = new Table()

const checkTable = async () => {
  await (table |> decoTable |> logger)
}

export const tableGulp = gulp.series(
  Clean(DEST),
  AssignTable({ target: table, src: SRC, filename: RAW }),
  checkTable,
  TableLookup({ table, key: SKU, field: MAXTHRUST_WA, dest: DEST }),
  TableChips({ table, key: PLANT, field: SKU, config: { objectify: true }, dest: DEST })
)

export default tableGulp
