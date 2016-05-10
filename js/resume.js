$(function(){
	//banner幻灯片
	if($('#dowebok').length>0){
		$('#dowebok').responsiveSlides({
			pager: true,
			nav: true,
			namespace: 'centered-btns',
		});
	}
})