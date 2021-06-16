import { Rename } from '@ject/rename'
import { ros }    from '@palett/says'
import { deco }   from '@spare/deco'
import del        from 'del'

export const Clean = (...patterns) =>
  ( async () => await del(patterns) )
    |> Rename(ros('clean') + ' ' + ( patterns |> deco ))
