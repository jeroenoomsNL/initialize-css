'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var rimraf = require('rimraf');
var browserSync = require('browser-sync');
var params = $.util.env;

var config = {
    src: {
        base: 'src',
        images: 'src/images',
        scripts: 'src/scripts',
        styles: 'src/styles'
    },
    dist: {
        base: 'dist',
        images: 'dist/images',
        scripts: 'dist/scripts',
        styles: 'dist/styles'
    },
    autoprefixer: ['last 2 versions', 'Explorer >= 8', 'Firefox >= 25']
};

gulp.task('styles', function () {
    return $.rubySass(config.src.styles + '/*.scss', {
            precision: 10,
            sourcemap: params.production ? false : true,
            style: params.production ? 'compressed' : 'expanded',
            loadPath: ['node_modules']
        })
        .on('error', function(error) {
            console.log(error);
        })
        .pipe($.plumber())
        .pipe($.autoprefixer(config.autoprefixer))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.dist.styles))
        .pipe($.size({title: 'styles'}));
});

gulp.task('images', function () {
    return gulp.src([config.src.images + '/**/*'])
        .pipe($.plumber())
        .pipe(gulp.dest(config.dist.scripts))
        .pipe($.size({title: 'images'}));
});

gulp.task('scripts', function () {
    return gulp.src([config.src.scripts + '/**/*.js'])
        .pipe($.plumber())
        .pipe(params.production ? $.uglify() : $.util.noop())
        .pipe(gulp.dest(config.dist.scripts))
        .pipe($.size({title: 'scripts'}));
});

gulp.task('html', function () {
    return gulp.src([config.src.base + '/**/*.html'])
        .pipe(gulp.dest(config.dist.base))
        .pipe($.size({title: 'html'}));
});

gulp.task('jshint', function () {
    gulp.src([config.src.scripts + '/**/*.js'])
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('clean', function (cb) {
    rimraf(config.dist.base, cb);
});

gulp.task('watch', ['build'], function () {
    browserSync.init({
        reloadDelay: 100,
        server: {
            baseDir: './' + config.dist.base
        }
    });

    gulp.watch([config.src.images + '/**/*'], ['images']);
    gulp.watch([config.src.styles + '/**/*.scss'], ['styles']);
    gulp.watch([config.src.scripts + '/**/*.js'], ['scripts']);
    gulp.watch([config.src.base + '/**/*.html'], ['html']);

    gulp.watch(config.dist.base + '/**/*').on('change', browserSync.reload);
});

gulp.task('build', ['jshint', 'scripts', 'images', 'styles', 'html']);

gulp.task('deploy', ['build'], function() {
    params.message = params.m || params.message;

    var options = {};
    options.message = params.message || 'Update ' + new Date();

    return gulp.src(config.dist.base + '/**/*')
        .pipe($.ghPages(options));
});

gulp.task('default', ['build']);
