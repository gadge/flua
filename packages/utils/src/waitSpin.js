import { Grey }      from '@palett/cards'
import { Dye }       from '@palett/dye'
import { timeout }   from '@valjoux/timeout'
import { roughTime } from '@valjoux/timestamp'
import ora           from 'ora'

const spn = ora()
const dyer = Dye.hex(Grey.darken_3)

export const greyNow = () => '[' + dyer(roughTime()) + ']'

export const waitSpin = async (ms, message) => {
  spn.start(message)
  await timeout(ms)
  spn.succeed(greyNow())
}
