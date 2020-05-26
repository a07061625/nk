#!/bin/bash
set -o nounset
set -o errexit

# 项目根目录
DIR_ROOT=`pwd`

# 以下shell脚本均需拥有可执行全选
# env_project.sh样板为static/env_project_example.sh
. ./static/env_project.sh
. ./static/env_frame.sh
. ./static/func_frame.sh

case "$1" in
    init)
        rm -rf $DIR_ROOT/node_modules
        createPackageJson
        npm init -y
        # 框架所需模块
        npm install koa@2 koa-router@7 nunjucks@3 html-minifier@4 lru-cache@5 utility axios lodash eventproxy async qs redis --save
        # webpack打包所需模块
        npm install webpack@4 webpack-cli@3 glob mini-css-extract-plugin style-loader css-loader sass-loader sass node-sass postcss-loader less-loader less autoprefixer uglifyjs-webpack-plugin optimize-css-assets-webpack-plugin cssnano clean-webpack-plugin purgecss-webpack-plugin purify-css html-withimg-loader file-loader url-loader mkdirp peer html-webpack-plugin@3 bundle-loader promise-loader fibers bufferutil utf-8-validate --save
        npm install ttf-loader --save
        echo "init project success"
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
        chmod a+x $DIR_ROOT/static/env_frame.sh
        chmod a+x $DIR_ROOT/static/func_frame.sh
        ;;
    *)
        echo "option must be init|start|stop|restart|refresh|build|format|static"
        ;;
esac