const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, './src/index.html'),
    filename: "index.html"
})


module.exports = {
    mode: "development",
    // mode: "production",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'JAVASCRIPTALGORITHM'),
        filename: 'main.js'
    },
    plugins: [
        htmlPlugin
    ],
    module: {
        rules: [
            {
                test: /\.js$/, // jsx/js文件的正则
                exclude: /node_modules/, // 排除 node_modules 文件夹
                use: {
                    // loader 是 babel
                    loader: 'babel-loader',
                    options: {
                        // babel 转义的配置选项
                        babelrc: false,
                        presets: [
                            [require.resolve('@babel/preset-env'), { modules: false }]
                        ],
                        cacheDirectory: true
                    }
                }
            }
        ]
    }

}