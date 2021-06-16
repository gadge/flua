import { Rename } from '@ject/rename'
import { ros }    from '@palett/says'

export const DynamicImport = ({ target, src, prop, name }) => {
  return ( async () => {
    target[name ?? prop] = await import(src).then(o => o[prop])
  } ) |> Rename(`dynamic import { ${ ros(prop) } } from '${ src }'`)
}

export const DynamicAssign = ({ target, src, prop, name }) => {
  return ( async () => {
    const source = prop
      ? await import(src).then(o => o[prop])
      : await import(src)
    return name
      ? Object.assign(( target[name] = target[name] ?? {} ), source)
      : Object.assign(target, source)
  } ) |> Rename(`dynamic import { ${ ros(prop) } } from '${ src }'`)
}
