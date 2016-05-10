$(function(){
	//图片延迟加载
    if($(".model-list").length>0){
         $(".model-list img").lazyload({effect: "fadeIn"});
    }
    if($(".model-show").length>0){
         $(".model-show img").lazyload({effect: "fadeIn"});
    }
    
})



/*

模特礼仪聘用，加入购物车相关

*/
//选择天数||小时
$(document).on('change','input[name="balanceType"]',function(e){
	var endTime=$('#endtime'),workHour=$('.workHour'),workTime=$(".workTime");
	workTime.show();
	if($(this).val()=='hour'){
		endTime.attr('disabled',true).hide();
		workHour.show();
	}else{
		endTime.attr('disabled',false).show();
		workHour.hide();
	}
})
var model={
	//工作的小时数
	workHour:$("#workHour"),
	//聘用，加入购物车
	orderSubmit:function(type){
		var balanceType=$("input[name='balanceType']:checked").val(),	//结算方式，天||小时
			data=$("#modelWorkInfo").formJson(),						//表单里所有控件值
			starttime=$("#starttime").val(),							//开始时间
			endtime=$("#endtime").val(),								//结束时间
			url,callbackUrl;
		var zzs = /^[0-9]*[1-9][0-9]*$/ ; 
		//根据下单类型改变接口地址和跳转地址
		if(type=="employ"){
			//直接聘用
			url="json/success.json";
			callbackUrl="modelOrder.html";
		}else if(type=="add"){
			//添加到人才库
			url="json/success.json";
			callbackUrl="modelShopCart.html";
		}
		if(!balanceType){
			alert("请选择结算方式！");return false;
		}else{
			if(balanceType=='day'){
				if(!starttime||!endtime){
					alert("请填写开始和结束时间！");return false;
				}
			}else if(balanceType=="hour"){
				if(!starttime){
					alert("请填写开始时间！");return false;
				}
				if(!zzs.test(workHour.value)){
					alert("请输入正确的小时数！");return false;
				}
			}
		}
		$.ajax({
			url:url,
			data: data,
            success: function (data) {
                if (data.Success) {
                    jAlert(data.Msg, "提示框", function () {
                        location.href = callbackUrl;
                    });
                } else {
                   alert("聘用失败！");
                }
            }
		})
	},
	//增加小时
	up:function(){
		workHour.value=parseInt(workHour.value)+1;
	},
	//减少
	down:function(){
		if(workHour.value>1){
			workHour.value=parseInt(workHour.value)-1;
		}
	}
}
/*
购物车，订单相关
*/

//购物车全选
$(document).on("click","#checkall",function(){
	if($(this).is(":checked")){
		$("input[name='checklist']").prop("checked",true);
	}else{
		$("input[name='checklist']").prop("checked",false);	
	}
	//计算价格
	modelCart.shopCount();
});
//购物车多选框
$(document).on('change','input[type="checkbox"]',function(e){
	//计算价格
	modelCart.shopCount();
})
var modelCart={
	//删除模特
	del:function(modelId,obj){
		$.ajax({
			url:"json/success.json",
			data: { modelId: modelId},
            success: function (data) {
                if (data.Success) {
                    $(obj).parent().parent().animate({opacity:0}, 300,function(){                    	
                    	$(this).remove();
                    	//删除模特以后重新计算
                    	model.shopCount();
                    });
                } else {
                   alert("删除失败！");
                }
            }
		})
	},
	//勾选模特,计算价格人数
	shopCount:function(){
		var modelValue=$("#modelCheckValue"),
			modelCheckArr=[],
			modelInput=$("input[name='checklist']:checked");
		var sumMoney=0;
			for(var i=0;i<modelInput.length;i++){
				modelCheckArr.push(modelInput[i].value)
				var money=parseInt($(modelInput[i]).parent().parent().find("strong").text());
				sumMoney+=money;
			}
			$("#sumModel").html(modelInput.length);
			$("#sumMoney").html(sumMoney)
			modelValue.val(modelCheckArr);
	},
	//结算
	balance:function(){
		var workModelValue=$("#modelCheckValue").val();
		if(!workModelValue){
			alert("请选择需要工作的人员！");
		}else{
			$.ajax({
				url:"json/success.json",
				data: { workModelValue: workModelValue},
	            success: function (data) {
	                if (data.Success) {
	                    location.href = "modelOrder.html";
	                } else {
	                   alert("结算失败")
	                }
	            }
			})
		}
	},
	//提交支付
	paySubmit:function(){
		var workAddress=$("#workAddress").val(),
			workInfo=$("#workInfo").val();
		if(!workAddress){
			alert("请输入工作地址！");
		}else if(!workInfo){
			alert("请工作内容！");
		}
		else{
			$.ajax({
				url:"json/success.json",
				data: { workAddress: workAddress,workInfo:workInfo},
	            success: function (data) {
	                if (data.Success) {
	                    location.href = "pay.html";
	                } else {
	                   alert("提交失败")
	                }
	            }
			})
		}
	},
	

}


