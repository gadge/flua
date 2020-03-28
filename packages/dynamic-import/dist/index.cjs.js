'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopNamespace(e) {
  if (e && e.__esModule) { return e; } else {
    var n = {};
    if (e) {
      Object.keys(e).forEach(function (k) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      });
    }
    n['default'] = e;
    return n;
  }
}

var rename = require('@vect/rename');
var says = require('@palett/says');

const DynamicImport = ({
  target,
  src,
  prop,
  name
}) => {
  var _ref;

  return _ref = async () => {
    target[name !== null && name !== void 0 ? name : prop] = await new Promise(function (resolve) { resolve(_interopNamespace(require(src))); }).then(o => o[prop]);
  }, rename.Rename(`dynamic import { ${says.says.roster(prop)} } from '${src}'`)(_ref);
};

exports.DynamicImport = DynamicImport;
