var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var csscomb = require('gulp-csscomb');
var panini = require('panini');

var paths = {
  scripts: 'src/js/**',
  images: 'src/images/**',
  scss: 'src/scss/**'
};

gulp.task('sass', function () {
  return sass('src/scss/**', {
  	sourcemap: false, 
  	noCache: true,
  	style: 'compressed'
  })
  .on('error', sass.logError)
  .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function() {
  gulp.watch(paths.scss, ['sass']);
});



gulp.task('default', ['sass']);

