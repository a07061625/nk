const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(htm|html)$/i,
                use: ['html-withimg-loader']
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            cache: true,
            parallel: true, // 启用多线程并行运行提高编译速度
            sourceMap: false, // sourceMap 和 devtool:'inline-source-map' 冲突
            extractComments: 'all' // 导出备注
        }),
        new CleanWebpackPlugin(), // 打包前需要被删除的目录为output配置下的path
        new OptimizeCSSAssetsPlugin({
            // 默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
            assetNameRegExp: /\.css$/g,
            // 指定一个优化css的处理器，默认cssnano
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: [
                    'default',
                    {
                        discardComments: {removeAll: true}, // 对注释的处理
                        normalizeUnicode: false // 建议false,否则在使用unicode-range的时候会产生乱码
                    }
                ]
            },
            canPrint: false // 是否打印编译过程中的日志
        }),
        new webpack.HashedModuleIdsPlugin(), // 根据模块的相对路径生成 HASH 作为模块 ID
    ],
    optimization: {
        //分包,拆分出多模块中公共的模块包
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: Infinity, //一个入口最大的并行请求数
            minSize: 1, //避免模块体积过小而被忽略
            maxSize: 1024,
            minChunks: 1, //最小引用次数
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/, //如果需要的依赖特别小，可以直接设置成需要打包的依赖名称
                    name(module, chunks, chcheGroupKey) {// 可提供布尔值、字符串和函数，如果是函数，可编写自定义返回值
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]; //获取模块名称
                        return `npm.${packageName.replace('@', '')}`;//可选，一般情况下不需要将模块名称 @ 符号去除
                    }
                }
            }
        }
    }
};
