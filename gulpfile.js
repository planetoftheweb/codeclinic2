const gulp = require('gulp'),
  webserver = require('gulp-server-io'),

  source = './',
  dest = './';

gulp.task('html', function() {
  gulp.src(dest + '**/*.html');
});

// Regular CSS
gulp.task('css', function() {
  gulp.src(dest + '**/*.css');
});

gulp.task('watch', function() {
  gulp.watch(source + '**/*.js', ['js']);
  gulp.watch(source + '**/*.css', ['css']); //CSS
  gulp.watch(source + '**/*.html', ['html']);
});

gulp.task('webserver', function() {
  gulp.src(dest)
    .pipe(webserver({
      serverReload: {
        dir: dest,
        config: {verbose: true, debounce: 1000},
        callback: files => {
          // perform your server side restart
        }
      },
      port: 3000,
      open: true
    }));    
});

gulp.task('default', ['webserver','watch']);