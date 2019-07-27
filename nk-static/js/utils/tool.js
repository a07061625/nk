/**
 * 工具函数
 * User: 姜伟
 * Date: 19-5-5
 * Time: 下午10:57
 */
var Tool = {
    'chars': [
        '2', '3', '4', '5', '6', '7', '8', '9',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'm', 'n', 'p', 'q', 'r',
        's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    ],

    /**
     * 生成随机字符串
     * @param {int} length 字符串长度
     * @return {string} 随机字符串
     */
    'createNonceStr': (length) => {
        let str = '';
        let pos = 0;
        for (let i = 0; i < length; i++) {
            pos = Math.round(Math.random() * 31);
            str += this.chars[pos];
        }
        return str;
    },

    /**
     * 获取浏览器类型
     * @return {string} 浏览器类型
     */
    'getBrowserType': () => {
        let userAgent = window.navigator.userAgent;
        if (/MicroMessenger/.test(userAgent)) {
            return 'wx';
        }
        if (/AlipayClient/.test(userAgent)) {
            return 'alipay';
        }
        if (userAgent.indexOf('Opera') > -1) {
            return 'opera';
        }
        if ((userAgent.indexOf('compatible') > -1) && (userAgent.indexOf('MSIE') > -1)) {
            let reIE = new RegExp('MSIE (\\d+\\.\\d+);');
            reIE.test(userAgent);
            let ieVersion = parseInt(RegExp.$1, 10);
            if (ieVersion >= 7) {
                return 'ie' + ieVersion.toString();
            } else {
                return 'ie';
            }
        }
        if ((userAgent.indexOf('trident') > -1) && (userAgent.indexOf('rv:11.0') > -1)) {
            return 'ie11';
        }
        if (userAgent.indexOf('Edge') > -1) {
            return 'edge';
        }
        if (userAgent.indexOf('Firefox') > -1) {
            return 'firefox';
        }
        let chromeIndex = userAgent.indexOf('Chrome');
        if ((userAgent.indexOf('Safari') > -1) && (chromeIndex < 0)) {
            return 'safari';
        }
        if (chromeIndex > -1) {
            return 'chrome';
        }
        return 'unknown';
    },

    /**
     * 去除字符串左边空格
     * @param {string} str 字符串
     * @return {string} 字符串
     */
    'ltrim': (str) => str.replace(/^(\s|\u00A0)+/, ''),

    /**
     * 去除字符串右边空格
     * @param {string} str 字符串
     * @return {string} 字符串
     */
    'rtrim': (str) => str.replace(/(\s|\u00A0)+$/, ''),

    /**
     * 去除字符串前后空格
     * @param {string} str 字符串
     * @return {string} 字符串
     */
    'trim': (str) => str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, ''),

    /**
     * 日期格式化
     * @param {int} timestamp 毫秒级时间戳
     * @param {string} format 格式字符串 yyyy-MM-dd hh:mm:ss.S
     * @return {string} 格式化后的日期
     */
    'dateFormat': (timestamp, format) => {
        let nowDate = new Date(timestamp);
        let o = {
            'M+': nowDate.getMonth() + 1,
            'd+': nowDate.getDate(),
            'h+': nowDate.getHours(),
            'm+': nowDate.getMinutes(),
            's+': nowDate.getSeconds(),
            'q+': Math.floor((nowDate.getMonth() + 3) / 3),
            'S': nowDate.getMilliseconds()
        };
        let week = {
            '0': '/u65e5',
            '1': '/u4e00',
            '2': '/u4e8c',
            '3': '/u4e09',
            '4': '/u56db',
            '5': '/u4e94',
            '6': '/u516d'
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (nowDate.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(format)) {
            format = format.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[nowDate.getDay() + '']);
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return format;
    },

    // ------代码优化开始------
    // 参考链接: https://30secondsofcode.org/
    /**
     * 判断数组中所有元素是否都满足条件
     * @param {array} arr 数组数据
     * @param {function|bool} fn 判断条件
     * @return {bool} 判断结果
     */
    'arrayAll': (arr, fn = true) => arr.every(fn),

    /**
     * 判断数组中所有元素相等
     * @param {array} arr 数组数据
     * @return {bool} 判断结果
     */
    'arrayAllEqual': (arr) => arr.every((val) => val === arr[0]),

    /**
     * 判断数组中是否存在元素满足条件
     * @param {array} arr 数组数据
     * @param {function|bool} fn 判断条件
     * @return {bool} 判断结果
     */
    'arrayAny': (arr, fn = true) => arr.some(fn),

    /**
     * 数组转CSV
     * @param {array} arr 数组数据
     * @param {string} delimiter 分隔符
     * @return {string} 转化结果
     */
    'array2CSV': (arr, delimiter = ',') => arr.map((v) => v.map((x) => (isNaN(x) ? `"${x.replace(/"/g, '""')}"` : x)).join(delimiter)).join('\n'),

    /**
     * 数据过滤
     * @param {array} arr 数组数据
     * @param {array} filter 过滤器
     * @return {array} 过滤结果
     */
    'arrayBifurcate': (arr, filter) => arr.reduce((acc, val, i) => acc[filter[i] ? 0 : 1].push(val), [[], []]),

    /**
     * 根据条件过滤数据
     * @param {array} arr 数组数据
     * @param {function} fn 过滤条件
     * @return {array} 过滤结果
     */
    'arrayBifurcateBy': (arr, fn) => arr.reduce((acc, val, i) => acc[fn(val, i) ? 0 : 1].push(val), [[], []]),

    /**
     * 数组分块
     * @param {array} arr 数组数据
     * @param {int} size 分块大小
     * @return {array} 分块结果
     */
    'arrayChunk': (arr, size) => Array.from({length: Math.ceil(arr.length / size)}, (v, i) => arr.slice(i * size, i * size + size)),

    /**
     * 获取数组中指定元素的个数
     * @param {array} arr 数组数据
     * @param {obj} val 元素值
     * @return {int} 元素个数
     */
    'arrayCountOccurrences': (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0),

    /**
     * 获取两个数组的不同元素
     * @param {array} a 数组数据
     * @param {array} b 数组数据
     * @return {array} 获取结果
     */
    'arrayDifference': (a, b) => {
        const s = new Set(b);
        return a.filter((x) => !s.has(x));
    },

    /**
     * 根据过滤器获取两个数组的不同元素
     * @param {array} a 数组数据
     * @param {array} b 数组数据
     * @param {function} fn 过滤器
     * @return {array} 获取结果
     */
    'arrayDifferenceBy': (a, b, fn) => {
        const s = new Set(b.map(fn));
        return a.map(fn).filter((el) => !s.has(el));
    },
    // ------代码优化结束------
};
