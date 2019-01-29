const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    name: 'checkout',
    stats: {
        children: false,
        moduleTrace: false,
        modules: false
    },
    entry: {
        app: ['./src/app/polyfills.ts', './src/app/index.tsx']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, 'src/app')],
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            checkout: __dirname + '/../src/app'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/app/index.html',
            filename: 'checkout.html'
        }),
        new CopyWebpackPlugin(
            [
                { from: './src/app/finish-interaction.html' },
                { from: './src/appConfig.json', to: '..' },
                { from: './src/locale/*.json', to: './locale', flatten: true }
            ],
            { debug: 'warning' }
        )
    ]
};
