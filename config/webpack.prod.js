const webpack = require('webpack');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const checkoutConfig = require('./checkout-config');
const initializerConfig = require('./initializer-config');
const prepareOutputConfig = require('./prepare-output-config');

const commonProdConfig = {
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.UglifyJsPlugin(),
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
