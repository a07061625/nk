//速度分析
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const glob = require('glob');
const path = require('path');
const fs = require('fs');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const webpack = require('webpack');

let productConfig = require('./webpack.base');
productConfig.mode = 'production';
productConfig.output = {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].[contenthash:8].js',
    chunkFilename: 'js/[name].[contenthash:8].chunk.js',
    publicPath: 'http://120.79.139.64:8800/'
};

// 消除未使用的CSS
productConfig.plugins.push(new PurgeCSSPlugin({
    paths: glob.sync('./views/*/*.html')
}));
// 压缩CSS
productConfig.plugins.push(new MiniCssExtractPlugin({
    filename: 'css/[name].[chunkhash:8].css',
    chunkFilename: 'css/[id].css'
}));

const files = fs.readdirSync(path.resolve(__dirname, './dll'));
files.forEach(file => {
    if(/.*\.dll.js/.test(file)) {
        productConfig.plugins.push(new AddAssetHtmlWebpackPlugin({
            filepath: path.resolve(__dirname, './dll', file)
        }));
    }
    if(/.*\.manifest.json/.test(file)) {
        productConfig.plugins.push(new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, './dll', file)
        }));
    }
});

module.exports = smp.wrap(productConfig);
