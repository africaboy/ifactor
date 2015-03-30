function editStep(id) {
	/*
	 * var p1 = new Ext.FormPanel({ title : '环节参与人', border : true, html : '<div
	 * style="padding:5px;"><a href="javascript:void(0);" title="设置环节参与人"
	 * onclick="javascript:setRange();"><img src="' + context +
	 * '/system/workflow/images/addrange.png' + '' + '"/></a></div>' + '<div
	 * id="objrange" style="width:600px;padding:5px;"></div>' });
	 */

	var p2 = new Ext.FormPanel({
		title : grooveTranslator.getLangLabel('workflow-language',
				'step-form-event'),
		border : true,
		html : '<div style="padding:5px;"><a href="javascript:void(0);" title="'
				+ grooveTranslator.getLangLabel('common-language', 'add')
				+ '" onclick="javascript:addPlug();"><img src="'
				+ context
				+ '/system/workflow/images/addplug.jpg"/></a></div>'
				+ '<div id="plugarea" style="padding:5px;"></div>'
	});

	var radioGroup = new Ext.form.RadioGroup({
		fieldLabel : "多人办理", // RadioGroup.fieldLabel 标签与
		// Radio.boxLabel 标签区别
		width : "200",
		hideLabel : false, // 隐藏RadioGroup标签
		items : [new Ext.form.Radio({ // 三个必须项
					id : "ipara0",
					boxLabel : "否", // Radio标签
					name : "ipara", // 用于form提交时传送的参数名
					inputValue : "0", // 提交时传送的参数值
					listeners : {
						check : function(checkbox, checked) { // 选中时,调用的事件
							if (checked) {
								form.getForm().findField("iparavalue")
										.disable();
							}
						}
					}
				}), new Ext.form.Radio({ // 以上相同
					id : "ipara1",
					boxLabel : "是",
					name : "ipara",
					inputValue : "1",
					listeners : {
						check : function(checkbox, checked) {
							if (checked) {
								form.getForm().findField("iparavalue").enable();
								if (form.getForm().findField("iparavalue")
										.getValue() == '') {
									form.getForm().findField("iparavalue")
											.setValue(2);
								}
							}
						}
					}
				})]
	});

	var radioGroup2 = new Ext.form.RadioGroup({
				fieldLabel : grooveTranslator.getLangLabel('workflow-language',
						'step-form-transit'), // RadioGroup.fieldLabel 标签与
				// Radio.boxLabel 标签区别
				width : "200",
				items : [new Ext.form.Radio({ // 三个必须项
					id : "itrans0",
					name : "itrans",
					// checked : true, // 设置当前为选中状态,仅且一个为选中.
					boxLabel : grooveTranslator.getLangLabel(
							'frequence-language', 'no'), // Radio标签
					inputValue : "0", // 提交时传送的参数值
					listeners : {
						check : function(checkbox, checked) { // 选中时,调用的事件
							if (checked) {
								// form.getForm().getValues()["ipara"]
								form.getForm().findField("itrans")
										.setValue('0');
							}
						}
					}
				}), new Ext.form.Radio({ // 以上相同
					id : "itrans1",
					name : "itrans",
					boxLabel : grooveTranslator.getLangLabel(
							'frequence-language', 'yes'),
					inputValue : "1",
					listeners : {
						check : function(checkbox, checked) {
							if (checked) {
								form.getForm().findField("itrans")
										.setValue('1');
							}
						}
					}
				})]
			})

	var radioGroup3 = new Ext.form.RadioGroup({
				fieldLabel : "会签环节", // RadioGroup.fieldLabel 标签与
				// Radio.boxLabel 标签区别
				width : "200",
				items : [new Ext.form.Radio({ // 三个必须项
							id : "iinner0",
							name : "iinner",
							// checked : true, // 设置当前为选中状态,仅且一个为选中.
							boxLabel : "否", // Radio标签
							inputValue : "0", // 提交时传送的参数值
							listeners : {
								check : function(checkbox, checked) { // 选中时,调用的事件

								}
							}
						}), new Ext.form.Radio({ // 以上相同
							id : "iinner1",
							name : "iinner",
							boxLabel : "是",
							inputValue : "1",
							listeners : {
								check : function(checkbox, checked) {

								}
							}
						})]
			});

	var radioGroup4 = new Ext.form.RadioGroup({
				fieldLabel : grooveTranslator.getLangLabel('workflow-language',
						'step-form-limit'), // RadioGroup.fieldLabel 标签与
				// Radio.boxLabel 标签区别
				width : "200",
				items : [new Ext.form.Radio({ // 三个必须项
					id : "iscorr0",
					name : "iscorr",
					// checked : true, // 设置当前为选中状态,仅且一个为选中.
					boxLabel : grooveTranslator.getLangLabel(
							'frequence-language', 'no'), // Radio标签
					inputValue : "0", // 提交时传送的参数值
					listeners : {
						check : function(checkbox, checked) { // 选中时,调用的事件

						}
					}
				}), new Ext.form.Radio({ // 以上相同
					id : "iscorr1",
					name : "iscorr",
					boxLabel : grooveTranslator.getLangLabel(
							'frequence-language', 'yes'),
					inputValue : "1",
					listeners : {
						check : function(checkbox, checked) {

						}
					}
				})]
			});

	var radioGroup5 = new Ext.form.RadioGroup({
				fieldLabel : "传阅环节", // RadioGroup.fieldLabel 标签与
				// Radio.boxLabel 标签区别
				width : "200",
				items : [new Ext.form.Radio({ // 三个必须项
							id : "icc0",
							name : "icc",
							// checked : true, // 设置当前为选中状态,仅且一个为选中.
							boxLabel : "否", // Radio标签
							inputValue : "0", // 提交时传送的参数值
							listeners : {
								check : function(checkbox, checked) { // 选中时,调用的事件

								}
							}
						}), new Ext.form.Radio({ // 以上相同
							id : "icc1",
							name : "icc",
							boxLabel : "是",
							inputValue : "1",
							listeners : {
								check : function(checkbox, checked) {

								}
							}
						})]
			});

	var radioGroup6 = new Ext.form.RadioGroup({
				fieldLabel : "特送环节", // RadioGroup.fieldLabel 标签与
				// Radio.boxLabel 标签区别
				width : "200",
				items : [new Ext.form.Radio({ // 三个必须项
							id : "isd0",
							name : "isd",
							// checked : true, // 设置当前为选中状态,仅且一个为选中.
							boxLabel : "否", // Radio标签
							inputValue : "0", // 提交时传送的参数值
							listeners : {
								check : function(checkbox, checked) { // 选中时,调用的事件

								}
							}
						}), new Ext.form.Radio({ // 以上相同
							id : "isd1",
							name : "isd",
							boxLabel : "是",
							inputValue : "1",
							listeners : {
								check : function(checkbox, checked) {

								}
							}
						})]
			});

	var radioGroup7 = new Ext.form.RadioGroup({
				fieldLabel : grooveTranslator.getLangLabel('workflow-language',
						'step-form-submit'), // RadioGroup.fieldLabel 标签与
				// Radio.boxLabel 标签区别
				width : "200",
				items : [new Ext.form.Radio({ // 三个必须项
					id : "isenders0",
					name : "isenders",
					checked : true, // 设置当前为选中状态,仅且一个为选中.
					boxLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'step-form-handsubmit'), // Radio标签
					inputValue : "0", // 提交时传送的参数值
					listeners : {
						check : function(checkbox, checked) { // 选中时,调用的事件

						}
					}
				}), new Ext.form.Radio({ // 以上相同
					id : "isenders1",
					name : "isenders",
					boxLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'step-form-autosubmit'),
					inputValue : "1",
					listeners : {
						check : function(checkbox, checked) {

						}
					}
				})]
			});

	var queryOpinion = new Ext.form.RadioGroup({
				fieldLabel : grooveTranslator.getLangLabel('workflow-language',
						'step-form-queryopinion'), // RadioGroup.fieldLabel 标签与
				// Radio.boxLabel 标签区别
				width : "200",
				items : [new Ext.form.Radio({ // 三个必须项
					id : "iopinionquery0",
					name : "iopinionquery",
					checked : true, // 设置当前为选中状态,仅且一个为选中.
					boxLabel : grooveTranslator.getLangLabel(
							'frequence-language', 'no'), // Radio标签
					inputValue : "0", // 提交时传送的参数值
					listeners : {
						check : function(checkbox, checked) { // 选中时,调用的事件
						}
					}
				}), new Ext.form.Radio({ // 以上相同
					id : "iopinionquery1",
					name : "iopinionquery",
					boxLabel : grooveTranslator.getLangLabel(
							'frequence-language', 'yes'),
					inputValue : "1",
					listeners : {}
				})]
			});

	/*
	 * , new Ext.form.Radio({ // 以上相同 id : "isenders2", name : "isenders",
	 * boxLabel : "任务分配", inputValue : "2", listeners : { check :
	 * function(checkbox, checked) { } } })
	 */

	var chkGroup = new Ext.form.CheckboxGroup({
		fieldLabel : grooveTranslator.getLangLabel('workflow-language',
				'step-form-custom'), // RadioGroup.fieldLabel 标签与
		// Radio.boxLabel 标签区别
		width : "200",
		items : [new Ext.form.Checkbox({ // 三个必须项
			id : "chk3",
			name : "chk3",
			boxLabel : grooveTranslator.getLangLabel('workflow-language',
					'step-form-customopinion'), // Radio标签
			inputValue : "1", // 提交时传送的参数值
			listeners : {
				check : function(checkbox, checked) { // 选中时,调用的事件
					if (checked) {
						form.getForm().findField('iopinion').setValue('1');
						form.getForm().findField('iopinionview').enable();
						form.getForm().findField('iopinionview').isValid();
						// queryOpinion.enable();

					} else {
						form.getForm().findField('iopinion').setValue('0');
						form.getForm().findField('iopinionview').clearInvalid();
						form.getForm().findField('iopinionview').disable();

						// queryOpinion.disable();
					}
				}
			}
		}), new Ext.form.Checkbox({ // 三个必须项
			id : "chk4",
			name : "chk4",
			boxLabel : grooveTranslator.getLangLabel('workflow-language',
					'step-form-customback'), // Radio标签
			inputValue : "4", // 提交时传送的参数值
			listeners : {
				check : function(checkbox, checked) { // 选中时,调用的事件
					if (checked) {
						form.getForm().findField('iback').setValue('1');
						form.getForm().findField('ibackstep').enable();
						form.getForm().findField('ibackstep').isValid();
					} else {
						form.getForm().findField('iback').setValue('0');
						form.getForm().findField('ibackstep').clearInvalid();
						form.getForm().findField('ibackstep').disable();
					}
				}
			}
		}), new Ext.form.Checkbox({ // 三个必须项
			id : "chk0",
			name : "chk0",
			boxLabel : grooveTranslator.getLangLabel('workflow-language',
					'step-form-customred'), // Radio标签
			inputValue : "0", // 提交时传送的参数值
			listeners : {
				check : function(checkbox, checked) { // 选中时,调用的事件
					if (checked) {
						form.getForm().findField('ired').setValue('1');
					} else {
						form.getForm().findField('ired').setValue('0');
					}
				}
			}
		}), new Ext.form.Checkbox({ // 以上相同
			id : "chk1",
			name : "chk1",
			boxLabel : grooveTranslator.getLangLabel('workflow-language',
					'step-form-customstamp'),
			inputValue : "1",
			listeners : {
				check : function(checkbox, checked) {
					if (checked) {
						form.getForm().findField('istamp').setValue('1');
					} else {
						form.getForm().findField('istamp').setValue('0');
					}
				}
			}
		}), new Ext.form.Checkbox({ // 以上相同
			id : "chk2",
			name : "chk2",
			boxLabel : grooveTranslator.getLangLabel('workflow-language',
					'step-form-customprint'),
			inputValue : "2",
			listeners : {
				check : function(checkbox, checked) {
					if (checked) {
						form.getForm().findField('iprint').setValue('1');
					} else {
						form.getForm().findField('iprint').setValue('0');
					}
				}
			}
		})]
	});

	var opinionView = new Ext.form.TextField({
				fieldLabel : grooveTranslator.getLangLabel('workflow-language',
						'step-form-opinionview'),
				name : 'iopinionview',
				allowBlank : false,
				disabled : true
			});

	var backStep = new Ext.form.TextField({
				fieldLabel : grooveTranslator.getLangLabel('workflow-language',
						'step-form-backstep'),
				name : 'ibackstep',
				allowBlank : false,
				disabled : true
			});

	var form = new Ext.FormPanel({
				frame : true,
				title : grooveTranslator.getLangLabel('workflow-language',
						'step-form-title'),
				monitorValid : true,// 把有formBind:true的按钮和验证绑定
				layout : "form",
				labelAlign : "left",
				border : false,
				autoScroll : true,
				labelWidth : 100, // label settings here cascade unless
				// overridden
				frame : false,
				bodyStyle : 'padding:5px 5px 0',
				width : 550,
				defaults : {
					width : 400
				},
				defaultType : 'textfield',
				items : [{
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'step-form-flow'),
					name : 'gname',
					maxLength : 25,
					readOnly : true
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'step-form-object'),
					name : 'oname',
					//maxLength : 25,
					readOnly : true
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'step-form-support'),
					name : 'surportName',
					maxLength : 25,
					readOnly : true
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'step-form-step'),
					name : 'iname',
					maxLength : 50,
					allowBlank : false
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'step-form-trend'),
					name : 'itname',
					maxLength : 25,
					allowBlank : true
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'step-form-key'),
					name : 'ikey',
					maxLength : 25,
					allowBlank : false
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'step-form-desc'),
					xtype : 'textarea',
					id : 'imemo',
					name : 'imemo',
					maxLength : 200,
					height : 40
				}, {
					fieldLabel : grooveTranslator.getLangLabel(
							'workflow-language', 'step-form-type'),
					name : 'itypename',
					readOnly : true
				}, {
					xtype : 'hidden',
					name : 'itype'
				}, {
					xtype : 'hidden',
					name : 'sid'
				}, {
					xtype : 'hidden',
					name : 'itrans'
				}, {
					xtype : 'hidden',
					id : 'irangetype',
					name : 'irangetype',
					value : '1'
				}, {
					xtype : 'hidden',
					id : 'isroleid',
					name : 'isroleid'
				}, {
					xtype : 'hidden',
					id : 'isrolename',
					name : 'isrolename'
				}, {
					xtype : 'hidden',
					id : 'isguid',
					name : 'isguid'
				}, {
					xtype : 'hidden',
					id : 'isguname',
					name : 'isguname'
				}, {
					xtype : 'hidden',
					name : 'iopinion'
				}, {
					xtype : 'hidden',
					name : 'iback'
				}, {
					xtype : 'hidden',
					name : 'ired'
				}, {
					xtype : 'hidden',
					name : 'istamp'
				}, {
					xtype : 'hidden',
					name : 'iprint'
				}]
			});

	form.getForm().load({
		url : context + '/system/flowmanage.do?method=editstep',
		params : {
			id : id
		},
		waitTitle : grooveTranslator.getLangLabel('common-language', 'prompt'),
		waitMsg : grooveTranslator.getLangLabel('common-language',
				'list-loading'),
		animEl : "loding",
		success : function(form1, action) {
			var plug = action.result.data.plug;
			for (var i = 0; i < plug.length; i++) {
				addPlug4Edit(plug[i].tp, plug[i].clzName);
			}

			// start or normal node
			if (action.result.data.itype == '0'
					|| action.result.data.itype == '1') {

				var tableView = action.result.data.tableView

				if (tableView != null) {
					var tvGroupItems = [];

					Ext.each(tableView, function(tv, i) {
								tvGroupItems.push(new Ext.form.Checkbox({ // 三个必须项
									id : 'tvChk' + i,
									name : 'tvChk' + i,
									boxLabel : tv.name, // Radio标签
									inputValue : tv.id, // 提交时传送的参数值
									checked : tv.checked,
									listeners : {
										check : function(checkbox, checked) { // 选中时,调用的事件

										}
									}
								}));
							});

					var tvGroup = new Ext.form.CheckboxGroup({
								id : 'tvGroup',
								fieldLabel : grooveTranslator.getLangLabel(
										'workflow-language', 'step-form-view'), // RadioGroup.fieldLabel
								// 标签与
								// Radio.boxLabel 标签区别
								width : 200,
								columns : 1,
								allowBlank : true,
								items : tvGroupItems
							});

					form.add({
								xtype : 'hidden',
								name : 'istableview'
							});
					form.add(tvGroup);
					form.doLayout();
				}
			}

			if (action.result.data.itype != '-1'
					&& action.result.data.itype != '2') {
				var role = getRoleSelectComboK(grooveTranslator.getLangLabel(
								'workflow-language', 'step-form-role'),
						'isroleid', 'isrolename', null,
						action.result.data.isrolename, true);
				form.add(role);

				var gu = getUCombo(grooveTranslator.getLangLabel(
								'workflow-language', 'step-form-user'),
						'isguid', 'isguname', action.result.data.isguname, true);
				form.add(gu);

				form.add(radioGroup7);

				if (action.result.data.isenders == 0) {
					Ext.getCmp('isenders0').checked = true;
				} else if (action.result.data.isenders == 1) {
					Ext.getCmp('isenders1').checked = true;
				} else if (action.result.data.isenders == 2) {
					Ext.getCmp('isenders2').checked = true;
				}

				form.doLayout();
			}

			if (action.result.data.itype == '1') {
				/*
				 * form.add(getWBComboStore('inner-type', '', 'inner_',
				 * '分支流转环节', 'iinner', action.result.data.innername, '0'));
				 */

				form.add(radioGroup4);
				form.add(radioGroup2);
				// form.add(radioGroup);
				// form.add(radioGroup3);
				// form.add(radioGroup5);
				// form.add(radioGroup6);
				form.add(queryOpinion);
				form.add(chkGroup);

				form.add(backStep);

				backStep.setValue(action.result.data.ibackstep);

				form.add(opinionView);

				opinionView.setValue(action.result.data.iopinionview);

				/*
				 * form.add({ xtype : 'numberfield', fieldLabel : '最少办理人数',
				 * allowBlank : false, allowDecimals : false, // 允许小数点
				 * allowNegative : false, // 允许负数 blankText : '不能为空', disabled :
				 * action.result.data.ipara == 0, name : 'iparavalue', value :
				 * action.result.data.iparavalue, listeners : { blur :
				 * function() { validParaValue(this) } } });
				 */
				if (false && action.result.data.iinner == 0) {
					Ext.getCmp('iinner0').checked = true;
				} else {
					Ext.getCmp('iinner1').checked = true;
				}

				if (false && action.result.data.ipara == 0) {
					Ext.getCmp('ipara0').checked = true;
				} else {
					Ext.getCmp('ipara1').checked = true;
				}

				if (action.result.data.itrans == 0) {
					Ext.getCmp('itrans0').checked = true;
				} else {
					Ext.getCmp('itrans1').checked = true;
				}

				if (action.result.data.iscorr == 0) {
					Ext.getCmp('iscorr0').checked = true;
				} else {
					Ext.getCmp('iscorr1').checked = true;
				}

				if (false && action.result.data.icc == 0) {
					Ext.getCmp('icc0').checked = true;
				} else {
					Ext.getCmp('icc1').checked = true;
				}

				if (action.result.data.ired == 1) {
					Ext.getCmp('chk0').checked = true;
				} else {
					Ext.getCmp('chk0').checked = false;
				}

				if (action.result.data.istamp == 1) {
					Ext.getCmp('chk1').checked = true;
				} else {
					Ext.getCmp('chk1').checked = false;
				}

				if (action.result.data.iprint == 1) {
					Ext.getCmp('chk2').checked = true;
				} else {
					Ext.getCmp('chk2').checked = false;
				}

				if (action.result.data.iopinion == 1) {
					Ext.getCmp('chk3').checked = true;
					opinionView.enable();
					opinionView.isValid();

					// queryOpinion.enable();
				} else {
					Ext.getCmp('chk3').checked = false;
					// queryOpinion.disable();
					opinionView.disable();
				}

				if (action.result.data.iback == 1) {
					Ext.getCmp('chk4').checked = true;
					backStep.enable();
					backStep.isValid();
				} else {
					Ext.getCmp('chk4').checked = false;
					backStep.disable();
				}

				if (action.result.data.iopinionquery == 0) {
					Ext.getCmp('iopinionquery0').checked = true;
				} else {
					Ext.getCmp('iopinionquery1').checked = true;
				}

				if (false && action.result.data.isd == 0) {
					Ext.getCmp('isd0').checked = true;
				} else {
					Ext.getCmp('isd1').checked = true;
				}

				form.doLayout();

				if (action.result.data.iopinion == 1) {
					opinionView.enable();
					opinionView.isValid();
				} else {
					opinionView.disable();
				}

				if (action.result.data.iback == 1) {
					backStep.enable();
					backStep.isValid();
				} else {
					backStep.disable();
				}
			}
		},
		failure : function(form, action) {
			Ext.Msg.alert(grooveTranslator.getLangLabel('common-language',
							'prompt'), grooveTranslator.getLangLabel(
							'common-language', 'load-failure'));
		}
	});

	var win = new Ext.Window({
		id : 'stepEditWin',
		renderTo : Ext.getBody(),
		layout : 'accordion',
		title : grooveTranslator.getLangLabel('workflow-language',
				'step-window-title'),
		width : 550,
		height : 600,
		plain : true,
		modal : true,
		maximizable : false,
		items : [form, p2],

		buttons : [{
			id : 'stepUpdateButton',
			text : grooveTranslator.getLangLabel('common-language', 'submit'),
			handler : function() {
				if (form.getForm().findField("itype").getValue() != '-1'
						&& form.getForm().findField("itrans").getValue() != '1'
						&& form.getForm().findField('isroleid').getValue() == ''
						&& form.getForm().findField('isguid').getValue() == '') {
					Ext.Msg.alert(grooveTranslator.getLangLabel(
									'common-language', 'prompt'),
							grooveTranslator.getLangLabel('workflow-language',
									'step-form-alert'));
				} else if (form.getForm().isValid()) {
					Ext.getCmp('stepUpdateButton').setDisabled(true);
					Ext.MessageBox.wait(grooveTranslator.getLangLabel(
							'common-language', 'submit-loading'));

					if (Ext.getCmp('tvGroup')) {
						var checkboxitems = Ext.getCmp('tvGroup').items;
						if (checkboxitems != null && checkboxitems.length > 0) {
							var ids = '';

							for (var i = 0; i < checkboxitems.length; i++) {
								if (checkboxitems.itemAt(i).checked) {
									ids += checkboxitems.itemAt(i).inputValue
											+ ',';
								}
							}

							form.getForm().findField('istableview')
									.setValue(ids.substring(0, ids.length - 1));
						}
					}

					form.getForm().submit({
						url : context
								+ '/system/flowmanage.do?method=updatestep',
						method : 'POST',
						params : {
							iplugxml : initPlugXML()
						},
						success : function(form, action) {
							Ext.MessageBox.hide();
							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'workflow-language',
											'step-form-success'));
							plugcount = 0;

							if (Ext.getCmp('steplist')) {
								Ext.getCmp('steplist').getStore().reload();
							}

							win.close();
							win = null;
						},
						failure : function(form, action) {
							Ext.MessageBox.hide();
							Ext.getCmp('stepUpdateButton').setDisabled(false);

							Ext.Msg.alert(grooveTranslator.getLangLabel(
											'common-language', 'prompt'),
									grooveTranslator.getLangLabel(
											'workflow-language',
											'step-form-failure'));
						}
					});
				}
			}
		}, {
			text : grooveTranslator.getLangLabel('common-language', 'close'),
			handler : function() {
				win.close();
				win = null;
			}
		}]
	});

	win.show();
}

function validParaValue(thizz) {
	// /alert(thizz.getValue());
}

var plugcount = 0;

/**
 * 添加插件定义
 */
function addPlug() {
	var div = document.createElement('div');
	div.id = 'plugdiv_' + plugcount;
	div.style.cssText = 'padding:5px;';
	div.setAttribute("count", plugcount);

	var selName = 'plugtype_' + plugcount;
	var iptName = 'plugClasName_' + plugcount;

	var typeText = document.createTextNode(grooveTranslator.getLangLabel(
			'workflow-language', 'eventtype'));

	div.appendChild(typeText);

	var sel = document.createElement('select');
	sel.id = selName;
	sel.className = 'x-form-select-one';
	sel.setAttribute('iptName', iptName);
	sel.options[0] = new Option('import', 'import');
	sel.options[1] = new Option('export', 'export');
	sel.options[2] = new Option('intro', 'intro');
	sel.options[3] = new Option('outro', 'outro');
	sel.options[4] = new Option('locked', 'locked');
	sel.options[5] = new Option('linger', 'linger');

	div.appendChild(sel);

	var classText = document.createTextNode(grooveTranslator.getLangLabel(
			'workflow-language', 'eventclass'));

	div.appendChild(classText);

	var ipt = document.createElement('input');
	ipt.type = 'text';
	ipt.title = grooveTranslator.getLangLabel('workflow-language',
			'eventclasstitle');
	ipt.className = 'x-form-text x-form-field';
	ipt.style.cssText = 'width:300px;';
	ipt.id = iptName;
	ipt.value = '';

	div.appendChild(ipt);

	var img = document.createElement('img');
	img.src = context + '/system/workflow/images/delete.png';
	img.style.cssText = 'cursor:hand;padding-left: 5px;';
	img.setAttribute("divid", div.id);
	img.title = grooveTranslator.getLangLabel('common-language', 'delete');
	img.onclick = function() {
		if ($(this.getAttribute('divid'))) {
			$(this.getAttribute('divid')).parentNode.removeChild($(this
					.getAttribute('divid')));
		}
	}
	div.appendChild(img);

	Ext.get('plugarea').dom.appendChild(div);

	plugcount++;
}

/**
 * 编辑插件
 */
function addPlug4Edit(tp, clzName) {
	var div = document.createElement('div');
	div.id = 'plugdiv_' + plugcount;
	div.style.cssText = 'padding:5px;';
	div.setAttribute("count", plugcount);

	var selName = 'plugtype_' + plugcount;
	var iptName = 'plugClasName_' + plugcount;

	var typeText = document.createTextNode(grooveTranslator.getLangLabel(
			'workflow-language', 'eventtype'));

	div.appendChild(typeText);

	var sel = document.createElement('select');
	sel.id = selName;
	sel.className = 'x-form-select-one';
	sel.setAttribute('iptName', iptName);
	sel.options[0] = new Option('import', 'import');
	if (tp == 'import') {
		sel.options[0].selected = true;
	}
	sel.options[1] = new Option('export', 'export');
	if (tp == 'export') {
		sel.options[1].selected = true;
	}
	sel.options[2] = new Option('intro', 'intro');
	if (tp == 'intro') {
		sel.options[2].selected = true;
	}
	sel.options[3] = new Option('outro', 'outro');
	if (tp == 'outro') {
		sel.options[3].selected = true;
	}
	sel.options[4] = new Option('locked', 'locked');
	if (tp == 'locked') {
		sel.options[4].selected = true;
	}
	sel.options[5] = new Option('linger', 'linger');
	if (tp == 'linger') {
		sel.options[5].selected = true;
	}

	div.appendChild(sel);

	var classText = document.createTextNode(grooveTranslator.getLangLabel(
			'workflow-language', 'eventclass'));

	div.appendChild(classText);

	var ipt = document.createElement('input');
	ipt.type = 'text';
	ipt.title = grooveTranslator.getLangLabel('workflow-language',
			'eventclasstitle');
	ipt.className = 'x-form-text x-form-field';
	ipt.style.cssText = 'width:300px;';
	ipt.id = iptName;
	ipt.value = clzName;

	div.appendChild(ipt);

	var img = document.createElement('img');
	img.src = context + '/system/workflow/images/delete.png';
	img.style.cssText = 'cursor:hand;padding-left: 5px;';
	img.setAttribute("divid", div.id);
	img.title = grooveTranslator.getLangLabel('common-language', 'delete');
	img.onclick = function() {
		if ($(this.getAttribute('divid'))) {
			$(this.getAttribute('divid')).parentNode.removeChild($(this
					.getAttribute('divid')));
		}
	}
	div.appendChild(img);

	Ext.get('plugarea').dom.appendChild(div);

	plugcount++;
}

var plugxml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><plugs>";

/**
 * 初始化插件xml脚本
 * 
 * @return {}
 */
function initPlugXML() {
	var str = plugxml;

	for (var i = 0; i < $("plugarea").childNodes.length; i++) {
		if ($("plugarea").childNodes[i].nodeName == "DIV") {
			var idx = $("plugarea").childNodes[i].getAttribute("count");
			str += "<plug type=\"" + Ext.get("plugtype_" + idx).dom.value
					+ "\" className=\""
					+ Ext.get("plugClasName_" + idx).dom.value + "\"/>";
		}
	}

	str += "</plugs>";

	return str;
}

function setRange() {
	var win = new Ext.Window({
				id : 'stepRangeWin',
				renderTo : Ext.getBody(),
				layout : 'fit',
				title : grooveTranslator.getLangLabel('workflow-language',
						'rangetitle'),
				width : 500,
				height : 400,
				plain : true,
				modal : true,
				maximizable : false,
				items : [],

				buttons : [{
					id : 'stepRangeUpdateButton',
					text : grooveTranslator.getLangLabel('common-language',
							'submit'),
					handler : function() {

					}
				}, {
					text : grooveTranslator.getLangLabel('common-language',
							'close'),
					handler : function() {
						win.close();
						win = null;
					}
				}]
			});

	win.show();
}