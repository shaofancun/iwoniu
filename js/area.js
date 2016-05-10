// $(function () {
//     //加载省份
//     access_pro("0");
//     //选择省份加载市
//     $("#s_province").change(function () {
//         var selValue = $(this).val();
//         $("#s_city option:gt(0)").remove();
//         $("#s_county option:gt(0)").remove();
//         access_city(selValue, selValue); //加载市
//     });
//     //选择市加载区 
//     $("#s_city").change(function () {
//         var selValue = $(this).val();
//         $("#s_county option:gt(0)").remove();
//         access_county(selValue, selValue); //加载区
//     });
// });
// //加载省市区的默认选中
// function init() {
//     $("#s_province").val("");
//     var provinceCode = $("#k_province").val();
//     var cityCode = $("#k_city").val();
//     var countyCode = $("#k_county").val();
//     access_pro(provinceCode);
//     access_city(provinceCode, cityCode);
//     access_county(cityCode,countyCode);
// }

// //省
// function access_pro(v) {
//     $.ajax({
//         type: "Get",
//         url: "/MobileApi/Region/ProvinceList",
//         dataType: "json",
//         //async:false,
//         success: function (data) {
//             pro_optionAdd(data,v);
//         }
//     });
// }
// //添加省份的选项
// function pro_optionAdd(data,v) {
//     $.each(data, function (k, item) {
//         var option = "<option value='" + item.RegionCode + "'>" + item.RegionName + "</option>";
//         $("#s_province").append(option);
//         if (v == item.RegionCode) {
//             $("#s_province").val(v);
//         }
//     });
// }

// //市
// function access_city(proCode,v) {
//     $.ajax({
//         type: "Get",
//         url: "/MobileApi/Region/CityList",
//         dataType: "json",
//         data: { ParentCode: proCode },
//         success: function (data) {
//             city_optionAdd(data,v);
//         }
//     });
// }
// //添加市的选项
// function city_optionAdd(data, v) {
//     //console.log(data);
//     //console.log(v);
//     $.each(data, function (k, item) {
//         var option = "<option value='" + item.RegionCode + "'>" + item.RegionName + "</option>";
//         $("#s_city").append(option);
//         if (v == item.CityCode) {
//             $("#s_city").val(v);
//         }
//     });
// }


// //区
// function access_county(cityCode,v) {
//     $.ajax({
//         type: "Get",
//         url: "/MobileApi/Region/CountyList",
//         dataType: "json",
//         data: { ParentCode: cityCode },
//         success: function (data) {
//             county_optionAdd(data,v);
//         }
//     });
// }
// //添加区的选项
// function county_optionAdd(data,v) {
//     $.each(data, function (k, item) {
//         var option = "<option value='" + item.RegionCode + "'>" + item.RegionName + "</option>";
//         $("#s_county").append(option);
//         if (v == item.CountyCode) {
//             $("#s_county").val(v);
//         }
//     });
// }
$(function(){
    //加载省份
     $.ajax({
        type: "Get",
        url: "/MobileApi/Region/ProvinceList",
        success: function (data) {
            $.each(data, function (k, item) {
                var option = "<option value='" + item.RegionCode + "'>" + item.RegionName + "</option>";
                $("#s_province").append(option);
                
            });
        }
    });
})

//联动菜单获取数据
$(document).on('change','.sanji select',function(){
    $(this).RegionChange("/MobileApi/Region/GetSonRegion")
})
