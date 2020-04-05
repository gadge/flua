import { Rename } from '@vect/rename';
import { says } from '@palett/says';

const DynamicImport = ({
  target,
  src,
  prop,
  name
}) => {
  var _ref;

  return _ref = async () => {
    target[name !== null && name !== void 0 ? name : prop] = await import(src).then(o => o[prop]);
  }, Rename(`dynamic import { ${says.roster(prop)} } from '${src}'`)(_ref);
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

    const source = prop ? await import(src).then(o => o[prop]) : await import(src);
    return name ? Object.assign(target[name] = (_target$name = target[name]) !== null && _target$name !== void 0 ? _target$name : {}, source) : Object.assign(target, source);
  }, Rename(`dynamic import { ${says.roster(prop)} } from '${src}'`)(_ref2);
};

export { DynamicAssign, DynamicImport };
