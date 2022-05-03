const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

let localConstant = require('nk-project/constants/project');
let localConstantKeys = Object.keys(localConstant);
let localConstantLength = localConstantKeys.length;
let constantAccepts = ['string', 'number', 'boolean']
let trueConstant = {}
for (let i = 0; i < localConstantLength; i++) {
    let eKey = localConstantKeys[i];
    if (typeof eKey !== 'string') {
        continue;
    }
    if (!eKey.startsWith('NK_')) {
        continue;
    }

    let eVal = localConstant[eKey];
    if (!constantAccepts.includes(typeof eVal)) {
        continue;
    }

    trueConstant[eKey] = eVal;
}

// 多页面打包
const entryMap = () => {
    const entry = {};
    const htmlPlugins = [];
    const entryFiles = glob.sync('./static/project/js/entry_*.js');
    entryFiles.forEach((item) => {
        const entryFile = item;
        const match = entryFile.match(/static\/project\/js\/entry_(.*)\.js$/);
        const pageName = match[1];
        entry[pageName] = entryFile;
        htmlPlugins.push(
            new HtmlWebpackPlugin({
                template: path.join(__dirname, '/index.html'),
                filename: `${pageName}.html`,
                chunks: [pageName]
            })
        );
    });

    return {entry, htmlPlugins}
}

const { entry, htmlWebpackPlugins } = entryMap()

module.exports = {
    devtool: 'inline-source-map', // 报错会指定错误位置和所属文件
    entry: entry,
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    'thread-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'thread-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'thread-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [require('autoprefixer')]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.ttf$/,
                use: [
                    'thread-loader',
                    {
                        loader: 'ttf-loader',
                        options: {
                            limit: 1024,
                            name: './includes/[contenthash:8].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            },
            {
                test: /\.(htm|html)$/i,
                use: [
                    'thread-loader',
                    'html-withimg-loader'
                ]
            },
            { // 图片处理
                test: /\.(png|jpg|gif|svg)/,
                use: [
                    'thread-loader',
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name].[ext]',
                            limit: 3072,
                            outputPath: 'images/',
                            publicPath: "/images"
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            jquery: './static/frame/js/jquery/jquery-3.4.0'
        }
    },
    plugins: [
        new BundleAnalyzerPlugin({
            //可以是`server`,`static`或`disabled`
            //在server模式下,分析器将启动HTTP服务器来显示软件包报告
            //在静态模式下,会生成带有报告的单个HTML文件
            //在disabled模式下,你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件
            analyzerMode: 'static',
            //将在服务器模式下使用的主机启动HTTP服务器
            analyzerHost: '127.0.0.1',
            //将在服务器模式下使用的端口启动HTTP服务器
            analyzerPort: 8866,
            //路径捆绑,将在`static`模式下生成的报告文件
            //相对于捆绑输出目录
            reportFilename: 'report.html',
            //模块大小默认显示在报告中
            //应该是`stat`,`parsed`或者`gzip`中的一个
            //有关更多信息,请参见“定义”一节
            defaultSizes: "parsed",
            //在默认浏览器中自动打开报告
            openAnalyzer: false,
            //如果为true,则Webpack Stats JSON文件将在bundle输出目录中生成
            generateStatsFile: false,
            //如果`generateStatsFile`为`true`,将会生成Webpack Stats JSON文件的名字
            //相对于捆绑输出目录
            statsFilename: 'stats.json',
            //stats.toJson()方法的选项
            //例如,您可以使用`source：false`选项排除统计文件中模块的来源
            //在这里查看更多选项：https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
            statsOptions: null,
            logLevel: 'info'
        }),
        new UglifyJsPlugin({
            cache: true,
            uglifyOptions: {
                warnings: false,
                parse: {},
                compress: {},
                ie8: false
            },
            parallel: true, // 启用多线程并行运行提高编译速度
            sourceMap: false, // sourceMap 和 devtool:'inline-source-map' 冲突
            extractComments: 'all' // 导出备注
        }),
        new CleanWebpackPlugin(), // 打包前需要被删除的目录为output配置下的path
        new webpack.ProvidePlugin({
            $: 'jquery'
        }), // 自动加载模块,部分需要提前在resolve的alias中提前申明
        new webpack.DefinePlugin(trueConstant), // 自定义全局变量,使用时直接使用NK_CODE_SUCCESS即可
        new webpack.IgnorePlugin(/\.\/locale/, /moment/), // 忽略解析三方包里插件
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
        new HardSourceWebpackPlugin(),
        ...htmlWebpackPlugins
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: 4,
            }),
        ],
        //分包,拆分出多模块中公共的模块包
        splitChunks: {
            chunks: 'all', //async:只从异步加载得模块(动态加载import())里面进行拆分 initial:只从入口模块进行拆分 all:以上两者都包括
            maxInitialRequests: Infinity, //一个入口最大的并行请求数
            cacheGroups: {
                default: {
                    chunks: 'all',
                    reuseExistingChunk: true, // 这个配置允许我们使用已经存在的代码块
                    minSize: 1, //大于1个字节,避免模块体积过小而被忽略
                    minChunks: 2 //抽离公共代码时,这个代码块最小被引用的次数
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
