import { promises } from 'fs'
import { matchSlice } from '@analys/table-init'

export class JsonReaderAsync {
  async static table ({ table, src, raw }) {
    return await promises
      .readFile(process.cwd() + '/' + src + '/' + raw)
      .then(source => {
        const { head, rows } = JSON.parse(source.toString()) |> matchSlice
        Object.assign(table, { head, rows })
        return table
      })
  }
}
