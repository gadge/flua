import { basename, extname } from 'path';
import ora from 'ora';
import { Grey } from '@palett/cards';
import { Dye } from '@palett/dye';
import { hexToRgb } from '@palett/convert';
import { timeout } from '@valjoux/timeout';
import { roughlyNow } from '@valjoux/timestamp';

const filename = path => basename(path, extname(path));

var _Grey$darken_;
const spn = ora();
const dye = Dye((_Grey$darken_ = Grey.darken_3, hexToRgb(_Grey$darken_)));
const greyNowTime = () => '[' + dye(roughlyNow()) + '] ';
const waitSpin = async (ms, message) => {
  spn.start(message);
  await timeout(ms);
  spn.succeed(greyNowTime());
};

export { filename, waitSpin };
