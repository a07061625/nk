/**
 * 工具函数
 * User: 姜伟
 * Date: 19-5-5
 * Time: 下午10:57
 */
function GetLocalIPAddr() {
    var oSetting = null;
    var ip = null;
    try {
        oSetting = new ActiveXObject("rcbdyctl.Setting");
        ip = oSetting.GetIPAddress;
        if (ip.length == 0) {
            return "没有连接到Internet";
        }
        oSetting = null;
    } catch (e) {
        return ip;
    }
    return ip;
}

function getYourIP(){
    var RTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    if (RTCPeerConnection) (function () {
        var rtc = new RTCPeerConnection({iceServers:[]});
        if (1 || window.mozRTCPeerConnection) {
            rtc.createDataChannel('', {reliable:false});
        };

        rtc.onicecandidate = function (evt) {
            if (evt.candidate) grepSDP("a="+evt.candidate.candidate);
        };
        rtc.createOffer(function (offerDesc) {
            grepSDP(offerDesc.sdp);
            rtc.setLocalDescription(offerDesc);
        }, function (e) { console.warn("offer failed", e); });


        var addrs = Object.create(null);
        addrs["0.0.0.0"] = false;
        function updateDisplay(newAddr) {
            if (newAddr in addrs) return;
            else addrs[newAddr] = true;
            var displayAddrs = Object.keys(addrs).filter(function (k) { return addrs[k]; });
            for(var i = 0; i < displayAddrs.length; i++){
                if(displayAddrs[i].length > 16){
                    displayAddrs.splice(i, 1);
                    i--;
                }
            }
            document.getElementById('list').textContent = displayAddrs[0];
        }

        function grepSDP(sdp) {
            var hosts = [];
            sdp.split('\r\n').forEach(function (line, index, arr) {
                if (~line.indexOf("a=candidate")) {
                    var parts = line.split(' '),
                        addr = parts[4],
                        type = parts[7];
                    if (type === 'host') updateDisplay(addr);
                } else if (~line.indexOf("c=")) {
                    var parts = line.split(' '),
                        addr = parts[2];
                    updateDisplay(addr);
                }
            });
        }
    })();
    else{
        document.getElementById('list').textContent = "请使用主流浏览器：chrome,firefox,opera,safari";
    }
}

/**
 * 获取浏览器类型
 * @returns {string}
 */
function getBrowserType() {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf('Opera') > -1) {
        return 'opera';
    }
    if ((userAgent.indexOf('compatible') > -1) && (userAgent.indexOf('MSIE') > -1)) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseInt(RegExp["$1"]);
        if (fIEVersion >= 7) {
            return 'ie' + fIEVersion.toString();
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
}