$(function() {
	//修改密码
	var $validate_c=$("#change_passwords").validate({
		errorElement:"p",
		//debug: true, //只验证不提交
		rules: {
			old:"required",
			new: {required:true,rangelength: [6,20]},
			cnew: {required: true,equalTo: "#new"},
		},
		messages: {
			old: {required:"请输入旧密码！"},
			new: {required:"请输入新密码!",rangelength:"请输入6-20位密码"},
			cnew: "两次输入密码不一致!"
		},
		errorPlacement: function(error, element) {
			element.parents(".mt").siblings(".m_tips").show().find("p").html(error);
		},
		success: function(error, element) {
			$(element).parents(".mt").siblings(".m_tips").hide();
		}
	});
})