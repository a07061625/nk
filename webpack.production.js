const glob = require('glob');
const path = require('path');
const PurifyCSSPlugin = require('purifycss-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let productConfig = require('./webpack.base');
productConfig.mode = 'production';
productConfig.entry = {
    app: glob.sync('./static/fonts/aaa.ttf')
};
productConfig.output = {
    path: path.resolve(__dirname, './dist'),
    filename: 'fonts/[name].[contenthash:8].ttf',
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
// ttf处理
productConfig.module.rules.push({
    test: /\.ttf$/,
    use: [{
        loader: 'ttf-loader',
        options: {
            limit: 1000,
            name: './includes/[contenthash:8].[ext]',
            outputPath: 'fonts/'
        }
    }]
});
// 消除未使用的CSS
productConfig.plugins.push(new PurifyCSSPlugin({
    paths: glob.sync('./views/*/*.html')
}));
// 压缩CSS
productConfig.plugins.push(new MiniCssExtractPlugin({
    filename: 'css/[name].[chunkhash:8].css',
    chunkFilename: 'css/[id].css'
}));

module.exports = productConfig;
