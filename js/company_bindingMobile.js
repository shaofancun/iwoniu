//绑定用户手机验证码
$(function () {
    //需要输入手机号码，验证码60秒
    $(document).on("click", "#captcha_editphone", function () {
        var second = $("#captcha_editphone").attr("second");
        var _this = this;
        $(this).attr("disabled", "disabled").html("<span>" + second + "</span>秒后重新发送");
        var time = parseInt(second);
        SendBindingOne();
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
//修改绑定手机号码发送短信
function SendBindingOne() {
    $.ajax({
        type: "Get",
        url: "/CompanySafe/AuthOriginalMobileSms",
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
//绑定手机验证码PartTwo
$(function () {
    //需要输入手机号码，验证码60秒
    $(document).on("click", "#captcha_editphoneTwo", function () {
        var valid = $("#NewMobile").hasClass("valid");
        if (valid) {
            var second = $("#captcha_editphoneTwo").attr("second");
            var _this = this;
            $(this).attr("disabled", "disabled").html("<span>" + second + "</span>秒后重新发送");
            var time = parseInt(second);
            SendBindingTwo();
            var timer = setInterval(function () {
                time--;
                if (time < 0) {
                    clearInterval(timer);
                    $(_this).removeAttr("disabled", "disabled").html("发送验证码");
                    return;
                }
                $(_this).find("span").html(time);
            }, 1000);
        } else {
            jQuery.jGrowl("请先输入手机号码！");
            $("#NewMobile").focus();
        }
    });
})

//修改绑定手机号码发送短信 第二步
function SendBindingTwo() {
    $.ajax({
        type: "Get",
        url: "/CompanySafe/UpdateMobileSms",
        dataType: "json",
        data: { newMobile: $("#NewMobile").val() },
        success: function (json) {
            if (json.Success == true) {
                jQuery.jGrowl("发送成功,请注意查收！");
            } else {
                jQuery.jGrowl(json.Msg);
            }
        }
    });
}