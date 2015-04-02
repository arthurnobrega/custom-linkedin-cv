// gulp
var gulp = require('gulp');

// plugins
var serve = require('gulp-serve');
var sass = require('gulp-sass');
var minifycss = require('gulp-minify-css');
var livereload = require('gulp-livereload');


gulp.task('default', function () {
    gulp.start('serve', 'watch');
});

gulp.task('serve', serve('app'));

gulp.task('watch', function() {
  gulp.watch('./app/assets/styles/*.scss', ['sass']);

  // Create LiveReload server
  livereload.listen({basePath: 'app/'});

  // Watch any files in src/, reload on change
  gulp.watch([
    'app/assets/images/**/*',
    'app/assets/styles/*.css',
    'app/**/*.html',
    'app/**/*.js'
    ]).on('change', livereload.changed);
});

gulp.task('sass', function() {
  return gulp.src('app/assets/styles/main.scss')
    .pipe(sass({ style: 'expanded' }))
    // .pipe(minifycss())
    .pipe(gulp.dest('app/assets/styles'));
});