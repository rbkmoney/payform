const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const merge = require('webpack-merge');
const checkoutConfig = require('./checkout-config');
const initializerConfig = require('./initializer-config');
const prepareOutputConfig = require('./prepare-output-config');

const commonDevConfig = {
    devtool: 'source-map',
    plugins: [
        new WriteFilePlugin({
            log: false
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        disableHostCheck: false,
        stats: 'minimal'
    }
};

const baseOutput = 'dist';

const prepareModule = (baseConfig, outputPath) =>
    merge(merge(baseConfig, prepareOutputConfig(outputPath)), commonDevConfig);

module.exports = [
    prepareModule(checkoutConfig, `${baseOutput}/v1`),
    prepareModule(initializerConfig, baseOutput)
];
