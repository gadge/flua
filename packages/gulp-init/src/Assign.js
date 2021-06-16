import { Rename } from '@ject/rename'
import { assignTable } from './functions/assignTable'
import { assignObject } from './functions/assignObject'

export function Assign ({ target, base, src, filename, convert, rename = 'assignObject' } = {}) {
  return assignObject.bind({ target, base, src, filename, convert, }) |> Rename(rename)
}

export function AssignTable ({ target, src, filename, rename = 'assignTable' } = {}) {
  return assignTable.bind({ target, src, filename }) |> Rename(rename)
}
