$(function () {
    zw_box.zwShow();
    $(".selectlb").click(function () {
        $('#jobid_box').modal('show');
    })
    //报名审核方式选择
    $("#AutoAudit").on("change", function () {
        //选择了自动审核
        if ($("#AutoAudit").val() == "1") {
            //$("#NumbersGo").val("1");
            $("#NumbersGo option").attr("disabled", "disabled");
            $("#NumbersGo option:nth-child(2)").removeAttr('disabled', 'disabled').attr("selected", true);
            //$("#NumbersGo").attr("disabled", "disabled");
            $("#LeastNumbers_Id").show();
            $("#LeastNumbers").val("1");
        } else {
            $("#NumbersGo").val("0");
            $("#NumbersGo option").removeAttr('disabled', 'disabled');
            //$("#NumbersGo").removeAttr("disabled");
        }
    });
    //开始方式选择
    $("#NumbersGo").on("change", function () {
        //选择了达到指定的人数
        if ($("#NumbersGo").val() == "1") {
            $("#LeastNumbers_Id").show();
        } else {
            $("#LeastNumbers_Id").hide();
        }
    });
})
//兼职类别选择
var zw_box={
	//加载所有职位
    zwShow: function () {
        $.ajax({
            type: "Get",
            url: "/MobileApi/CommonProperty/GetPosition",
            success: function (data) {
                var checkH = "";//所有职位html
                for (var i in data) {
                    checkH += '<li><a href="javascript:;" onclick="zw_box.selectjobid(' + data[i].PropertyId + '' + ",'" + data[i].PropertyValue + "'" + ')">' + data[i].PropertyValue + '</a></li>';
                }
                $("#lbbox ul").html(checkH);
            }
        });
	},
    selectjobid: function (id, val) {
        $("#PositionId").val(id);
        $(".selectlb").html('' + val + '<span class="caret"></span>');
		$('#jobid_box').modal('hide');
	}
}




//计算薪资
function jsxz(){
    var renshu = $("#Numbers").val(); 	//人数
    var starttime = $("#JobBeginDate").val();//开始日期
    var endtime = $("#JobEndDate").val();	//结束日期
    var jobtime = $("#DayWorkHours").val();	//工作时限
    var salary = $("#HoursSalary").val(); 	//薪资
	if(renshu==""){
		$("#zj").html("人数不能为空！");
	}else if(starttime==""){
		$("#zj").html("开始时间不能为空！");
	}else if(endtime==""){
		$("#zj").html("结束时间不能为空！");
	}else if(jobtime==""){
		$("#zj").html("工作时限不能为空！");
	}else if(salary==""){
		$("#zj").html("薪资不能为空！");
	}else{
		var tianshu=differ(starttime,endtime)+1;//相差天数 结果+1等于工作天数
		var zj=renshu*tianshu*jobtime*salary;
		$("#zj").html(zj+"元");
	}
}
//计算相差天数
function differ(st,et){
	var newst,		//处理后的开始日期
		newet,		//处理后的结束日期
		timearray,	//日期数组
		num;		//相差天数
	timearray =  st.split("-");
	newst  = new Date(timearray[0],timearray[1]-1,timearray[2]);
	timearray =  et.split("-");	
	newet  =  new  Date(timearray[0],timearray[1]-1,timearray[2]);		
	num=parseInt(Math.abs(newst-newet)/1000/60/60/24);
	return num;
}

