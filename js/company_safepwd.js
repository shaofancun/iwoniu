//修改用户安全密码页面
$(function () {
    //需要输入手机号码，验证码60秒
    $(document).on("click", "#captcha_editphone", function () {
        var second = $("#captcha_editphone").attr("second");
        var _this = this;
        $(this).attr("disabled", "disabled").html("<span>" + second + "</span>秒后重新发送");
        var time = parseInt(second);
        SendEditCode();
        var timer = setInterval(function () {
            time--;
            if (time < 0) {
                clearInterval(timer);
                $(_this).removeAttr("disabled", "disabled").html("发送验证码");
                return;
            }
            $(_this).find("span").html(time);
        }, 1000);

    });
})

//修改企业安全密码发送验证码
function SendEditCode() {
    $.ajax({
        type: "Get",
        url: "/CompanySafe/EditCompanySafeSms",
        dataType: "json",
        //data: { mobile: mobile },
        success: function (json) {
            if (json.Success == true) {
                jQuery.jGrowl("发送成功,请注意查收！");
            } else {
                jQuery.jGrowl(json.Msg);
            }
        }
    });
}

//修改企业的安全密码回调函数
function AfterSafePwdEdit(data) {
    if (data.success) {
        jQuery.jGrowl(data.msg, {
            life: 200,
            close: function () {
                window.location.href = "/Company/Safe/Index";
            }
        });
    } else {
        jQuery.jGrowl(data.errmsg);
    }
}