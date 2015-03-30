/**
 * 保存对象操作(ext 对象登记页面)
 * @param objkey {对象key}
 * @param objName {对象名称}
 * @param extForm {ext form}
 * @param checkFunc {提交前自定义验证函数}
 * @param forwardFunc {提交后自定义返回函数}
 */
function saveObject4Ext(objkey, objName, extForm, checkFunc, forwardFunc) {
	if (checkFunc == null || checkFunc() == true) {
		Ext.MessageBox.confirm('提示', '确定提交保存?', function(e) {
					if (e == "yes") {
						var url = context
								+ '/system/objectcreator.do?method=save4session';

						Ext.MessageBox.wait('提交保存过程中...');
						extForm.getForm().submit({
									// 请求地址
									url : url,
									method : "POST",
									params : {
										objkey : objkey,
										oname : objName,
										okey : objkey
									},
									// 成功时回调
									success : function(response, options) {
										// 获取响应的json字符串
										Ext.MessageBox.hide();

										if (forwardFunc != null) {
											forwardFunc();
										}
									},
									failure : function(form, action) {
										Ext.Msg.alert('提示', '提交保存失败！');
									}
								});

					}
				});
	}
}

/**
 * 修改对象操作(ext 对象登记页面)
 * @param id {对象主键}
 * @param objkey {对象key}
 * @param objName {对象名称}
 * @param extForm {ext form}
 * @param checkFunc {提交前自定义验证函数}
 * @param forwardFunc {提交后自定义返回函数}
 */
function updateObject4Ext(id, objkey, objName, extForm, checkFunc, forwardFunc) {
	if (checkFunc == null || checkFunc() == true) {
		Ext.MessageBox.confirm('提示', '确定提交保存?', function(e) {
					if (e == "yes") {
						var url = context
								+ '/system/objectcreator.do?method=update';

						Ext.MessageBox.wait('提交保存过程中...');
						extForm.getForm().submit({
									// 请求地址
									url : url,
									method : "POST",
									params : {
										okid : id,
										objkey : objkey,
										oname : objName,
										okey : objkey
									},
									// 成功时回调
									success : function(response, options) {
										// 获取响应的json字符串
										Ext.MessageBox.hide();

										if (forwardFunc != null) {
											forwardFunc();
										}
									},
									failure : function(form, action) {
										Ext.Msg.alert('提示', '提交保存失败！');
									}
								});

					}
				});
	}
}