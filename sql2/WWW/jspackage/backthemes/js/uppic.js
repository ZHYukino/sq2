//上传图片模块
function PhotoSave(SavePathArray) {
    $("#PicUpload").val(SavePathArray);
}

//上传图片数组
var PhotoUrlArray = new Array();
function PhotoUrl(id, filePath) {
    this.id = id;
    this.filePath = filePath;
}

var applicationPath = window.applicationPath === "" ? "" : window.applicationPath || "../../";
$(function () {
    var $ = jQuery,
    $list = $('#fileList'),
    // 优化retina, 在retina下这个值是2
    ratio = window.devicePixelRatio || 1,
    // 缩略图大小
    thumbnailWidth = 90 * ratio,
    thumbnailHeight = 90 * ratio,

    // Web Uploader实例
    uploader;
    uploader = WebUploader.create({

        // 选完文件后，是否自动上传。
        auto: false,

        //是否禁用拖拉上传
        disableGlobalDnd: true,

        // swf文件路径
        swf: applicationPath + '/Content/backthemes/js/plugins/webuploader/Uploader.swf',

        // 文件接收服务端。
        server: applicationPath + '/TYAdmin/UpLoadProcess',

        // 选择文件的按钮。可选。
        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
        pick: '#filePicker',

        //上传并发数
        threads: '1',

        formData: { 'FileAddress': $('#upfileaddress').html() },

        //允许上传类型
        accept: {
            title: 'Files',
            extensions: 'gif,jpg,jpeg,bmp,png,pdf,doc,docx,txt,xls,xlsx,ppt,pptx',
            mimeTypes: 'image/*,text/*'
                        //word
                       + ',application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                       //excel
                       + ',application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                       //ppt
                       + ',application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation'
                       + ',application/pdf'
        }
    });

    //// 准备时
    //uploader.on('ready', function () {

    //})

    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        uploader.sort();

        var $li = $(
                '<div id="' + file.id + '" class="cp_img">' +
                    '<img>' +
                '<div class="cp_img_jian"></div></div>'
                ),
            $img = $li.find('img');


        // $list为容器jQuery实例
        $list.append($li);

        // 创建缩略图
        // 如果为非图片文件，可以不用调用此方法。
        // thumbnailWidth x thumbnailHeight 为 100 x 100
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }

            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);


    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id),
            $percent = $li.find('.progress span');

        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<p class="progress"><span></span></p>')
                    .appendTo($li)
                    .find('span');
        }

        $percent.css('width', percentage * 100 + '%');
    });

    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file, response) {

        $('#' + file.id).addClass('upload-state-done');

        PhotoUrlArray.push(new PhotoUrl(response.id, response.filePath));
    });

    // 文件上传失败，显示上传出错。
    uploader.on('uploadError', function (file) {
        var $li = $('#' + file.id),
            $error = $li.find('div.error');

        // 避免重复创建
        if (!$error.length) {
            $error = $('<div class="error"></div>').appendTo($li);
        }

        $error.text('上传失败');
    });

    // 完成上传完了，成功或者失败，先删除进度条。
    uploader.on('uploadComplete', function (file) {
        $('#' + file.id).find('.progress').remove();
    });

    //所有文件上传完毕
    uploader.on("uploadFinished", function () {
        picarray = $("#PicUpload").val().split(',');

        //提交表单
        for (var i = 0; i < PhotoUrlArray.length; i++) {
            if (picarray != "") {
                picarray.push(PhotoUrlArray[i].filePath);
            } else {
                picarray[0] = PhotoUrlArray[i].filePath
            }
        }

        var arrpic = picarray.deleteEle()

        PhotoSave(arrpic);
    });


    //开始上传
    $("#ctlBtn").click(function () {
        uploader.upload();

    });

    //显示删除按钮
    $("#fileList").on("mouseover", ".cp_img", function () {
        $(this).children(".cp_img_jian").css('display', 'block');

    });
    //隐藏删除按钮
    $("#fileList").on("mouseout", ".cp_img", function () {
        $(this).children(".cp_img_jian").css('display', 'none');

    });
    //执行删除方法
    $list.on("click", ".cp_img_jian", function () {
        var Id = $(this).parent().attr("id");
        uploader.removeFile(uploader.getFile(Id, true));

        for (var i = 0; i < PhotoUrlArray.length; i++) {
            if (PhotoUrlArray[i].id == Id) {
                PhotoUrlArray.remove(i);
            }
        }

        $(this).parent().remove();
    });

    $("#fileList .cp_img").click(function () {

        picarray = $("#PicUpload").val().split(',');

        picnewarray = "";
        for (var i = 0; i <= picarray.length - 1; i++) {
            if (i == $(this).index()) {
                picarray.splice(i, 1);
            }
        }

        var arrpic = picarray.deleteEle()

        PhotoSave(arrpic);

        $(this).remove();
    });

    //去除重复
    Array.prototype.deleteEle = function () {
        var newArr = this;
        for (var i = newArr.length - 1; i >= 0; i--) {
            var targetNode = newArr[i];
            for (var j = 0; j < i; j++) {
                if (targetNode == newArr[j]) {
                    newArr.splice(i, 1);
                    break;
                }
            }
        }
        return newArr;
    }

    //function delRepeat(picarray) {
    //    this.sort();//排序
    //    var n = [this[0]];
    //    for (var i = 1; i < this.length; i++) {
    //        if (this[i] !== n[n.length - 1]) {
    //            n.push(this[i]);
    //        }
    //    }
    //    return n;
    //}

});