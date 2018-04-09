const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
            }],
        exclude: '/node_modules/'
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
                        localIdentName: '[local]__[hash:5]'
                    }
                },
                'sass-loader'
            ],
            fallback: 'style-loader'
        })
    },
    {
        test: /\.(jpeg|jpg)$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[hash:8].[ext]',
                outputPath: './assets/',
                mimetype: 'mimetype=image/jpeg',
            }
        }]
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
];

module.exports = rules;
