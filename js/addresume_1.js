$(function () {
    $("#category").click(function () {
        $('#category_box').modal('show');
        zw_box.zwShow();
    })
    //判断add_zhiwei的val是否存在，存在就使用zw_box.zwDefault()方法
    if ($("#Position").val() != null) {
        //console.log($("#Position").val());
        zw_box.zwDefault($("#Position").val());
    }
})
//获取职位数组
function access_zw() {
    $.ajax({
        type: "Get",
        url: "/Common/Resume/WorkPositions",
        dataType: "json",
        //async:false,
        success: function (data) {
            zw_arrayAdd(data);
        }
    });
    //var zw_array1=['促销/导购','传单派发','钟点工','服务员','生活配送员','护工','催乳师','问卷调查','活动策划','网络营销','游戏代练','网站建设','SEO优化','软件开发/编程','兼职测试','网络布线/维修','美工/平面设计','CAD制图','装修设计','图片处理','手绘/漫画','视频剪辑/制作','技工','家教','艺术老师','健身教练','汽车陪练','汽车代驾','导游','写作','会计','翻译','律师/法务','摄影/摄像','化妆师','礼仪/模特','司仪/驻唱/演出','志愿者','其他兼职'];
    //return zw_array1;
}
function zw_arrayAdd(data) {
    zw_array = data;
    var checkH = "";//所有职位html
    for (var i in data) {
        //console.log(zw_array[i]);
        checkH += '<div value="' + data[i].Id + '" onclick="zw_box.zwTo(' + i + ')">' + data[i].PositionName + '</div>';
    }
    $(".kx_zhiwei").html(checkH);

}

var zw_array = new Array();
//console.log(zw_array);
//职位选择
var yxzw_array = new Array();//已选职位
var zw_box = {
    //加载所有职位
    zwShow: function () {
        access_zw();
    },
    //点击职位添加到已选职位框
    zwTo: function (id) {
        if ($.inArray(id, yxzw_array) == -1) {
            if (yxzw_array.length < 3) {
                yxzw_array[yxzw_array.length] = id;
                var yxH = '<div class="zhiwei" id="zw' + id + '"><span>' + zw_array[id].PositionName + '</span><i onclick="zw_box.zwTo(' + id + ')"></i></div>';
                $(".xz_zhiwei").append(yxH);
            } else {
                jQuery.jGrowl('您最多能选择3项', {
                    life: 1000
                });
                return false;
            }
        } else {
            for (var i in yxzw_array) {
                if (yxzw_array[i] == id) {
                    yxzw_array.splice(i, 1);
                }
            }
            $('.xz_zhiwei #zw' + id).remove();
            $('#yxzw #zw' + id).remove();
        }
    },
    //确认按钮，添加到前面BOX
    btn: function () {
        var toArr = new Array();
        var tjh = "";
        for (var i in yxzw_array) {
            tjh += '<div class="zhiwei" id="zw' + yxzw_array[i] + '"><span>' + zw_array[yxzw_array[i]].PositionName + '</span><i onclick="zw_box.zwTo(' + yxzw_array[i] + ')"></i></div>';
            toArr[i] = zw_array[yxzw_array[i]].Id;
        }
        $("#yxzw").html(tjh);
        $('#category_box').modal('hide');
        $("#HopePosition").val(toArr);
    },
    //加载默认选项
    zwDefault: function (arr) {
        //  yxzw_array = zh_array(arr);
        //	var tjh="";
        //for(var i in yxzw_array){
        //	tjh+='<div class="zhiwei" id="zw'+yxzw_array[i]+'"><span>'+zw_array[yxzw_array[i]].PositionName+'</span><i onclick="zw_box.zwTo('+yxzw_array[i]+')"></i></div>';
        //}
        //$("#yxzw").html(tjh);
        $.ajax({
            type: "Get",
            url: "/Common/Resume/WorkPositions",
            dataType: "json",
            //async:false,
            success: function (data) {
                $.each(data, function (idx, item) {
                    //data就是zw_array所有值,
                    zw_array[idx] = item;
                    if (item.Id == xxx) {
                        //这里进行判断Id是否相等，相等的话在 yxzw_array添加
                    }
                });

            }
        });
    }

}
//修改的时候加载职位
function p_init() {
    $.ajax({
        type: "Get",
        url: "/Common/Resume/WorkPositions",
        dataType: "json",
        //async:false,
        success: function (data) {
            $.each(data, function (idx, item) {
                //data就是zw_array所有值,
                zw_array[idx] = item;
                if (item.Id == xxx) {
                    //这里进行判断Id是否相等，相等的话在 yxzw_array添加
                }
            });

        }
    });
}
//转换成数字数组
function zh_array(arr) {
    //最后是否逗号
    if (arr.charAt(arr.length - 1) == ",") {
        arr = arr.substring(0, arr.length - 1);
    }
    var arr = arr.split(",");//截取逗号并存为数组
    var new_array = new Array();

    for (var i in arr) {
        new_array[i] = parseInt(arr[i]);//将arr数组转换成数字数组赋值给新数组
    }
    return new_array;
}
//三级联动
//_init_area();
//var showArea = function() {
//		document.getElementById('show').innerHTML = "<h3>省" + document.getElementById('s_province').value + " - 市" +
//		document.getElementById('s_city').value + " - 县/区" +
//		document.getElementById('s_county').value + "</h3>"
//}
//document.getElementById('s_county').setAttribute('onchange', 'showArea()');