import { JsonReader } from '..'
import { delogger } from '@spare/logger'

JsonReader
  .load({ src: 'static', filename: 'sample.json' })
  .then(x => x |> delogger)
