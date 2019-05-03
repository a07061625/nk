# 框架
## 介绍
- 前端服务端渲染框架,常驻内存,提升用户体验
- 基础环境为nodejs
- 处理框架为koa2
- 渲染模板为nunjucks
## nginx配置
    server {
        ...
        if ($request_method !~ ^(GET|OPTIONS|HEAD)$ ) {
            return 403;
        }
        ...
    }

# 环境
## node(v10.15.3+)
    wget https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-x64.tar.xz
    tar -xvJf node-v10.15.3-linux-x64.tar.xz
    mv node-v10.15.3-linux-x64/ /usr/local/nodejs
    mkdir /home/logs/nodeforever
    vim /etc/profile
        export NODE_HOME=/usr/local/nodejs
        export PATH=$PATH:$NODE_HOME/bin
    source /etc/profile
    /usr/local/nodejs/bin/npm install -g cnpm --registry=https://registry.npm.taobao.org
## 全局环境(npm install -g)
- nodemon: v1.18.11+
- forever: v1.0.0+
- webpack: v4.30.0+
- webpack-cli: v3.3.1+
## 项目环境(npm install --save)
- axios: v0.18.0+
- html-minifier: v4.0.0+
- koa: v2.7.0+
- koa-router: v7.4.0+
- lodash: v4.17.11+
- lru-cache: v5.1.1+
- nunjucks: v3.2.0+
- utility: v1.16.1+
## webpack环境(npm install --save)
- webpack: v4.30.0+
- webpack-cli: v3.3.1+
- glob: v7.1.3+
- mini-css-extract-plugin: v0.6.0+
- less: v3.9.0+
- less-loader: v4.1.0+
- postcss-loader: v3.0.0+
- style-loader: v0.23.1+
- css-loader: v2.1.1+
- node-sass: v4.12.0+
- sass-loader: v7.1.0+
- autoprefixer: v9.5.1+
- optimize-css-assets-webpack-plugin: v5.0.1+
- cssnano: v4.1.10+
- uglifyjs-webpack-plugin: v2.1.2+
- clean-webpack-plugin: v2.0.1+
- purifycss-webpack: v0.7.0+
- purify-css: v1.2.5+
- html-withimg-loader: v0.1.16+
- file-loader: v3.0.1+
- url-loader: v1.1.2+
- mkdirp: v0.5.1+
- peer: v0.2.10+
- html-webpack-plugin: v3.2.0+
- bundle-loader: v0.5.6+
- promise-loader: v1.0.0+

# 文件介绍
**推荐将nk-frame目录和nk-static目录作为一个单独的项目统一维护管理**

- dist: webpack打包存放文件目录
- nk-project: 项目公共库目录,目录名不可变
- nk-frame: 框架公共库目录
- nk-static: 框架公共静态资源目录
- node_modules: node模块目录
- static: 静态资源目录
- views: 视图文件目录
- helper_manager.sh: 项目管理脚本
- nka01.js: 项目服务脚本,命名规则: nk+3位由数字和字母组成的字符串
- nodemon.json: nodemon配置
- package.json: 项目配置
- postcss.config.js: postcss配置脚本
- webpack.base.js: webpack基础配置
- webpack.production.js: webpack生产环境配置

# 管理命令
## 初始化项目
    sh helper_manager.sh init
## 启动服务
    sh helper_manager.sh start
    sh helper_manager.sh start 1 //刷新并启动服务
## 关闭服务
    sh helper_manager.sh stop
## 重启服务
    sh helper_manager.sh restart
    sh helper_manager.sh restart 1 //刷新并重启服务
## 刷新服务(仅刷新项目文件,没有重启服务)
    sh helper_manager.sh refresh
## webpack打包压缩(生产环境)
    sh helper_manager.sh build