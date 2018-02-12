const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    stats: {
        children: false,
        moduleTrace: false
    },
    entry: {
        '../dist/checkout': path.join(__dirname, '../src/initializer/index.ts'),
        '../dist/v1/app': path.join(__dirname, '../src/app/index.tsx')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname)
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            checkout: __dirname + '/../src/app'
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                enforce: 'pre',
                loader: 'tslint-loader',
                options: {
                    emitErrors: false,
                    formatter: 'codeFrame'
                }
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'awesome-typescript-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                modules: true,
                                namedExport: true,
                                localIdentName: '[local]___[hash:base64:5]'
                            }
                        },
                        'sass-loader'
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
                {from: './src/app/finish-interaction.html', to: '../dist/v1/'},
                {from: './src/appConfig.json', to: '../dist/'},
                {from: './src/locale', to: '../dist/locale'},
                {from: './src/app/assets', to: '../dist/v1/assets'}
            ],
            {debug: 'warning'}
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