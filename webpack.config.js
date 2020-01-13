const path = require("path");

module.exports = {
    mode: "development",
    entry: {
        ["project-manager"]: "./project-manager/project-manager.ts",
        ["google-maps"]: "./google-maps/google-maps.ts"
    },
    context: path.resolve(__dirname, "src"),
    output: {
        filename: "[name]/[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        publicPath: "dist"
    },
    devtool: "inline-source-map",
    module: {
        rules: [{
            test: /\.ts$/,
            use: "ts-loader",
            exclude: [/node_modules/, /theory/]
        }]
    }
    , resolve: {
        extensions: ['.js', '.ts']
    },
    devServer: {

    }
};
