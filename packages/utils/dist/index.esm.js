import { basename, extname } from 'path';
import { Grey } from '@palett/cards';
import { hexToRgb } from '@palett/convert';
import { Dye } from '@palett/dye';
import { timeout } from '@valjoux/timeout';
import { roughlyNow } from '@valjoux/timestamp';
import ora from 'ora';

const filename = path => basename(path, extname(path));

var _Grey$darken_;
const spn = ora();
const dye = Dye((_Grey$darken_ = Grey.darken_3, hexToRgb(_Grey$darken_)));
const greyNow = () => '[' + dye(roughlyNow()) + ']';
const waitSpin = async (ms, message) => {
  spn.start(message);
  await timeout(ms);
  spn.succeed(greyNow());
};

const esvar = varname => `export const ${varname} = `;

export { esvar, filename, greyNow, waitSpin };
