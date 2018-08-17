const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const merge = require('webpack-merge');
const checkoutConfig = require('./checkout-config');
const initializerConfig = require('./initializer-config');
const prepareOutputConfig = require('./prepare-output-config');
const samsungPayConfig = require('./samsung-pay-config');

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

const checkoutDevConfig = {
    entry: { development: './src/app/development' }
};

module.exports = [
    prepareModule(merge(checkoutConfig, checkoutDevConfig), `${baseOutput}/v1`),
    prepareModule(samsungPayConfig, `${baseOutput}/v1`),
    prepareModule(initializerConfig, baseOutput)
];
