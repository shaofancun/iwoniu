//设置用户安全密码页面
$(function () {
    //需要输入手机号码，验证码60秒
    $(document).on("click", "#captcha_nophone", function () {
        var second = $("#captcha_nophone").attr("second");
        var _this = this;
        $(this).attr("disabled", "disabled").html("<span>" + second + "</span>秒后重新发送");
        var time = parseInt(second);
        SendSetCode();
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
//设置密码发送验证码
function SendSetCode() {
    $.ajax({
        type: "Get",
        url: "/MobileApi/SafeAuth/SafePwdSetCode",
        dataType: "json",
        //data: { mobile: mobile },
        success: function (json) {
            if (json.Success == true) {
                jQuery.jGrowl("发送成功,请注意查收！");
            } else {
                jQuery.jGrowl(json.errmsg);
            }
        }
    });
}
//修改用户安全密码发送验证码
function SendEditCode() {
    $.ajax({
        type: "Get",
        url: "/UserSafe/EditUserSafeSms",
        dataType: "json",
//        data: { UserToken:token },
        success: function (json) {
            if (json.Success == true) {
                jQuery.jGrowl("发送成功,请注意查收！");
            } else {
                jQuery.jGrowl(json.Msg);
            }
        }
    });
}
//设置用户的安全密码回调函数
function AfterSafePwdSet(data) {
    if (data.success) {
        jQuery.jGrowl(data.msg, {
            life: 200,
            close: function () {
                window.location.href = "/User/Safe/Index";
            }
        });
    } else {
        jQuery.jGrowl(data.errmsg);
    }
}
