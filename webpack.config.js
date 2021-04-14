/*
 * @Author: your name
 * @Date: 2021-03-01 23:04:27
 * @LastEditTime: 2021-04-14 20:11:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mod-onion\webpack.config.js
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        main:"./src/index.com.js",
        example:"./test/example.spec.js",
        unitTest:"./test/tests.spec.js",
    },
    mode:"production",
    output: {        
        filename: '[name]-[chunkhash:8]-.js',
        path: path.resolve(__dirname, './dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'TEST',
            chunks:["unitTest"],
            template:path.resolve(__dirname,"./page/test.html"),
            filename: 'test.html',
            hash:true,
        }),
        new HtmlWebpackPlugin({
            title: 'EXAMPLE',
            chunks: ["example"],
            template:path.resolve(__dirname,"./page/index.html"),
            filename: 'example.html',
        }),
        new HtmlWebpackPlugin({
            title: 'INDEX',
            chunks: ["main"],
            template:path.resolve(__dirname,"./page/index.html"),
            filename: 'index.html',
            hash:true,
        })   
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
    // module:{
    //     rules:[            
    //         {
    //             test: /\.js$/,
    //             exclude: /node_modules/, 
    //             loader: "babel-loader"
    //         }
    //     ]
    // },
    devtool: "source-map",
    devServer: {        
        hot: true
    },    
};