module.exports = {
    entry: ["@babel/polyfill","./src/index.js"],
    output: {
        filename: "main.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader'
            }
        ]
    }
};
