import source from 'vinyl-source-stream';
import vinylBuffer from 'vinyl-buffer';
import size from 'gulp-size';

const vinylize = (filename, ...contents) => {
  const stream = source(filename);

  for (let element of contents) stream.write(element);

  stream.end();
  return stream.pipe(vinylBuffer()).pipe(size({
    title: filename
  }));
};

export { vinylize };
