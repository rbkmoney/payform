const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?context=./src/&name=../dist/[path][name].[ext]'
                ],
                exclude: /node_modules/,
                include: path.join(__dirname, '../src'),
            }
        ]
    },
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
                join_vars: true,
            }
        })
    ]
});