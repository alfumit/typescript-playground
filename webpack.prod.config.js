const path = require("path");
const cleanPlugin = require("clean-webpack-plugin");
const htmlPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        ["project-manager"]: "./src/project-manager/project-manager.ts",
        ["google-maps"]: "./src/google-maps/google-maps.ts"
    },
    output: {
        filename: "[name]/[name].bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.ts$/,
            use: "ts-loader",
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.js', '.ts', ".html"]
    },
    plugins: [
        new cleanPlugin.CleanWebpackPlugin(),
        new htmlPlugin({
            template: "index.html"
        })
    ]
};
