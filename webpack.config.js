module.exports = {
    mode: 'development',
    entry: './src/test.tsx',
    module: {
        rules: [
            {
                use: 'ts-loader',
                test: /\.tsx$/,
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: "index.js"
    }
}