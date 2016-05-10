$(function(){
	//工作经验导航选择
	if($(".order_nav").length>0){
		var $liCur = $(".order_nav ul li.cur"),
			curP = $liCur.position().left,
			curW = $liCur.outerWidth(true),	  
			$slider = $(".line"),
		  	$navBox = $(".order_nav");
		 	$targetEle = $(".order_nav ul li a"),
			$slider.animate({
			  "left":curP,
			  "width":curW
			});
		$targetEle.mouseenter(function () {
		  var $_parent = $(this).parent(),
			  _width = $_parent.outerWidth(true),
			  posL = $_parent.position().left;
			  $slider.stop(true, true).animate({
				"left":posL,
				"width":_width
			  }, "fast");
		});
		$navBox.mouseleave(function (cur, wid) {
		  cur = curP;
		  wid = curW;
		  $slider.stop(true, true).animate({
			"left":cur,
			"width":wid
		  }, "fast");
		});			
	}
	//加载评价模块
	eval_box.loading();
})
//删除兼职工作
function del(id,obj) {
	jConfirm("确定删除这份兼职工作吗？", "提示框", function(r) {
		if (r) {
			jAlert('删除成功！',"提示框",function(){
				location.reload();
			});
		}
	});
}
//兼职职位下线
function offline(id,obj) {
	jConfirm("确定下线这份兼职工作吗？", "提示框", function(r) {
		if (r) {
			jAlert('下线成功！',"提示框",function(){
				location.reload();
			});
		}
	});
}
//移入黑名单
function intoblack(id){
	jPrompt("填写移入黑名单原因：","","提示框", function(r) {
		console.log(r);//r为textarea里的值
		jAlert('移入成功！',"提示框",function(){
			location.reload();
		});
	});
}
//移出黑名单
function outblack(id){
	jConfirm("确定要移出黑名单吗？", "提示框", function(r) {
		if (r) {
			jAlert('移出成功！',"提示框",function(){
				location.reload();
			});
		}
	});
}
//全选
$(document).on("click","#checkall",function(){
	if($(this).is(":checked")){
		$("input[name='checklist']").prop("checked",true);
	}else{
		$("input[name='checklist']").prop("checked",false);
	}
});
//批量通过申请
function batchby(){
	var inc=$("input[name='checklist']:checked");//选中的input
	if(inc.length==0){
			jAlert("您没有选中任何项，请选中后继续操作。");
			return false;
	}else{
		for(var i=0;i<inc.length;i++){
			console.log($(inc[i]).val());//勾选的人员ID
		}
		jConfirm("要将"+inc.length+"条报名申请通过吗？","提示框？",function(r) {
			   if(r){
			    	jAlert('通过成功！',"提示框",function(){
						location.reload();
					});
			   }			   
		});
	}
}
//单个通过申请
function singleby(id){
	jConfirm("确定申请通过？","提示框？",function(r) {
		   if(r){
		    	jAlert('通过成功！',"提示框",function(){
					location.reload();
				});
		   }			   
	});
}
//批量签单
function batchjobsign(){
	var inc=$("input[name='checklist']:checked");//选中的input
	if(inc.length==0){
			jAlert("您没有选中任何项，请选中后继续操作。");
			return false;
	}else{
		for(var i=0;i<inc.length;i++){
			console.log($(inc[i]).val());//勾选的人员ID
		}
		jConfirm(""+inc.length+"位人员确认签到？","提示框？",function(r) {
			   if(r){
			    	jAlert('签到成功！',"提示框",function(){
						location.reload();
					});
			   }			   
		});
	}
}
//单个签到
function jobsign(){
	jConfirm("人员确认签到？","提示框？",function(r) {
		   if(r){
		    	jAlert('签到成功！',"提示框",function(){
					location.reload();
				});
		   }			   
	});
}
//评价模块
var save_arr = new Array();//已选评价
var eval_box={
	//加载所有评价
	loading:function(){
		var eval_array=[
			{"Id":1,"Name":"1个字"},
			{"Id":2,"Name":"2个个字"},
			{"Id":3,"Name":"3个个个字"},
			{"Id":4,"Name":"4个个个个字"},
			{"Id":5,"Name":"5个个个个个字"},
			{"Id":6,"Name":"6个个个个个个字"},
			{"Id":7,"Name":"7个个个个个个个字"},
			{"Id":8,"Name":"8个个个个个个个个字"}
		]
		var checkH="";//所有评价html
		for(var i in eval_array){			
			checkH+='<li onclick="eval_box.change(this,'+eval_array[i].Id+');" class="">'+eval_array[i].Name+'</li>';
		}
		$("#eva_ul").html(checkH);
	},
	//选择评价
	change:function(obj,id){
		if ($(obj).attr("class").indexOf("action") >= 0) {
			$(obj).removeClass("action");
			eval_box.save(id,"splice");
		} else {
			$(obj).addClass("action");
			eval_box.save(id,"push");
		}
	},
	//已选择的评价存入hidden
	save:function(id,type){
		switch (type) {
			case "push" : 
				save_arr.push(id);
				break;
			case "splice" : 
				for (var i in save_arr){
					if(save_arr[i]==id){
						save_arr.splice(i,1);
					} 
				}
				break;
		}
		console.log(save_arr);
		$("#change_eval").val(save_arr);
	}
}