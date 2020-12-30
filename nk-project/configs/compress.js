/**
 * 项目压缩配置
 * User: 姜伟
 * Date: 2020/12/30 0030
 * Time: 11:05
 */
let baseConfig = require('nk-frame/configs/compress_base');

//压缩text
baseConfig.filter = contentType => {
    return /text/i.test(contentType)
}

module.exports = baseConfig;