var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pipeline = require('readable-stream').pipeline;
var rename = require("gulp-rename");
const babel = require('gulp-babel');
var browserify = require('gulp-browserify');
gulp.task('build:source', function () {
  return pipeline(
        gulp.src('src/loaderx.js'),
        babel({
            presets: ['@babel/env']
        }),
        browserify({
         insertGlobals : true
        }),
        gulp.dest('dist')
  );
});
gulp.task('build:min', function () {
    return pipeline(
          gulp.src('src/loaderx.js'),
          babel({
              presets: ['@babel/env']
          }),
          browserify({
            insertGlobals : true
          }),
          uglify(),
          rename({ suffix: '.min' }),
          gulp.dest('dist')
    );
  });
gulp.task('default', gulp.parallel('build:source', 'build:min', function (val) {
    console.log('打包完成')
    val()
}))