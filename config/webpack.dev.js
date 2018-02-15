const path = require('path');
const helpers = require('./helpers');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const checkoutConfig = require('./webpack.checkout');
const initializerConfig = require('./webpack.initializer');

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

const prepareDevConfig = (baseConfig, outputPath) => merge(baseConfig, {
    output: {
        filename: '[name].js',
        path: helpers.root(outputPath),
        publicPath: '/'
    },
    plugins: [
        new ExtractTextPlugin({filename: '[name].css'})
    ]
});

module.exports = [
    merge(prepareDevConfig(checkoutConfig, 'dist/v1'), commonDevConfig),
    merge(prepareDevConfig(initializerConfig, 'dist'), commonDevConfig)
];
