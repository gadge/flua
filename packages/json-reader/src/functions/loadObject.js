import { promises } from 'fs'

export async function loadObject () {
  let { base, src, filename } = this
  if (base) src = base + '/' + src
  return await promises
    .readFile(src + '/' + filename)
    .then(source => JSON.parse(source.toString()))
}
