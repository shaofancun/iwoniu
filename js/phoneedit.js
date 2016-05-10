$(function() {
	//原手机
	var $validate_one=$("#phone_editone").validate({
		errorElement:"p",
		//debug: true, //只验证不提交
		rules: {
			phone:{required:true,isPhone:true},
			phone_num: "required"
		},
		messages: {
			phone: {required:"请输入手机号码!",isPhone:"手机号码格式错误"},
			phone_num: "请输入收到的手机验证码!"
		},
		errorPlacement: function(error, element) {
			element.parents(".mt").siblings(".m_tips").show().find("p").html(error);
		},
		success: function(error, element) {
			$(element).parents(".mt").siblings(".m_tips").hide();
		}
	});
	//新手机
	var $validate_two=$("#phone_edittwo").validate({
		errorElement:"p",
		//debug: true, //只验证不提交
		rules: {
			phone:{required:true,isPhone:true},
			phone_num: "required"
		},
		messages: {
			phone: {required:"请输入手机号码!",isPhone:"手机号码格式错误"},
			phone_num: "请输入收到的手机验证码!"
		},
		errorPlacement: function(error, element) {
			element.parents(".mt").siblings(".m_tips").show().find("p").html(error);
		},
		success: function(error, element) {
			$(element).parents(".mt").siblings(".m_tips").hide();
		}
	});
	//认证邮箱
	var $validate_yxrz=$("#emailrz").validate({
		errorElement:"p",
		//debug: true, //只验证不提交
		rules: {
			email:{required:true,isEmail:true}
		},
		messages: {
			email: {required:"请输入邮箱地址!",isEmail:"邮箱地址格式错误"}
		},
		errorPlacement: function(error, element) {
			element.parents(".mt").siblings(".m_tips").show().find("p").html(error);
		},
		success: function(error, element) {
			$(element).parents(".mt").siblings(".m_tips").hide();
		}
	});
	//实名认证
	var $validate_realname=$("#realnamerz").validate({
		errorElement:"p",
		//debug: true, //只验证不提交
		rules: {
			realname:{required:true,rangelength: [2,10]},
			realname_r:{required: true,equalTo: "#realname"},
			ID_card:{required:true,isIdCardNo: true},
			ID_card_r:{required: true,equalTo: "#ID_card"}			
		},
		messages: {
			realname:{required:"请输入真实姓名!",rangelength:"请输入2~10位汉字"},
			realname_r:"两次输入姓名不一致!",
			ID_card:{required:"请输入身份证!",isIdCardNo:"请输入正确身份证号码"},
			ID_card_r:"两次输入身份证不一致!"			
		},
		errorPlacement: function(error, element) {
			element.parents(".mt").siblings(".m_tips").show().find("p").html(error);
		},
		success: function(error, element) {
			$(element).parents(".mt").siblings(".m_tips").hide();
		}
	});
	//实名认证
	var $validate_stu=$("#sturz").validate({
		errorElement:"p",
		//debug: true, //只验证不提交
		rules: {
			realname:{required:true,rangelength: [2,10]},
			realname_r:{required: true,equalTo: "#realname"}
		},
		messages: {
			realname:{required:"请输入真实姓名!",rangelength:"请输入2~10位汉字"},
			realname_r:"两次输入姓名不一致!"
		},
		errorPlacement: function(error, element) {
			element.parents(".mt").siblings(".m_tips").show().find("p").html(error);
		},
		success: function(error, element) {
			$(element).parents(".mt").siblings(".m_tips").hide();
		}
	});
	//验证身份证
	jQuery.validator.addMethod("isIdCardNo", function (value, element) {  
            return this.optional(element) || checkidcard(value);  
    }, "请输入正确身份证号码");  
	//验证手机
	jQuery.validator.addMethod("isPhone", function(value, element) { 
	var length = value.length; 
	var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
	return this.optional(element) || (length == 11 && mobile.test(value)); 
	}, "手机号码格式错误");
	//验证邮箱
	jQuery.validator.addMethod("isEmail", function(value, element) { 
	var length = value.length; 
	var email = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	return this.optional(element) || email.test(value); 
	}, "邮箱格式错误");
	
	$(document).on("click","#captcha",function(){
			var _this=this;
			$(this).attr("disabled","disabled").html("<span>60</span>秒后重新发送");
			var time=60;
			var timer=setInterval(function(){
				//console.log($(_this).html())
				time--;
				if(time<0){
					clearInterval(timer);
					$(_this).removeAttr("disabled","disabled").html("发送验证码");
					return;
				}
				$(_this).find("span").html(time);
			},1000)				
	})
})
//验证身份证
function checkidcard(num) {  
            var len = num.length, re;  
            if (len == 15)  
                re = new RegExp(/^(\d{6})()?(\d{2})(\d{2})(\d{2})(\d{3})$/);  
            else if (len == 18)  
                re = new RegExp(/^(\d{6})()?(\d{4})(\d{2})(\d{2})(\d{3})(\d)$/);  
            else {      
                return false;  
            }  
            var a = num.match(re);  
            if (a != null) {  
                if (len == 15) {  
                    var D = new Date("19" + a[3] + "/" + a[4] + "/" + a[5]);  
                    var B = D.getYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];  
                } else {  
                    var D = new Date(a[3] + "/" + a[4] + "/" + a[5]);  
                    var B = D.getFullYear() == a[3] && (D.getMonth() + 1) == a[4] && D.getDate() == a[5];  
                }  
                if (!B) {  
                    return false;  
                }  
            }  
            return true;  
} 