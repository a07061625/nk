/**
 * 公共压缩配置
 * User: 姜伟
 * Date: 2020/12/30 0030
 * Time: 11:04
 */
module.exports = {
    threshold: 2048,
    gzip: {
        flush: require('zlib').constants.Z_SYNC_FLUSH
    },
    deflate: {
        flush: require('zlib').constants.Z_SYNC_FLUSH,
    },
    br: false
}
