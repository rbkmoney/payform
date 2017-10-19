const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    name: 'js',
    entry: {
        '../dist/checkout': path.join(__dirname, '../src/checkout/checkout.js'),
        '../dist/payframe': path.join(__dirname, '../src/payframe/payframe.js'),
        '../dist/v1/app': path.join(__dirname, '../src/app/index.tsx')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname)
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: ['babel-loader', 'eslint-loader'], exclude: /node_modules(?!\/tokenizer)/ },
            { test: /\.(ts|tsx)$/, use: ['awesome-typescript-loader', 'tslint-loader'] },
            {
                test: /\.scss$/,
                exclude: [
                    path.join(__dirname, '../src/checkout'),
                    path.join(__dirname, '../src/payframe')
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'typings-for-css-modules-loader',
                            options: {
                                modules: true,
                                namedExport: true,
                                localIdentName: '[local]___[hash:base64:5]'
                            }
                        },
                        'sass-loader'
                    ]
                }),
            },
            {
                test: /\.(css|scss)$/,
                exclude: path.join(__dirname, '../src/app'),
                use: ExtractTextPlugin.extract({
                    use: [
                        { loader: 'css-loader', options: { minimize: true } },
                        { loader: 'sass-loader' }
                    ],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({ filename: '[name].css' }),
        new CopyWebpackPlugin(
            [
                { from: './src/payframe/payframe.html', to: '../dist/html/' },
                { from: './src/payframe/finishInteraction.html', to: '../dist/html/' },
                { from: './src/payframe/images', to: '../dist/images' },
                { from: './src/appConfig.json', to: '../dist/' },
                { from: './src/locale', to: '../dist/locale' }
            ],
            { debug: 'warning' }
        ),
        new HtmlWebpackPlugin({
            inject: false,
            template: 'src/app/index.html',
            filename: '../dist/v1/checkout.html',
            files: {
                app: './app.js',
                styles: './app.css'
            }
        })
    ]
};