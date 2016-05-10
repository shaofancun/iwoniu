$(function () {
    navAction();
    //全局配置
    $.ajaxSetup({
        type:"Get",
        dataType:"json",
        beforeSend : function() {
            startLoading();
        },
        complete : function() {
            endLoading();
        }
    });
    //移除初始化input样式
    if($(".form-group span").length>0){
        $(".form-group span").removeClass("field-validation-valid");
    }
    

    //手机号码隐藏后四位
    var pn = $(".mobile_box").find("#phone_num").text();
    var newpn = pn.replace(pn.slice(-4), "****");
    $(".mobile_box").find("#phone_num").text(newpn);

    /*判断浏览器版本是否过低*/
    var b_name = navigator.appName;
    var tishi = "";
    tishi += "<div class=\"alert alert-danger alert-dismissible fade in\" role=\"alert\" style=\"text-align:center\">";
    tishi += "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">×</span></button>";
    tishi += "温馨提示：您的浏览器版本过低，为了得到我们网站最好的体验效果，建议您将浏览器升级到最新版本或者选择另一款web浏览器！";
    tishi += "</div>";
    if (b_name == "Microsoft Internet Explorer") {
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        var trim_version = version[1].replace(/[ ]/g, "");
        /*如果是IE6或者IE7*/
        if (trim_version == "MSIE7.0" || trim_version == "MSIE6.0" || trim_version == "MSIE8.0") {
            $("body").prepend(tishi);
        }
    }
    //经验条
    user_index_rank();
    //获取时间
    xttime("datetime");
    //连续签到天数
    lxtime("lxtime");
    //鼠标移动提示框
    if ($('[data-toggle="tooltip"]').length > 0) {
        $('[data-toggle="tooltip"]').tooltip();
    }
    //返回顶部
    toTop();

    $("#loginOut").on("click", function () {
        jConfirm("确定要退出吗？", "提示框", function (r) {
            if (r) {
                startLoading("正在退出");
                $.ajax({
                    type: "Post",
                    url: "/Login/LoginOut",
                    dataType: "json",
                    // data: { id: id },
                    success: function (data) {
                        endLoading();
                        if (data.Success == true) {
                            location.href = "/Home/Index.html";
                        }
                    }
                });
            }
        });
    });

})
//nav添加action
function navAction(){
    var url=window.location.pathname;
    var navA=$("nav a");
    navA.each(function(){
        if($(this).attr("href")==url){
            $(this).parent().addClass("action");
        }
    })
}
function alert(msg){
    jAlert(msg);
}
//经验条
function user_index_rank() {		//经验条
    var now_ex = 110; 				//现有经验
    var need_ex = 300; 			    //升级经验
    $(".rank_box").find(".rank_bg").css("width", ((now_ex / need_ex) * 100).toFixed(2) + "%"); //经验条
    $(".rank_box").find(".rank_n").html(now_ex + "/" + need_ex); //经验数
    if ($("#ex_rest").length > 0) {
        $("#ex_rest").text(need_ex - now_ex);
    }
}
//签到
function sign(obj) {
    //console.log($(obj).html());
    var sign = true; //是否签到
    if (sign) {
        jAlert('签到成功！', "提示框");
        $(obj).addClass("disabled");
    } else {
        jAlert('今天已经签到！', "提示框");
    }
}
//系统时间
function xttime(did) {
    var myDate = new Date();
    $('#' + did + '').text(myDate.getFullYear() + "年" + (myDate.getMonth() + 1) + "月" + myDate.getDate() + "日");
}
//连续签到天数
function lxtime(did) {
    var d = 1; //签到天数
    $('#' + did + '').text('连续签到' + d + '天');
}
//显示查看内容
function look(n, obj) {
    var lid = $("#look" + n + "");
    lid.toggle();
}
//查看地图
function address_map(x, y) {
    var src = "/Home/Map?x=" + x + "&y=" + y;
    var map = "";
    map += '<div class="modal fade" id="address_map" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">';
    map += '<div class="modal-dialog"><div class="modal-content"><div class="modal-header">';
    map += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
    map += '<h4 class="modal-title" id="myModalLabel">公司地址</h4></div>';
    map += '<div class="modal-body"><iframe class="embed-responsive-item" src="" id="iframemap"></iframe></div>';
    map += '</div></div></div>';
    $("body").prepend(map);
    $("#iframemap").attr("src", src).css({ width: "100%", height: "400px" });
    $('#address_map').modal('show');
    $('#address_map').on('hidden.bs.modal', function (e) {	//关闭时移除
        $('#address_map').remove();
    })
}
//获取地址栏值
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//开始显示loading，在ajax执行之前调用
function startLoading() {
    var loadingDiv = "<div id='loadingDiv'>"
	+ "<div style='height: 1325px; display: none; opacity: 0;' class='overlay'></div>"
	+ "<div style='opacity: 0; margin-top: 250px;' id='AjaxLoading' class='showbox'>"
	+ "<div class='loadingWord'>"
	+ "<i class='loader'></i>"
	+ "</div>"
	+ "</div>"
	+ "</div>";
    var h = $(document).height();
    $(".overlay").css({ "height": h });
    var div = $("body").find("#loadingDiv");
    div.remove();
    $("body").append($(loadingDiv));
    $(".overlay").css({ 'display': 'block', 'opacity': '0' });
    $(".showbox").stop(true).animate({ 'margin-top': '200px', 'opacity': '1' }, 200);
    
}

//加载完成后隐藏，在ajax执行完成后（complete）调用
function endLoading() {
    $(".showbox").stop(true).animate({ 'margin-top': '150px', 'opacity': '0' }, 400);
    $(".overlay").css({ 'display': 'none', 'opacity': '0' });
    $("#loadingDiv").remove();
}
//返回顶部
function toTop() {
    //console.log("1");
    var box = "";
    box += '<div class="toTop" id="toTop">';
    box += '<a href="javascript:;" class="top" title="返回顶部"></a>';
    box += '<a href="javascript:;" class="weixin" title="关注微信号"><div class="weixinimg"></div></a>';
    //box += '<a href="javascript:;" class="phonedown" title="下载APP"><div class="phonedownimg"></div></a>';
    box += '</div>';
    $("body").prepend(box);
    if ($(this).scrollTop() == 0) {
        $(".top").hide();
    }
    $(window).scroll(function (event) {
        if ($(this).scrollTop() == 0) {
            $(".top").hide();
        }
        if ($(this).scrollTop() != 0) {
            $(".top").show();
        }
    });
    $(".top").click(function (event) {
        $("html,body").animate({ scrollTop: "0px" }, 300);
    });
}
//上次模特头像
function uploadimg(obj, event,className,Id) {
    var element = event.target,
        files = element.files,
        imgurl;
    if (files) {
        var file = files[0];
        if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)) {
            alert("图片类型必须是.gif,jpeg,jpg,png中的一种");
            return false;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert("图片不能大于10M");
            return false;
        }
    }
    var reader = new FileReader();
    reader.readAsDataURL(obj.files[0]);
    reader.onload = function (e) {
        imgurl = e.target.result;
        var img = element.nextElementSibling;
        $(className).attr('src', imgurl);
        $(Id).val(imgurl);
    };
}
//radio样式选择
$(document).on('change',"input[type='radio']",function(e){
    var $checkbox= $(e.currentTarget);
    var $container = $checkbox.parent();
    var update=function($checkbox){
        var $container = $checkbox.parent();
        if($checkbox.prop("checked")) $container.addClass("check")
        else $container.removeClass("check")
    }
    if($container.hasClass("input-radio")) {
      update($checkbox);
    }
    if($checkbox.attr('type').toLowerCase() === 'radio') {
      var name = $checkbox.attr("name");
      $("input[name='"+name+"']").each(function() {
        update($(this));
      });
    }
})
//获取form表单内容
$.fn.formJson = function()    
{    
   var o = {};    
   var a = this.serializeArray();    
   $.each(a, function() {    
       if (o[this.name]) {    
           if (!o[this.name].push) {    
               o[this.name] = [o[this.name]];    
           }    
           o[this.name].push(this.value || '');    
       } else {    
           o[this.name] = this.value || '';    
       }    
   });    
   return JSON.stringify(o);    
};  
//省市区联动
$.fn.RegionChange=function(ajaxURL){
    this.nextAll().html('<option value="0">请选择</option>');
    var parentCode = this.val(),
        target=this.next();
    if(target.length>0){
       $.ajax({
            type: "Get",
            url: ajaxURL,
            dataType: "json",
            data: { ParentCode: parentCode },
            success: function (data) {
                sHtml = '<option value="0">请选择</option>';
                $.each(data, function (idx, item) {
                    sHtml += '<option value="' + item.RegionCode + '">' + item.RegionName + '</option>';
                });
                target.html(sHtml);
            }
        }); 
    }
}