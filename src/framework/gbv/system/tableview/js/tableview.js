document.write('<script type="text/javascript" src="' + context
		+ '/system/tablequery/js/querylist4query.js"></script>');

document.write('<script type="text/javascript" src="' + context
		+ '/resources/ext3/ux/fileuploadfield/FileUploadField.js"></script>');

document.write('<link rel="stylesheet" type="text/css" href="' + context
		+ '/resources/ext3/ux/fileuploadfield/css/fileuploadfield.css"/>');

document.write('<link rel="stylesheet" type="text/css" href="' + context
		+ '/system/tableview/css/fileuploadfield.css"/>');

/**
 * 
 * @param {}
 *            queyrKey_
 * @return {Boolean}
 */
function newTableView(param) {
	this.initTableView = function(id, displaymode) {
		if (displaymode == null || displaymode == 'window') {
			Ext.MessageBox.wait('正在初始化视图页面...');
			Ext.Ajax.request({
				// 请求地址
				url : context + "/system/tableview.do?method=init",
				params : {
					id : id
				},
				// 成功时回调
				success : function(response, options) {
					// 获取响应的json字符串
					Ext.MessageBox.hide();

					var json = response.responseText;

					var o = Ext.util.JSON.decode(json);

					if (o.success) {
						var form = getTableViewForm(o.component, param);

						var width = 500;
						var height = 400;
						try {
							var viewSize = Ext.util.JSON.decode(o.size);
							width = (viewSize.width == null
									? 500
									: viewSize.width);
							height = (viewSize.height == null
									? 400
									: viewSize.height);
						} catch (error) {
							alert('视图尺寸设置有误,尺寸设置格式必须为json,形如{width:500, height:400}');
							return;
						}

						var viewWin = new Ext.Window({
							renderTo : Ext.getBody(),
							id : 'tableview_' + id,
							layout : 'fit',
							width : width,
							height : height,
							title : o.name,
							plain : true,
							modal : true,

							items : [form],

							buttons : [{
								text : '提 交',
								handler : function() {
									saveTable4Ext(o.primaryTable, 'single',
											'-1', function(params) {
												return tableViewCheckFunc(form);
											}, function() {
												viewWin.close();
												viewWin = null;
											}, form, null, o.listener);
								}
							}, {
								text : '关 闭',
								handler : function() {
									viewWin.close();
									viewWin = null;
								}
							}]
						});

						viewWin.show(this);
					} else {
						if (o.errCode == '-1') {
							Ext.Msg.alert('提示', '视图未定义,无法初始化！');
						} else if (o.errCode == '-2') {
							Ext.Msg.alert('提示', '权限不足,无法初始化！');
						}
					}
				},
				failure : function(response, options) {
					Ext.MessageBox.show({
								title : '错误提示',
								msg : response.responseText,
								icon : Ext.MessageBox.ERROR
							});
				}
			});
		} else if (displaymode == 'location') {
			document.location = context + '/system/tableview/initview.jsp?id='
					+ id;
		}
	}
}

/**
 * 
 * @param {}
 *            queyrKey_
 * @return {Boolean}
 */
function newTableView4QueryList(queyrKey_) {
	if (queyrKey_ == null) {
		alert('此构造函数是为通用查询列表设计的,需要传递通用查询唯一标识key');
		return false;
	}

	// var pwdItems = [];

	this.initTableView = function(id, displaymode) {
		var queryListUrl = Ext.getCmp(queyrKey_).getStore().proxy.url;

		var param = urlToParam(queryListUrl);

		if (displaymode == null || displaymode == 'window') {
			Ext.MessageBox.wait('正在初始化视图页面...');
			Ext.Ajax.request({
				// 请求地址
				url : context + "/system/tableview.do?method=init",
				params : {
					id : id
				},
				// 成功时回调
				success : function(response, options) {
					// 获取响应的json字符串
					Ext.MessageBox.hide();

					var json = response.responseText;

					var o = Ext.util.JSON.decode(json);

					if (o.success) {
						var form = getTableViewForm(o.component, param);

						var width = 500;
						var height = 400;
						try {
							var viewSize = Ext.util.JSON.decode(o.size);
							width = (viewSize.width == null
									? 500
									: viewSize.width);
							height = (viewSize.height == null
									? 400
									: viewSize.height);
						} catch (error) {
							alert('视图尺寸设置有误,尺寸设置格式必须为json,形如{width:500, height:400}');
							return;
						}

						var viewWin = new Ext.Window({
							renderTo : Ext.getBody(),
							id : 'tableview_' + id,
							layout : 'fit',
							width : width,
							height : height,
							title : o.name,
							plain : true,
							modal : true,

							items : [form],

							buttons : [{
								text : '提 交',
								handler : function() {
									saveTable4Ext(o.primaryTable, 'single',
											'-1', function(params) {
												return tableViewCheckFunc(form);
											}, function() {
												reloadTQList(queyrKey_);

												viewWin.close();
												viewWin = null;
											}, form, null, o.listener);
								}
							}, {
								text : '关 闭',
								handler : function() {
									viewWin.close();
									viewWin = null;
								}
							}]
						});

						viewWin.show(this);
					} else {
						if (o.errCode == '-1') {
							Ext.Msg.alert('提示', '视图未定义,无法初始化！');
						} else if (o.errCode == '-2') {
							Ext.Msg.alert('提示', '权限不足,无法初始化！');
						}
					}
				},
				failure : function(response, options) {
					Ext.MessageBox.show({
								title : '错误提示',
								msg : response.responseText,
								icon : Ext.MessageBox.ERROR
							});
				}
			});
		} else if (displaymode == 'location') {
			document.location = context + '/system/tableview/initview.jsp?id='
					+ id;
		}
	}
}

/**
 * 
 * @return {Boolean}
 */
function editTableView() {
	this.initTableView = function(id, pkId, displaymode) {
		if (displaymode == null || displaymode == 'window') {
			Ext.Ajax.request({
				// 请求地址
				url : context + "/system/tableview.do?method=init",
				params : {
					id : id
				},
				// 成功时回调
				success : function(response, options) {
					// 获取响应的json字符串
					Ext.MessageBox.hide();

					var json = response.responseText;

					var o = Ext.util.JSON.decode(json);

					if (o.success) {
						initTable(o.primaryTable, pkId, null, function(tvo) {
							var form = getTableViewEditForm(o.component,
									tvo.data);

							var width = 500;
							var height = 400;
							try {
								var viewSize = Ext.util.JSON.decode(o.size);
								width = (viewSize.width == null
										? 500
										: viewSize.width);
								height = (viewSize.height == null
										? 400
										: viewSize.height);
							} catch (error) {
								alert('视图尺寸设置有误,尺寸设置格式必须为json,形如{width:500, height:400}');
								return;
							}

							var viewWin = new Ext.Window({
								renderTo : Ext.getBody(),
								id : 'tableview_' + id,
								layout : 'fit',
								width : width,
								height : height,
								title : o.name,
								plain : true,
								modal : true,

								items : [form],

								buttons : [{
									text : '提 交',
									handler : function() {
										updateTable4Ext(o.primaryTable,
												'single', '-1',
												function(params) {
													if (tableViewCheckFunc(form)) {
														params[o.primaryTableColumn] = pkId;
														return true;
													}
													return false;
												}, function() {
													viewWin.close();
													viewWin = null;
												}, form, null, o.listener);
									}
								}, {
									text : '关 闭',
									handler : function() {
										viewWin.close();
										viewWin = null;
									}
								}]
							});

							viewWin.show(this);

						});
					} else {
						if (o.errCode == '-1') {
							Ext.Msg.alert('提示', '视图未定义,无法初始化！');
						} else if (o.errCode == '-2') {
							Ext.Msg.alert('提示', '权限不足,无法初始化！');
						}
					}
				},
				failure : function(response, options) {
					Ext.MessageBox.show({
								title : '错误提示',
								msg : response.responseText,
								icon : Ext.MessageBox.ERROR
							});
				}
			});
		} else if (displaymode == 'location') {
			document.location = context + '/system/tableview/initview.jsp?id='
					+ id;
		}
	}
}

/**
 * 
 * @param {}
 *            queyrKey_
 * @return {Boolean}
 */
function editTableView4QueryList(queyrKey_) {
	if (queyrKey_ == null) {
		alert('此构造函数是为通用查询列表设计的,需要传递通用查询唯一标识key');
		return false;
	}

	this.initTableView = function(id, pkId, displaymode) {
		if (displaymode == null || displaymode == 'window') {
			Ext.Ajax.request({
				// 请求地址
				url : context + "/system/tableview.do?method=init",
				params : {
					id : id
				},
				// 成功时回调
				success : function(response, options) {
					// 获取响应的json字符串
					Ext.MessageBox.hide();

					var json = response.responseText;

					var o = Ext.util.JSON.decode(json);

					if (o.success) {
						initTable(o.primaryTable, pkId, null, function(tvo) {
							var form = getTableViewEditForm(o.component,
									tvo.data);

							var width = 500;
							var height = 400;
							try {
								var viewSize = Ext.util.JSON.decode(o.size);
								width = (viewSize.width == null
										? 500
										: viewSize.width);
								height = (viewSize.height == null
										? 400
										: viewSize.height);
							} catch (error) {
								alert('视图尺寸设置有误,尺寸设置格式必须为json,形如{width:500, height:400}');
								return;
							}

							var viewWin = new Ext.Window({
								renderTo : Ext.getBody(),
								id : 'tableview_' + id,
								layout : 'fit',
								width : width,
								height : height,
								title : o.name,
								plain : true,
								modal : true,

								items : [form],

								buttons : [{
									text : '提 交',
									handler : function() {
										updateTable4Ext(o.primaryTable,
												'single', '-1',
												function(params) {
													if (tableViewCheckFunc(form)) {
														params[o.primaryTableColumn] = pkId;
														return true;
													}
													return false;
												}, function() {
													reloadTQList(queyrKey_);

													viewWin.close();
													viewWin = null;
												}, form, null, o.listener);
									}
								}, {
									text : '关 闭',
									handler : function() {
										viewWin.close();
										viewWin = null;
									}
								}]
							});

							viewWin.show(this);

						});
					} else {
						if (o.errCode == '-1') {
							Ext.Msg.alert('提示', '视图未定义,无法初始化！');
						} else if (o.errCode == '-2') {
							Ext.Msg.alert('提示', '权限不足,无法初始化！');
						}
					}
				},
				failure : function(response, options) {
					Ext.MessageBox.show({
								title : '错误提示',
								msg : response.responseText,
								icon : Ext.MessageBox.ERROR
							});
				}
			});
		} else if (displaymode == 'location') {
			document.location = context + '/system/tableview/initview.jsp?id='
					+ id;
		}
	}
}

/**
 * 预览视图
 * 
 * @param {}
 *            queyrKey_
 * @return {Boolean}
 */
function viewTableView4QueryList(queyrKey_) {
	if (queyrKey_ == null) {
		alert('此构造函数是为通用查询列表设计的,需要传递通用查询唯一标识key');
		return false;
	}

	this.initTableView = function(id, pkId, displaymode) {
		if (displaymode == null || displaymode == 'window') {
			Ext.Ajax.request({
				// 请求地址
				url : context + "/system/tableview.do?method=init",
				params : {
					id : id
				},
				// 成功时回调
				success : function(response, options) {
					// 获取响应的json字符串
					Ext.MessageBox.hide();

					var json = response.responseText;

					var o = Ext.util.JSON.decode(json);

					if (o.success) {
						initTable(o.primaryTable, pkId, null, function(tvo) {
							var form = getTableViewViewForm(o.component,
									tvo.data);

							var width = 500;
							var height = 400;
							try {
								var viewSize = Ext.util.JSON.decode(o.size);
								width = (viewSize.width == null
										? 500
										: viewSize.width);
								height = (viewSize.height == null
										? 400
										: viewSize.height);
							} catch (error) {
								alert('视图尺寸设置有误,尺寸设置格式必须为json,形如{width:500, height:400}');
								return;
							}

							var viewWin = new Ext.Window({
										renderTo : Ext.getBody(),
										id : 'tableview_' + id,
										layout : 'fit',
										width : width,
										height : height,
										title : o.name,
										plain : true,
										modal : true,

										items : [form],

										buttons : [{
													text : '关 闭',
													handler : function() {
														viewWin.close();
														viewWin = null;
													}
												}]
									});

							viewWin.show(this);

						});
					} else {
						if (o.errCode == '-1') {
							Ext.Msg.alert('提示', '视图未定义,无法初始化！');
						} else if (o.errCode == '-2') {
							Ext.Msg.alert('提示', '权限不足,无法初始化！');
						}
					}
				},
				failure : function(response, options) {
					Ext.MessageBox.show({
								title : '错误提示',
								msg : response.responseText,
								icon : Ext.MessageBox.ERROR
							});
				}
			});
		} else if (displaymode == 'location') {
			document.location = context + '/system/tableview/initview.jsp?id='
					+ id;
		}
	}
}

/**
 * 初始化表单form
 * 
 * @param {}
 *            size
 * @param {}
 *            componentItems
 * @return {}
 */
function getTableViewForm(componentItems, urlparam) {
	var items = [];

	var pwdItems = [];

	var fileUpload = false;

	Ext.each(componentItems, function(item) {
		var needValue = (item.need == '1');
		var o = item.param;

		if (item.type == 'input') {

			/*
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('input类型的视图组件<' +
			 * item.name + '>的参数格式必须为json,形如{allowBlank:false, readOnly:true}');
			 * return; }
			 */

			var it = new Ext.form.TextField({
						fieldLabel : item.label,
						id : item.id,
						name : item.formName,
						allowBlank : (o.allowBlank == null || o.allowBlank),
						readOnly : o.readOnly,
						value : getDefaultValue(item.defaultValue, urlparam)
					});
			items.push(it);
		} else if (item.type == 'number') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('number类型的视图组件<' +
			 * item.name +
			 * '>的参数格式必须为json,形如{allowBlank:false,allowDecimals:true,allowNegative:false}'); }
			 */

			var it = new Ext.form.NumberField({
						fieldLabel : item.label,
						id : item.id,
						name : item.formName,
						allowBlank : (o.allowBlank == null || o.allowBlank),
						readOnly : o.readOnly,
						allowDecimals : o.allowDecimals, // 允许小数点
						allowNegative : (o.allowNegative == null || o.allowNegative), // 允许负数
						value : getDefaultValue(item.defaultValue, urlparam)
					});
			items.push(it);
		} else if (item.type == 'htmleditor') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('htmleditor类型的视图组件<' +
			 * item.name + '>的参数格式必须为json,形如{enableAlignments:false,
			 * readOnly:true}'); }
			 */

			var it = new Ext.form.HtmlEditor({
						fieldLabel : item.label,
						enableAlignments : (o.enableAlignments == true),
						enableColors : (o.enableColors == true),
						enableFont : (o.enableFont == true),
						enableFontSize : (o.enableFontSize == true),
						enableLinks : (o.enableLinks == true),
						enableFormat : (o.enableFormat == true),
						enableLists : (o.enableLists == true),
						enableSourceEdit : (o.enableSourceEdit == true),
						id : item.id,
						name : item.formName,
						allowBlank : (o.allowBlank == null || o.allowBlank),
						readOnly : o.readOnly,
						value : item.defaultValue
					});
			items.push(it);
		} else if (item.type == 'file') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('file类型的视图组件<' + item.name +
			 * '>的参数格式必须为json,形如{fileType:\'\'}'); }
			 */
			fileUpload = true;
			var it = {
				xtype : 'fileuploadfield',
				id : item.id,
				name : item.name,
				fieldLabel : item.label,
				buttonText : '',
				buttonCfg : {
					iconCls : 'upload-icon'
				}
			};

			items.push(it);
		} else if (item.type == 'textarea') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('textarea类型的视图组件<' +
			 * item.name + '>的参数格式必须为json,形如{allowBlank:false, readOnly:true}'); }
			 */

			var it = new Ext.form.TextArea({
						fieldLabel : item.label,
						id : item.id,
						name : item.formName,
						allowBlank : (o.allowBlank == null || o.allowBlank),
						readOnly : o.readOnly,
						value : getDefaultValue(item.defaultValue, urlparam)
					});
			items.push(it);
		} else if (item.type == 'password') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('password类型的视图组件<' +
			 * item.name + '>的参数格式必须为json,形如{allowBlank:false, readOnly:true,
			 * confirmTo:\'\'}'); }
			 * 
			 * if (o.confirmTo != null && Ext.getCmp(o.confirmTo) == null) {
			 * alert('密码确认对象为空,将无法完成密码确认校验'); }
			 */

			var it;

			if (o.confirmTo != null && Ext.getCmp(o.confirmTo) != null) {
				it = new Ext.form.TextField({
							fieldLabel : item.label,
							id : item.id,
							name : item.formName,
							inputType : 'password',
							allowBlank : (o.allowBlank == null || o.allowBlank),
							readOnly : o.readOnly,
							confirmTo : o.confirmTo,
							value : item.defaultValue
						});

				pwdItems.push(it);
			} else {
				it = new Ext.form.TextField({
							fieldLabel : item.label,
							id : item.id,
							name : item.formName,
							inputType : 'password',
							allowBlank : (o.allowBlank == null || o.allowBlank),
							readOnly : o.readOnly,
							value : item.defaultValue
						});
			}

			items.push(it);
		} else if (item.type == 'hidden') {
			var it = {
				xtype : 'hidden',
				name : item.formName,
				id : item.id,
				value : getDefaultValue(item.defaultValue, urlparam)
			};
			items.push(it);
		} else if (item.type == 'date') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('date类型的视图组件<' + item.name +
			 * '>的参数格式必须为json,形如{allowBlank:false}'); }
			 */
			var it = new Ext.form.DateField({
						fieldLabel : item.label,
						id : item.id + '_',
						name : item.formName + '_',
						format : 'Y-m-d',
						allowBlank : (o.allowBlank == null || o.allowBlank),
						value : getDefaultValue(item.defaultValue, urlparam),
						listeners : {
							select : function(m, d) {
								Ext.getCmp(item.id)
										.setValue(parseDate(m.value));
							}
						}
					});

			items.push(it);

			var it1 = {
				xtype : 'hidden',
				name : item.formName,
				id : item.id,
				value : ''
			};
			items.push(it1);
		} else if (item.type == 'radio') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('radio类型的视图组件<' +
			 * item.name +
			 * '>的参数格式必须为json,形如{items:[{label:\'工作日\',value:\'0\'},{label:\'非工作日\',value:\'-1\'}]}');
			 * return; }
			 */

			var radioGroup = new Ext.form.RadioGroup({
						id : item.id,
						fieldLabel : item.label,
						items : []
					});

			var radioIndex = 0;

			Ext.each(o.items, function(radioItem) {
						var it = new Ext.form.Radio({ // 以上相同
							id : item.id + radioIndex,
							boxLabel : radioItem.label,
							name : item.formName,
							inputValue : radioItem.value,
							checked : radioItem.checked
									? radioItem.checked
									: '',
							listeners : {
								check : function(checkbox, checked) {
									if (checked) {

									}
								}
							}
						});

						radioGroup.items.push(it);

						radioIndex++;
					})

			items.push(radioGroup);
		} else if (item.type == 'select') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON.decode(item.param); } catch (error) {
			 * alert('select类型的视图组件<' + item.name +
			 * '>的参数格式必须为json,形如{type:\'rating\',target:\'userId\'}'); }
			 */

			var targetItem = findComponentItems(componentItems, o.target);

			if (targetItem == null) {
				alert('select类型的视图组件<' + item.name + '>的目标组件<id=' + o.target
						+ '>并不存在,会影响数据的完整性');
			}

			var item = [
					getWBComboStore(o.type, '', item.id + '_', item.label,
							item.id, targetItem.id, '',
							(o.allowBlank == null || o.allowBlank)), {
						xtype : 'hidden',
						name : item.formName,
						id : item.id,
						value : ''
					}, {
						xtype : 'hidden',
						name : targetItem.formName,
						id : targetItem.id,
						value : ''
					}];

			items.push(item);
		} else if (item.type == 'guselect' || item.type == 'gselect'
				|| item.type == 'uselect' || item.type == 'guselect1'
				|| item.type == 'gselect1' || item.type == 'uselect1'
				|| item.type == 'roleselect' || item.type == 'roleselect1') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON.decode(item.param); } catch (error) {
			 * alert('guselect或者roleselect类型的视图组件<' + item.name +
			 * '>的参数格式必须为json,形如{root:\'0001\',targetName:\'userName\',targetType:\'userType\'}'); }
			 */

			var targetNameItem = findComponentItems(componentItems,
					o.targetName);

			if (targetNameItem == null) {
				alert('guselect或者roleselect类型的视图组件<' + item.name + '>的目标组件<id='
						+ o.targetName + '>并不存在,会影响数据的完整性');
			}

			var targetTypeItem = findComponentItems(componentItems,
					o.targetType);

			if (targetTypeItem == null) {
				alert('guselect或者roleselect类型的视图组件<' + item.name + '>的目标组件<id='
						+ o.targetType + '>并不存在,会影响数据的完整性');
			}

			var gucombox;

			if (item.type == 'guselect') {
				gucombox = getGroupUserChkCombo4Single(item.id,
						targetNameItem.id, targetTypeItem.id, o.root,
						(o.allowBlank == null || o.allowBlank));
			} else if (item.type == 'gselect') {
				gucombox = getGroupSelectCombo4Single(item.id,
						targetNameItem.id, targetTypeItem.id, o.root,
						(o.allowBlank == null || o.allowBlank));
			} else if (item.type == 'uselect') {
				gucombox = getUserChkCombo4Single(item.id, targetNameItem.id,
						targetTypeItem.id, o.root,
						(o.allowBlank == null || o.allowBlank));
			} else if (item.type == 'guselect1') {
				gucombox = getGroupUserChkCombo(item.id, targetNameItem.id,
						targetTypeItem.id, o.root,
						(o.allowBlank == null || o.allowBlank));
			} else if (item.type == 'gselect1') {
				gucombox = getGroupSelectCombo(item.id, targetNameItem.id,
						targetTypeItem.id, o.root,
						(o.allowBlank == null || o.allowBlank));
			} else if (item.type == 'uselect1') {
				gucombox = getUserChkCombo(item.id, targetNameItem.id,
						targetTypeItem.id, o.root,
						(o.allowBlank == null || o.allowBlank));
			} else if (item.type == 'roleselect') {
				gucombox = getRoleSingleSelectCombo(itemid, itemid + '_name',
						itemid + '_type', '',
						(o.allowBlank == null || o.allowBlank));
			} else if (item.type == 'roleselect1') {
				gucombox = getRoleSelectCombo(itemid, itemid + '_name', itemid
								+ '_type', '',
						(o.allowBlank == null || o.allowBlank));
			}

			var guitem = [gucombox, new Ext.form.Hidden({
								id : item.id,
								name : item.formName,
								value : ''
							}), new Ext.form.Hidden({
								id : targetNameItem.id,
								name : targetNameItem.formName,
								value : ''
							}), new Ext.form.Hidden({
								id : targetTypeItem.id,
								name : targetTypeItem.formName,
								value : ''
							})]

			Ext.getCmp(item.id + '_').fieldLabel = item.label;

			items.push(guitem);
		} else if (item.type == 'dataindex') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON.decode(item.param); } catch (error) {
			 * alert('dataindex类型的视图组件<' + item.name +
			 * '>的参数格式必须为json,形如{type:\'PC\',targetName:\'dataindexName\',returnFunc:\'selectDataindex\'
			 * }'); }
			 */

			var targetNameItem = findComponentItems(componentItems,
					o.targetName);

			if (targetNameItem == null) {
				alert('dataindex类型的视图组件类型的视图组件<' + item.name + '>的目标组件<id='
						+ o.targetName + '>并不存在,会影响数据的完整性');
			}

			var dditem = [
					getDataindexCombo(item.id, targetNameItem.id, null, o.type,
							(o.allowBlank == null || o.allowBlank),
							eval(o.returnFunc)), new Ext.form.Hidden({
								id : item.id,
								name : item.formName,
								value : ''
							}), new Ext.form.Hidden({
								id : targetNameItem.id,
								name : targetNameItem.formName,
								value : ''
							})]
			Ext.getCmp(item.id + '_').fieldLabel = item.label;

			items.push(dditem);
		} else if (item.type == 'tablequery') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('tablequery类型的视图组件<' +
			 * item.name + '>的参数格式必须为json,形如{queryKey:\'test\',
			 * targetIdItem:\'\', targetItem:\'\', pointId:\'\',
			 * pointName:\'\'}'); }
			 */

			var targetItem = findComponentItems(componentItems, o.targetItem);

			if (targetItem == null) {
				alert('tablequery类型的视图组件<' + item.name + '>的目标组件<id='
						+ o.targetItem + '>并不存在,会影响数据的完整性');
			}

			if (o.pointId == null || o.pointName == null) {
				alert('tablequery类型的视图组件<' + item.name
						+ '>的返回值pointId或pointName定义不完整,会影响返回值');
			}

			var tqitem = [
					getTableQueryCombo(o.queryKey, null, function(node) {
								Ext.getCmp(item.id).setValue(node
										.get(o.pointId));
								Ext.getCmp(targetItem.id).setValue(node
										.get(o.pointName));
							}, item.id, o.pointId, o.pointName,
							(o.allowBlank == null || o.allowBlank)),
					new Ext.form.Hidden({
								id : item.id,
								name : item.formName,
								value : ''
							}), new Ext.form.Hidden({
								id : targetItem.id,
								name : targetItem.formName,
								value : ''
							})]
			Ext.getCmp(item.id + '_').fieldLabel = item.label;

			items.push(tqitem);
		}

	});

	var viewForm = new Ext.FormPanel({
				labelWidth : 150, // label settings here
				// cascade unless
				// overridden
				fileUpload : fileUpload,
				frame : false,
				bodyStyle : 'padding:5px 5px 0',
				defaults : {
					width : 230
				},
				defaultType : 'textfield',
				items : items,
				pwdItems : pwdItems
			});

	return viewForm;
}

/**
 * 初始化表单form 参数
 * 
 * @param {}
 *            componentItems
 * @param {}
 *            data
 * @return {}
 */
function getTableViewEditForm(componentItems, data) {
	var items = [];
	var pwdItems = [];
	var paramString = '';

	var fileUpload = false;

	Ext.each(componentItems, function(item, idx) {
		var o = item.param;

		if (item.type == 'input') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('input类型的视图组件<' +
			 * item.name + '>的参数格式必须为json,形如{allowBlank:false, readOnly:true}'); }
			 */
			var it = new Ext.form.TextField({
						fieldLabel : item.label,
						id : item.id,
						name : item.formName,
						allowBlank : (o.allowBlank == null || o.allowBlank),
						readOnly : o.readOnly,
						value : data[item.name]
					});
			items.push(it);

		} else if (item.type == 'number') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('number类型的视图组件<' +
			 * item.name +
			 * '>的参数格式必须为json,形如{allowBlank:false,allowDecimals:true,allowNegative:false}'); }
			 */

			var it = new Ext.form.NumberField({
						fieldLabel : item.label,
						id : item.id,
						name : item.formName,
						allowBlank : (o.allowBlank == null || o.allowBlank),
						readOnly : o.readOnly,
						allowDecimals : o.allowDecimals, // 允许小数点
						allowNegative : (o.allowNegative == null || o.allowNegative), // 允许负数
						value : data[item.name]
					});
			items.push(it);
		} else if (item.type == 'file') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('file类型的视图组件<' + item.name +
			 * '>的参数格式必须为json,形如{fileType:\'\'}'); }
			 */

			/*
			 * var it = { xtype : 'fileuploadfield', id : item.id, name :
			 * item.name, fieldLabel : item.label, buttonText : '', buttonCfg : {
			 * iconCls : 'upload-icon' } };
			 */

			var annexs = data[item.name];

			if (annexs && annexs.length > 0) {
				inithelper();

				var it = new Ext.form.DisplayField({
					id : item.id,
					name : item.formName,
					fieldLabel : item.label,
					value : '<a href="javascript:void(0);" title="查阅附件" onclick="javascript:viewAnnex(\''
							+ annexs[0].id
							+ '\');">'
							+ annexs[0].name
							+ '</a>&nbsp;<a href="javascript:void(0);" title="删除附件" onclick="javascript:deleteAnnex(\''
							+ annexs[0].id
							+ '\', function(){renderAnnexDelete(\''
							+ item.id
							+ '\','
							+ idx
							+ ','
							+ componentItems.length
							+ ');});">删除</a>'

				});

				items.push(it);
			} else {
				var it = {
					xtype : 'fileuploadfield',
					id : item.id,
					name : item.name,
					fieldLabel : item.label,
					buttonText : '',
					buttonCfg : {
						iconCls : 'upload-icon'
					}
				};

				items.push(it);

				fileUpload = true;
			}
		} else if (item.type == 'htmleditor') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('htmleditor类型的视图组件<' +
			 * item.name + '>的参数格式必须为json,形如{enableAlignments:false,
			 * readOnly:true}'); }
			 */

			var it = new Ext.form.HtmlEditor({
						fieldLabel : item.label,
						enableAlignments : (o.enableAlignments == true),
						enableColors : (o.enableColors == true),
						enableFont : (o.enableFont == true),
						enableFontSize : (o.enableFontSize == true),
						enableLinks : (o.enableLinks == true),
						enableFormat : (o.enableFormat == true),
						enableLists : (o.enableLists == true),
						enableSourceEdit : (o.enableSourceEdit == true),
						id : item.id,
						name : item.formName,
						allowBlank : (o.allowBlank == null || o.allowBlank),
						readOnly : o.readOnly,
						value : data[item.name]
					});
			items.push(it);
		} else if (item.type == 'textarea') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('textarea类型的视图组件<' +
			 * item.name + '>的参数格式必须为json,形如{allowBlank:false, readOnly:true}'); }
			 */

			var it = new Ext.form.TextArea({
						fieldLabel : item.label,
						id : item.id,
						name : item.formName,
						allowBlank : (o.allowBlank == null || o.allowBlank),
						readOnly : o.readOnly,
						value : data[item.name]
					});
			items.push(it);

		} else if (item.type == 'password') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('password类型的视图组件<' +
			 * item.name + '>的参数格式必须为json,形如{allowBlank:false, readOnly:true,
			 * confirmTo:\'\'}'); }
			 */

			if (o.confirmTo != null && Ext.getCmp(o.confirmTo) == null) {
				alert('密码确认对象为空,将无法完成密码确认校验');
			}

			var it;

			if (o.confirmTo != null && Ext.getCmp(o.confirmTo) != null) {
				it = new Ext.form.TextField({
							fieldLabel : item.label,
							id : item.id,
							name : item.formName,
							inputType : 'password',
							allowBlank : (o.allowBlank == null || o.allowBlank),
							readOnly : o.readOnly,
							confirmTo : o.confirmTo,
							value : data[item.name]
						});

				pwdItems.push(it);
			} else {
				it = new Ext.form.TextField({
							fieldLabel : item.label,
							id : item.id,
							name : item.formName,
							inputType : 'password',
							allowBlank : (o.allowBlank == null || o.allowBlank),
							readOnly : o.readOnly,
							value : data[item.name]
						});
			}

			items.push(it);
		} else if (item.type == 'hidden') {
			var it = {
				xtype : 'hidden',
				name : item.formName,
				id : item.id,
				value : data[item.name]
			};
			items.push(it);
		} else if (item.type == 'date') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('date类型的视图组件<' + item.name +
			 * '>的参数格式必须为json,形如{allowBlank:false}'); }
			 */
			var it = new Ext.form.DateField({
						fieldLabel : item.label,
						id : item.id + '_',
						name : item.formName + '_',
						format : 'Y-m-d',
						allowBlank : (o.allowBlank == null || o.allowBlank),
						value : formatDate(data[item.name]),
						listeners : {
							select : function(m, d) {
								Ext.getCmp(item.id)
										.setValue(parseDate(m.value));
							}
						}
					});

			items.push(it);

			var it1 = {
				xtype : 'hidden',
				name : item.formName,
				id : item.id,
				value : data[item.name]
			};
			items.push(it1);
		} else if (item.type == 'radio') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('radio类型的视图组件<' +
			 * item.name +
			 * '>的参数格式必须为json,形如{items:[{label:\'工作日\',value:\'0\'},{label:\'非工作日\',value:\'-1\'}]}');
			 * return; }
			 */

			var radioGroup = new Ext.form.RadioGroup({
						id : item.id,
						fieldLabel : item.label,
						items : []
					});

			var radioIndex = 0;

			Ext.each(o.items, function(radioItem) {
						var it = new Ext.form.Radio({ // 以上相同
							id : item.id + radioIndex,
							boxLabel : radioItem.label,
							name : item.formName,
							inputValue : radioItem.value,
							checked : (data[item.name] == radioItem.value
									? 'checked'
									: ''),
							listeners : {
								check : function(checkbox, checked) {
									if (checked) {

									}
								}
							}
						});

						radioGroup.items.push(it);

						radioIndex++;
					})

			items.push(radioGroup);
		} else if (item.type == 'select') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON.decode(item.param); } catch (error) {
			 * alert('select类型的视图组件<' + item.name +
			 * '>的参数格式必须为json,形如{type:\'rating\',target:\'userId\'}'); }
			 */

			var targetItem = findComponentItems(componentItems, o.target);

			if (targetItem == null) {
				alert('select类型的视图组件<' + item.name + '>的目标组件<id=' + o.target
						+ '>并不存在,会影响数据的完整性');
			}

			var selectItem = [
					getWBComboStore(o.type, data[item.name], item.id + '_',
							item.label, item.id, targetItem.id, '',
							(o.allowBlank == null || o.allowBlank)), {
						xtype : 'hidden',
						name : item.formName,
						id : item.id,
						value : data[item.name]
					}, {
						xtype : 'hidden',
						name : targetItem.formName,
						id : targetItem.id,
						value : data[targetItem.name]
					}];

			items.push(selectItem);

			paramString += '&' + item.id + '_=' + data[targetItem.name];
		} else if (item.type == 'guselect' || item.type == 'gselect'
				|| item.type == 'uselect' || item.type == 'guselect1'
				|| item.type == 'gselect1' || item.type == 'uselect1'
				|| item.type == 'roleselect' || item.type == 'roleselect1') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON.decode(item.param); } catch (error) {
			 * alert('guselect或者roleselect类型的视图组件<' + item.name +
			 * '>的参数格式必须为json,形如{root:\'0001\',targetName:\'userName\',targetType:\'userType\'}'); }
			 */

			var targetNameItem = findComponentItems(componentItems,
					o.targetName);

			if (targetNameItem == null) {
				alert('guselect或者roleselect类型的视图组件<' + item.name + '>的目标组件<id='
						+ o.targetName + '>并不存在,会影响数据的完整性');
			}

			var targetTypeItem = findComponentItems(componentItems,
					o.targetType);

			if (targetTypeItem == null) {
				alert('guselect或者roleselect类型的视图组件<' + item.name + '>的目标组件<id='
						+ o.targetType + '>并不存在,会影响数据的完整性');
			}

			var gucombox;

			if (item.type == 'guselect') {
				gucombox = getGroupUserChkCombo4Single(item.id,
						targetNameItem.id, targetTypeItem.id, o.root,
						(o.allowBlank == null || o.allowBlank));
			} else if (item.type == 'gselect') {
				gucombox = getGroupSelectCombo4Single(item.id,
						targetNameItem.id, targetTypeItem.id, o.root,
						(o.allowBlank == null || o.allowBlank));
			} else if (item.type == 'uselect') {
				gucombox = getUserChkCombo4Single(item.id, targetNameItem.id,
						targetTypeItem.id, o.root,
						(o.allowBlank == null || o.allowBlank));
			} else if (item.type == 'guselect1') {
				gucombox = getGroupUserChkCombo(item.id, targetNameItem.id,
						targetTypeItem.id, o.root,
						(o.allowBlank == null || o.allowBlank));
			} else if (item.type == 'gselect1') {
				gucombox = getGroupSelectCombo(item.id, targetNameItem.id,
						targetTypeItem.id, o.root,
						(o.allowBlank == null || o.allowBlank));
			} else if (item.type == 'uselect1') {
				gucombox = getUserChkCombo(item.id, targetNameItem.id,
						targetTypeItem.id, o.root,
						(o.allowBlank == null || o.allowBlank));
			} else if (item.type == 'roleselect') {
				gucombox = getRoleSingleSelectCombo(itemid, itemid + '_name',
						itemid + '_type', '',
						(o.allowBlank == null || o.allowBlank));
			} else if (item.type == 'roleselect1') {
				gucombox = getRoleSelectCombo(itemid, itemid + '_name', itemid
								+ '_type', '',
						(o.allowBlank == null || o.allowBlank));
			}

			var guitem = [gucombox, new Ext.form.Hidden({
								id : item.id,
								name : item.formName,
								value : data[item.name]
							}), new Ext.form.Hidden({
								id : targetNameItem.id,
								name : targetNameItem.formName,
								value : data[item.name]
							}), new Ext.form.Hidden({
								id : targetTypeItem.id,
								name : targetTypeItem.formName,
								value : data[item.name]
							})]

			Ext.getCmp(item.id + '_').fieldLabel = item.label;

			items.push(guitem);

			paramString += '&' + item.id + '_=' + data[targetNameItem.name];
		} else if (item.type == 'dataindex') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON.decode(item.param); } catch (error) {
			 * alert('dataindex类型的视图组件<' + item.name +
			 * '>的参数格式必须为json,形如{type:\'PC\',targetName:\'dataindexName\',returnFunc:\'selectDataindex\'
			 * }'); }
			 */

			var targetNameItem = findComponentItems(componentItems,
					o.targetName);

			if (targetNameItem == null) {
				alert('dataindex类型的视图组件类型的视图组件<' + item.name + '>的目标组件<id='
						+ o.targetName + '>并不存在,会影响数据的完整性');
			}

			var dditem = [
					getDataindexCombo(item.id, targetNameItem.id, null, o.type,
							(o.allowBlank == null || o.allowBlank),
							eval(o.returnFunc)), new Ext.form.Hidden({
								id : item.id,
								name : item.formName,
								value : data[item.name]
							}), new Ext.form.Hidden({
								id : targetNameItem.id,
								name : targetNameItem.formName,
								value : data[targetNameItem.name]
							})]
			Ext.getCmp(item.id + '_').fieldLabel = item.label;

			items.push(dditem);

			paramString += '&' + item.id + '_=' + data[targetNameItem.name];
		} else if (item.type == 'tablequery') {
			/*
			 * var o;
			 * 
			 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
			 * item.param)); } catch (error) { alert('tablequery类型的视图组件<' +
			 * item.name + '>的参数格式必须为json,形如{queryKey:\'test\',
			 * targetIdItem:\'\', targetItem:\'\', pointId:\'\',
			 * pointName:\'\'}'); }
			 */

			var targetItem = findComponentItems(componentItems, o.targetItem);

			if (targetItem == null) {
				alert('tablequery类型的视图组件<' + item.name + '>的目标组件<id='
						+ o.targetItem + '>并不存在,会影响数据的完整性');
			}

			if (o.pointId == null || o.pointName == null) {
				alert('tablequery类型的视图组件<' + item.name
						+ '>的返回值pointId或pointName定义不完整,会影响返回值');
			}

			var tqitem = [
					getTableQueryCombo(o.queryKey, null, function(node) {
								Ext.getCmp(item.id).setValue(node
										.get(o.pointId));
								Ext.getCmp(targetItem.id).setValue(node
										.get(o.pointName));
							}, item.id, o.pointId, o.pointName,
							(o.allowBlank == null || o.allowBlank)),
					new Ext.form.Hidden({
								id : item.id,
								name : item.formName,
								value : data[item.name]
							}), new Ext.form.Hidden({
								id : targetItem.id,
								name : targetItem.formName,
								value : data[targetItem.name]
							})]
			Ext.getCmp(item.id + '_').fieldLabel = item.label;

			paramString += '&' + item.id + '_=' + data[targetItem.name];

			items.push(tqitem);
		}

	});

	var viewForm = new Ext.FormPanel({
				labelWidth : 150, // label settings here
				// cascade unless
				// overridden
				frame : false,
				fileUpload : fileUpload,
				bodyStyle : 'padding:5px 5px 0',
				defaults : {
					width : 230
				},
				defaultType : 'textfield',
				items : items,
				pwdItems : pwdItems
			});

	var formUrl = context + '/system/result4form.jsp?' + paramString;

	viewForm.getForm().load({
				url : encodeURI(formUrl),
				success : function(form, action) {

				},
				failure : function(form, action) {
					Ext.Msg.alert('加载数据失败');
				}
			});

	return viewForm;
}

/**
 * 初始化表单form 参数
 * 
 * @param {}
 *            componentItems
 * @param {}
 *            data
 * @return {}
 */
function getTableViewViewForm(componentItems, data) {
	var items = [];

	Ext.each(componentItems, function(item) {
				var o = item.param;

				if (item.type == 'input') {
					/*
					 * var o;
					 * 
					 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
					 * item.param)); } catch (error) { alert('input类型的视图组件<' +
					 * item.name + '>的参数格式必须为json,形如{allowBlank:false,
					 * readOnly:true}'); }
					 */

					var it = new Ext.form.TextField({
								fieldLabel : item.label,
								id : item.id,
								name : item.formName,
								readOnly : true,
								value : data[item.name]
							});
					items.push(it);

				} else if (item.type == 'number') {
					/*
					 * var o;
					 * 
					 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
					 * item.param)); } catch (error) { alert('number类型的视图组件<' +
					 * item.name +
					 * '>的参数格式必须为json,形如{allowBlank:false,allowDecimals:true,allowNegative:false}'); }
					 */

					var it = new Ext.form.NumberField({
								fieldLabel : item.label,
								id : item.id,
								name : item.formName,
								readOnly : true,
								value : data[item.name]
							});
					items.push(it);
				} else if (item.type == 'textarea') {
					/*
					 * var o;
					 * 
					 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
					 * item.param)); } catch (error) { alert('textarea类型的视图组件<' +
					 * item.name + '>的参数格式必须为json,形如{allowBlank:false,
					 * readOnly:true}'); }
					 */

					var it = new Ext.form.TextArea({
								fieldLabel : item.label,
								id : item.id,
								name : item.formName,
								readOnly : true,
								value : data[item.name]
							});
					items.push(it);

				} else if (item.type == 'password') {
					/*
					 * var o;
					 * 
					 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
					 * item.param)); } catch (error) { alert('password类型的视图组件<' +
					 * item.name + '>的参数格式必须为json,形如{allowBlank:false,
					 * readOnly:true, confirmTo:\'\'}'); }
					 */

					if (o.confirmTo != null && Ext.getCmp(o.confirmTo) == null) {
						alert('密码确认对象为空,将无法完成密码确认校验');
					}

					var it = new Ext.form.TextField({
								fieldLabel : item.label,
								id : item.id,
								name : item.formName,
								inputType : 'password',
								readOnly : true,
								value : data[item.name]
							});

					items.push(it);
				} else if (item.type == 'hidden') {
					var it = {
						xtype : 'hidden',
						name : item.formName,
						id : item.id,
						value : data[item.name]
					};
					items.push(it);
				} else if (item.type == 'date') {
					/*
					 * var o;
					 * 
					 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
					 * item.param)); } catch (error) { alert('date类型的视图组件<' +
					 * item.name + '>的参数格式必须为json,形如{allowBlank:false}'); }
					 */

					var it = new Ext.form.TextField({
								fieldLabel : item.label,
								id : item.id,
								name : item.formName,
								inputType : 'password',
								readOnly : true,
								value : formatDate(data[item.name])
							});

					items.push(it);
				} else if (item.type == 'radio') {
					/*
					 * var o;
					 * 
					 * try { o = Ext.util.JSON .decode((item.param == '' ? '{}' :
					 * item.param)); } catch (error) { alert('radio类型的视图组件<' +
					 * item.name +
					 * '>的参数格式必须为json,形如{items:[{label:\'工作日\',value:\'0\'},{label:\'非工作日\',value:\'-1\'}]}');
					 * return; }
					 */

					var radioGroup = new Ext.form.RadioGroup({
								id : item.id,
								fieldLabel : item.label,
								items : []
							});

					var radioIndex = 0;

					Ext.each(o.items, function(radioItem) {
								var it = new Ext.form.Radio({ // 以上相同
									id : item.id + radioIndex,
									boxLabel : radioItem.label,
									name : item.formName,
									inputValue : radioItem.value,
									checked : (data[item.name] == radioItem.value
											? 'checked'
											: ''),
									listeners : {
										check : function(checkbox, checked) {
											if (checked) {

											}
										}
									}
								});

								radioGroup.items.push(it);

								radioIndex++;
							})

					items.push(radioGroup);
				}

			});

	var viewForm = new Ext.FormPanel({
				labelWidth : 150, // label settings here
				// cascade unless
				// overridden
				frame : false,
				bodyStyle : 'padding:5px 5px 0',
				defaults : {
					width : 230
				},
				defaultType : 'textfield',
				items : items
			});

	return viewForm;
}

/**
 * 找到指定的组件
 * 
 * @param {}
 *            componentItems 组件列表
 * @param {}
 *            id 组件ID
 * @return {}
 */
function findComponentItems(componentItems, id) {
	var it;
	for (var i = 0; i < componentItems.length; i++) {
		if (componentItems[i].id == id) {
			it = componentItems[i];
			break;
		}
	}

	return it;
}

/**
 * 默认的提交check函数
 * 
 * @param {}
 *            form
 * @param {}
 *            params
 * @param {}
 *            key
 * @return {}
 */
function tableViewCheckFunc(form) {
	var rnt = true;
	/*
	 * var items = form.items; for (var i = 0; i < items.length; i++) { if
	 * (items.itemAt(i).inputType == 'password' && items.itemAt(i).confirmTo !=
	 * null) { rnt = confirmPassword(Ext.getCmp(items.itemAt(i).confirmTo),
	 * items .itemAt(i)); if (!rnt) { break; } } }
	 */

	var items = form.pwdItems;

	for (var i = 0; i < items.length; i++) {
		if (items[i].inputType == 'password' && items[i].confirmTo != null) {
			rnt = confirmPassword(Ext.getCmp(items[i].confirmTo), items[i]);
			if (!rnt) {
				break;
			}
		}
	}

	return rnt && form.getForm().isValid();
}

/**
 * 密码确认
 * 
 * @param {}
 *            p1
 * @param {}
 *            p2
 * @return {Boolean}
 */
function confirmPassword(p1, p2) {
	if (p1.getValue() != p2.getValue()) {
		p2.setValue('');
		Ext.Msg.alert('提示', p1.fieldLabel + '确认失败');
		return false;
	}

	return true;
}

/**
 * 获取默认值
 * 
 * @param {}
 *            vlu 默认值定义
 * @param {}
 *            param 参数map
 * @return {}
 */
function getDefaultValue(vlu, param) {
	var temp = vlu;

	if (vlu != null && vlu != '') {
		var f = vlu.substring(0, 1);

		// 默认值为获取参数类型
		if (f == '@' && param != null && param.containsKey(vlu.substring(1))) {
			temp = param.get(vlu.substring(1));
		} else if (f == '@' && param != null
				&& !param.containsKey(vlu.substring(1))) {
			// 默认值为空
			temp = '';
		} else if (f == '#' && vlu.substring(1) != '') {
			// 默认值为自定义函数返回值类型
			try {
				temp = eval(vlu.substring(1) + '()');
			} catch (error) {
				alert(error.description);
			}
		}
	}

	return temp;
}

function renderAnnexDelete(annexItemID, idx, length) {
	var name = Ext.getCmp(annexItemID).name;
	var label = Ext.getCmp(annexItemID).fieldLabel;
	var formPanel = Ext.getCmp(annexItemID).ownerCt;
	formPanel.remove(Ext.getCmp(annexItemID));

	formPanel.insert((idx < length - 1 ? idx : idx + 1), {
				xtype : 'fileuploadfield',
				id : annexItemID,
				name : name,
				fieldLabel : label,
				buttonText : '',
				buttonCfg : {
					iconCls : 'upload-icon'
				}
			});

	formPanel.doLayout();
}