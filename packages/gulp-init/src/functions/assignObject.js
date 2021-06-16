import gulp from 'gulp'
import tap from 'gulp-tap'

export function assignObject () {
  let { target, base, src, filename, convert, } = this
  src = base ? (base + '/' + src) : src
  return gulp.src(src + '/' + filename)
    .pipe(tap((file) => {
      let o = JSON.parse(file.contents)
      if (convert) o = convert(o)
      Object.assign(target, o)
    }))
}
