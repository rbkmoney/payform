const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    name: 'js',
    entry: {
        '../dist/payframe/payframe': path.join(__dirname, '../src/payframe/payframe.js'),
        '../dist/checkout/checkout': path.join(__dirname, '../src/checkout/checkout.js')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname),
    },
    module: {
        rules: [
            { enforce: 'pre', test: /\.js$/, exclude: /node_modules/, loader: 'eslint-loader' },
            { test: /\.(js|jsx)$/, use: 'babel-loader' },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: "css-loader" },
                        { loader: "sass-loader" }
                    ],
                    fallback: 'style-loader'

                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename: '[name].css'}),
        new CopyWebpackPlugin(
            [
                { from: './src/checkout/checkout.html', to: '../dist/checkout/' },
                { from: './src/checkout/images', to: '../dist/checkout/images/' },
                { from: './src/appConfig.json', to: '../dist/' }
            ],
            { debug: 'warning' }
        ),
    ]
};