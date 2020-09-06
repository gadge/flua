import { ros } from '@palett/says';
import { deco } from '@spare/deco';
import { Rename } from '@vect/rename';
import del from 'del';

const Clean = (...patterns) => {
  var _ref, _patterns;

  return _ref = async () => await del(patterns), Rename(ros('clean') + ' ' + (_patterns = patterns, deco(_patterns)))(_ref);
};

export { Clean };
