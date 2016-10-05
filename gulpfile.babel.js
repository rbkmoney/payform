import gulp from 'gulp';
import connect from 'gulp-connect';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import eslint from 'gulp-eslint';
import livereload from 'gulp-livereload';
import pug from 'gulp-pug';

const config = {
    payframeDist: 'dist/payframe',
    payformDist: 'dist/payform'
};

gulp.task('lint', () => {
    return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('bundlePayframe', ['lint'], () => {
    return browserify({
        entries: 'src/payframe/payframe.js',
        extensions: ['.js'],
        debug: true
    }).transform("babelify").bundle()
        .pipe(source('payframe.js'))
        .pipe(gulp.dest(config.payframeDist))
        .pipe(livereload());
});

gulp.task('bundlePayform', ['lint'], () => {
    return browserify({
        entries: 'src/payform/payform.js',
        extensions: ['.js'],
        debug: true
    }).transform("babelify").bundle()
        .pipe(source('payform.js'))
        .pipe(gulp.dest(config.payformDist))
        .pipe(livereload());
});

gulp.task('buildTemplate', () => {
    return gulp.src('src/payform/payform.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(config.payformDist))
        .pipe(livereload());
});

gulp.task('copyPayframeStyles', () => {
    return gulp.src('src/payframe/payframe.css')
        .pipe(gulp.dest(config.payframeDist))
        .pipe(livereload());
});

gulp.task('copyPayformStyles', () => {
    return gulp.src('src/payform/payform.css')
        .pipe(gulp.dest(config.payformDist))
        .pipe(livereload());
});

gulp.task('runPayform', () => {
    connect.server({
        root: 'dist',
        host: '127.0.0.1',
        port: 7050
    });
});

gulp.task('runSample', () => {
    connect.server({
        root: 'sample',
        host: '127.0.0.1',
        port: 7051
    });
});

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch('src/payform/**/*.js', ['bundlePayform']);
    gulp.watch('src/payframe/**/*.js', ['bundlePayframe']);
    gulp.watch('src/payform/payform.pug', ['buildTemplate']);
    gulp.watch('src/**/*.css', ['copyStyles']);
});

gulp.task('build', ['bundlePayframe', 'bundlePayform', 'buildTemplate', 'copyPayformStyles', 'copyPayframeStyles']);
gulp.task('develop', ['watch', 'runPayform', 'runSample', 'build']);
gulp.task('default', ['build']);
