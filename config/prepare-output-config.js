const helpers = require('./helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const prepareOutputConfig = (outputPath, jsFilenamePattern = '[name]', cssFilenamePattern = '[name]') => ({
    output: {
        filename: `${jsFilenamePattern}.js`,
        path: helpers.root(outputPath),
        publicPath: './'
    },
    plugins: [
        new ExtractTextPlugin({filename: `${cssFilenamePattern}.css`})
    ]
});

module.exports = prepareOutputConfig;
