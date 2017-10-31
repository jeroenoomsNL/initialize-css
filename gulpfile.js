'use strict';

const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const rimraf = require('rimraf');
const browserSync = require('browser-sync');
const params = $.util.env;

const config = {
    src: {
        base: 'src',
        scripts: 'src/scripts',
        styles: 'src/styles'
    },
    dist: {
        base: 'dist'
    },
    demo: {
        base: 'dist/demo',
        scripts: 'dist/demo/scripts',
        styles: 'dist/demo/styles'
    },
    autoprefixer: ['last 2 versions', 'Explorer >= 8', 'Firefox >= 25']
};

gulp.task('styles', () => {

    // const filter = $.filter(['initialize.**', '!*.map']);

    return gulp.src(config.src.styles + '/*.scss')
        .pipe($.sass({
            precision: 10,
            sourceMap: true
        }))
        .pipe($.plumber())
        .pipe($.autoprefixer(config.autoprefixer))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest(config.demo.styles));
        // .pipe(filter)
        // .pipe(gulp.dest(config.dist.base))
        // .pipe($.cssmin())
        // .pipe($.rename({suffix: '.min'}))
        // .pipe(gulp.dest(config.dist.base))
        // .pipe($.size({title: 'styles'}));
});

// @TODO: the filter function does not seem to work...
gulp.task('styles.copy', ['styles'], () => {

    return gulp.src(config.demo.styles + '/initialize.css')
        .pipe(gulp.dest(config.dist.base))
        .pipe($.cssmin())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest(config.dist.base))
        .pipe($.size({title: 'styles'}));
});

gulp.task('copy', () => {
    return gulp.src(config.src.styles + '/initialize.*')
        .pipe($.if('initialize.scss', $.rename({basename: '_initialize'})))
        .pipe(gulp.dest(config.dist.base))
        .pipe($.size({title: 'copy'}));
});

gulp.task('html', () => {
    return gulp.src([config.src.base + '/**/*.html'])
        .pipe(gulp.dest(config.demo.base))
        .pipe($.size({title: 'html'}));
});

gulp.task('clean', (cb) => {
    rimraf(config.dist.base, cb);
});

gulp.task('watch', ['build'], () => {
    browserSync.init({
        server: {
            baseDir: './' + config.demo.base
        }
    });

    gulp.watch([config.src.images + '/**/*'], ['images']);
    gulp.watch([config.src.styles + '/**/*.scss'], ['styles.copy']);
    gulp.watch([config.src.scripts + '/**/*.js'], ['scripts']);
    gulp.watch([config.src.base + '/**/*.html'], ['html']);

    browserSync.watch([config.demo.base + '/**/*', config.dist.base + '/**/*']).on('change', browserSync.reload);
});

gulp.task('build', ['styles.copy', 'html', 'copy']);

gulp.task('deploy', ['build'], () => {
    params.message = params.m || params.message;

    const options = {};
    options.message = params.message || 'Update ' + new Date();

    return gulp.src(config.demo.base + '/**/*')
        .pipe($.ghPages(options));
});

gulp.task('default', ['build']);
