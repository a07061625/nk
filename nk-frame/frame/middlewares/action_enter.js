/**
 * 控制器方法入口日志
 * User: 姜伟
 * Date: 2019/4/26 0026
 * Time: 7:50
 */
const Log = require('nk-frame/logs/log');

module.exports = () => async (ctx, next) => {
    let msg = ctx.method + ' ' + ctx.header.host + ctx.url;
    Log.info('enter', msg);
    let tag = 'node-request' + process.ppid;
    console.time(tag);
    await next();
};
