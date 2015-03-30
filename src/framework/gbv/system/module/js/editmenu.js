function showEditMenuForm(id, name) {
	if (Ext.get('tab_menuedit')) {
		moduleTreeTabs.remove(0);
	}

	// renewAddForm(id, tlt);
	moduleTreeTabs.add({
				id : 'tab_menuedit',
				title : grooveTranslator.getLangLabel('menu-language',
						'form-title'),
				layout : 'form',
				items : renewEditMenuForm(id, name)
			}).show();
}

function renewEditMenuForm(id, name) {
	var MMForm = new Ext.FormPanel({
				labelWidth : 150, // label settings here cascade unless
				frame : false,
				bodyStyle : 'border:0px; padding:5px;',
				width : 500,
				defaults : {
					width : 300
				},
				defaultType : 'textfield',

				items : [
						{
							xtype : 'hidden',
							name : 'mnid'
						},
						{
							xtype : 'hidden',
							name : 'mnpid'
						},
						{
							xtype : 'hidden',
							name : 'mid'
						},
						{
							fieldLabel : grooveTranslator.getLangLabel(
									'menu-language', 'form-name'),
							name : 'mnname',
							allowBlank : false
						},
						getWBComboStore('default-menu-icon', '', 'mnicon_',
								grooveTranslator.getLangLabel('menu-language',
										'form-icon'), 'mnicon', 'mniconlabel',
								null, true), {
							xtype : 'hidden',
							name : 'mniconlabel',
							id : 'mniconlabel'
						}, {
							xtype : 'hidden',
							name : 'mnicon',
							id : 'mnicon'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'menu-language', 'form-desc'),
							xtype : 'textarea',
							name : 'mnmemo'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'menu-language', 'form-link'),
							xtype : 'textarea',
							name : 'mnurl'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'menu-language', 'form-idx'),
							name : 'mnsort'
						}, {
							fieldLabel : grooveTranslator.getLangLabel(
									'menu-language', 'form-langkey'),
							name : 'mnkey'
						}],

				buttons : [{
					text : grooveTranslator.getLangLabel('common-language',
							'submit'),
					type : 'submit',
					handler : function() {
						if (MMForm.getForm().isValid()) {
							var but = this;
							but.setDisabled(true);
							Ext.MessageBox.wait(grooveTranslator.getLangLabel(
									'common-language', 'submit-loading'));

							MMForm.getForm().submit({
								url : context
										+ '/system/module.do?method=savemenu',
								method : "POST",
								success : function(form, action) {
									Ext.MessageBox.hide();
									but.setDisabled(false);
									Ext.Msg.alert(grooveTranslator
													.getLangLabel(
															'common-language',
															'prompt'),
											grooveTranslator.getLangLabel(
													'menu-language',
													'form-success'));
									moduleTreeReload();
								},
								failure : function(form, action) {
									Ext.MessageBox.hide();
									but.setDisabled(false);
									Ext.Msg.alert(grooveTranslator
													.getLangLabel(
															'common-language',
															'prompt'),
											grooveTranslator.getLangLabel(
													'menu-language',
													'form-failure'));
								}
							});
						}
					}
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'reset'),
					handler : function() {
						MMForm.getForm().reset();
					}

				}]
			});

	MMForm.getForm().load({
		url : context + '/system/module.do?method=editmenu',
		params : {
			id : id
		},
		waitTitle : grooveTranslator.getLangLabel('common-language', 'prompt'),
		waitMsg : grooveTranslator.getLangLabel('common-language',
				'submit-loading'),
		animEl : "loding",
		success : function(form, action) {
			/*
			 * var resultInfo = listSimpleJson(action.result.data);
			 * 
			 * var gbranch = resultInfo.get("gbranch");
			 * 
			 * if (gbranch == "0") { Ext.get("branch0").dom.checked = true; }
			 * else if (gbranch == "1") { Ext.get("branch1").dom.checked = true; }
			 */
		},
		failure : function(form, action) {
			Ext.Msg.alert(grooveTranslator.getLangLabel('menu-language',
					'edit-load-error'));
		}
	});

	return MMForm;
};