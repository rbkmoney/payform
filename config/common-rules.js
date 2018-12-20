const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const rules = [
    {
        test: /\.(ts|tsx)$/,
        use: [
            {
                loader: 'thread-loader',
                options: {
                    workers: require('os').cpus().length - 1
                }
            },
            'cache-loader',
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    happyPackMode: true
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
];

module.exports = rules;
