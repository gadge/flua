import { loadObject } from './functions/loadObject'

export class JsonReader {
  static async load ({ base, src, filename } = {}) {
    return loadObject.call({ base, src, filename })
  }
}

