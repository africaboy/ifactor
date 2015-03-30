document.write("<script src=\"" + context
		+ "/system/dataindex/js/dataIndexTreeWindow.js\"></script>");
document.write("<script src=\"" + context
		+ "/system/dataindex/js/TreeCheckNodeUI.js\"></script>");		

function openDITree(root, id, name) {
	
	//初始化数据源
	if(typeof(ddtreeJsonData)=='undefined' || ddtreeJsonData== null){
		Ext.Ajax.request({
		url : context + '/system/dataindex/getDiDataSource.jsp',
		method : 'POST',
		success : function(rs, request) {
			var result = rs.responseText;// 拿到结果集，此时为字符串

			ddtreeJsonData = Ext.util.JSON.decode(result);// 将字符串转换为json类型
			
			if(typeof(ddtreeWin)=='undefined' || ddtreeWin == null ){
			ddtreeWin = new dataIndexTreeWindow();
			}
			ddtreeWin.showWindow(root, id, name);

		},
		failure : function(rs, request) {
			Ext.Msg.alert('提示', '未知的异常错误，获取数据类别失败');
		}
	});
		
		
	}else{
		if(typeof(ddtreeWin)=='undefined' || ddtreeWin == null ){
		ddtreeWin = new dataIndexTreeWindow();
		}
		ddtreeWin.showWindow(root, id, name);
	
	}
	
	
}