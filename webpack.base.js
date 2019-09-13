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
                test: /\.ttf$/,
                use: [{
                    loader: 'ttf-loader',
                    options: {
                        limit: 1024,
                        name: './includes/[contenthash:8].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
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
            // 默认是全部的CSS都压缩,该字段可以指定某些要处理的文件
            assetNameRegExp: /\.css$/g,
            // 指定一个优化css的处理器,默认cssnano
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
    ],
    optimization: {
        //分包,拆分出多模块中公共的模块包
        splitChunks: {
            chunks: 'all', //async:只从异步加载得模块（动态加载import()）里面进行拆分 initial:只从入口模块进行拆分 all:以上两者都包括
            maxInitialRequests: Infinity, //一个入口最大的并行请求数
            maxSize: 1024,
            cacheGroups: {
                default: {
                    chunks: 'all',
                    reuseExistingChunk: true, // 这个配置允许我们使用已经存在的代码块
                    minSize: 1, //大于1个字节，避免模块体积过小而被忽略
                    minChunks: 2 //抽离公共代码时，这个代码块最小被引用的次数
                },
                vendor: {
                    priority: 10, // 该配置项是设置处理的优先级,数值越大越优先处理
                    test: /[\\/]node_modules[\\/]/, //如果需要的依赖特别小,可以直接设置成需要打包的依赖名称
                    name(module, chunks, chcheGroupKey) {// 可提供布尔值、字符串和函数,如果是函数,可编写自定义返回值
                        const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]; //获取模块名称
                        return `npm.${packageName.replace('@', '')}`;//可选,一般情况下不需要将模块名称 @ 符号去除
                    }
                },
                commons: {
                    priority: 1,
                    test: /[\\/]src[\\/]common[\\/]/,
                    name: 'common'
                }
            }
        }
    }
};
