const webpack = require('webpack');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const checkoutConfig = require('./checkout-config');
const initializerConfig = require('./initializer-config');
const prepareOutputConfig = require('./prepare-output-config');

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

const baseOutput = 'dist';

const prepareModule = (baseConfig, outputPath, jsPattern, cssPattern) =>
    merge(merge(baseConfig, prepareOutputConfig(outputPath, jsPattern, cssPattern)), commonProdConfig);

module.exports = [
    prepareModule(checkoutConfig, `${baseOutput}/v1`, '[name].[hash:20]', '[hash:20]'),
    prepareModule(initializerConfig, baseOutput)
];
