const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = (env) => ({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: 'pre',
                use: [
                    {
                        loader: 'tslint-loader',
                        options: {}
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            useBabel: true,
                            babelOptions: {
                                babelrc: false,
                                presets: [
                                    [
                                        '@babel/preset-env',
                                        {
                                            targets: '> 0.5%, last 2 versions, ie >= 9, Firefox ESR, not dead',
                                            modules: false
                                        }
                                    ]
                                ],
                                plugins: [
                                    '@babel/plugin-transform-runtime',
                                    [
                                        'babel-plugin-styled-components',
                                        {
                                            ssr: false,
                                            displayName: env === 'development',
                                            minify: env === 'production',
                                            transpileTemplateLiterals: env === 'production'
                                        }
                                    ]
                                ]
                            },
                            babelCore: '@babel/core'
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
    plugins: [new CheckerPlugin()]
});
