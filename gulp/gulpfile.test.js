import gulp from 'gulp'
import vfs from 'vinyl-fs'
import map from 'map-stream'
import tap from 'gulp-tap'
import { deco, delogger } from '@spare/logger'
import { says } from '@palett/says'
import { inferType } from '@typen/num-strict'
import through2 from 'through2'
import fs from 'fs'
import { Verse } from '@spare/verse'

const SRC = 'static'
const DEST = 'output'
const fileInfo = file => ({
  type: file.contents |> inferType,
  body: JSON.parse(file.contents),
  path: file.path,
  mode: file.isStream() ? 'Stream' : file.isBuffer() ? 'Buffer' : 'null'
})

const log = function (file, cb) {
  fileInfo(file) |> deco |> says['log']
  cb(null, file)
}

const asyncLog = async (file) => {
  file.contents |> delogger
  return await file
}

fs.createReadStream(SRC + '/sample.json')
  .pipe(through2.obj(
    function (chunk, encoding, callback) {
      const body = JSON.parse(chunk)
      const info = {
        body,
        encoding,
        callback
      }
      info |> deco |> says['through2']
      callback(null, Buffer.from(Verse.entriesAsObject(Object.entries(info))))
    }
  ))
  .pipe(fs.createWriteStream(DEST + '/wut.txt'))

export const main = () => gulp
  .src([SRC + '/*.json'])
  .pipe(map(log))
  .pipe(tap(file => { fileInfo(file) |> deco |> says['tap'] }))
  .pipe(vfs.dest(DEST))
