const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const WriteFilePlugin = require('write-file-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
    devtool: 'source-map',
    plugins: [
        new WriteFilePlugin({
            log: false
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true,
        disableHostCheck: true,
        stats: {
            children: false,
            chunks: false
        }
    }
});