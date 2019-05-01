/**
 * 项目HTTP相关配置
 * User: 姜伟
 * Date: 19-4-28
 * Time: 下午9:34
 */
let baseConfig = require('nk-frame/configs/http_base');
baseConfig.host = '172.18.134.123';
baseConfig.port = 8700;
baseConfig.cookies.allianceid = {
    "key": "syaid"
};

module.exports = baseConfig;