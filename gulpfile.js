const
  gulp = require('gulp'),
  webserver = require('gulp-webserver'),
  babel = require('gulp-babel'),
  sourcemaps = require('gulp-sourcemaps'),

  source = 'process/',
  dest = 'builds/codeclinic/';

gulp.task('html', function() {
  gulp.src(dest + '**/*.html');
});

// Regular CSS
gulp.task('css', function() {
  gulp.src(dest + '**/*.css');
});

// JavaScript ES6
gulp.task('js', function() {
  gulp.src(source + 'js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dest + 'js'));
});

gulp.task('watch', function() {
  gulp.watch(source + '**/*.js', ['js']);
  gulp.watch(dest + '**/*.css', ['css']); //CSS
  gulp.watch(dest + '**/*.html', ['html']);
});

gulp.task('webserver', function() {
  gulp.src(dest)
    .pipe(webserver({
      livereload: true,
      port: 3000,
      open: true
    }));    
});

gulp.task('default', ['html', 'css', 'js', 'webserver', 'watch']);