$(function() {
	//不用输入手机号码，验证码60秒
	//$(document).on("click","#captcha_nophone",function(){
	//		var _this=this;
	//		$(this).attr("disabled","disabled").html("<span>60</span>秒后重新发送");
	//		var time=60;
	//		var timer=setInterval(function(){
	//			//console.log($(_this).html())
	//			time--;
	//			if(time<0){
	//				clearInterval(timer);
	//				$(_this).removeAttr("disabled","disabled").html("发送验证码");
	//				return;
	//			}
	//			$(_this).find("span").html(time);
	//		},1000)			
	//})
	//需要输入手机号码，验证码60秒
    $(document).on("click", "#captcha", function () {
        var valid = $("#Mobile").hasClass("valid");//判断是否包含valid
        //console.log(valid);
        var second = $("#captcha").attr("second");
        //console.log(second);
        if (valid) {
            var _this = this;
            $(this).attr("disabled", "disabled").html("<span>" + second + "</span>秒后重新发送");
            var time = parseInt(second);
            sendRegCode($("#Mobile").val());
            var timer = setInterval(function () {
                //console.log($(_this).html())
                time--;
                if (time < 0) {
                    clearInterval(timer);
                    $(_this).removeAttr("disabled", "disabled").html("发送验证码");
                    return;
                }
                $(_this).find("span").html(time);
            }, 1000)
        } else {
            jQuery.jGrowl("请先输入手机号码！");
            $("#Mobile").focus();
        }
    });
})
//发送验证码
function sendRegCode(mobile) {
    $.ajax({
        type: "Get",
        url: "/User/Register/SendCode",
        dataType: "json",
        data: { mobile: mobile },
        success: function (json) {
            if (json.success == true) {
                jQuery.jGrowl("发送成功,请注意查收！");
            } else {
                jQuery.jGrowl(json.errmsg);
            }
        }
    });
}
