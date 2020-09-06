import { Clean }    from '@flua/clean'
import { esvar }    from '@flua/utils'
import { says }     from '@palett/says'
import { deco }     from '@spare/logger'
import { Verse }    from '@spare/verse'
import gulp         from 'gulp'
import { Vinylize } from '../src/Vinylize'

const SRC = 'packages/vinylize/test/static'
const DEST = 'packages/vinylize/test/resource'
const FILENAME = 'alpha'

class Tasks {
  static async alpha() {
    const file = ['1', '2', '3']
    await Vinylize(FILENAME + '.js')
      .p(esvar('vector'))
      .p(Verse.vector(file))
      .asyncPipe(gulp.dest(DEST))
    'saved' |> says['alpha']
  }
  static async beta() {
    const { vector } = await import(process.cwd() + '/' + DEST + '/' + FILENAME + '.js')
    vector |> deco |> says['beta'].p('read')
  }
}

const test = async () => {
  await Clean(DEST)
  await Tasks.alpha()
  await Tasks.beta()
}
test().then()