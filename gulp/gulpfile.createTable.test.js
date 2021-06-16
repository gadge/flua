import gulp from 'gulp'
import { TableCollection } from '@foba/table'
import { vinylize } from '@flua/vinylize'
import { decoTable, logger } from '@spare/logger'

const table = TableCollection.AeroEngineSpecs
const DEST = 'static'

export const createTable = async () => {
  table |> decoTable |> logger
  vinylize('aeroEngines.json',
    JSON.stringify(table),
  ).pipe(gulp.dest(DEST))
}

export default createTable
