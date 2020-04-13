import { Grey }       from '@palett/cards'
import { hexToRgb }   from '@palett/convert'
import { Dye }        from '@palett/dye'
import { timeout }    from '@valjoux/timeout'
import { roughlyNow } from '@valjoux/timestamp'
import ora            from 'ora'

const spn = ora()
const dye = Dye(Grey.darken_3 |> hexToRgb)

export const greyNow = () => '[' + dye(roughlyNow()) + ']'

export const waitSpin = async (ms, message) => {
  spn.start(message)
  await timeout(ms)
  spn.succeed(greyNow())
}
