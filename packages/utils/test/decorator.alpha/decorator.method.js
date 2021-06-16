import { renamable } from './decorator.alpha'
import { delogger } from '@spare/logger'

@renamable('coordination')
const coordinate = function () {
  const { x, y } = this
  return { x, y }
}

coordinate.name |> delogger

