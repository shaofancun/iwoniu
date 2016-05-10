
// 图片上传demo
$(function () {
    var $ = jQuery,
        $list = $('#fileList'),
        ratio = window.devicePixelRatio || 1, 					// 优化retina, 在retina下这个值是2
        thumbnailWidth = 100 * ratio,
        thumbnailHeight = 100 * ratio, // 缩略图大小
		uploader; 													// Web Uploader实例		
    allimg = {}, 										// 所有文件的进度信息，key为file id
    // 初始化Web Uploader
	    uploader = WebUploader.create({
	        // 自动上传。
	        auto: true,
	        // swf文件路径
	        swf: '/content/webuploader/Uploader.swf',
	        // 文件接收服务端。
	        server: '/LCWeb/PicServer/Webuploader',
	        // 选择文件的按钮。可选。
	        // 内部根据当前运行是创建，可能是input元素，也可能是flash.
	        pick: '#filePicker',
	        // 只允许选择文件，可选。
	        accept: {
	            title: 'Images',
	            extensions: 'gif,jpg,jpeg,bmp,png',
	            mimeTypes: 'image/*'
	        },
	        fileNumLimit: 2
	    });
    // 当有文件添加进来的时候
    uploader.on('fileQueued', function (file) {
        var $li = $('<li id="' + file.id + '" class="file-item thumbnail"><img><div class="info">' + file.name + '</div></li>'),
        $btns = $('<div class="file-panel"><span class="cancel" title="删除">删除</span><span class="upload" title="重新上传">重新上传</span>').appendTo($li),
        $img = $li.find('img');
        allimg[file.id] = [file.type];
        $list.append($li);
        $li.on('mouseenter', function () {
            $btns.stop().animate({ height: 30 });
        });
        $li.on('mouseleave', function () {
            $btns.stop().animate({ height: 0 });
        });
        $btns.on('click', 'span', function () {
            var index = $(this).index(), deg;
            switch (index) {
                case 0:
                    removeFile(file);
                    return;
                case 1:
                    retry(file);
                    return;
            }
            if (supportTransition) {
                deg = 'rotate(' + file.rotation + 'deg)';
                $wrap.css({ '-webkit-transform': deg, '-mos-transform': deg, '-o-transform': deg, 'transform': deg });
            } else {
                $wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~ ~((file.rotation / 90) % 4 + 4) % 4) + ')');
            }
        });
        // 创建缩略图
        uploader.makeThumb(file, function (error, src) {
            if (error) {
                $img.replaceWith('<span>不能预览</span>');
                return;
            }
            $img.attr('src', src);
        }, thumbnailWidth, thumbnailHeight);
    });
    // 负责view的销毁
    function removeFile(file) {
        var $li = $('#' + file.id);
        delete allimg[file.id];
        uploader.removeFile(file);
        $li.off().find('.file-panel').off().end().remove();
    }
    function retry(file) {
        uploader.retry(file);
    }

    uploader.on('uploadStart', function (file) {

    });
    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function (file, percentage) {
        var $li = $('#' + file.id), $percent = $li.find('.progress span');
        // 避免重复创建
        if (!$percent.length) {
            $percent = $('<p class="progress"><span></span></p>').appendTo($li).find('span');
        }
        $percent.css('width', percentage * 100 + '%');
    });
    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
    uploader.on('uploadSuccess', function (file, response) {
        $('#' + file.id).addClass('upload-state-done');
        SetIdPhoto(response);
        // console.log(response);
    });

    // 文件上传失败，现实上传出错。
    uploader.on('uploadError', function (file) {
        var $li = $('#' + file.id), $error = $li.find('div.error');
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
    var schoolSearchKey = $("#SchoolSearchKey").val();
    //按照名称搜索学校
    $("#SchoolSearchKey").on("keyup", function () {
        if (schoolSearchKey != $("#SchoolSearchKey").val()) {
            schoolSearchKey = $("#SchoolSearchKey").val();
            school.LoadSchool("",schoolSearchKey);
        }
    });
    $(".sk_province a").click(function () {
        var proId = $(this).attr("id");
        school.LoadSchool(proId);
    });
});
//学校选择弹出框
function select_sk() {
    $('#select').modal('show');
}
function dis_sk() {
    $('#select').modal('hide');
}
//设置隐藏的值
function SetIdPhoto(response) {
    //console.log(response);
    var val1 = $("#Image1").val();
    var val2 = $("#Image2").val();
    if (val1 == null || val1 == "") {
        $("#Image1").val(response);
    } else if (val2 == null || val2 == "") {
        $("#Image2").val(response);
    }
}
//学生认证加载学校
var school={
    //根据省份Id加载学校
    LoadSchool:function(regionCode,schoolName){
           $.ajax({
            type: "Get",
            url: "/MobileApi/School/GetSchool",
            data: { RegionCode: regionCode,SchoolName:schoolName },
            success: function (json) {
                $(".sk_select ul li").remove();
                $.each(json, function (idx,item) {
                    //将每一个学校都添加到列表中
                    $(".sk_select ul").append('<li><a onclick="school.SelectSchoolId(' + item.Id + ",'" + item.SchoolName + "'" + ')">' + item.SchoolName + '</a></li>');
                })
            }
        }); 
    },
    //选择某个学校
    SelectSchoolId:function(schoolId, schoolName) {
        $("#SchoolName").val(schoolName);
        $("#SchoolId").val(schoolId);
        dis_sk();
    }
}



