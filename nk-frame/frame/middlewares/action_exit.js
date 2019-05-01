/**
 * 控制器方法出口日志
 * User: 姜伟
 * Date: 2019/4/26 0026
 * Time: 7:50
 */
const Log = require('nk-frame/logs/log');

module.exports = () => {
    return async (ctx) => {
        let tag = 'node-request' + process.ppid;
        console.timeEnd(tag);
        let msg = ctx.method + ' ' + ctx.request.href;
        Log.info('exit', msg);
    }
};