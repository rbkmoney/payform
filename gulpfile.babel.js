import gulp from 'gulp';
import connect from 'gulp-connect';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import eslint from 'gulp-eslint';
import livereload from 'gulp-livereload';
import concat from 'gulp-concat';
import sass from 'gulp-sass';
import rename from 'gulp-rename';

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

gulp.task('copyIndex', () => {
    return gulp.src('src/checkout/checkout.html')
        .pipe(gulp.dest(config.checkoutDist))
        .pipe(livereload());
});

gulp.task('copyPayframeStyles', () => {
    return gulp.src('src/payframe/payframe.css')
        .pipe(gulp.dest(config.payframeDist))
        .pipe(livereload());
});

gulp.task('copyCheckoutStyles', () => {
    return gulp.src('src/checkout/styles/**/*.css')
        .pipe(concat('checkout.css'))
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

gulp.task('watch', () => {
    livereload.listen();
    gulp.watch('src/**/*.js', ['bundleCheckout', 'bundlePayframe']);
    gulp.watch('src/checkout/checkout.html', ['copyIndex']);
    gulp.watch('src/**/*.css', ['copyPayframeStyles', 'copyCheckoutStyles']);
    gulp.watch('src/payform/images/**/*', ['copyCheckoutImages']);
    gulp.watch('src/appConfig.json', ['copyConfig']);
});

gulp.task('sass', function () {
    return gulp.src('./new-markup/**/checkout.scss')
        .pipe(sass())
        .pipe(rename('checkout.css'))
        .pipe(gulp.dest('./new-markup'))
        .pipe(livereload());
});

gulp.task('sass:watch', function () {
    gulp.watch('./new-markup/**/*.scss', ['sass']);
});

gulp.task('newRun', () => {
    connect.server({
        root: 'new-markup',
        host: '127.0.0.1',
        port: 7050
    });
});

gulp.task('build', ['lint', 'bundlePayframe', 'bundleCheckout', 'copyIndex', 'copyCheckoutStyles',
    'copyPayframeStyles', 'copyCheckoutImages', 'copyConfig']);
gulp.task('develop', ['watch', 'runPayform', 'build']);
gulp.task('default', ['build']);
gulp.task('new', ['sass:watch', 'newRun']);
