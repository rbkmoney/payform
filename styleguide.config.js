const path = require('path');
const glob = require('glob');

module.exports = {
    title: 'Checkout Style Guide',
    components: () =>
        glob.sync(path.resolve(__dirname, 'src/app/components/**/*.tsx')).filter((module) => {
            return /\/[a-z][-a-z0-9]*\.tsx/.test(module);
        }),
    getExampleFilename: (componentPath) => componentPath.replace(/\.tsx?$/, '.example.md'),
    resolver: require('react-docgen').resolver.findAllComponentDefinitions,
    propsParser: require('react-docgen-typescript').withDefaultConfig().parse,
    webpackConfig: require('./config/webpack.dev.js')[0]
};
