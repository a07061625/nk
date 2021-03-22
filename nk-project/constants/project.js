/**
 * Created by nk.
 * User: 姜伟
 * Date: 2021/3/22 0022
 * Time: 10:24
 */

let baseConstant = require('nk-frame/constants/project_base');

/**
 * redis键名前缀-公共部分
 * @type {string}
 */
baseConstant.NK_REDIS_PREFIX_COMMON = 'sya01';
/**
 * redis键名前缀-用户令牌
 * @type {string}
 */
baseConstant.NK_REDIS_PREFIX_TOKEN = baseConstant.NK_REDIS_PREFIX_COMMON + '00001_';

module.exports = baseConstant;
