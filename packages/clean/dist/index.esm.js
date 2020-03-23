import del from 'del';
import { Rename } from '@vect/rename';
import { says } from '@palett/says';
import { deco } from '@spare/deco';

const Clean = (...patterns) => {
  var _ref, _patterns;

  return _ref = async () => await del(patterns), Rename(says.roster('clean') + ' ' + (_patterns = patterns, deco(_patterns)))(_ref);
};

export { Clean };
