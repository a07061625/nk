/**
 * 错误处理控制器
 * User: 姜伟
 * Date: 19-5-1
 * Time: 下午1:48
 */
const CommonController = require('nk-project/controllers/common');

class ErrorController extends CommonController {
    constructor() {
        super();
    }

    indexAction() {
        return async (ctx, next) => {
            let data = {
                title: "jw test",
                num: 123
            };

            await ctx.render('index', data);
            next();
        }
    }
}

let controller = new ErrorController();
module.exports = controller;