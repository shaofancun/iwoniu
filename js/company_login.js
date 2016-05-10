
$(function () {
    $("#divVerification").hide();
    $("#LoginStr").blur(function () {
        var loginStr = this.value;
        $.ajax({
            type: "Get",
            url: "/Company/Login/IsMaxLoginError",
            dataType: "json",
            data: { loginStr: loginStr },
            success: function (json) {
                if (json == true) {
                    ChangeVerify();
                }
            }
        });
    });
    $("#aCode").click(function () {
        ChangeVerify();
    });
})

function BeforeLogin() {
    startLoading("正在登陆");
}


function ChangeVerify() {
    $("#vCode").attr("src", "/Company/Login/GetLoginCode?r=" + Math.random());
}
//企业成功登录之后
function AfterCompanyLogin(data) {
    if (data == true) {
        window.location.href = "/Company/Home/Index.html";
    } else {
        endLoading();
        jQuery.jGrowl(data.errmsg);
    }
}