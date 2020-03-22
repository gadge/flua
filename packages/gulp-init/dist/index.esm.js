import { Rename } from '@vect/rename';
import gulp from 'gulp';
import tap from 'gulp-tap';
import { matchSlice } from '@analys/table-init';

const assignTable = function () {
  const {
    target,
    src,
    filename
  } = this;
  return gulp.src(src + '/' + filename).pipe(tap(file => {
    var _JSON$parse;

    const {
      head,
      rows
    } = (_JSON$parse = JSON.parse(file.contents), matchSlice(_JSON$parse));
    if (head && rows) Object.assign(target, {
      head,
      rows
    });
  }));
};

function assignObject() {
  let {
    target,
    base,
    src,
    filename,
    convert
  } = this;
  src = base ? base + '/' + src : src;
  return gulp.src(src + '/' + filename).pipe(tap(file => {
    let o = JSON.parse(file.contents);
    if (convert) o = convert(o);
    Object.assign(target, o);
  }));
}

function Assign({
  target,
  base,
  src,
  filename,
  convert,
  rename = 'assignObject'
} = {}) {
  var _assignObject$bind;

  return _assignObject$bind = assignObject.bind({
    target,
    base,
    src,
    filename,
    convert
  }), Rename(rename)(_assignObject$bind);
}
function AssignTable({
  target,
  src,
  filename,
  rename = 'assignTable'
} = {}) {
  var _assignTable$bind;

  return _assignTable$bind = assignTable.bind({
    target,
    src,
    filename
  }), Rename(rename)(_assignTable$bind);
}

export { Assign, AssignTable, assignTable };
