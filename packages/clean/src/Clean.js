import del from 'del'
import { Rename } from '@vect/rename'
import { says } from '@palett/says'
import { deco } from '@spare/deco'

export const Clean = (...patterns) =>
  (async () => await del(patterns))
    |> Rename(says.roster('clean') + ' ' + (patterns |> deco))
