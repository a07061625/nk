const glob = require('glob');
const path = require('path');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let productConfig = require('./webpack.base');
productConfig.mode = 'production';
productConfig.entry = {
    app: glob.sync('./static/project/js/test.js')
};
productConfig.output = {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
    publicPath: 'http://120.79.139.64:8800/'
};

// 图片处理
productConfig.module.rules.push({
    test: /\.(png|jpg|gif|svg)/,
    use: [{
        loader: 'url-loader',
        options: {
            limit: 1000,
            outputPath: 'images/'
        }
    }]
});
// 消除未使用的CSS
productConfig.plugins.push(new PurgeCSSPlugin({
    paths: glob.sync('./views/*/*.html')
}));
// 压缩CSS
productConfig.plugins.push(new MiniCssExtractPlugin({
    filename: 'css/[name].[chunkhash:8].css',
    chunkFilename: 'css/[id].css'
}));

module.exports = productConfig;
