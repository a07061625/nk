/**
 * redis缓存
 * User: 姜伟
 * Date: 2020/5/16 0016
 * Time: 11:51
 */
let cacheConfig = require('nk-project/configs/cache');
const redis = require('redis');
let redisClient = redis.createClient(cacheConfig.redis);
redisClient.on('error', cacheConfig.redis_error);
module.exports = redisClient;
