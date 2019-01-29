const path = require('path');

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
    }
};
