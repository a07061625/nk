require('../../css/imgBox.css');
require('../../css/LArea.css');

window.upFileManage = {};

/*
 * 上传文件初始化
 * res
 *  @params contentId 内容显示ID 必填
 * */
upFileManage.upFileParam = function (res) {
    res = {
        adState: res.adState || true,
        fileContentId: res.fileContentId,
        uploadUrl: res.uploadUrl || urlArr.wxapi+'File/uploadMPImage', //上传文件信息地址
        size: res.size || 5120, //文件大小限制，单位kb, 默认不限制
        maxFileNumber: res.maxFileNumber || 1, //文件个数限制，为整数
        upLoadInit: res.upLoadInit || '', //初始化成功
        beforeUpload: this.beforeUploadFun, //在上传前执行的函数
        scheduleStandard: res.scheduleStandard || true, //在上传后执行的函数
        upLoadEnd: res.upLoadEnd || '', //在上传后执行的函数
        onUpload: this.onUploadFun, //在上传后执行的函数
        deleteFile: res.deleteFile || this.deleteFileFun, //在删除后执行的函数
        autoCommit: res.autoCommit || true, //文件是否自动上传
        isHiddenUploadBt: res.isHiddenUploadBt || true, //隐藏上传按钮
        isHiddenCleanBt: res.isHiddenCleanBt || true, //隐藏清理按钮
        ismultiple: res.ismultiple || false, //多选or单选
        upTxt: res.upTxt || '上传图片' , //隐藏清理按钮
        fileType: ['png','jpg','jpeg','docx','doc'], //文件类型限制，默认不限制，注意写的是文件后缀
        otherData: {
            //user_type: res.user_type || 2, //用户类型 1:总站 2:用户 3:联盟
            upload_type: res.upload_type || 2, //1:文件上传 2:base64上传 3:外部链接上传 4:微信媒体上传
            image_width: res.image_width || 4000, //图片宽度
            image_height: res.image_height || 4000, //图片高度
        },
        fileArr: []
    };
    this.res = res;
    this.fileUpload = false;
    this.upLoadFileInit();
};

upFileManage.upFileParam.prototype = {
    /*
    * 上传文件初始化
    * */
    upLoadFileInit: function () {
        var self = this;
        self.beforeUploadFun();
        if(webapp.fileUpload){
            $("#"+self.res.fileContentId).initUpload(self.res);
            if(typeof self.res.upLoadInit == 'function'){
                self.res.upLoadInit();
            }
        }else{
            webapp.loadScript('/libs/fileUpload.js', function () {
                webapp.fileUpload = true;
                self.upLoadFileInit();
            });
        }
    },
    
    /*
    * 展示获取到的文件内容
    * */
    setShowFile: function (urlArr, callback) {
        if(!urlArr[0]) return;
        var self = this, opt = uploadTools.getOpt(this.res.fileContentId), fileListArray = [];
        var boxJsObj =  $("#"+this.res.fileContentId+" .box").get(0);
        for(var i = 0; i < urlArr.length; i++){
            var index = urlArr[i].lastIndexOf("/");
            var name = urlArr[i].substring(index + 1, urlArr[i].length);
            var fileModel = uploadTools.getShowFileType(true,'', name, urlArr[i], i);
            $(boxJsObj).append(fileModel);
            fileListArray.push(i);
            if(typeof callback == 'function'){
                callback(i);
            }
        }
        self.res.fileArr = urlArr;
        uploadFileList.setFileList(fileListArray, opt);
        uploadTools.initWithDeleteFile(opt);
        $("#"+this.res.fileContentId).find('.upload-img_icon').remove();
    },
    
    /*
     * 上传开始前执行的函数
     * */
    beforeUploadFun: function () {
        //console.log(0);
    },
    
    /*
    * 上传完成后执行的函数
    * */
    onUploadFun: function (res, opt) {
        var self = this, file_length = opt.fileList.length;
        self.fileArr[file_length-1] = res.data.image_url;
        if(typeof self.upLoadEnd == 'function'){
            self.upLoadEnd(res, opt);
        }
        $("#"+self.fileContentId).find('.upload-img_icon').remove();
    },
    
    /*
    * 删除图片
    * res 删除元素位置 fileCodeId
    * opt 对象
    * */
    deleteFileFun: function (res, opt) {
        var self = this;
        if(self.fileArr[res]){
            self.fileArr.splice(res, 1);
        }
    },
    
    /*
    * 获取文件url数组
    * */
    getFileUrlArr: function () {
        return this.res.fileArr;
    }
};