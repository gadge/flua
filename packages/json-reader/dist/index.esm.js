import gulp from 'gulp';
import tap from 'gulp-tap';
import { matchSlice } from '@analys/table-init';
import { rename } from '@vect/rename';
import { promises } from 'fs';

class JsonReader {
  static table({
    table,
    src,
    filename
  }) {
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

const tableReader$1 = function () {
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

export { JsonReader, JsonReaderAsync, tableReader$1 as tableReader };
