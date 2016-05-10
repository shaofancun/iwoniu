$(function(){
	
	//上传头像设置
	var options ={
		thumbBox: '.thumbBox',
		spinner: '.spinner',
		imgSrc: $("#Portrait_display").attr("src")
	};
	var cropper = $('.imageBox').cropbox(options);
	$('#upload-file').on('change', function(){
		var reader = new FileReader();
		reader.onload = function(e) {
			options.imgSrc = e.target.result;
			cropper = $('.imageBox').cropbox(options);
		}
		reader.readAsDataURL(this.files[0]);
		this.files = [];
	})
	$('#btnCrop').on('click', function(){
		var img = cropper.getDataURL();
		$('.cropped').html('');
		$('.cropped').append('<img src="'+img+'" align="absmiddle" style="width:120px;margin-top:10px;"><p>120px*120px</p>');
	})
	$('#btnZoomIn').on('click', function(){
		cropper.zoomIn();
	})
	$('#btnZoomOut').on('click', function(){
		cropper.zoomOut();
	})
	$('#saveimg').on('click', function(){
		var img = cropper.getDataURL();
	    $("#Logo").val(img);
		$('#upimg_box').modal('hide');
		$("#Portrait_display").attr("src", img);
	})
	//企业环境图片上传
	if($('#fileList').length>0){
		var $list = $('#fileList'),
	        // 优化retina, 在retina下这个值是2
	        ratio = window.devicePixelRatio || 1,
	        // 缩略图大小
	        thumbnailWidth = 100 * ratio,thumbnailHeight = 100 * ratio,
	        // Web Uploader实例
	        uploader;
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
	        fileNumLimit:5
	    });
	    // 当有文件添加进来的时候
	    uploader.on( 'fileQueued', function( file ) {
	        var $li = $(
	                '<li id="' + file.id + '" class="file-item thumbnail">' +
	                    '<img>' +
	                    '<div class="info">' + file.name + '</div>' +
	                '</li>'
	                ),
	        $btns = $('<div class="file-panel"><span class="cancel">删除</span>').appendTo( $li ),   
	        $img = $li.find('img');
	
	        $list.append( $li );
			$li.on( 'mouseenter', function() {
	            $btns.stop().animate({height: 30});
	        });
	
	        $li.on( 'mouseleave', function() {
	            $btns.stop().animate({height: 0});
	        });
	
	        $btns.on( 'click', 'span', function() {
	            var index = $(this).index(),
	                deg;
	
	            switch ( index ) {
	                case 0:
	                    removeFile( file );
	                    return;
	//
	//              case 1:
	//                  file.rotation += 90;
	//                  break;
	//
	//              case 2:
	//                  file.rotation -= 90;
	//                  break;
	            }
	            if ( supportTransition ) {
	                deg = 'rotate(' + file.rotation + 'deg)';
	                $wrap.css({
	                    '-webkit-transform': deg,
	                    '-mos-transform': deg,
	                    '-o-transform': deg,
	                    'transform': deg
	                });
	            } else {
	                $wrap.css( 'filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation='+ (~~((file.rotation/90)%4 + 4)%4) +')');
	            }
	        });
	        // 创建缩略图
	        uploader.makeThumb( file, function( error, src ) {
	            if ( error ) {
	                $img.replaceWith('<span>不能预览</span>');
	                return;
	            }
	
	            $img.attr( 'src', src );
	        }, thumbnailWidth, thumbnailHeight );
	    });
		 // 负责view的销毁
	    function removeFile( file ) {
	        var $li = $('#'+file.id);
	//      delete percentages[ file.id ];
	//      updateTotalProgress();
	        $li.off().find('.file-panel').off().end().remove();
	    }
	    // 文件上传过程中创建进度条实时显示。
	    uploader.on( 'uploadProgress', function( file, percentage ) {
	        var $li = $( '#'+file.id ),
	            $percent = $li.find('.progress span');
	
	        // 避免重复创建
	        if ( !$percent.length ) {
	            $percent = $('<p class="progress"><span></span></p>')
	                    .appendTo( $li )
	                    .find('span');
	        }
	
	        $percent.css( 'width', percentage * 100 + '%' );
	    });
	
	    // 文件上传成功，给item添加成功class, 用样式标记上传成功。
	    uploader.on('uploadSuccess', function (file, response) {
	        $('#' + file.id).addClass('upload-state-done');
	        SetIdImage(response);
	    });
	
	    // 文件上传失败，现实上传出错。
	    uploader.on( 'uploadError', function( file ) {
	        var $li = $( '#'+file.id ),
	            $error = $li.find('div.error');
	
	        // 避免重复创建
	        if ( !$error.length ) {
	            $error = $('<div class="error"></div>').appendTo( $li );
	        }
	
	        $error.text('上传失败');
	    });
	
	    // 完成上传完了，成功或者失败，先删除进度条。
	    uploader.on( 'uploadComplete', function( file ) {
	        $( '#'+file.id ).find('.progress').remove();
	    });	
	}
})

function SetIdImage(response) {
    if ($("#Image1").val() == "") {
        $("#Image1").val(response);
        return;
    }
    if ($("#Image2").val() == "") {
        $("#Image2").val(response);
        return;
    }
    if ($("#Image3").val() == "") {
        $("#Image3").val(response);
        return;
    }
    if ($("#Image4").val() == "") {
        $("#Image4").val(response);
        return;
    }
    if ($("#Image5").val() == "") {
        $("#Image5").val(response);
        return;
    }
}
