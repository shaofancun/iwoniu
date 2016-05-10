
var wn=angular.module("WN",[]);
//网站头部
wn.directive('headerView',function(){
	return {
		restrict:'A',
		templateUrl:'ngView/headerView.html',
		replace: true
	}
})
//全网幻灯片
wn.directive('bannerView',function(){
	return{
		restrict:'A',
		templateUrl:'ngView/bannerView.html',
		
	}
})
//网站底部
wn.directive('footerView',function(){
	return {
		restrict:'A',
		templateUrl:'ngView/footerView.html',
		replace:true
	}
})
//会员中心左侧
wn.directive('userleftView',function(){
	return {
		restrict:'A',
		templateUrl:'ngView/userLeft.html',
		replace: true
	}
})
//企业中心左侧
wn.directive('coleftView',function(){
	return {
		restrict:'A',
		templateUrl:'ngView/coLeft.html',
		replace: true
	}
})