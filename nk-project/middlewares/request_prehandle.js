/**
 * 请求预处理
 * User: 姜伟
 * Date: 19-5-1
 * Time: 下午1:27
 */
const httpConfig = require('nk-project/configs/http');

module.exports = () => async (ctx, next) => {
    let aid = ctx.cookies.get(httpConfig.cookies.allianceid.key);
    let nowAid = 0;
    if ((!isNaN(aid)) && (typeof aid === 'number')) {
        nowAid = parseInt(aid, 10);
    }
    if (nowAid < 0) {
        nowAid = 0;
    }
    ctx.cookies.set(httpConfig.cookies.allianceid.key, nowAid.toString(), {signed: false, maxAge: httpConfig.cookies.expire});
    ctx.state.NkCookieAid = nowAid;

    await next();
};
