const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

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
            parallel: true, //启用多线程并行运行提高编译速度
            sourceMap: false, //sourceMap 和 devtool:'inline-source-map' 冲突
            extractComments: 'all' //导出备注
        }),
        new CleanWebpackPlugin(), //打包前需要被删除的目录为output配置下的path
        new OptimizeCSSAssetsPlugin ({
            //默认是全部的CSS都压缩，该字段可以指定某些要处理的文件
            assetNameRegExp: /\.css$/g,
            //指定一个优化css的处理器，默认cssnano
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: [
                    'default',
                    {
                        discardComments: {removeAll: true}, //对注释的处理
                        normalizeUnicode: false //建议false,否则在使用unicode-range的时候会产生乱码
                    }
                ]
            },
            canPrint: false //是否打印编译过程中的日志
        })
    ],
    optimization: {
        //分包
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            maxSize: 0
        }
    }
};