/**
 * 错误处理控制器
 * User: 姜伟
 * Date: 19-5-1
 * Time: 下午1:48
 */
const CommonController = require('nk-project/controllers/common');

class ErrorController extends CommonController {
    constructor () {
        super();
    }

    indexAction () {
        return async (ctx, next) => {
            ctx.render('error.html', {});
            await next();
        };
    }
}

let controller = new ErrorController();
module.exports = controller;
