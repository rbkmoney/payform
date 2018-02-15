const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const helpers = require('./helpers');
const checkoutConfig = require('./webpack.checkout');
const initializerConfig = require('./webpack.initializer');

const commonProdConfig = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true
            },
            comments: false
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled'
        })
    ]
};

const checkoutProdConfig = {
    output: {
        filename: '[hash:20].js',
        path: helpers.root('dist/v1'),
        publicPath: '/'
    },
    plugins: [
        new ExtractTextPlugin({filename: '[hash:20].css'})
    ]
};

const initializerProdConfig = {
    output: {
        filename: '[name].js',
        path: helpers.root('dist'),
        publicPath: '/'
    },
    plugins: [
        new ExtractTextPlugin({filename: '[name].css'})
    ]
};

module.exports = [
    merge(merge(checkoutConfig, checkoutProdConfig), commonProdConfig),
    merge(merge(initializerConfig, initializerProdConfig), commonProdConfig)
];
