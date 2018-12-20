const helpers = require('./helpers');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prepareOutputConfig = (outputPath, jsFilenamePattern = '[name]', cssFilenamePattern = '[name]') => ({
    output: {
        filename: `${jsFilenamePattern}.js`,
        path: helpers.root(outputPath),
        publicPath: './'
    },
    plugins: [new MiniCssExtractPlugin({ filename: `${cssFilenamePattern}.css` })]
});

module.exports = prepareOutputConfig;
