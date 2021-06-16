import { delogger } from '@spare/logger'
import { Table } from '@analys/table'
import { GulpBinder } from '../src/Assign'

const table = new Table()

const bindFunction = GulpBinder
  .Binder({ target: table, src: 'static', filename: 'aeroEngines.json' })

const test = async () => {
  await bindFunction()
  table |> delogger
}

test()



