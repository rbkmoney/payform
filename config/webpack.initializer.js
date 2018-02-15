const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    name: 'initializer',
    stats: {
        children: false,
        moduleTrace: false
    },
    entry: {
        checkout: './src/initializer/index.ts'
    },
    resolve: {
        modules: ['node_modules', path.join(__dirname, 'src')],
        extensions: ['.ts', '.js']
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
            }
        ]
    }
};
