/**
 * 异常上报
 * User: 姜伟
 * Date: 2019/5/6 0006
 * Time: 15:57
 */
var reportMsg = {
    msg: '', /** 错误的具体信息 **/
    url: '', /** 错误所在的url **/
    line: '', /** 错误所在的行 **/
    col: '', /** 错误所在的列 **/
    error: '', /** 具体的error对象 **/
};

/**
 * 格式化参数
 * @param {array} data 参数数组
 * @return {string} 字符串
 */
function reportFormatParams (data) {
    var arr = [];
    for (var name in data) {
        arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
    arr.push(('v=' + Math.random()).replace('.', ''));
    return arr.join('&');
}

/**
 * 复制对象
 * @param {*} oldObj 被复制的对象
 * @return {*} 复制后的对象
 */
function reportCloneObj (oldObj) {
    if ((oldObj === null) || (typeof oldObj !== 'object')) {
        return oldObj;
    }
    var newObj = {};
    for (var prop in oldObj) {
        newObj[prop] = oldObj[prop];
    }
    return newObj;
}

/**
 * 扩展对象
 * @return {*} 扩展后的对象
 */
function reportExtendObj () {
    var args = arguments;
    if (args.length < 2) {
        return;
    }
    var temp = reportCloneObj(args[0]);
    for (var n = 1, len = args.length; n < len; n++) {
        for (var index in args[n]) {
            temp[index] = args[n][index];
        }
    }
    return temp;
}

/**
 * ajax上报
 * @param {object} options 上报参数
 * @return {void}
 */
function reportAjax (options) {
    options = options || {};
    options.type = (options.type || 'GET').toUpperCase();
    options.dataType = options.dataType || 'json';
    var params = reportFormatParams(options.data);
    var xhr = null;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            var status = xhr.status;
            if ((status >= 200) && (status < 300)) {
                options.success && options.success(xhr.responseText, xhr.responseXML);
            } else {
                options.fail && options.fail(status);
            }
        }
    };

    if (options.type === 'GET') {
        xhr.open('GET', options.url + '?' + params, true);
        xhr.send(null);
    } else if (options.type === 'POST') {
        xhr.open('POST', options.url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(params);
    }
}

function reportError (params) {
    if (!params.url) {
        return;
    }
    window.onerror = function (msg, url, line, col, error) {
        // 采用异步的方式,避免阻塞
        setTimeout(function () {
            // 不一定所有浏览器都支持col参数，如果不支持就用window.event来兼容
            col = col || (window.event && window.event.errorCharacter) || 0;
            reportMsg.url = url;
            reportMsg.line = line;
            reportMsg.col = col;

            if (error && error.stack) {
                // 如果浏览器有堆栈信息，直接使用
                reportMsg.msg = error.stack.toString();
            } else if (arguments.callee) {
                // 尝试通过callee拿堆栈信息
                var ext = [];
                var fn = arguments.callee.caller;
                var floor = 3; // 这里只拿三层堆栈信息
                while (fn && (--floor > 0)) {
                    ext.push(fn.toString());
                    if (fn === fn.caller) { // 如果有环
                        break;
                    }
                    fn = fn.caller;
                }
                reportMsg.msg = ext.join(',');
            }
            // 合并上报的数据，包括默认上报的数据和自定义上报的数据
            var reportData = reportExtendObj(params.data || {}, reportMsg);

            // 把错误信息发送给后台
            reportAjax({
                url: params.url,
                type: 'POST',
                data: reportData,
                dataType: 'json',
                success: function (response, xml) {
                    params.successCallBack && params.successCallBack(response, xml);
                },
                fail: function (status) {
                    params.failCallBack && params.failCallBack(status);
                }
            });
        }, 0);
        return true;
    };
}
