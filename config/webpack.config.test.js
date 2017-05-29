const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        '../dist/checkout': path.join(__dirname, '../src/checkout/checkout.js'),
        '../dist/payframe': path.join(__dirname, '../src/payframe/payframe.js')
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {loader: 'css-loader', options: {minimize: true}},
                        {loader: 'sass-loader'}
                    ],
                    fallback: 'style-loader'
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({filename: '[name].css'})
    ],
    externals: {
        'react/addons': 'react',
        'react/lib/ExecutionEnvironment': 'react',
        'react/lib/ReactContext': 'react'
    }
};
