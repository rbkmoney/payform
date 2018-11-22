const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const rules = require('./common-rules');

module.exports = {
    name: 'samsung-pay-interaction',
    stats: {
        children: false,
        moduleTrace: false,
        modules: false
    },
    entry: {
        'samsung-pay-interaction': './src/samsung-pay-interaction/index.ts'
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, 'src/samsung-pay-interaction')],
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            formatter: 'codeframe',
            tslint: true
        }),
        new HtmlWebpackPlugin({
            template: './src/samsung-pay-interaction/index.html',
            filename: 'samsung-pay-interaction.html'
        }),
        new CopyWebpackPlugin(
            [{ from: './src/samsung-pay-interaction/assets/js', to: './assets/samsung-pay-interaction/js' }],
            { debug: 'warning' }
        )
    ]
};
