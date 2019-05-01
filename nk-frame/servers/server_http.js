/**
 * Http服务类
 * User: 姜伟
 * Date: 2019/4/26 0026
 * Time: 7:50
 */
const Koa = require('koa');
const http = require('http');
const httpConfig = require('nk-project/configs/http');
const mwErrorServer = require('nk-frame/frame/middlewares/error_server');
const mwErrorFrame = require('nk-frame/frame/middlewares/error_frame');
const mwRouteCheck = require('nk-frame/frame/middlewares/route_check');
const mwActionEnter = require('nk-frame/frame/middlewares/action_enter');
const mwRequestPreHandleFrame = require('nk-frame/frame/middlewares/request_prehandle');
const mwRequestPreHandleProject = require('nk-project/middlewares/request_prehandle');
const mwRenderRegister = require('nk-frame/frame/middlewares/render_register');
const mwRouteHandle = require('nk-frame/frame/middlewares/route_handle');
const mwResponseHandle = require('nk-frame/frame/middlewares/response_handle');
const mwActionExit = require('nk-frame/frame/middlewares/action_exit');
// 用Symbol的目的是不想让外部访问到对应的属性
const HOST = Symbol('server-host');
const PORT = Symbol('server-port');
const APP = Symbol('server-app');

/**
 * Http服务类
 */
class HttpServer {
    constructor() {
        this[HOST] = httpConfig.host;
        this[PORT] = httpConfig.port;
        this[APP] = new Koa();
        this[APP].removeAllListeners('error');
        this[APP].on('error', mwErrorServer());
        this[APP].use(mwErrorFrame());
        this[APP].use(mwRouteCheck());
        this[APP].use(mwActionEnter());
        this[APP].use(mwRequestPreHandleFrame());
        this[APP].use(mwRequestPreHandleProject());
        this[APP].use(mwRenderRegister());
        this[APP].use(mwRouteHandle.routes());
        this[APP].use(mwRouteHandle.allowedMethods());
        this[APP].use(mwResponseHandle());
        this[APP].use(mwActionExit());
    }

    get host() {
        return this[HOST];
    }

    get port() {
        return this[PORT];
    }

    /**
     * 启动服务
     */
    startServer() {
        http.createServer(this[APP].callback())
            .on('error', (error) => {
                Log.error('http-error', error);
            })
            .listen(this[PORT], this[HOST]);
    }
}

module.exports = HttpServer;