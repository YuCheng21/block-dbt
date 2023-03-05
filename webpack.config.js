const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");


module.exports = {
    devtool: 'source-map',
    mode: process.env.NODE_ENV,
    entry: {
        main: './app/static/src/js/main.js',
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
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '**/*',
            ],
        }),
        new CopyPlugin({
            patterns: [
                { from: "node_modules/jquery", to: "node_modules/jquery"},
                { from: "node_modules/bootstrap", to: "node_modules/bootstrap"},
                { from: "node_modules/sweetalert2", to: "node_modules/sweetalert2"},
                { from: "node_modules/bootstrap-table", to: "node_modules/bootstrap-table"},
            ]
        })
    ]
}