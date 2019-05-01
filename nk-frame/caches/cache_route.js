/**
 * 路由缓存
 * User: 姜伟
 * Date: 19-4-30
 * Time: 下午3:45
 */
const Lru = require('nk-frame/caches/lru');
let cacheConfig = require('nk-project/configs/cache');
cacheConfig.lru.route.maxAge = 31536000000;
let cacheRoute = new Lru(cacheConfig.lru.route);
module.exports = cacheRoute;