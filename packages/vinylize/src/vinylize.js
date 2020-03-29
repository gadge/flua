import source from 'vinyl-source-stream'
import vinylBuffer from 'vinyl-buffer'
import size from 'gulp-size'



const makeVinyl = function (...contents) {
  const { filename } = this
  const stream = source(filename)
  for (let element of contents) stream.write(element)
  stream.end()
  return stream
    .pipe(vinylBuffer())
    .pipe(size({ title: filename }))
}



export const vinylize = (filename, ...contents) => makeVinyl.apply({ filename }, contents)
