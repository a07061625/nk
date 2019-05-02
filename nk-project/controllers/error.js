/**
 * 错误处理控制器
 * User: 姜伟
 * Date: 19-5-1
 * Time: 下午1:48
 */
module.exports = {
    'errorAction': async (ctx, next) => {
        ctx.render('error.html', {
            'err_msg': ctx.request.query.err_msg || '未知错误'
        });
        await next();
    }
};
