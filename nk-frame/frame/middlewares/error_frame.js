/**
 * 框架异常日志处理
 * User: 姜伟
 * Date: 2019/4/27 0027
 * Time: 17:41
 */
const Log = require('nk-frame/logs/log');
const projectConfig = require('nk-project/configs/project');

module.exports = () => async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        Log.error('frame-error', err);
        let errStatus = 0;
        if (Number.isInteger(err.status)) {
            errStatus = err.status;
        }
        if ((errStatus >= 500) || (errStatus <= 0)) {
            ctx.body = '';
            ctx.redirect(projectConfig.uri.error + '?err_msg=' + encodeURIComponent(err.message));
        } else if (errStatus >= 300) {
            ctx.status = errStatus;
        } else {
            ctx.status = 400;
        }
    }
};
