/**
 * 创建对象表单
 * 
 * @param {}
 *            tabid
 * @return {}
 */
function objectneu() {
	var simpleStore = new Ext.data.Store({
				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/object/wsupportlist4ext.jsp'
						}),
				reader : new Ext.data.ArrayReader({}, [ // 如何解析
						{
									name : 'label'
								}, {
									name : 'key'
								}])

			});

	var onForm = new Ext.FormPanel({
				title : 'Basic Information',
				bodyStyle : 'padding:5px 5px 5px 5px;width:100%',
				labelWidth : 75, // label settings here
				// cascade unless
				frame : false,
				border : true,
				buttonAlign : 'left',
				defaultType : 'textfield',
				items : [{
							fieldLabel : 'Form Name',
							name : 'oname',
							allowBlank : false,
							width : 400,
							blankText : "Not Empty"
						}, {
							fieldLabel : 'Form Key',
							name : 'okey',
							allowBlank : false,
							width : 400,
							blankText : "Not Empty"
						}, {
							fieldLabel : 'Event Handling Class',
							width : 400,
							name : "ohandle"
						}, {
							fieldLabel : 'System',
							xtype : 'combo',
							width : 400,
							editable : false,// 是否可以编辑
							forceSelection : true,// 必须选择一项
							allowBlank : false,
							triggerAction : 'all',
							name : 'system1',
							hiddenName : 'system',
							displayField : 'label',
							valueField : 'key',
							store : simpleStore,
							blankText : "Please select a subordinate system",
							emptyText : "Please select a subordinate system"

						}, {
							xtype : 'hidden',
							id : 'ocontent',
							name : "ocontent"
						}]
			});

	var fckPanel = new Ext.FormPanel({
				title : 'Object View Designer',
				border : true,
				html : initFCKEditor()
			});

	var accordion = new Ext.Panel({
				border : false,
				layout : 'accordion',
				items : [onForm, fckPanel]
			});

	var neuONWin = new Ext.Window({
		renderTo : Ext.getBody(),
		layout : 'fit',
		width : 800,
		height : 600,
		title : 'New Form Object',
		plain : true,
		modal : true,
		maximizable : true,
		items : [accordion],
		buttons : [{
			text : "Confirm",
			handler : function() {
				if (onForm.getForm().isValid()) {
					Ext
							.getCmp('ocontent')
							.setValue(getFrameDocument('FCKeditor1___Frame').FCK
									.GetXHTML());

					Ext.MessageBox.wait('Submission process...');

					onForm.getForm().submit({
						url : context + '/system/object.do?method=save',
						method : "POST",
						success : function(form, action) {
							Ext.MessageBox.hide();
							Ext.MessageBox
									.alert('Hint',
											'Form object has been successfully generated ');
							if (objectListGrid) {
								objectListGrid.getStore().reload();
							}
						},
						failure : function(form, action) {
							Ext.MessageBox.hide();
							if (action.result.errCode == '-1') {
								Ext.Msg.alert('Hint',
										'Submit error generated form object!');
							} else if (action.result.errCode == '0') {
								Ext.Msg
										.alert('Hint',
												'Form object uniquely identifies the key must be set!');
							} else if (action.result.errCode == '1') {
								Ext.Msg
										.alert('Hint',
												'Form object uniquely identifies the key repeat, please redefine!');
							} else if (action.result.errCode == '2') {
								Ext.Msg
										.alert('Hint',
												'Please use the view designer to build the form object view structure!');
							} else {
								Ext.Msg.alert('Hint',
										'An unknown error exception!');
							}
						}
					});
				}
			}
		}, {
			text : "Cancle",
			handler : function() {
				onForm.getForm().reset();
			}
		}, {
			text : 'Close',
			handler : function() {
				neuONWin.close();
				neuONWin = null;
			}
		}]
	});

	neuONWin.show(this);
};

function initFCKEditor() {
	var str = '<iframe id="FCKeditor1___Frame" src="'
			+ context
			+ '/system/object/fckeditor/editor/fckeditor.html?InstanceName=ocontent&Toolbar=Object"'
			+ 'width="100%" height="100%" frameborder="0" scrolling="no"></iframe>';

	/*
	 * var sp = document.createElement("span"); sp.innerHTML = str;
	 * 
	 * Ext.get('ocontentlabel').dom.parentNode.appendChild(sp);
	 */

	return str;
	// form.getForm().findField("okey").setValue(key);
}
