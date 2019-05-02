/**
 * 默认控制器
 * User: 姜伟
 * Date: 19-4-30
 * Time: 上午9:45
 */
module.exports = {
    'indexAction': async (ctx, next) => {
        ctx.render('index/index.html', {
            title: 'jw test',
            content: 'Hello World Index!'
        });

        await next();
    }
};
