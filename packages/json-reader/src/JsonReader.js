import gulp from 'gulp'
import tap from 'gulp-tap'
import { matchSlice } from '@analys/table-init'
import { rename } from '@vect/rename'

export class JsonReader {
  static table ({ table, src, raw }) {
    return gulp.src(src + '/' + raw)
      .pipe(tap((file) => {
        const { head, rows } = JSON.parse(file.contents) |> matchSlice
        if (head && rows) Object.assign(table, { head, rows })
      }))
  }

  static TableReader ({ table, src, raw, name }) {
    const method = tableReader.bind({ table, src, raw })
    return name ? rename(method, name) : method
  }
}
