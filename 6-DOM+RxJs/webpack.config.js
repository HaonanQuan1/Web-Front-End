const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let outDirectory = path.resolve(__dirname, 'dist');
let outputFilename = '[name].js';

module.exports = {
    mode: 'production',
    entry: {
        index: './index.js'
    },
    output: {
        filename: outputFilename,
        chunkFilename: '[name].bundle.js',
        path: outDirectory,
        publicPath: '/'
    },
    // optimization: {
    //         splitChunks: {
    //         chunks: 'all'
    //     }
    // },
    devServer: {
        contentBase: outDirectory
    },
    module: {

        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.json$/,
                use: 'json-loader'
            },
        ],
        
        
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
};