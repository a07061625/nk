/**
 * 预编译资源配置
 * User: 姜伟
 * Date: 2020/8/11 0011
 * Time: 18:07
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        vendors: ['lodash', 'jquery'],
        vue: ['vue', 'vuex']
    },
    output: {
        filename: '[name].dll.js',
        path: path.resolve(__dirname, './dll'),
        library: '[name]'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '[name]',
            path: path.resolve(__dirname, './dll/[name].manifest.json')
        })
    ]
};
