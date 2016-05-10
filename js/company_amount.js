$(function () {
    if ($(".radio").length > 0) {
        qiehuan("choice", "cz_img");//充值方式
        qiehuan("xt_bank", "bank_k");//提现银行 
    }
    //添加银行卡
    if ($(".addbank").length > 0) {
        $(".addbank").click(function () {
            var bdSafePwd = $("#bdSafePwd").val();
            var bdRealauth = $("#bdRealauth").val();
            //if (bdRealauth !="4") {
            //    jConfirm("您还未进行学生认证,是否立即认证？", "提示框", function (r) {
            //        if (r) {
            //            window.location.href = "/User/Auth/StudentAuth";
            //        }
            //    });
            //    return;
            //} 
            //if (bdSafePwd!=true) {
            //        jConfirm("您还未设置安全密码,是否立即设置？", "提示框", function (r) {
            //            if (r) {
            //                window.location.href = "/User/UserPass/SetUserSafePwd";
            //            }
            //        });
            //        return
            //    return;
            //}
            $("#addbank").modal("show");
        });
    }
})
//选择切换
function qiehuan(rname, cname) {
    $('input:radio[name="' + rname + '"]').change(function () {
        $('input:radio[name="' + rname + '"]').next().removeClass("cz_img_ck") && $('.' + cname + '').find("i").css("display", "none");
        $(this).next().addClass("cz_img_ck") && $(this).next().find("i").css("display", "block");
        $(this).next().attr("checked", "checked");
    });
}
//删除银行卡
function del(id) {
    //console.log(id);
    jConfirm("删除绑定的银行卡吗？", "提示框", function (r) {
        if (r) {
            startLoading("正在删除");
            $.ajax({
                type: "Post",
                url: "/Company/BankCard/BankCardDel",
                dataType: "json",
                data: { BankCardId: id },
                success: function (data) {
                    endLoading();
                    if (data.success == true) {
                        jQuery.jGrowl(data.msg, {
                            life: 200,
                            close: function () {
                                window.location.reload();
                            }
                        });
                    } else {
                        jAlert(data.errmsg, "提示框");
                    }
                }
            });
        }
    });
}
//在添加提交之后进行的操作
function AfterWithdrawalSub(data) {
    endLoading();
    if (data.success) {
        jQuery.jGrowl(data.msg, {
            life: 200,
            close: function () {
                window.location.reload();
            }
        });
    } else {
        jQuery.jGrowl(data.errmsg);
    }
}
//修改银行卡
function editbank(id) {
    var bankNo = 0942388905234;
    $("#ebankid").val(bankNo);
    $("#editbank").modal("show");
}