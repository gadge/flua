import { Rename } from '@ject/rename'
import { ros }    from '@spare/xr'
import { deco }   from '@spare/logger'
import del        from 'del'

export const Clean = (...patterns) =>
  (async () => await del(patterns))
    |> Rename(ros('clean') + ' ' + (patterns |> deco))
