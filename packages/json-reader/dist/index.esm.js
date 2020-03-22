import { rename } from '@vect/rename';
import gulp from 'gulp';
import tap from 'gulp-tap';
import { matchSlice } from '@analys/table-init';
import { promises } from 'fs';

const tableReader = function () {
  const {
    table,
    src,
    filename
  } = this;
  return gulp.src(src + '/' + filename).pipe(tap(file => {
    var _JSON$parse;

    const {
      head,
      rows
    } = (_JSON$parse = JSON.parse(file.contents), matchSlice(_JSON$parse));
    if (head && rows) Object.assign(table, {
      head,
      rows
    });
  }));
};

class JsonReader {
  static table({
    table,
    src,
    filename
  }) {
    return tableReader.call({
      table,
      src,
      filename
    });
  }

  static TableReader({
    table,
    src,
    filename,
    rename: rename$1
  }) {
    const method = tableReader.bind({
      table,
      src,
      filename
    });
    return rename$1 ? rename(method, rename$1) : method;
  }

}

class JsonReaderAsync {
  static async table({
    table,
    src,
    filename
  }) {
    return await promises.readFile(process.cwd() + '/' + src + '/' + filename).then(source => {
      var _JSON$parse;

      const {
        head,
        rows
      } = (_JSON$parse = JSON.parse(source.toString()), matchSlice(_JSON$parse));
      Object.assign(table, {
        head,
        rows
      });
      return table;
    });
  }

}

export { JsonReader, JsonReaderAsync, tableReader };
