//全选
	$(document).on("click","#checkall",function(){
		if($(this).is(":checked")){
			$("input[name='checklist']").prop("checked",true);
		}else{
			$("input[name='checklist']").prop("checked",false);
		}
	});
function xz(){
	var a=$("input[name='checklist']:checked").length;
	alert(a)
}
//删除&设为已读
function xuanzhong(lx){
	var inc=$("input[name='checklist']:checked");//选中的input
	if(inc.length==0){
			jAlert("您没有选中任何项，请选中后继续操作。");
			return false;
	}else{
//		for(var i=0;i<inc.length;i++){
//			alert($(inc[i]).val())
//		}		
		switch(lx){
			//设为已读
			case 1:
			jConfirm("要将"+inc.length+"信息设为已读吗？","提示框？",function(r) {
				   if(r){
				    	jAlert('设置成功！');
				   }			   
			});		  	
		    break;
		    //删除选中项
		    case 2:
		    jConfirm("要删除"+inc.length+"信息吗？","提示框？",function(r) {
				   if(r){
				    	jAlert('删除成功！');
				   }			   
			});	
		    break;
		}
	}
}
//删除信息
function del(id,obj){
	jConfirm("删除第"+id+"条信息？", "提示框", function(r) {
		if (r) {
			jAlert('删除成功！',"提示框",function(){
				location.reload();
			});
		}
	});	
}
