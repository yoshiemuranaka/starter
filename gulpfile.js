var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var panini = require('panini');
var uglify = require('gulp-uglify');
var del = require('del');
var browserSync = require('browser-sync').create();

var paths = {
  scripts: 'src/resources/js/**/*',
  images: 'src/resources/images/**',
  scss: 'src/resources/scss/**',
  html: 'src/{layouts,partials,pages,helpers,data}/**/*'
};

gulp.task('clean:all', function () {
  return del([
    'dist/**/*',
  ]);
});

gulp.task('clean:scripts', function () {
  return del([
    'dist/scripts/**/*',
  ]);
});

gulp.task('clean:images', function () {
  return del([
    'dist/images/**/*',
  ]);
});


/*
Task for compiling Sass files
*/
gulp.task('sass', function () {
  return sass(paths.scss, {
  	sourcemap: false, 
  	noCache: true,
  	style: 'compressed'
  })
  .on('error', sass.logError)
  .pipe(gulp.dest('dist/stylesheets'))
  .pipe(browserSync.stream());
});

/*
Task to minify JavaScript files
*/
gulp.task('uglify', function() {
  return gulp.src(paths.scripts)
    .pipe(uglify())
    .pipe(gulp.dest('dist/scripts'));
});

/*
Task to compile HTML
*/
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
  gulp.watch(paths.scripts, ['uglify']);
  gulp.watch(paths.html, ['panini']);
});


gulp.task('default', ['sass', 'uglify', 'panini', 'serve', 'watch']);
gulp.task('watchonly', ['sass', 'uglify', 'panini', 'watch']);


