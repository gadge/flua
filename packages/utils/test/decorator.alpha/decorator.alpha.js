import { deco, delogger, xr } from '@spare/logger'
import { says } from '@spare/xr'

export function testable (isTestable) {
  return function (target) {
    target.isTestable = isTestable
  }
}

export function renamable (newName) {
  return function (target) {
    Object.assign(target, 'name', {
      value: newName
    })
  }
}

export function log (target, name, descriptor) {
  const method = descriptor.value
  descriptor |> delogger
  descriptor.value = function () {
    xr('calling').method(name).args(arguments |> deco) |> says['point']
    return method.apply(this, arguments)
  }
  return descriptor
}


