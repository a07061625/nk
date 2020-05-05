/**
 * 公共过滤器
 * User: 姜伟
 * Date: 19-5-1
 * Time: 下午2:15
 */
// 过滤器名都是以nk开头
module.exports = {
    /**
     * 字符串省略
     * @param {string} str 输入的字符串
     * @param {int} length 保留的字符串长度
     * @param {string} tag 省略标识
     * @returns {string} 省略后的字符串
     */
    nkstromit: (str, length, tag = '...') => {
        if (str.length <= length) {
            return str;
        }

        let tempStr = str.substr(0, length);
        tempStr += tag;
        return tempStr;
    }
};
