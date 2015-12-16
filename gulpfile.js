//include gulp
var gulp      = require('gulp'),
    jshint    = require('gulp-jshint'),
    sass      = require('gulp-sass'),
    concat    = require('gulp-concat'),
    uglify    = require('gulp-uglify'),
    rename    = require('gulp-rename'),
    clean     = require('gulp-clean'),
    webserver = require('gulp-webserver');

var paths = {
    source: {
        root: './',
        js: './js/**/*.js',
        sass: './sass/**/*.scss',
        css: './css/**'
    },
    dist: {
        css: 'css'
    }
};

// =========== GENERAL =============

//lint task
gulp.task('lint',function(){
    return gulp.src(paths.source.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// =========== DEVELOPMENT =============

//CSS - compile less
gulp.task('css.dev',function(){
    gulp.src('sass/all.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest(paths.dist.css));
   
});

//WEB SERVER
gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver({
            host: '0.0.0.0',
            livereload: false,
            directoryListing: false,
            open: true,
            fallback: 'index.html'
        }));
});

//Watch files for changes
gulp.task('watch',function(){
    gulp.watch(paths.source.js,{interval: 1000},['lint']);
    gulp.watch(paths.source.sass,{interval: 1000},['css.dev']);
});

//Default task
gulp.task('default',['lint','css.dev','watch','webserver']);