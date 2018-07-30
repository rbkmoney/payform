const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const rules = require('./common-rules');

module.exports = {
    name: 'samsung-pay',
    stats: {
        children: false,
        moduleTrace: false,
        modules: false
    },
    entry: {
        'samsung-pay': './src/samsung-pay/index.tsx',
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, 'src/samsung-pay')],
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['samsung-pay']
        }),
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            formatter: 'codeframe',
            tslint: true
        }),
        new HtmlWebpackPlugin({
            template: './src/samsung-pay/index.html',
            filename: 'samsung-pay.html'
        }),
        new CopyWebpackPlugin(
            [
                {from: './src/samsung-pay/assets/js', to: './assets/samsung-pay/js'},
            ],
            {debug: 'warning'}
        )
    ]
};
