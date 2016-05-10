//上传模特封面照
$(document).on('change', "#modelUp", function (e) {
    uploadimg(this, e,'.modelImg','#modelImg');
});
//选择属性
$(document).on('change','.modelType input',function(){
	var checkType=$(this).val();
	var moneyBox=$(".money-box").children('div');
	moneyBox.hide();
	if(checkType=='model') $('.model-money').show();
	else if(checkType=='ceremony') $('.ceremony-money').show();
	else if(checkType=='all') moneyBox.show();
})
//联动菜单获取数据
$(document).on('change','.sanji select',function(){
    $(this).RegionChange("/MobileApi/Region/GetSonRegion")
})
//富文本编辑器
if($('#modelShow').length>0){
KindEditor.ready(function(K) {
		window.editor = K.create('#modelShow',{
        	minWidth:'650px',
        	minHeight:'300px',
        	width:'650px',
        	height:'300px',
        	items:['source', '|','image', 'multiimage'],
        	uploadJson : '',
            //fileManagerJson : 'editor/asp.net/file_manager_json.ashx',
            allowFileManager : true
        });     
	});
}

//同意工作邀请
function modelWorkGreen(workId){
    jConfirm("确定要接受工作邀请？", "提示框", function(r) {
        if (r) {
            $.ajax({
                url:"json/success.json",
                data: { workId: workId},
                success: function (data) {
                    if (data.Success) {
                        jAlert(data.Msg, "提示框", function () {
                            location.href = "user_modelWork.html";
                        });
                    } else {
                       alert("提交失败")
                    }
                }
            })
        }
    });
}