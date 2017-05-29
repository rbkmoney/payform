const webpackConfig = require('./webpack.config.test');

module.exports = function (config) {
    config.set({
        basePath: __dirname,
        frameworks: ['mocha', 'chai', 'sinon'],
        reporters: ['mocha'],
        mochaReporter: {
            showDiff: true
        },
        browsers: ['Chrome'],
        files: [
            {
                pattern: 'karma-test-shim.js',
                watched: false
            }
        ],
        preprocessors: {
            'karma-test-shim.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'errors-only'
        },
        webpackServer: {
            noInfo: true
        }
    });
};
