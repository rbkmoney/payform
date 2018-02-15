const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    name: 'checkout',
    stats: {
        children: false,
        moduleTrace: false
    },
    entry: {
        app: './src/app/index.tsx'
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, 'src')],
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
                loader: 'awesome-typescript-loader',
                exclude: '/node_modules/',
                options: {
                    useCache: true
                }
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
                                localIdentName: '[local]__[hash:8]'
                            }
                        },
                        'sass-loader'
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(woff|woff2)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[hash:8].[ext]',
                        mimetype: 'mimetype=application/font-woff',
                        outputPath: './fonts/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/app/index.html',
            filename: 'checkout.html'
        }),
        new CopyWebpackPlugin(
            [
                {from: './src/app/finish-interaction.html'},
                {from: './src/appConfig.json', to : '..'},
                {from: './src/locale/*.json', to: './locale', flatten: true},
                {from: './src/app/assets', to: './assets'}
            ],
            {debug: 'warning'}
        )
    ]
};
