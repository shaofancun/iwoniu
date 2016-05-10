$(function () {
    //工作经验导航选择
    if ($(".order_nav").length > 0) {
        var $liCur = $(".order_nav ul li.cur"),
			curP = $liCur.position().left,
			curW = $liCur.outerWidth(true),
			$slider = $(".line"),
		  	$navBox = $(".order_nav");
        $targetEle = $(".order_nav ul li a"),
			$slider.animate({
			    "left": curP,
			    "width": curW
			});
        $targetEle.mouseenter(function () {
            var $_parent = $(this).parent(),
			  _width = $_parent.outerWidth(true),
			  posL = $_parent.position().left;
            $slider.stop(true, true).animate({
                "left": posL,
                "width": _width
            }, "fast");
        });
        $navBox.mouseleave(function (cur, wid) {
            cur = curP;
            wid = curW;
            $slider.stop(true, true).animate({
                "left": cur,
                "width": wid
            }, "fast");
        });
    }
    //加载评价模块
    eval_box.loading();
})

//评价模块
var save_arr = new Array(); //已选评价
var eval_box = {
    //加载所有评价
    loading: function () {
        var eval_array = {};
        $.ajax({
            url: "/Evaluation/GetUserEvalList",
            dataType: "json",
            type: "Get",
            success: function (result) {
                var sHtml = ""; //所有评价html
                $.each(result, function (i, item) {
                    sHtml += '<li onclick="eval_box.change(this,' + item.OptionId + ');" class="">' + item.EvalOptionValue + '</li>';
                    eval_array[i] = item;
                });
                $("#eva_ul").html(sHtml);
            }
        });
    },
    //选择评价
    change: function (obj, id) {
        if ($(obj).attr("class").indexOf("action") >= 0) {
            $(obj).removeClass("action");
            eval_box.save(id, "splice");
        } else {
            $(obj).addClass("action");
            eval_box.save(id, "push");
        }
    },
    //已选择的评价存入hidden
    save: function (id, type) {
        switch (type) {
            case "push":
                save_arr.push(id);
                break;
            case "splice":
                for (var i in save_arr) {
                    if (save_arr[i] == id) {
                        save_arr.splice(i, 1);
                    }
                }
                break;
        }
        console.log(save_arr);
        $("#OptionIds").val(save_arr);
    }
}