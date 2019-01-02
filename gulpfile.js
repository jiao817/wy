var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var clean = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var path = require('path');
var url = require('url');
var fs = require('fs');

gulp.task('sass', function() {
    return gulp.src("./src/scss/index.scss")
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))
});
gulp.task('minwatch', function() {
    return gulp.watch("./src/scss/index.scss", gulp.series('sass'))
});

gulp.task('server', function() {
    return gulp.src("./src/index.html")
        .pipe(webserver({
            port: 3060,
            open: true,
            livereload: true,

        }))
})

gulp.task("default", gulp.series("sass", "server", "minwatch"))

//压缩css
gulp.task("minsass", function() {
    return gulp.src("./src/scss/index.scss")
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest('./dist/css/'))
});
//合并压缩js
gulp.task("minjs", function() {
    return gulp.src("./src/js/**/*.js")
        .pipe(uglify())
        .pipe(concat("all.js"))
        .pipe(gulp.dest('./dist/js/'))
})