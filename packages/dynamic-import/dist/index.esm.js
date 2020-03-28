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

export { DynamicImport };
