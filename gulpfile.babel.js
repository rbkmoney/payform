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
    checkoutDist: 'dist/checkout'
};

gulp.task('lint', () => {
    return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('bundleCheckout', () => {
    return browserify({
        entries: 'src/checkout/checkout.js',
        extensions: ['.js'],
        debug: true
    }).transform('babelify').bundle()
        .pipe(source('checkout.js'))
        .pipe(gulp.dest(config.checkoutDist))
        .pipe(livereload());
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

gulp.task('buildTemplate', () => {
    return gulp.src('src/checkout/checkout.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(config.checkoutDist))
        .pipe(livereload());
});

gulp.task('copyPayframeStyles', () => {
    return gulp.src('src/payframe/payframe.css')
        .pipe(gulp.dest(config.payframeDist))
        .pipe(livereload());
});

gulp.task('copyCheckoutStyles', () => {
    return gulp.src('src/payform/styles/**/*.css')
        .pipe(concat('payform.css'))
        .pipe(gulp.dest(config.checkoutDist))
        .pipe(livereload());
});

gulp.task('copyCheckoutImages', () => {
    return gulp.src('src/checkout/images/**/*')
        .pipe(gulp.dest(`${config.checkoutDist}/images`))
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
    gulp.watch('src/**/*.js', ['bundleCheckout', 'bundlePayframe']);
    gulp.watch('src/checkout/checkout.pug', ['buildTemplate']);
    gulp.watch('src/**/*.css', ['copyPayframeStyles', 'copyCheckoutStyles']);
    gulp.watch('src/payform/images/**/*', ['copyCheckoutImages']);
});

gulp.task('build', ['bundlePayframe', 'bundleCheckout', 'buildTemplate', 'copyCheckoutStyles',
    'copyPayframeStyles', 'copyCheckoutImages', 'copyConfig']);
gulp.task('develop', ['watch', 'runPayform', 'runSample', 'build']);
gulp.task('default', ['build']);
