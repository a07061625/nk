/**
 * 公共缓存配置
 * User: 姜伟
 * Date: 2019/4/29 0029
 * Time: 15:07
 */
const Tool = require('nk-frame/tools/tool');
const Log = require('nk-frame/logs/log');

module.exports = {
    'lru': {
        'route': {
            max: 1000
        }
    },
    'redis': {
        'host': '127.0.0.1',
        'port': 6379,
        'socket_keepalive': true,
        'password': '',
        'db': 0,
        'prefix': '',
        'rename_commands': {
            'KEYS': Tool.createNonceStr(8, 'numlower')
        }
    },
    'redis_error': function(error) {
        Log.error(error, 'nk-redis');
    }
};
