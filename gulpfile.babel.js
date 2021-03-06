'use strict';

var gulp = require('gulp');
var wrench = require('wrench');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var gzip = require('gulp-gzip');
/**
 *  This will load all js or coffee files in the gulp directory
 *  in order to load all gulp tasks
 */
wrench.readdirSyncRecursive('./gulp').filter(function (file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function (file) {
  require('./gulp/' + file);
});


/**
 *  Default task clean temporaries directories and launch the
 *  main optimization build task
 */
gulp.task('default', ['clean'], function () {
  gulp.pipe(babel({presets: ['babili']}))
    .start('build');
});