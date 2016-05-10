$(function(){
	//保密选择提交
    $("#open_submit").click(function () {
       // startLoading('正在设置中');
	    var resumeId = $("#resume_secret").val();
	    var secretType = $("input[name='choice']:checked").val();
	    $.ajax({
	        type: "Post",
	        url: "/User/Resume/ResumeSet",
	        dataType: "json",
	        data: { ResumeId: resumeId, PropertyName: "Secret", PropertyValue: secretType },
	        success: function (data) {
	         //   endLoading();
	            if (data.success) {
	                jQuery.jGrowl(data.msg, {
	                    life: 300,
	                    close: function () {
	                       window.location.reload();
	                    }
	                });
	            } else {
	                jQuery.jGrowl(data.errmsg);
	            }
	        }
	    });
	});
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
	        swf: '/js/Uploader.swf',
	        // 文件接收服务端。
	        server: '',
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
	    uploader.on( 'uploadSuccess', function( file ) {
	        $( '#'+file.id ).addClass('upload-state-done');
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
	//工作经验导航选择
	if($(".order_nav").length>0){
		var $liCur = $(".order_nav ul li.cur"),
			curP = $liCur.position().left,
			curW = $liCur.outerWidth(true),	  
			$slider = $(".line"),
		  	$navBox = $(".order_nav");
		 	$targetEle = $(".order_nav ul li a"),
			$slider.animate({
			  "left":curP,
			  "width":curW
			});
		$targetEle.mouseenter(function () {
		  var $_parent = $(this).parent(),
			  _width = $_parent.outerWidth(true),
			  posL = $_parent.position().left;
			  $slider.stop(true, true).animate({
				"left":posL,
				"width":_width
			  }, "fast");
		});
		$navBox.mouseleave(function (cur, wid) {
		  cur = curP;
		  wid = curW;
		  $slider.stop(true, true).animate({
			"left":cur,
			"width":wid
		  }, "fast");
		});			
	}
})


//简历保密选择
$('#open').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget);
  var recipient = button.data('jlid');
  $("#resume_secret").val(recipient);
  var modal = $(this);
  var open_val = button.data('secret');
  //console.log(open_val);
    //保密radio值
  $('input:radio[value="'+open_val+'"]').attr("checked",true);
})


//刷新简历
function sx(resumeId) {
    $.ajax({
        type: "Post",
        url: "/User/Resume/ResumeSet",
        dataType: "json",
        data: { ResumeId: resumeId, PropertyName: "Refresh" },
        success: function (data) {
            if (data.success) {
                jAlert('刷新成功！', "提示框", function () {
                    location.reload();
                });
            } else {
                jQuery.jGrowl(data.errmsg);
            }
        }
    });
}
//删除简历
function del(resumeId,resumeName) {
	jConfirm("删除 -"+resumeName+"？", "提示框", function(r) {
	    if (r) {
	        $.ajax({
	            type: "Post",
	            url: "/User/Resume/ResumeSet",
	            dataType: "json",
	            data: { ResumeId: resumeId, PropertyName: "Delete" },
	            success: function (data) {
	                if (data.success) {
	                    jAlert('删除成功！', "提示框", function () {
	                        location.reload();
	                    });
	                } else {
	                    jQuery.jGrowl(data.errmsg);
	                }
	            }
	        });
		}
	});
}
//置顶简历
function zd(resumeId,resumeName) {
    jConfirm("置顶-" + resumeName + "？", "提示框", function (r) {
        if (r) {
            $.ajax({
                type: "Post",
                url: "/User/Resume/ResumeSet",
                dataType: "json",
                data: { ResumeId: resumeId, PropertyName: "Top" },
                success: function (data) {
                    if (data.success) {
                        jAlert('置顶成功！', "提示框", function () {
                            location.reload();
                        });
                    } else {
                        jQuery.jGrowl(data.errmsg);
                    }
                }
            });
        } else {
            //	jAlert('积分不足！',"提示框");
            //jAlert('积分不足！', "提示框");
        }
	});
}
//简历设为默认
function mr(resumeId,resumeName) {
  //  console.log(resumeId);
	jConfirm("将-"+resumeName+"-设为默认？", "提示框", function(r) {
	    if (r) {
	        $.ajax({
	            type: "Post",
	            url: "/User/Resume/ResumeSet",
	            dataType: "json",
	            data: { ResumeId: resumeId, PropertyName: "Default" },
	            success: function (data) {
	                if (data.success) {
	                    jAlert('设置成功！',"提示框",function(){
	                    	location.reload();
	                    });
	                } else {
	                    jQuery.jGrowl(data.errmsg);
	                }
	            }
	        });
		}
	});
}
//同意企业工作邀请
function offer_agree(id,obj){
	jConfirm("确定同意工作邀请？", "提示框", function(r) {
		if (r) {
			jAlert('成功！',"提示框",function(){
				location.reload();
			});
		}
	});
}
//拒绝企业工作邀请
function offer_refuse(id,obj){
	jConfirm("拒绝工作邀请？", "提示框", function(r) {
		if (r) {
			jAlert('成功！',"提示框",function(){
				location.reload();
			});
		}
	});
}
//修改评价
function editeval(id,obj){
	jConfirm("评价只能修改一次？", "提示框", function(r) {
		if (r) {
			window.location.href="user_editevaluation.html?id="+id;
		}
	});
}

