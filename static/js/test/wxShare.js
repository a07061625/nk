/**
 * Created by Chen on 15/11/27.
 * 微信分享
 */
var share = {
    wx:'',
    url : '',
    link : '',  //分享链接
    title : '',  //分享标题
    desc : '',  //分享描述
    imgUrl : '', //分享图标
    type : '', //分享类型,music、video或link，不填默认为link
    dataUrl : '', ////如果type是music或video，则要提供数据链接，默认为空
    latitude:'',
    longitude:'',
    name:'',
    address:'',
    infoUrl:'',
    scale: 14,
    share_type: 1,
    data: '',
    QQData: '',
    TimeLineData: '',
    WeiBoData: '',
    Location:'',
    url_type: 1,
    url_title: '生活链—基于区块链的本地生活服务平台',
    url_refer: document.referrer || location.href.split('#')[0],
    share_get_num: 0,
    getMPShareNum: 0,
    success : function () {
        webapp.postShare(share.link, share.share_type);
    },
    cancel: function () {
        //alert('用户取消分享后执行的回调函数');
    },
    setData: function(){
        var self = this;
        self.data = {
            title: self.title,
            desc: self.desc,
            link: self.link,
            imgUrl: self.imgUrl,
            type: self.type, // 分享类型,music、video或link，不填默认为link
            dataUrl: self.dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
            scale: 14,
            latitude: self.latitude,
            longitude: self.longitude,
            name:self.name,
            address:self.address,
            infoUrl:self.infoUrl,
            success: self.success,
            cancel: self.cancel
        };
        
        //深度克隆
        self.QQData = JSON.stringify(self.data);
        self.QQData = JSON.parse(self.QQData);
        self.TimeLineData = JSON.stringify(self.data);
        self.TimeLineData = JSON.parse(self.TimeLineData);
        self.WeiBoData = JSON.stringify(self.data);
        self.WeiBoData = JSON.parse(self.WeiBoData);
        self.Location=JSON.stringify(self.data);
        self.Location=JSON.parse(self.Location);
        
        //反序列化
        self.QQData.success = self.success;
        self.TimeLineData.success = self.success;
        self.WeiBoData.success = self.success;
        self.Location.success=self.success;
        self.QQData.cancel = self.cancel;
        self.TimeLineData.cancel = self.cancel;
        self.WeiBoData.cancel = self.cancel;
        self.Location.cancel=self.cancel;
    },

    start: function(){
        var self = this, params = {};
        params.share_url = self.url;
        webapp.ajax('f/shares/sign', params, function ( data ) {
            if(data.code == 0) {
                self.wxAPI(data.data.appId,data.data.timestamp,data.data.nonceStr,data.data.signature);
            } else {
                if(self.getMPShareNum < 3){
                    self.getMPShareNum++;
                    self.start();
                } else {
                    webapp.hintInfo(1, {
                        contentTxt: '签名失败，请刷新重新尝试~~~'
                    });
                }
            }
        });
    },
    wxAPI: function(appId,timestamp,nonceStr,signature){
        var self = this;
        this.wx.config({
            debug: false, // 开启  调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature,// 必填，签名，见附录1
            jsApiList: [
                'chooseWXPay',
                'checkJsApi',
                'scanQRCode',
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'translateVoice',
                'openLocation',
                'getLocation',
                'geoLocation',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'chooseImage',
                'previewImage',
                'uploadImage',
                'downloadImage',
                'favorite'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        this.wx.checkJsApi({
            jsApiList: [
                'chooseImage',
                'chooseWXPay'
            ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
            success: function(res) {
                if(!res.checkResult.chooseImage){
                    //alert('当前微信不支持图片上传');
                }
                if(!res.checkResult.chooseWXPay){
                    //alert('当前微信不支持微信支付');
                }
                // 以键值对的形式返回，可用的api值true，不可用为false
                // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
            }
        });
        this.wx.ready(function(){
            self.wx.hideMenuItems({
                menuList: [
                    'menuItem:copyUrl',
                    'menuItem:share:email'
                ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
            });
            for(var i in window.wxCallbackList){
                if(webapp.isFunction(window.wxCallbackList[i])){
                    window.wxCallbackList[i]();
                    window.wxCallbackList.splice(i, 1);
                }
            }
            window.__wx_is_share = true;
            //self.wx.showOptionMenu();
            if(self.data == '') self.setData();
            //分享qq
            self.wx.onMenuShareQQ(self.QQData);
            //分享朋友
            self.wx.onMenuShareAppMessage(self.data);
            //分享朋友圈
            self.wx.onMenuShareTimeline(self.TimeLineData);
            //分享微博
            self.wx.onMenuShareWeibo(self.WeiBoData);
            //定位
            if(self.latitude){
                self.wx.openLocation(self.Location);
            }
            self.wx.hideMenuItems({
                menuList: [
                    'menuItem:readMode', // 阅读模式
                    //'menuItem:copyUrl', // 复制链接
                    'menuItem:openWithQQBrowser',
                    'menuItem:setFont',
                    'menuItem:exposeArticle'
                ],
                success: function (res) {
                
                },
                fail: function (res) {
                
                }
            });
        });
        this.wx.error(function (res) {
            window.__wx_is_share = false;
            if(self.share_get_num < 3){
                self.share_get_num++;
                self.start();
            } else {
                //webapp.postError('微信签名连续失败', JSON.stringify(res));
            }
        })
    }
};