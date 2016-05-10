$(function() {
    //原手机
    var $validate_recharge=$("#recharge").validate({
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
};