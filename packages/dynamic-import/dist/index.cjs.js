'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var says = require('@palett/says');
var rename = require('@vect/rename');

function _interopNamespace(e) {
  if (e && e.__esModule) { return e; } else {
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n['default'] = e;
    return Object.freeze(n);
  }
}

const DynamicImport = ({
  target,
  src,
  prop,
  name
}) => {
  var _ref;

  return _ref = async () => {
    target[name !== null && name !== void 0 ? name : prop] = await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(src)); }).then(o => o[prop]);
  }, rename.Rename(`dynamic import { ${says.ros(prop)} } from '${src}'`)(_ref);
};
const DynamicAssign = ({
  target,
  src,
  prop,
  name
}) => {
  var _ref2;

  return _ref2 = async () => {
    var _target$name;

    const source = prop ? await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(src)); }).then(o => o[prop]) : await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require(src)); });
    return name ? Object.assign(target[name] = (_target$name = target[name]) !== null && _target$name !== void 0 ? _target$name : {}, source) : Object.assign(target, source);
  }, rename.Rename(`dynamic import { ${says.ros(prop)} } from '${src}'`)(_ref2);
};

exports.DynamicAssign = DynamicAssign;
exports.DynamicImport = DynamicImport;
