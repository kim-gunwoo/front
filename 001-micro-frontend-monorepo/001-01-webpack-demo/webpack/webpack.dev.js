module.exports = () => ({
    mode: 'development',
    devServer: {
        // contentBase: path.join(__dirname, "dist"),
        // publicPath: "/",
        // overlay: true,
        host: 'localhost',
        port: 9000,
        historyApiFallback: true,
        hot: true,
        // stats: "errors-only",
        // proxy : { "/api" : "http://localhost:8081" },
    },
});
