'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var cards = require('@palett/cards');
var convert = require('@palett/convert');
var dye$1 = require('@palett/dye');
var timeout = require('@valjoux/timeout');
var timestamp = require('@valjoux/timestamp');
var ora = require('ora');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ora__default = /*#__PURE__*/_interopDefaultLegacy(ora);

const filename = path$1 => path.basename(path$1, path.extname(path$1));

var _Grey$darken_;
const spn = ora__default['default']();
const dye = dye$1.Dye((_Grey$darken_ = cards.Grey.darken_3, convert.hexToRgb(_Grey$darken_)));
const greyNow = () => '[' + dye(timestamp.roughTime()) + ']';
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
