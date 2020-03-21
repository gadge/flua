import gulp from 'gulp'
import tap from 'gulp-tap'
import { matchSlice } from '@analys/table-init'
import { rename as doRename } from '@vect/rename'

export class JsonReader {
  static table ({ table, src, filename }) {
    return gulp.src(src + '/' + filename)
      .pipe(tap((file) => {
        const { head, rows } = JSON.parse(file.contents) |> matchSlice
        if (head && rows) Object.assign(table, { head, rows })
      }))
  }

  static TableReader ({ table, src, filename, rename }) {
    const method = tableReader.bind({ table, src, filename })
    return rename ? doRename(method, rename) : method
  }
}
