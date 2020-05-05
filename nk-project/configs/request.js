/**
 * 项目请求配置
 * User: 姜伟
 * Date: 2020/5/5 0005
 * Time: 21:50
 */
let baseConfig = require('nk-frame/configs/request_base');
baseConfig.api.create.baseURL = 'http://api.xxx.com';
baseConfig.api.create.validateStatus = function (status) {
    return status.parseInt() === 200;
};

module.exports = baseConfig;
