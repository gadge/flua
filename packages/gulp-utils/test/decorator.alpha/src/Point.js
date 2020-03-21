import { delogger } from '@spare/logger'
import { log, renamable, testable } from '../decorator.alpha'

@testable(true)
@renamable('appoint')
class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
  }

  get coordinate () { return { x: this.x, y: this.y } }

  @log
  move (dx, dy) { return this.x += dx, this.y += dy, this.coordinate }
}

Point.isTestable |> delogger
const point = new Point(2, 5)

point.move(2, -2) |> delogger

