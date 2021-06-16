import size        from 'gulp-size'
import vinylBuffer from 'vinyl-buffer'
import source      from 'vinyl-source-stream'

/**
 * stream is an instance of Transform
 * stream.Transform extends stream.Duplex, which extends stream.Readable and implement stream.Writable
 * according to stream from module:stream.internal
 */
export class WritableVinyl {
  /** @property {Transform} */ stream //
  constructor(filename) {
    this.filename = filename
    this.stream = source(filename)
  }

  /** @return {Transform} */
  p(content) { return this.stream.write(content), this }

  pipe(fn) { return this.rest().pipe(fn) }

  asyncPipe(fn) {
    return new Promise((pass, veto) => {
      return this.rest()
        .pipe(fn)
        .on('end', pass)
        .on('error', veto)
    })
  }

  rest() {
    this.stream.end()
    return this.stream
      .pipe(vinylBuffer())
      .pipe(size({ title: this.filename }))
  }
}

export const Vinylize = (filename) => new WritableVinyl(filename)
