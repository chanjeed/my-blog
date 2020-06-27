const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const dotenv = require('dotenv').config();
console.log(dotenv);
module.exports = {
    entry: {
        index: './src/pages/index.js',
        add: './src/pages/add.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(png|jpg|gif|svg|otf|eot|ttf|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [['@babel/preset-env', {
                            targets: {
                                esmodules: true,
                            }
                        }]],
                    },
                },
            },
        ],
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(dotenv.parsed)
        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'index.html',
            template: `${__dirname}/src/pages/index.html`,
            favicon: `${__dirname}/src/assets/favicon.ico`,
            inject: 'body',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            hash: true,
            filename: 'add.html',
            template: `${__dirname}/src/pages/add.html`,
            favicon: `${__dirname}/src/assets/favicon.ico`,
            inject: 'body',
            chunks: ['add'],
        }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        publicPath: '/',
        hot: true,
        port: 8080,
    },
};