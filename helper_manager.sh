#!/bin/bash
set -o nounset
set -o errexit

# project.sh样板为static/project.sh,需提前将该文件复制到项目根目录下且拥有可执行权限
. ./project.sh

# 项目根目录
DIR_ROOT=`pwd`
# 框架公共库node模块目录
DIR_LIB_FRAME_MODULE=$DIR_ROOT/node_modules/nk-frame
# 项目公共库node模块目录
DIR_LIB_PROJECT_MODULE=$DIR_ROOT/node_modules/nk-project
# 项目公共库原始目录
DIR_LIB_PROJECT_ORIGIN=$DIR_ROOT/nk-project
# 进程ID文件后缀
SUFFIX_PID=".pid"
# 日志文件后缀
SUFFIX_LOG=".log"
# js脚本文件后缀
SUFFIX_JS=".js"
# 进程ID
PID=`ps -A -o pid,ppid,cmd|grep node$PROJECT_TAG|grep -v 'grep'|awk 'BEGIN{pid=0} {pid=$1} END{print pid}'`
# 启动命令
COMMAND_START="start --minUptime 10000 --spinSleepTime 30000 --pidFile $DIR_LOG/$PROJECT_TAG$SUFFIX_PID -l $DIR_LOG/forever_$PROJECT_TAG$SUFFIX_LOG -o $DIR_LOG/out_$PROJECT_TAG$SUFFIX_LOG -e $DIR_LOG/error_$PROJECT_TAG$SUFFIX_LOG -a -c nodemon $PROJECT_TAG$SUFFIX_JS --exitcrash"
# js检测结果文件
FILE_CHECK_RESULT="rule_check.log"

# 生成package.json
function createPackageJson() {
    rm -rf package.json
    touch package.json
    echo "{" >> package.json
    echo "  \"name\": \"$PACKAGE_NAME\"," >> package.json
    echo "  \"version\": \"$PACKAGE_VERSION\"," >> package.json
    echo "  \"description\": \"$PACKAGE_DESCRIPTION\"," >> package.json
    echo "  \"main\": \"$PROJECT_TAG.js\"," >> package.json
    echo "  \"scripts\": {" >> package.json
    echo "    \"build-product\": \"webpack --config webpack.production.js -p\"" >> package.json
    echo "  }," >> package.json
    echo "  \"repository\": {" >> package.json
    echo "    \"type\": \"$PACKAGE_REPOSITORY_TYPE\"," >> package.json
    echo "    \"url\": \"$PACKAGE_REPOSITORY_URL\"" >> package.json
    echo "  }," >> package.json
    echo "  \"keywords\": [" >> package.json
    echo "    \"front\"," >> package.json
    echo "    \"ssr\"," >> package.json
    echo "    \"web\"," >> package.json
    echo "    \"framework\"," >> package.json
    echo "    \"node\"," >> package.json
    echo "    \"koa2\"," >> package.json
    echo "    \"nunjucks\"" >> package.json
    echo "  ]," >> package.json
    echo "  \"author\": \"$PACKAGE_AUTHOR\"," >> package.json
    echo "  \"contact\": \"$PACKAGE_CONTACT\"," >> package.json
    echo "  \"license\": \"$PACKAGE_LICENSE\"," >> package.json
    echo "  \"bugs\": {" >> package.json
    echo "    \"url\": \"$PACKAGE_BUGS_URL\"" >> package.json
    echo "  }," >> package.json
    echo "  \"homepage\": \"$PACKAGE_HOMEPAGE\"," >> package.json
    echo "  \"os\": [" >> package.json
    echo "    \"darwin\"," >> package.json
    echo "    \"linux\"" >> package.json
    echo "  ]," >> package.json
    echo "  \"engines\": {" >> package.json
    echo "    \"node\": \"^10.15.3\"," >> package.json
    echo "    \"nodemon\": \"^1.18.11\"," >> package.json
    echo "    \"forever\": \"^1.0.0\"," >> package.json
    echo "    \"eslint\": \"^5.16.0\"," >> package.json
    echo "    \"webpack\": \"^4.43.0\"," >> package.json
    echo "    \"webpack-cli\": \"^3.3.11\"" >> package.json
    echo "  }," >> package.json
    echo "  \"dependencies\": {" >> package.json
    echo "    \"async\": \"^3.2.0\"" >> package.json
    echo "  }" >> package.json
    echo "}" >> package.json
}

# 刷新模块
function refreshModule() {
    # 框架公共库更新
    if [ ${#DIR_LIB_FRAME_MODULE} -lt 5 ]; then
        echo "frame module dir invalid"
        exit 1
    fi
    if [ ! -d $DIR_LIB_FRAME_MODULE ]; then
        if [ -e $DIR_LIB_FRAME_MODULE ]; then
            rm -rf $DIR_LIB_FRAME_MODULE
        fi
        mkdir $DIR_LIB_FRAME_MODULE
    fi
    rm -rf $DIR_LIB_FRAME_MODULE/*
    cp -rf $DIR_LIB_FRAME_ORIGIN/nk-frame/* $DIR_LIB_FRAME_MODULE
    # 项目公共库更新
    if [ ${#DIR_LIB_PROJECT_MODULE} -lt 5 ]; then
        echo "project module dir invalid"
        exit 1
    fi
    if [ ! -d $DIR_LIB_PROJECT_MODULE ]; then
        if [ -e $DIR_LIB_PROJECT_MODULE ]; then
            rm -rf $DIR_LIB_PROJECT_MODULE
        fi
        mkdir $DIR_LIB_PROJECT_MODULE
    fi
    rm -rf $DIR_LIB_PROJECT_MODULE/*
    cp -rf $DIR_LIB_PROJECT_ORIGIN/* $DIR_LIB_PROJECT_MODULE
}

# 检测刷新模块
function checkRefreshModule() {
    case $1 in
        0)
            ;;
        1)
            refreshModule
            ;;
        *)
            echo "refresh tag must be 0|1"
            exit 1
            ;;
    esac
}

# js文件格式化
function formatJs() {
    for file in `ls $1`
    do
        fullFile=$1/$file
        if [ -d $fullFile ]; then
            formatJs $fullFile
        elif [ "${fullFile##*.}"x = "js"x ]; then # 多加了x,防止字符串为空时报错
            eslint $fullFile --fix >> $DIR_ROOT/$FILE_CHECK_RESULT
        fi
    done
}

case "$1" in
    init)
#        rm -rf $DIR_ROOT/node_modules
        createPackageJson
#        npm init -y
#        # 框架所需模块
#        npm install koa@2 koa-router@7 nunjucks@3 html-minifier@4 lru-cache@5 utility axios lodash eventproxy async qs --save
#        # webpack打包所需模块
#        npm install webpack@4 webpack-cli@3 glob mini-css-extract-plugin style-loader css-loader sass-loader postcss-loader less-loader less autoprefixer uglifyjs-webpack-plugin optimize-css-assets-webpack-plugin cssnano clean-webpack-plugin purgecss-webpack-plugin purify-css html-withimg-loader file-loader url-loader mkdirp peer html-webpack-plugin@3 bundle-loader promise-loader ttf-loader --save
#        cnpm install node-sass --save
#        echo "init project success"
        ;;
    start)
        if [ $PID -gt 0 ]; then
            echo "node process is running"
            exit 1;
        fi
        refreshTag=${2:-0}
        checkRefreshModule $refreshTag
        forever $COMMAND_START
        ;;
    stop)
        if [ $PID -gt 0 ]; then
            forever stop $PROJECT_TAG$SUFFIX_JS
            kill $PID
        fi
        ;;
    restart)
        if [ $PID -gt 0 ]; then
            forever stop $PROJECT_TAG$SUFFIX_JS
            kill $PID
            sleep 3s
        fi
        refreshTag=${2:-0}
        checkRefreshModule $refreshTag
        forever $COMMAND_START
        ;;
    refresh)
        refreshModule
        ;;
    build)
        npm run build-product
        ;;
    format)
        echo > $FILE_CHECK_RESULT
        formatJs $DIR_LIB_FRAME_ORIGIN/nk-frame
        formatJs $DIR_LIB_PROJECT_ORIGIN
        ;;
    static)
        cp -rf $DIR_LIB_FRAME_ORIGIN/nk-static/* $DIR_ROOT/static
        ;;
    *)
        echo "option must be init|start|stop|restart|refresh|build|format|static"
        ;;
esac