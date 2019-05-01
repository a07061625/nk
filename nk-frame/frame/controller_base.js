/**
 * 基础控制器类
 * User: 姜伟
 * Date: 19-5-1
 * Time: 下午2:50
 */
const env = require('nk-frame/templates/nunjucks/env');
const VIEWENV = Symbol('view-nunjucksenv');

class BaseController {
    constructor() {
        this[VIEWENV] = env;
    }

    /**
     * 渲染视图数据
     * @param {string} view 视图文件
     * @param {json} data 数据
     * @returns {string}
     */
    render(view, data) {
        return this[VIEWENV].render(view, data);
    }
}