/*! For license information please see app.56d58bb8.js.LICENSE */
!function(e){var t={};function a(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=t,a.d=function(e,t,i){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(a.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(i,n,function(t){return e[t]}.bind(null,n));return i},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="http://120.79.139.64:8800/",a(a.s=0)}([function(e,t,a){a(1),e.exports=a(4)},function(e,t,a){a(2),a(3),window.upFileManage={},upFileManage.upFileParam=function(e){e={adState:e.adState||!0,fileContentId:e.fileContentId,uploadUrl:e.uploadUrl||urlArr.wxapi+"File/uploadMPImage",size:e.size||5120,maxFileNumber:e.maxFileNumber||1,upLoadInit:e.upLoadInit||"",beforeUpload:this.beforeUploadFun,scheduleStandard:e.scheduleStandard||!0,upLoadEnd:e.upLoadEnd||"",onUpload:this.onUploadFun,deleteFile:e.deleteFile||this.deleteFileFun,autoCommit:e.autoCommit||!0,isHiddenUploadBt:e.isHiddenUploadBt||!0,isHiddenCleanBt:e.isHiddenCleanBt||!0,ismultiple:e.ismultiple||!1,upTxt:e.upTxt||"上传图片",fileType:["png","jpg","jpeg","docx","doc"],otherData:{upload_type:e.upload_type||2,image_width:e.image_width||4e3,image_height:e.image_height||4e3},fileArr:[]},this.res=e,this.fileUpload=!1,this.upLoadFileInit()},upFileManage.upFileParam.prototype={upLoadFileInit:function(){var e=this;e.beforeUploadFun(),webapp.fileUpload?($("#"+e.res.fileContentId).initUpload(e.res),"function"==typeof e.res.upLoadInit&&e.res.upLoadInit()):webapp.loadScript("/libs/fileUpload.js",function(){webapp.fileUpload=!0,e.upLoadFileInit()})},setShowFile:function(e,t){if(e[0]){for(var a=uploadTools.getOpt(this.res.fileContentId),i=[],n=$("#"+this.res.fileContentId+" .box").get(0),o=0;o<e.length;o++){var s=e[o].lastIndexOf("/"),l=e[o].substring(s+1,e[o].length),r=uploadTools.getShowFileType(!0,"",l,e[o],o);$(n).append(r),i.push(o),"function"==typeof t&&t(o)}this.res.fileArr=e,uploadFileList.setFileList(i,a),uploadTools.initWithDeleteFile(a),$("#"+this.res.fileContentId).find(".upload-img_icon").remove()}},beforeUploadFun:function(){},onUploadFun:function(e,t){var a=this,i=t.fileList.length;a.fileArr[i-1]=e.data.image_url,"function"==typeof a.upLoadEnd&&a.upLoadEnd(e,t),$("#"+a.fileContentId).find(".upload-img_icon").remove()},deleteFileFun:function(e,t){this.fileArr[e]&&this.fileArr.splice(e,1)},getFileUrlArr:function(){return this.res.fileArr}}},function(e,t,a){},function(e,t,a){},function(e,t){var a={wx:"",url:"",link:"",title:"",desc:"",imgUrl:"",type:"",dataUrl:"",latitude:"",longitude:"",name:"",address:"",infoUrl:"",scale:14,share_type:1,data:"",QQData:"",TimeLineData:"",WeiBoData:"",Location:"",url_type:1,url_title:"生活链—基于区块链的本地生活服务平台",url_refer:document.referrer||location.href.split("#")[0],share_get_num:0,getMPShareNum:0,success:function(){webapp.postShare(a.link,a.share_type)},cancel:function(){},setData:function(){var e=this;e.data={title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl,type:e.type,dataUrl:e.dataUrl,scale:14,latitude:e.latitude,longitude:e.longitude,name:e.name,address:e.address,infoUrl:e.infoUrl,success:e.success,cancel:e.cancel},e.QQData=JSON.stringify(e.data),e.QQData=JSON.parse(e.QQData),e.TimeLineData=JSON.stringify(e.data),e.TimeLineData=JSON.parse(e.TimeLineData),e.WeiBoData=JSON.stringify(e.data),e.WeiBoData=JSON.parse(e.WeiBoData),e.Location=JSON.stringify(e.data),e.Location=JSON.parse(e.Location),e.QQData.success=e.success,e.TimeLineData.success=e.success,e.WeiBoData.success=e.success,e.Location.success=e.success,e.QQData.cancel=e.cancel,e.TimeLineData.cancel=e.cancel,e.WeiBoData.cancel=e.cancel,e.Location.cancel=e.cancel},start:function(){var e=this,t={};t.share_url=e.url,webapp.ajax("f/shares/sign",t,function(t){0==t.code?e.wxAPI(t.data.appId,t.data.timestamp,t.data.nonceStr,t.data.signature):e.getMPShareNum<3?(e.getMPShareNum++,e.start()):webapp.hintInfo(1,{contentTxt:"签名失败，请刷新重新尝试~~~"})})},wxAPI:function(e,t,a,i){var n=this;this.wx.config({debug:!1,appId:e,timestamp:t,nonceStr:a,signature:i,jsApiList:["chooseWXPay","checkJsApi","scanQRCode","onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","translateVoice","openLocation","getLocation","geoLocation","hideMenuItems","showMenuItems","hideAllNonBaseMenuItem","showAllNonBaseMenuItem","chooseImage","previewImage","uploadImage","downloadImage","favorite"]}),this.wx.checkJsApi({jsApiList:["chooseImage","chooseWXPay"],success:function(e){e.checkResult.chooseImage,e.checkResult.chooseWXPay}}),this.wx.ready(function(){for(var e in n.wx.hideMenuItems({menuList:["menuItem:copyUrl","menuItem:share:email"]}),window.wxCallbackList)webapp.isFunction(window.wxCallbackList[e])&&(window.wxCallbackList[e](),window.wxCallbackList.splice(e,1));window.__wx_is_share=!0,""==n.data&&n.setData(),n.wx.onMenuShareQQ(n.QQData),n.wx.onMenuShareAppMessage(n.data),n.wx.onMenuShareTimeline(n.TimeLineData),n.wx.onMenuShareWeibo(n.WeiBoData),n.latitude&&n.wx.openLocation(n.Location),n.wx.hideMenuItems({menuList:["menuItem:readMode","menuItem:openWithQQBrowser","menuItem:setFont","menuItem:exposeArticle"],success:function(e){},fail:function(e){}})}),this.wx.error(function(e){window.__wx_is_share=!1,n.share_get_num<3&&(n.share_get_num++,n.start())})}}}]);