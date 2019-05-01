/**
 * 项目过滤器
 * User: 姜伟
 * Date: 19-5-1
 * Time: 下午2:16
 */
const filters = require('nk-frame/templates/nunjucks/filters_base');

//过滤器名都是以nk开头
filters.nktest = () => {
    return 'test';
};
module.exports = filters;