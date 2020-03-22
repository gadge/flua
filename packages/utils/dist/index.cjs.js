'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var path = require('path');
var ora = _interopDefault(require('ora'));
var cards = require('@palett/cards');
var dye$1 = require('@palett/dye');
var convert = require('@palett/convert');
var timeout = require('@valjoux/timeout');
var timestamp = require('@valjoux/timestamp');

const filename = path$1 => path.basename(path$1, path.extname(path$1));

var _Grey$darken_;
const spn = ora();
const dye = dye$1.Dye((_Grey$darken_ = cards.Grey.darken_3, convert.hexToRgb(_Grey$darken_)));
const greyNow = () => '[' + dye(timestamp.roughlyNow()) + '] ';
const waitSpin = async (ms, message) => {
  spn.start(message);
  await timeout.timeout(ms);
  spn.succeed(greyNow());
};

const esvar = varname => `export const ${varname} = `;

exports.esvar = esvar;
exports.filename = filename;
exports.greyNow = greyNow;
exports.waitSpin = waitSpin;
