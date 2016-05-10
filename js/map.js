//给企业地图定位
if($("#map").length>0){
	var markerls,localSearch;
	function initMap(){
		createMap(); //创建地图
		setMapEvent(); //设置地图事件
	}
	function createMap(){
        var map = new BMap.Map("map");
        var point = new BMap.Point($("#lng").val(),$("#lat").val());
        map.centerAndZoom(point, 13);
	   	markerls = new BMap.Marker(new BMap.Point($("#lng").val(),$("#lat").val()));        
        map.addOverlay(markerls);
        markerls.setAnimation(BMAP_ANIMATION_BOUNCE);
        window.map = map; //将map变量存储在全局
        window.markerls=markerls;
	}
	function setMapEvent() {
        map.enableDragging(); //启用地图拖拽事件
        map.enableScrollWheelZoom(); //启用地图滚轮放大缩小
        map.enableDoubleClickZoom(); //启用鼠标双击放大
        //向地图中添加缩放控件
        var ctrl_nav = new BMap.NavigationControl({ anchor: BMAP_ANCHOR_TOP_LEFT, type: BMAP_NAVIGATION_CONTROL_LARGE });
        map.addControl(ctrl_nav);
        //向地图中添加缩略图控件
        var ctrl_ove = new BMap.OverviewMapControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT, isOpen: 1 });
        map.addControl(ctrl_ove);
        //向地图中添加比例尺控件
        var ctrl_sca = new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT });
        map.addControl(ctrl_sca);
    }

	function myFun(result){
		var cityName = result.name;
		map.setCenter(cityName);
	}
	var myCity = new BMap.LocalCity();
	if($("#lng").val()==0&&$("#lat").val()==0){
		myCity.get(myFun);//根据IP地址获取城市位置
	}
	function setAddress(){
		var keyword = $("#address").val();
		if(keyword=="")
		{
		  $.jGrowl("请输入详细地址！！");
		  $("#address").focus();
		  return;
		}
		localSearch = new BMap.LocalSearch(map, {
			renderOptions: {
				pageCapacity: 8,
				autoViewport: true,
				selectFirstResult: false
			}
		});
		localSearch.enableAutoViewport();
		localSearch.setSearchCompleteCallback(function(searchResult) {
			var poi = searchResult.getPoi(0);
			if (poi != null) {
				$("#lng").val(poi.point.lng);
				$("#lat").val(poi.point.lat);
				map.centerAndZoom(poi.point, 18);
			}
			map.removeOverlay(markerls);
			markerls = new BMap.Marker(new BMap.Point($("#lng").val(), $("#lat").val()));
			map.addOverlay(markerls);
			markerls.setAnimation(BMAP_ANIMATION_BOUNCE);
		});
		localSearch.search(keyword);
	}

	initMap();//初始化地图
	//鼠标点击定位
	map.addEventListener('click', function (e) {
        map.removeOverlay(markerls);
        var lngLat = e.point;
        $("#lng").val(lngLat.lng);
		$("#lat").val(lngLat.lat);
        markerls = new BMap.Marker(new BMap.Point(lngLat.lng, lngLat.lat));
        map.addOverlay(markerls);
    })

}
//企业地址地图
if($("#qymap").length>0){
	var zuobiaoX=getQueryString("x"),zuobiaoY=getQueryString("y");
	//console.log(zuobiaoX);
	//console.log(zuobiaoY);
	var map = new BMap.Map('qymap');
	var poi = new BMap.Point(zuobiaoX,zuobiaoY);
	map.centerAndZoom(poi, 18);
	map.enableScrollWheelZoom();

	var marker = new BMap.Marker(poi); //创建marker对象
	marker.enableDragging(); //marker可拖拽
	marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

	map.addOverlay(marker); //在地图中添加marker
}
//初始化,判断下hidden中是否有值,如果有,则加载地图
$(function () {

    var pointx = $("#lng").val();
    var pointy = $("#lat").val();
    if (pointx != "" && pointy != "") {
        map.removeOverlay(markerls);
        markerls = new BMap.Marker(new BMap.Point(parseFloat(pointx), parseFloat(pointy)));
        map.addOverlay(markerls);
    }
});