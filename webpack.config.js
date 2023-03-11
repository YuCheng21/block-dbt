const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    devtool: 'source-map',
    mode: process.env.NODE_ENV,
    entry: {
        main: './app/static/src/js/main.js',
    },
    resolve: {
        alias: {
            '@static': path.resolve(__dirname, 'app/static/')
        }
    },
    output: {
        path: path.resolve(__dirname, 'app/static/dist'),
        filename: "js/[name].js",
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.(scss)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    {loader: 'postcss-loader'},
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                ],
            },
            {
                test: /\.(png|jpg|gif|jpe?g|svg)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext]'
                }
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/main.css',
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
            ],
        }),
        new CopyPlugin({
            patterns: [
                {from: "node_modules/jquery", to: "node_modules/jquery"},
                {from: "node_modules/bootstrap", to: "node_modules/bootstrap"},
                {from: "node_modules/sweetalert2", to: "node_modules/sweetalert2"},
                {from: "node_modules/bootstrap-table", to: "node_modules/bootstrap-table"},
                {from: "node_modules/@iconify", to: "node_modules/@iconify"},
            ]
        })
    ]
}