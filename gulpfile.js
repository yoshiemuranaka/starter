var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var csscomb = require('gulp-csscomb');
var panini = require('panini');
var browserSync = require('browser-sync').create();

var paths = {
  scripts: 'src/resources/js/**',
  images: 'src/resources/images/**',
  scss: 'src/resources/scss/**',
  html: './src/{layouts,partials,pages,helpers,data}/**/*'
};

gulp.task('sass', function () {
  return sass(paths.scss, {
  	sourcemap: false, 
  	noCache: true,
  	style: 'compressed'
  })
  .on('error', sass.logError)
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());
});

gulp.task('panini', function() {
  gulp.src('src/pages/**/*.html')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      helpers: 'src/helpers/',
      data: 'src/data/'
    }))
    .pipe(gulp.dest('dist'))
    .on('finish', browserSync.reload);
});

gulp.task('serve', function() {
    browserSync.init({
        proxy: "starter.dev"
    });
});

gulp.task('watch', function() {
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.html, ['panini']);
});


gulp.task('default', ['sass', 'panini', 'serve', 'watch']);
gulp.task('watchonly', ['sass', 'panini', 'watch']);
