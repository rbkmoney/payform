const webpack = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?context=./src/&name=../[path][name].[ext]'
                ],
                exclude: /node_modules/,
                include: path.join(__dirname, '../src'),
            }
        ]
    },
    plugins: [
        new WriteFilePlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true
    }
});