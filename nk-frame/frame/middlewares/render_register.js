/**
 * 注册视图渲染
 * User: 姜伟
 * Date: 19-5-1
 * Time: 下午8:40
 */

module.exports = () => {
    return async (ctx, next) => {
        ctx.render = function (view, data={}) {
            let env = require('nk-frame/templates/nunjucks/env');
            let viewData = Object.assign({}, ctx.state || {}, data || {});
            ctx.response.body = env.render(view, viewData);
        };

        await next();
    }
};