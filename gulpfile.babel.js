import gulp from 'gulp';
import connect from 'gulp-connect';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import eslint from 'gulp-eslint';
import livereload from 'gulp-livereload';
import pug from 'gulp-pug';
import nodemon from 'gulp-nodemon';
import concat from 'gulp-concat';

const config = {
    dist: 'dist',
    payframeDist: 'dist/payframe',
    payformDist: 'dist/payform'
};

gulp.task('lint', () => {
    return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('bundlePayframe', () => {
    return browserify({
        entries: 'src/payframe/payframe.js',
        extensions: ['.js'],
        debug: true
    }).transform('babelify').bundle()
        .pipe(source('payframe.js'))
        .pipe(gulp.dest(config.payframeDist))
        .pipe(livereload());
});

gulp.task('bundlePayform', () => {
    return browserify({
        entries: 'src/payform/payform.js',
        extensions: ['.js'],
        debug: true
    }).transform('babelify').bundle()
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
    return gulp.src('src/payform/styles/**/*.css')
        .pipe(concat('payform.css'))
        .pipe(gulp.dest(config.payformDist))
        .pipe(livereload());
});

gulp.task('copyPayformImages', () => {
    return gulp.src('src/payform/images/**/*')
        .pipe(gulp.dest(`${config.payformDist}/images`))
        .pipe(livereload());
});

gulp.task('copyPaymentLib', () => {
    return gulp.src('src/payform/payment/payment.js')
        .pipe(gulp.dest(`${config.payformDist}/payment`))
        .pipe(livereload());
});

gulp.task('copyConfig', () => {
    return gulp.src('src/appConfig.json')
        .pipe(gulp.dest(`${config.dist}`))
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
    var started = false;
    return nodemon({
        script: 'sample/backend.js'
    }).on('start', () => {
        if (!started) {
            cb();
            started = true;
        }
    });
});

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch('src/payform/**/*.js', ['bundlePayform', 'copyPaymentLib']);
    gulp.watch('src/payframe/**/*.js', ['bundlePayframe']);
    gulp.watch('src/payform/payform.pug', ['buildTemplate']);
    gulp.watch('src/**/*.css', ['copyPayformStyles']);
    gulp.watch('src/**/*.css', ['copyPayframeStyles']);
    gulp.watch('src/payform/images/**/*', ['copyPayformImages']);
});

gulp.task('build', ['bundlePayframe', 'bundlePayform', 'buildTemplate', 'copyPayformStyles',
    'copyPayframeStyles', 'copyPayformImages', 'copyPaymentLib', 'copyConfig']);
gulp.task('develop', ['watch', 'runPayform', 'runSample', 'build']);
gulp.task('default', ['build']);
