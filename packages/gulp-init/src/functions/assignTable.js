import gulp from 'gulp'
import tap from 'gulp-tap'
import { matchSlice } from '@analys/table-init'

export const assignTable = function () {
  const { target, src, filename } = this
  return gulp.src(src + '/' + filename)
    .pipe(tap((file) => {
      const { head, rows } = JSON.parse(file.contents) |> matchSlice
      if (head && rows) Object.assign(target, { head, rows })
    }))
}
