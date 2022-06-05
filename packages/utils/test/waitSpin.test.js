import { waitSpin } from '../index'

const test = async () => {
  await waitSpin(800, 'waited')
}
test().then()