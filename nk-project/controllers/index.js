/**
 * 默认控制器
 * User: 姜伟
 * Date: 19-4-30
 * Time: 上午9:45
 */
const CommonController = require('nk-project/controllers/common');

class IndexController extends CommonController {
    constructor() {
        super();
    }

    indexAction() {
        return async (ctx, next) => {
            ctx.render('index/index.html', {
                title: "jw test",
                content: "Hello World Index!"
            });

            await next();
        }
    }
}

let controller = new IndexController();
module.exports = controller;