const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            title: 'HTML Webpack Plugin',
        }),
        new webpack.EnvironmentPlugin(['ENDPOINT']),
        new CopyPlugin({
            patterns: [
                { from: './src/style.css', to: 'style.css' }
            ],
        }),
    ]
};