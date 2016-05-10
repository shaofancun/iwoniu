$(function () {
    $(".reg-title a").eq(0).addClass("action");
});
    
function BeforeLogin() {
    startLoading("正在登陆");
}
function ChangeVerify() {
    $("#vCode").attr("src", "/User/Login/GetLoginCode?r=" + Math.random());
}
//用户成功登录之后
function AfterUserLogin(data) {
    if (data.Success == true) {
        window.location.href = "/UserCenter/Index";
    } else {
        endLoading();
        jQuery.jGrowl(data.Msg);
        
    }
}
//企业成功登录之后
function AfterCompanyLogin(data) {
    if (data.Success == true) {
        window.location.href = "/CompanyCenter/Index";
    } else {
        jQuery.jGrowl(data.Msg);
        endLoading();
    }
}
