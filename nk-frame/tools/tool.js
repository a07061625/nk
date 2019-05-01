/**
 * 框架工具类
 * User: 姜伟
 * Date: 2019/4/26 0026
 * Time: 7:50
 */
const CHAR_TOTAL = new Symbol('tool-char-tool');
const CHAR_NUMLOWER = new Symbol('tool-char-numlower');
const CHAR_LOWER = new Symbol('tool-char-lower');

class Tool {
    /**
     * 生成随机字符串
     * @param {number} length 字符串长度
     * @param {string} dataType 数据类型 total:数字和字母 numlower:数字和小写字母 lower:小写字母
     * @returns {string}
     */
    static createNonceStr(length,dataType='total') {
        let str = '';
        let pos = 0;
        if (dataType == 'total') {
            let arrMaxIndex = 56;
            for (let i=0; i<length; i++) {
                pos = Math.round(Math.random() * arrMaxIndex);
                str += this[CHAR_TOTAL][pos];
            }
        } else if (dataType == 'numlower') {
            let arrMaxIndex = 31;
            for (let i=0; i<length; i++) {
                pos = Math.round(Math.random() * arrMaxIndex);
                str += this[CHAR_NUMLOWER][pos];
            }
        } else {
            let arrMaxIndex = 23;
            for (let i=0; i<length; i++) {
                pos = Math.round(Math.random() * arrMaxIndex);
                str += this[CHAR_LOWER][pos];
            }
        }

        return str;
    }

    /**
     * 获取配置
     * @param {string} file json配置文件,包含路径,不包含.json后缀
     * @param {string} key 键名
     * @param {*} defVal 默认值
     * @returns {*}
     */
    static getConfigs(file,key='',defVal=null) {
        let configs = require(file);
        if (key.length > 0) {
            let keyList = key.split('.');
            for (let eKey in keyList) {
                if (eKey.length > 0) {
                    if (configs.hasOwnProperty(eKey)) {
                        configs = configs[eKey];
                    } else {
                        return defVal;
                    }
                }
            }
        }

        return configs;
    }

    /**
     * 判断JSON对象是否为空
     * @param {object} obj JSON对象
     * @returns {boolean}
     */
    static isEmptyJson(obj) {
        for(let name in obj){
            return false;
        }
        return true;
    }
}
Tool[CHAR_TOTAL] = [
    '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'm', 'n', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q',
    'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y',
    'Z',
];
Tool[CHAR_LOWER] = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'm', 'n', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
];
Tool[CHAR_NUMLOWER] = [
    '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
    'i', 'j', 'k', 'm', 'n', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
];

module.exports = Tool;