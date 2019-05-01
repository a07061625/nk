/**
 * 服务错误日志处理
 * User: 姜伟
 * Date: 2019/4/26 0026
 * Time: 14:01
 */
const Log = require('nk-frame/logs/log');

module.exports = () => {
    return (err, ctx) => {
        Log.error('server-error', err);
    }
};