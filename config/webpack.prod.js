const webpack = require('webpack');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const checkoutConfig = require('./checkout-config');
const initializerConfig = require('./initializer-config');
const samsungPayConfig = require('./samsung-pay-config');
const prepareOutputConfig = require('./prepare-output-config');
const commonConfig = require('./common-config');

const commonProdConfig = {
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled'
        }),
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.css$|\.html$|\.json$/,
            threshold: 10240,
            minRatio: 0.8
        })
    ]
};

const baseOutput = 'dist';

const prepareModule = (env, baseConfig, outputPath, jsPattern, cssPattern) =>
    merge(baseConfig, commonConfig(env), prepareOutputConfig(outputPath, jsPattern, cssPattern), commonProdConfig);

module.exports = (env, { mode }) => [
    prepareModule(mode, checkoutConfig, `${baseOutput}/v1`, '[name].[hash:20]', '[hash:20]'),
    prepareModule(mode, samsungPayConfig, `${baseOutput}/v1`, '[name].[hash:20]', '[hash:20]'),
    prepareModule(mode, initializerConfig, baseOutput)
];
