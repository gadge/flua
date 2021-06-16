import gulp from 'gulp'
import del from 'del'
import { Table } from '@analys/table'
import { decoTable, logger } from '@spare/logger'
import { vinylize } from '@flua/vinylize'
import { esvar } from '@flua/utils'
import { Verse } from '@spare/verse'
import { Rename } from '@vect/rename'
import { Assign } from '@flua/gulp-init'
import { matchSlice } from '@analys/table-init'

const SRC = 'static'
const DEST = 'output'
const RAW = 'aeroEngines.json'

const SKU = 'sku', MAXTHRUST_WA = 'maxtwa'
const table = new Table()

const clean = () => del([DEST])

const checkTable = async () => {
  await (table |> decoTable |> logger)
}

const LookupTable = ({ target, key, field }) => (async () => {
  const lkup = await target.lookupTable(key, field, false)
  const filename = `${key}_${field}.js`
  vinylize(filename, esvar(filename), Verse.entries(lkup))
    .pipe(gulp.dest(DEST))
}) |> Rename('lookupTable')

export const gulpInit = gulp.series(
  clean,
  Assign({ target: table, src: SRC, filename: RAW, convert: matchSlice }),
  checkTable,
  LookupTable({ target: table, key: SKU, field: MAXTHRUST_WA })
)

export default gulpInit
