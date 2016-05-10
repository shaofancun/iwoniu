$(function() {
	if($(".radio").length>0){
		qiehuan("choice","cz_img");//充值方式
		qiehuan("BankCardId", "bank_k"); //提现银行 
	}
	//添加银行卡
	if($(".addbank").length>0){
	    $(".addbank").click(function () {
	        $("#addbank").modal("show");
		});
	}
})
//选择切换
function qiehuan(rname,cname){
    $('input:radio[name="' + rname + '"]').change(function () {
        $('input:radio[name="' + rname + '"]').next().removeClass("cz_img_ck") && $('.' + cname + '').find("i").css("display", "none");
        $(this).next().addClass("cz_img_ck") && $(this).next().find("i").css("display", "block");
        console.log($('input:radio[name="' + rname + '"]:checked').val());
    });
}
//删除银行卡
function del(id) {
    jConfirm("删除绑定的银行卡吗？", "提示框", function (r) {
        if (r) {
            $.ajax({
                url: "/UserCash/BankCardDel",
                data: { id: id },
                success: function (data) {
                    if (data.Success == true) {
                        jAlert(data.Msg, "提示框", function () {
                            window.location.reload();
                        });
                    } else {
                        jAlert(data.Msg, "提示框");
                    }
                }
            });
        }
    });
}
//企业删除银行卡
function cdel(id) {
    jConfirm("删除绑定的银行卡吗？", "提示框", function (r) {
        if (r) {
            $.ajax({
                url: "/CompanyCash/BankCardDel",
                data: { id: id },
                success: function (data) {
                    if (data.Success == true) {
                        jAlert(data.Msg, "提示框", function () {
                            window.location.reload();
                        });
                    } else {
                        jAlert(data.Msg, "提示框");
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
