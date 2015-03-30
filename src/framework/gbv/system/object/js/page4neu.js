/**
 * 初始化页面表单项
 */
function initPageForm() {
	/*
	 * 设置系统对象核心参数
	 * @see init4core.js
	 * 
	 */
	setObjectCore(id, name, key, returnURL);

	/*
	 * 设置对象视图保存操作URL
	 */
	document.form1.action = context
			+ '/system/objectcreator.do?method=save4session';

	/*遍历视图中input类型的表单项*/		
	var inputobj = document.getElementsByTagName('input');
	if (inputobj && inputobj.length > 0) {
		for (var j = 0; j < inputobj.length; j++) {
			/*
			 * 获取表单项操作权限
			 * see init4core.js
			 */
			var ht = getItemHandleType(inputobj[j]);

			/*
			 * 根据权限和表单项值
			 * 初始化表单项
			 * @see init4core.js
			 */
			initElement(inputobj[j], '', ht);
		}
	}

	/*遍历视图中textarea类型的表单项*/	
	var ttobj = document.getElementsByTagName('textarea');
	if (ttobj && ttobj.length > 0) {
		for (var j = 0; j < ttobj.length; j++) {
			var ht = getItemHandleType(ttobj[j]);

			initElement(ttobj[j], '', ht);
		}
	}

	/*遍历视图中select类型的表单项*/	
	var selectobj = document.getElementsByTagName('select');
	if (selectobj && selectobj.length > 0) {
		for (var j = 0; j < selectobj.length; j++) {
			var ht = getItemHandleType(selectobj[j]);

			initElement(selectobj[j], '', ht);
		}
	}
	
	/*
	 * 初始化ext类型控件
	 * see init4core.js
	 */
	initExtComponents();
}