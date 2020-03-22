import { rename as doRename } from '@vect/rename'
import { tableReader } from './tableReader'

export class JsonReader {
  static table ({ table, src, filename }) {
    return tableReader.call({ table, src, filename })
  }

  static TableReader ({ table, src, filename, rename }) {
    const method = tableReader.bind({ table, src, filename })
    return rename ? doRename(method, rename) : method
  }
}
