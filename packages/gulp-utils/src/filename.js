import { basename, extname } from 'path'

export const filename = path => basename(path, extname(path))
