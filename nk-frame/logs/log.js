/**
 * Created by nkv.
 * User: 姜伟
 * Date: 2019/4/26 0026
 * Time: 14:57
 */
class Log {
    /**
     * 打印错误日志
     * @param {string} tag 标识
     * @param {*} msg
     */
    static error(tag, msg) {
        this.log(tag, msg, this.LEVEL_ERROR);
    }

    /**
     * 打印信息日志
     * @param {string} tag 标识
     * @param {*} msg
     */
    static info(tag, msg) {
        this.log(tag, msg, this.LEVEL_INFO);
    }

    /**
     * 打印警告日志
     * @param {string} tag 标识
     * @param {*} msg
     */
    static warn(tag, msg) {
        this.log(tag, msg, this.LEVEL_WARNING);
    }

    /**
     * 打印日志
     * @param {string} tag 标识
     * @param {*} msg
     * @param {string} level 日志级别
     */
    static log(tag, msg, level='INFO') {
        let logPrefix = new Date().toLocaleString() + ' | ' + level + ' | ' + tag + " | \n ";
        if (msg instanceof Error) {
            let nowMsg = msg.stack || msg.toString();
            console.log(logPrefix, nowMsg);
        } else {
            console.log(logPrefix, msg);
        }
    }
}
Log.LEVEL_INFO = 'INFO';
Log.LEVEL_WARNING = 'WARNING';
Log.LEVEL_ERROR = 'ERROR';

module.exports = Log;