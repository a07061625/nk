/**
 * 请求预处理
 * User: 姜伟
 * Date: 19-5-1
 * Time: 下午1:26
 */
const Tool = require('nk-frame/tools/tool');
const httpConfig = require('nk-project/configs/http');

module.exports = () => async (ctx, next) => {
    if (ctx.acceptsCharsets('utf-8') === false) {
        ctx['throw'](403);
    }
    if (ctx.accepts('html', 'text/html') === false) {
        ctx['throw'](403);
    }

    // 设置响应数据格式
    ctx.response.type = 'text/html';

    // 设置框架GET请求数据
    let queryData = ctx.params || {};
    Object.assign(queryData, ctx.request.query);
    ctx.state.NkQuery = queryData;

    // 设置Cookie中的会话标识
    let nowSid = ctx.cookies.get(httpConfig.cookies.token.key);
    if ((typeof nowSid !== 'string') || (nowSid.length !== httpConfig.cookies.token.length)) {
        let randomNum = httpConfig.cookies.token.length - 1;
        nowSid = '0' + Tool.createNonceStr(randomNum, 'numlower');
        ctx.cookies.set(httpConfig.cookies.token.key, nowSid, {signed: false, maxAge: httpConfig.cookies.expire});
    }
    ctx.state.NkCookieSid = nowSid;

    await next();
};
