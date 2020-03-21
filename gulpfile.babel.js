import gulp from 'gulp'
import { main } from './gulp/gulpfile.test'

export { main }
export default gulp.series(
  main
)
