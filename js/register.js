function AfterSuccess(data) {
    if (data.Success) {
        jQuery.jGrowl(data.Msg, {
            life: 1000,
            close: function () {
                window.location.href = "/Login/User.html";
            }
        });
    } else {
        jQuery.jGrowl(data.Msg);
    }
}
function AfterCompanySuccess(data) {
    if (data.Success) {
        jQuery.jGrowl(data.Msg, {
            life: 1000,
            close: function () {
                window.location.href = "/Login/Company.html";
            }
        });
    } else {
        jQuery.jGrowl(data.Msg);
    }
}

$(function () {
    var Url=window.location.pathname;
    if(Url.indexOf('User')>0){
        $(".reg-title a").eq(0).addClass("action");
    }else if(Url.indexOf('Company')>0){
        $(".reg-title a").eq(1).addClass("action");
    }

    //需要输入手机号码，验证码60秒
    $(document).on("click", "#captcha", function () {
        var valid = $("#Mobile").hasClass("valid");//判断是否包含valid
        var second = $("#captcha").attr("second");
        if (valid) {
            var _this = this;
            $(this).attr("disabled", "disabled").html("<span>" + second + "</span>秒后重新发送");
            var time = parseInt(second);
            sendRegCode($("#Mobile").val());
            var timer = setInterval(function () {
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
    $(document).on("click", "#c_captcha", function () {
        var valid = $("#Mobile").hasClass("valid");//判断是否包含valid
        //console.log(valid);
        var second = $("#c_captcha").attr("second");
        //console.log(second);
        if (valid) {
            var _this = this;
            $(this).attr("disabled", "disabled").html("<span>" + second + "</span>秒后重新发送");
            var time = parseInt(second);
            sendCompanyCode($("#Mobile").val());
            var timer = setInterval(function () {
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
});
//发送企业验证码
function sendCompanyCode(mobile) {
    $.ajax({
        type: "Get",
        url: "/MobileApi/Register/CompanyRegisterSms",
        data: { mobile: mobile },
        success: function (json) {
            if (json.Success == true) {
                jQuery.jGrowl("发送成功,请注意查收！");
            } else {
                jQuery.jGrowl(json.Msg);
            }
        }
    });
}

//用户发送验证码
function sendRegCode(mobile) {
    $.ajax({
        type: "Get",
        url: "/MobileApi/Register/UserRegisterSms",
        data: { mobile: mobile },
        success: function (json) {
            if (json.Success) {
                jQuery.jGrowl("发送成功,请注意查收！");
            } else {
                jQuery.jGrowl(json.Msg);
            }
        }
    });
}



