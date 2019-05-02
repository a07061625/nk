/**
 * 路由检测
 * User: 姜伟
 * Date: 19-4-30
 * Time: 下午3:21
 */
require('nk-frame/frame/middlewares/route_handle');
const Log = require('nk-frame/logs/log');
const cacheRoute = require('nk-frame/caches/cache_route');
const projectConfig = require('nk-project/configs/project');

module.exports = () => async (ctx, next) => {
    let uri = ctx.request.path.length > 0 ? ctx.request.path : '/';
    let uriArr = uri.split('/');
    let controller = '';
    let rewriteUri = false;
    let redirectUrl = '';
    if (typeof uriArr[1] === 'string') {
        controller = uriArr[1];
    }
    if (controller.length === 0) {
        controller = 'index';
        rewriteUri = true;
    }
    let cacheData = cacheRoute.get(controller);
    if (cacheData === null) {
        redirectUrl = ctx.request.protocol + '://' + ctx.request.host + projectConfig.uri.error + '?err_msg=' + encodeURIComponent('控制器不存在');
        ctx.redirect(redirectUrl);
        return;
    }

    let action = '';
    if (typeof uriArr[2] === 'string') {
        action = uriArr[2];
    }
    if (action.length === 0) {
        action = 'index';
        rewriteUri = true;
    }

    Log.info('uri:', controller + '/' + action);
    if (!cacheData.hasOwnProperty(action)) {
        redirectUrl = ctx.request.protocol + '://' + ctx.request.host + projectConfig.uri.error + '?err_msg=' + encodeURIComponent('方法不存在');
        Log.info('redirect:', redirectUrl);
        ctx.redirect(projectConfig.uri.error + redirectUrl);
        return;
    }

    ctx.state.NkController = controller;
    ctx.state.NkAction = action;
    if (rewriteUri) {
        ctx.request.path = '/' + controller + '/' + action;
    }

    await next();
};
