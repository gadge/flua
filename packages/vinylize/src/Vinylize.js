import source from 'vinyl-source-stream'
import vinylBuffer from 'vinyl-buffer'
import size from 'gulp-size'

export class WritableVinyl {
  /** @property {WritableStream} */ stream
  constructor (filename) {
    this.filename = filename
    this.stream = source(filename)
  }

  /** @return {WritableVinyl} */
  p (content) { return this.stream.write(content), this }

  pipe (fn) { return this.rest().pipe(fn) }

  rest () {
    this.stream.end()
    return this.stream
      .pipe(vinylBuffer())
      .pipe(size({ title: this.filename }))
  }
}

export const Vinylize = (filename) => new WritableVinyl(filename)
