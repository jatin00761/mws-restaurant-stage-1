'use strict';

var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var runSequence = require('run-sequence');
var uglify = require('gulp-uglify');

gulp.task('default', ['serve']);
gulp.task('styles', function () {
    return gulp.src('./css/**/*.css')
      // Auto-prefix css styles for cross browser compatibility
      .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
      // Minify the file
      .pipe(csso())
      .pipe(concat('style.min.css'))
      // Output
      .pipe(gulp.dest('./dist/css'))
  });

  gulp.task('scripts', function() {
    return gulp.src('./js/**/*.js')
      // Minify the file
      .pipe(uglify())
      // Output
      .pipe(gulp.dest('./dist/js'))
  });