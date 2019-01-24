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
        app: './src/app/index.tsx',
        react: './src/app/react.ts',
        vendor: './src/app/vendor.ts',
        polyfills: './src/app/polyfills.ts'
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
