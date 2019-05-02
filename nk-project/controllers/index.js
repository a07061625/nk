/**
 * 默认控制器
 * User: 姜伟
 * Date: 19-4-30
 * Time: 上午9:45
 */
const common = require('nk-project/controllers/common');
let controller = common;
controller.indexAction = async (ctx, next) => {
    ctx.render('index/index.html', {
        title: 'jw test',
        content: 'Hello World Index!'
    });

    await next();
};

module.exports = controller;
