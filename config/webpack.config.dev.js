const webpack = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    plugins: [
        new WriteFilePlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        compress: true
    }
});