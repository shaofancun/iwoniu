$(function() {

})

function del(id,obj) {
	jConfirm("确定要删除第"+id+"份简历吗？", "确认删除？", function(r) {
		if (r) {
			jAlert('删除成功！');
		}
	});
}