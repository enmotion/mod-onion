/*
 * @Author: your name
 * @Date: 2021-03-01 23:04:27
 * @LastEditTime: 2021-03-05 11:48:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mod-onion\webpack.config.js
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        main:"./src/index.js",
        example:"./test/example.spec.js",
        test:"./test/tests.spec.js",
    },
    mode:"production",
    output: {        
        filename: '[name].min.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new CleanWebpackPlugin({
            protectWebpackAssets: true,
        }),  
    ],
    optimization: {
        minimize: true,
        minimizer: [ new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            terserOptions: {
                output: {
                    comments: false,
                },
            },
            extractComments: true,
        })],
    },
    devtool: "source-map",
    devServer: {        
        hot: true
    },    
};