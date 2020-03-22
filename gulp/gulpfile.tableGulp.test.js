import gulp from 'gulp'
import { TableGulp } from '@flua/table-gulp/src/TableGulp'

const SRC = 'static'
const DEST = 'output'
const RAW = 'aeroEngines.json'

const SKU = 'sku', MAXTHRUST_WA = 'maxtwa'
const g = TableGulp.build({ src: SRC, dest: DEST })

export const tableGulp = gulp.series(
  g.CleanDest(),
  g.Read(RAW),
  g.TableLookup({ key: SKU, field: MAXTHRUST_WA })
)

export default tableGulp
