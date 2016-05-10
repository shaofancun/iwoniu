$(function () {
    $("#category").click(function () {
        $('#category_box').modal('show');
    })
    //加载所有职位
    zw_box.zwShow();
})


//职位选择
var zw_box = {
    zw_array:[],
    yxzw_array:[],
    //加载所有职位
    zwShow: function () {
        //如果zw_array为空获取职位，否则直接加载
        $.ajax({
            type: "Get",
            url: "json/GetPosition.json",
            success: function (data) {
                zw_box.zw_array=data
                var checkH = ""; //所有职位html
                for (var i in zw_box.zw_array) {
                    //console.log(zw_array[i]);
                    checkH += '<div value="' + zw_box.zw_array[i].Id + '" onclick="zw_box.zwTo(' + zw_box.zw_array[i].Id + '' + ",'" + zw_box.zw_array[i].PositionName + "'" + ')">' + zw_box.zw_array[i].PositionName + '</div>';
                }
                $(".kx_zhiwei").html(checkH);
                //判断add_zhiwei的val是否存在，存在就使用zw_box.zwDefault()方法
                if ($("#WorkPosition").val() != "") {
                    zw_box.zwDefault($("#WorkPosition").val());
                }
            }
        });
    },
    //点击职位添加到已选职位框
    zwTo: function (id, val) {
        //有
        if ($.inArray(id, zw_box.yxzw_array) == -1) {
            if (zw_box.yxzw_array.length < 3) {
                zw_box.yxzw_array[zw_box.yxzw_array.length] = id;
                var yxH = '<div class="zhiwei" id="zw' + id + '"><span>' + val + '</span><i onclick="zw_box.zwTo(' + id + ')"></i></div>';
                $(".xz_zhiwei").append(yxH);
            } else {
                jQuery.jGrowl('您最多能选择3项', {
                    life: 1000
                });
                return false;
            }
        } else {
            for (var i in zw_box.yxzw_array) {
                if (zw_box.yxzw_array[i] == id) {
                    zw_box.yxzw_array.splice(i, 1);
                }
            }
            $('.xz_zhiwei #zw' + id).remove();
            $('#yxzw #zw' + id).remove();
            $("#WorkPosition").val(zw_box.yxzw_array);
        }
    },
    //确认按钮，添加到前面BOX
    btn: function () {
        //var toArr = new Array();
        var tjh = "";
        //遍历当前选中的
        $.each(zw_box.zw_array, function (idx1, item1) {
            $.each(zw_box.yxzw_array, function (idx2, item2) {
                if (item1.Id == item2) {
                    tjh += '<div class="zhiwei" id="zw' + item1.Id + '"><span>' + item1.PositionName + '</span><i onclick="zw_box.zwTo(' + item1.Id + ')"></i></div>';
                }
            });
        });
        $("#yxzw").html(tjh);
        $('#category_box').modal('hide');
        $("#WorkPosition").val(zw_box.yxzw_array);
    },
    //加载默认选项
    zwDefault: function (arr) {
        zw_box.yxzw_array = zh_array(arr); //将hidden里的默认值赋值给yxzw_array
        var tjh = "";
        $.each(zw_box.zw_array, function (idx, item1) {
            $.each(zw_box.yxzw_array, function (idx2, item2) {
                if (item1.Id == item2) {
                    tjh += '<div class="zhiwei" id="zw' + item1.Id + '"><span>' + item1.PositionName + '</span><i onclick="zw_box.zwTo(' + item1.Id + ')"></i></div>';
                }
            });
        });
        $("#yxzw").html(tjh);
        $(".xz_zhiwei").html(tjh);
    }
}

//转换成数字数组
function zh_array(arr) {
    //最后是否逗号
    if (arr.charAt(arr.length - 1) == ",") {
        arr = arr.substring(0, arr.length - 1);
    }
    var arr = arr.split(","); //截取逗号并存为数组
    var new_array = new Array();

    for (var i in arr) {
        new_array[i] = parseInt(arr[i]); //将arr数组转换成数字数组赋值给新数组
    }
    return new_array;
}
//联动菜单获取数据
$(document).on('change','.sanji select',function(){
    $(this).RegionChange("/MobileApi/Region/GetSonRegion")
})


