const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry:{
        background: './src/background/index.js',
        popup: './src/popup/popup.js',
        content: './src/content/content.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"}
                ]
            },
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "./images/[name].[ext]",
                    },
                },
            },
        ],
    },plugins: [
        new ExtractTextPlugin({filename: 'style.css'}),
        new HtmlWebpackPlugin(
            {
                inject: false,
                filename: 'index.html',
                template: './src/index.html'
            }
        ),
        new CleanWebpackPlugin('dist',{}),
        new CopyWebpackPlugin([
            {from: './src/manifest.json'},
            {from: './src/images', to: './images'}
            ]
        )
    ]
}