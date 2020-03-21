import { promises } from 'fs'
import { matchSlice } from '@analys/table-init'

export class JsonReaderAsync {
  static async table ({ table, src, filename }) {
    return await promises
      .readFile(process.cwd() + '/' + src + '/' + filename)
      .then(source => {
        const { head, rows } = JSON.parse(source.toString()) |> matchSlice
        Object.assign(table, { head, rows })
        return table
      })
  }
}
