'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');
var uglify = require('gulp-uglify');
var pump = require('pump');
var gzip = require('gulp-gzip');
var browserSync = require('browser-sync');
var gutil = require('gulp-util');

var $ = require('gulp-load-plugins')();


gulp.task('scripts-reload', function () {
  return buildScripts()
    .pipe(browserSync.stream());
});

gulp.task('scripts', function () {
  return buildScripts();
});

function buildScripts() {
  return gulp.src(path.join(conf.paths.src, '/app/**/*.js'))
    .pipe($.eslint({}))
    .pipe($.eslint.format())
    .pipe(uglify().on('error', gutil.log))
    .pipe(gzip())
    .pipe($.size())
};