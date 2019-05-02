/**
 * 模板环境
 * User: 姜伟
 * Date: 19-5-1
 * Time: 下午2:15
 */
const nunjucks = require('nunjucks');
const templateConfig = require('nk-project/configs/template');
const filters = require('nk-project/templates/nunjucks/filters');

let viewPath = process.cwd() + '/views';
let notProduction = process.env.NODE_ENV !== 'production';
let fileLoader = new nunjucks.FileSystemLoader(viewPath, {
    noCache: notProduction,
    watch: notProduction
});
let env = new nunjucks.Environment(fileLoader, {
    autoescape: templateConfig.nunjucks.autoescape,
    throwOnUndefined: templateConfig.nunjucks.throwOnUndefined
});

for (let funcName in filters) {
    env.addFilter(funcName, filters[funcName]);
}

module.exports = env;
