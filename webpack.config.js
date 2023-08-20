import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from "copy-webpack-plugin";
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import categories from "./cards.json" assert { type: "json" };
//const categories = cards.map(obj => obj.categoryName);

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
export default {
    entry: {
        main: './src/pages/main-page.js',
        cards: './src/pages/cards-page.js',
        common: "./src/common.js",
        stats: "./src/pages/stat-page.js",
        wordplay: "./src/pages/wordplay-page.js"
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
            templateParameters: { categories }
        }),
        ...categories.map(category => {
            console.log(JSON.stringify(category))
            return new HtmlWebpackPlugin({
                template: './templates/cards-page.hbs',
                chunks: [ "common", "cards" ],
                filename: `cards-${category.categoryId}.html`,
                templateParameters: { cards : category.cards, categories : categories}
            })
        }),
        new HtmlWebpackPlugin({
            template: './templates/stats.hbs',
            chunks: [ "common", "stats"],
            filename: "stats.html",
            templateParameters: { categories }
        }),
        new HtmlWebpackPlugin({
            template: './templates/wordplay-page.hbs',
            chunks: [ "wordplay", "cards" ],
            filename: "wordplay.html",
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