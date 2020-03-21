import gulp from 'gulp'
import tap from 'gulp-tap'
import { matchSlice } from '@analys/table-init'

export const tableReader = function () {
  const { table, src, raw } = this
  return gulp.src(src + '/' + raw)
    .pipe(tap((file) => {
      const { head, rows } = JSON.parse(file.contents) |> matchSlice
      if (head && rows) Object.assign(table, { head, rows })
    }))
}
