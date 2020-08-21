const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {

    entry: ['./src/index.tsx', './src/reset.css'],

    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },

    // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [

            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            },

            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader",  options: {   modules: true  }}
                    ]
            },
            { test: /\.scss$/, use: [
                    { loader: "style-loader" },
                    { loader: "css-modules-typescript-loader"},
                    { loader: "css-loader", options: { modules: false } },
                    { loader: "sass-loader" },
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [ 'file-loader' ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
