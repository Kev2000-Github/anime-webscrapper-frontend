const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    output: {
        filename: "[name]-bundle.js",
        path: path.join(__dirname, "dist"),
        publicPath: '/'
    },
    mode: "development",
    devtool: 'source-map',
});