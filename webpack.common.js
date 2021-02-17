const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
require('dotenv').config({ path: path.join(__dirname, ".env.development") });
const webpack = require('webpack');

const main = [
    "./src/index.tsx",
];

module.exports = {
    context: process.cwd(),
    entry: {
        main
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    devServer: {
        historyApiFallback: true,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{ loader: 'ts-loader', options: { transpileOnly: true } }],
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.(s[ac]ss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(jpg|png|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000
                    }
                }
                ]
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin(["SERVICE_URL"]),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', "index.html"),
            inject: true
        }),
        new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false }),
    ]
}