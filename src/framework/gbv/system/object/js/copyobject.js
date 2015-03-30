function copyobject(id, name) {
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

	var copyONForm = new Ext.FormPanel({
				id : 'copyONForm',
				title : 'Basic Information',
				bodyStyle : 'padding:5px 5px 5px 5px',
				labelWidth : 75, // label settings here
				// cascade unless
				frame : false,
				border : false,
				buttonAlign : 'left',
				autoScroll : false,
				width : 750,
				defaultType : 'textfield',
				defaults : {
					width : 675
				},
				items : [{
							fieldLabel : 'Form Name',
							name : 'oname',
							allowBlank : false,
							width : 400,
							blankText : 'Not Empty'
						}, {
							fieldLabel : 'Form Key',
							name : 'okey',
							allowBlank : false,
							width : 400,
							id : 'olabelkey',
							blankText : 'Not Empty'
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
							id : 'system1',
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

	copyONForm.getForm().load({
		url : context + '/system/object.do?method=edit',
		params : {
			key : id
		},
		waitTitle : 'Hint',
		waitMsg : 'Loading data, please wait...',
		animEl : "loding",
		success : function(form, action) {
			Ext.getCmp('olabelkey').setValue(action.result.data.okey + '_bak');
			Ext.getCmp('system1').setValue(action.result.data.system);
			Ext.getCmp('system1').setRawValue(action.result.data.system1);

			getFrameDocument('FCKeditor1___Frame').FCK
					.SetHTML(action.result.data.ocontent);
		},
		failure : function(form, action) {
			if (action.result.errCode == '-1') {
				Ext.MessageBox.show({
							title : 'Hint',
							msg : 'Failed to read the form object',
							icon : Ext.MessageBox.ERROR
						});
			} else if (action.result.errCode == '-2') {
				Ext.MessageBox.show({
							title : 'Hint',
							msg : 'Objects form view cannot pass the builder editor',
							icon : Ext.MessageBox.ERROR
						});
			} else {
				Ext.MessageBox.show({
							title : 'Hint',
							msg : action.response.responseText,
							icon : Ext.MessageBox.ERROR
						});
			}

		}
	});

	var fckPanel = new Ext.FormPanel({
				title : 'Object View Designer',
				border : true,
				html : initFCKEditor()
			});

	var accordion = new Ext.Panel({
				border : false,
				layout : 'accordion',
				items : [copyONForm, fckPanel]
			});

	var copyONWin = new Ext.Window({
		renderTo : Ext.getBody(),
		layout : 'fit',
		width : 800,
		height : 600,
		title : 'Copy the form object',
		plain : true,
		modal : true,
		maximizable : true,
		items : [accordion],

		buttons : [{
			text : 'Submit',
			formBind : true,
			handler : function() {
				if (copyONForm.getForm().isValid()) {
					Ext
							.getCmp('ocontent')
							.setValue(getFrameDocument('FCKeditor1___Frame').FCK
									.GetXHTML());

					Ext.MessageBox.wait('Submission process...');

					copyONForm.getForm().submit({
								url : context + '/system/object.do?method=save',
								method : "POST",
								success : function(form, action) {
									Ext.MessageBox.hide();
									Ext.MessageBox.alert('Hint', 'Copy the form object successfully!');
									if (objectListGrid) {
										objectListGrid.getStore().reload();
									}
								},
								failure : function(form, action) {
									Ext.MessageBox.hide();
									if (action.result.errCode == '-1') {
										Ext.Msg.alert('Hint', 'Commit changes form object errors!');
									} else if (action.result.errCode == '0') {
										Ext.Msg.alert('Hint', 'Form object uniquely identifies the key must be set!');
									} else if (action.result.errCode == '1') {
										Ext.Msg.alert('Hint',
												'Form object uniquely identifies the key repeat, please redefine!');
									} else if (action.result.errCode == '2') {
										Ext.Msg.alert('Hint',
												'Please use the view designer to build the form object view structure!');
									} else {
										Ext.Msg.alert('Hint', 'An unknown error exception!');
									}
								}
							});
				}
			}
		}, {
			text : 'Close',
			handler : function() {
				copyONWin.close();
				copyONWin = null;
			}
		}]
	});

	copyONWin.show(this);
};

function initEditFCKEditor() {
	var str = '<iframe id="FCKeditor1___Frame" src="'
			+ context
			+ '/system/object/fckeditor/editor/fckeditor.html?InstanceName=ocontent&Toolbar=Object"'
			+ 'width="100%" height="100%" frameborder="0" scrolling="no"></iframe>';

	return str;
}

function reset() {
	Ext.getCmp('copyONForm').getForm().reset();
}