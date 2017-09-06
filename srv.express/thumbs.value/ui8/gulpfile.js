'use strict';

var gulp = require('gulp');
var browserify = require('gulp-browserify');
var babel = require('gulp-babel');

var del = require('del');

var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

/*
 * first babel js files in dir es6/, including reactjs to dir src/es5ed
 * then browserify everything in dir src/
 */

gulp.task('hi', ['clean', 'es6', 'scss', 'copy'], () => {
    //console.log('task: hi');
    //return gulp.src('./src/**/*.js')
    return gulp.src('./src/index.js')
       .pipe(browserify({
        // options
        //sourceType: 'module',
       }))
       .pipe(gulp.dest('./dist'));
});

gulp.task('es6', () => {
    // babel transform all js in es6 to es5ed
    return gulp.src('./es6/**/*.js')
       .pipe(babel({
        // options
        presets: ['env', 'react']
       }))
       .pipe(gulp.dest('./src/es5ed'));
});


gulp.task('scss', function () {
    return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))    
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist'));
});

gulp.task('clean', function () {
    return del([
        './dist/**/*',
        './src/es5ed/**/*',
        //'./src/rct/**/*.js',
   ]);
});

gulp.task('copy', function () {
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
});
    
gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['scss']);
    gulp.watch('./es6/**/*.js', ['es6']);
    gulp.watch('./src/**/*.js', ['hi']);
});


