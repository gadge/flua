import gulp from 'gulp'
import { main } from './test/gulpfile.alpha.test'
import { createTable } from './gulp/gulpfile.createTable.test'
import { tableGulp } from './gulp/gulpfile.tableGulp.test'
import { jsonReader } from './gulp/gulpfile.jsonReader.test'
import { gulpInit } from './gulp/gulpfile.gulpInit.test'

export {
  main,
  createTable,
  tableGulp,
  jsonReader,
  gulpInit
}

export default gulp.series(
  main
)
