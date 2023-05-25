const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './src/main-page.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [new HtmlWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
    mode: 'development'
}