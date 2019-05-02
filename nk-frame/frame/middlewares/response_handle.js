/**
 * 响应处理
 * User: 姜伟
 * Date: 19-5-1
 * Time: 下午1:51
 */
const projectConfigs = require('nk-project/configs/project');

module.exports = () => async (ctx, next) => {
    await next();

    let resStatus = parseInt(ctx.status, 10);
    if (resStatus === 404) {
        ctx.body = '';
        ctx.redirect(projectConfigs.uri.miss);
    } else if (resStatus >= 500) {
        ctx.body = '';
        ctx.redirect(projectConfigs.uri.error);
    }
};
