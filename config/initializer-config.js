const path = require('path');
const { CheckerPlugin } = require('awesome-typescript-loader');
const rules = require('./common-rules');

module.exports = {
    name: 'initializer',
    stats: {
        children: false,
        moduleTrace: false,
        modules: false
    },
    entry: {
        checkout: './src/initializer/index.ts'
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, 'src/initializer')],
        extensions: ['.ts', '.js']
    },
    module: {
        rules
    },
    plugins: [new CheckerPlugin()]
};
