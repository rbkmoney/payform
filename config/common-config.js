const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const os = require('os');

module.exports = (env) => ({
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: Math.round(os.cpus().length / 2)
                        }
                    },
                    'cache-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                            happyPackMode: true,
                            // TODO: после закрытия issue https://github.com/Igorbek/typescript-plugin-styled-components/issues/14
                            // добавить минификацию styled-components под prod
                            ...(env === 'development'
                                ? { getCustomTransformers: path.join(__dirname, './ts-transformers.js') }
                                : {})
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true,
                            modules: true,
                            namedExport: true,
                            localIdentName: '[local]__[hash:5]'
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpeg|jpg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash:8].[ext]',
                            outputPath: './assets/',
                            mimetype: 'mimetype=image/jpeg'
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash:8].[ext]',
                            mimetype: 'mimetype=application/font-woff',
                            outputPath: './fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                oneOf: [
                    {
                        loader: 'svg-react-loader',
                        issuer: /\.tsx?$/,
                        options: {
                            classIdPrefix: '[name]-[hash:8]__',
                            uniqueIdPrefix: true
                        }
                    }
                ],
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            checkSyntacticErrors: true,
            formatter: 'codeframe',
            tslint: true
        })
    ]
});
