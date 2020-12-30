/**
 * Http服务类
 * User: 姜伟
 * Date: 2019/4/26 0026
 * Time: 7:50
 */
const Koa = require('koa');
const Log = require('nk-frame/logs/log');
const http = require('http');
const compress = require('koa-compress')
const configHttp = require('nk-project/configs/http');
const configCompress = require('nk-project/configs/compress');
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
const eventSocketIo = require('nk-project/events/socketio');
// 用Symbol的目的是不想让外部访问到对应的属性
const HOST = Symbol('server-host');
const PORT = Symbol('server-port');
const APP = Symbol('server-app');
const IO = Symbol('server-socketio');

/**
 * Http服务类
 */
class HttpServer {
    constructor() {
        this[HOST] = configHttp.host;
        this[PORT] = configHttp.port;
        this[APP] = new Koa();
        this[APP].removeAllListeners('error');
        this[APP].on('error', mwErrorServer());
        this[APP].use(compress(configCompress));
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
     * @return {void}
     */
    startServer() {
        let server = http.createServer(this[APP].callback());
        this[IO] = require('socket.io')(server);
        for (let eventTag in eventSocketIo) {
            this[IO].on(eventTag, eventSocketIo[eventTag]);
        }
        server.on('error', (error) => {
            Log.error('http-error', error);
        });
        server.listen(this[PORT], this[HOST]);
    }
}

module.exports = HttpServer;
