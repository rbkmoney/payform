const path = require('path');
const glob = require('glob');

module.exports = {
    title: 'Payform Style Guide',
    components: function() {
        return glob.sync(path.resolve(__dirname, 'src/app/components/**/*.tsx')).filter(function(module) {
            return /\/[a-z][-a-z0-9]*\.tsx/.test(module);
        });
    },
    getExampleFilename(componentPath) {
        return componentPath.replace(/\.tsx?$/, '.example.md');
    },
    resolver: require('react-docgen').resolver.findAllComponentDefinitions,
    propsParser: require('react-docgen-typescript').withDefaultConfig({ propFilter: { skipPropsWithoutDoc: true } })
        .parse,
    webpackConfig: require('./config/webpack.dev.js')[0]
};
