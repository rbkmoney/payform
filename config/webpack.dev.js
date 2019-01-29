const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const merge = require('webpack-merge');
const checkoutConfig = require('./checkout-config');
const initializerConfig = require('./initializer-config');
const prepareOutputConfig = require('./prepare-output-config');
const samsungPayConfig = require('./samsung-pay-config');
const commonConfig = require('./common-config');

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

const prepareModule = (env, baseConfig, outputPath) =>
    merge(baseConfig, commonConfig(env), prepareOutputConfig(outputPath), commonDevConfig);

module.exports = (env, { mode }) => [
    prepareModule(mode, checkoutConfig, `${baseOutput}/v1`),
    prepareModule(mode, samsungPayConfig, `${baseOutput}/v1`),
    prepareModule(mode, initializerConfig, baseOutput)
];
