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
    'createNonceStr': function (length) {
        var str = '';
        var pos = 0;
        for (var i = 0; i < length; i++) {
            pos = Math.round(Math.random() * 31);
            str += this.chars[pos];
        }
        return str;
    },

    /**
     * 获取浏览器类型
     * @return {string} 浏览器类型
     */
    'getBrowserType': function () {
        var userAgent = window.navigator.userAgent;
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
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var ieVersion = parseInt(RegExp.$1, 10);
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
        var chromeIndex = userAgent.indexOf('Chrome');
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
    'ltrim': function (str) {
        return str.replace(/^(\s|\u00A0)+/, '');
    },

    /**
     * 去除字符串右边空格
     * @param {string} str 字符串
     * @return {string} 字符串
     */
    'rtrim': function (str) {
        return str.replace(/(\s|\u00A0)+$/, '');
    },

    /**
     * 去除字符串前后空格
     * @param {string} str 字符串
     * @return {string} 字符串
     */
    'trim': function (str) {
        return str.replace(/^(\s|\u00A0)+/, '').replace(/(\s|\u00A0)+$/, '');
    },

    /**
     * 日期格式化
     * @param {int} timestamp 毫秒级时间戳
     * @param {string} format 格式字符串
     * @return {string} 格式化后的日期
     */
    'dateFormat': function (timestamp, format) {
        var nowDate = new Date(timestamp);
        var o = {
            'M+': nowDate.getMonth() + 1,
            'd+': nowDate.getDate(),
            'h+': nowDate.getHours(),
            'm+': nowDate.getMinutes(),
            's+': nowDate.getSeconds(),
            'q+': Math.floor((nowDate.getMonth() + 3) / 3),
            'S': nowDate.getMilliseconds()
        };
        var week = {
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
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return format;
    }
};
