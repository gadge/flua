import { Rename } from '@vect/rename'
import { says } from '@palett/says'

export const DynamicImport = ({ target, src, prop, name }) => {
  return (async () => {
    target[name ?? prop] = await import(src).then(o => o[prop])
  }) |> Rename(`dynamic import { ${says.roster(prop)} } from '${src}'`)
}
