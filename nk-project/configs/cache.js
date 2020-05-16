/**
 * 项目缓存配置
 * User: 姜伟
 * Date: 2019/4/29 0029
 * Time: 15:08
 */
let baseConfig = require('nk-frame/configs/cache_base');
baseConfig.redis.password = 'fafasdc';
baseConfig.redis.db = 0;
baseConfig.redis.prefix = 'nka01_';

module.exports = baseConfig;
