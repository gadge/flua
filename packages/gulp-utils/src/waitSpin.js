import ora from 'ora'
import { Grey } from '@palett/cards'
import { Dye } from '@palett/dye'
import { hexToRgb } from '@palett/convert'
import { timeout } from '@valjoux/timeout'
import { roughlyNow } from '@valjoux/timestamp'

const spn = ora()
const dye = Dye(Grey.darken_3 |> hexToRgb)
export const greyNowTime = () => '[' + dye(roughlyNow()) + '] '

export const waitSpin = async (ms, message) => {
  spn.start(message)
  await timeout(ms)
  spn.succeed(greyNowTime())
}
