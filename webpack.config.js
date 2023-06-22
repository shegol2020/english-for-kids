const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

const cards = require("./cards.json");

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {

    entry: {
        main: './src/main-page.js',
        cards: './src/cards-page.js',
        common: "./src/common.js"
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
        ]
    },

    // Path and filename of your result bundle.
    // Webpack will bundle all JavaScript into this file
    output: {
        assetModuleFilename: '[path][name].[ext]',
        path: path.join(__dirname, 'dist'),
        publicPath: '',
        filename: "[name].bundle.js", // the file name would be my entry"s name with a ".bundle.js" suffix
    },

    // Default mode for Webpack is production.
    // Depending on mode Webpack will apply different things
    // on the final bundle. For now, we don't need production's JavaScript
    // minifying and other things, so let's set mode to development
    mode: 'development',

    plugins: [
        new HtmlWebpackPlugin({
            template: './templates/main-page.hbs',
            chunks: [ "common", "main-page" ],
            filename: "index.html",
            templateParameters: { cards }
        }),
        ...cards.map(card => {
            console.log(JSON.stringify(card))
            return new HtmlWebpackPlugin({
                template: './templates/cards-page.hbs',
                chunks: [ "common", "cards" ],
                filename: `cards-${card.categoryId}.html`,
                templateParameters: card
            })
        }),
        new CopyPlugin({
            patterns: [
                { from: 'assets' }
            ]
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'assets')
        },
        port: 8080 // Port number
    }
};