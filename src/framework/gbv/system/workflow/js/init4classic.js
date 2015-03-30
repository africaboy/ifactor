// window.onload = initwindow;
window.onunload = cleanwindow;

document.write("<script src=\"" + context
		+ "/system/workflow/js/initdoc.js\"></script>");
document.write("<script src=\"" + context
		+ "/system/workflow/js/inityj.js\"></script>");
document.write("<script src=\"" + context
		+ "/system/workflow/js/initnumber.js\"></script>");
document.write("<script src=\"" + context
		+ "/system/workflow/js/initgu.js\"></script>");
document.write("<script src=\"" + context
		+ "/resources/common/js/wordbook.js\"></script>");

Ext.useShims = true;

/* 初始化视图文件 */
function initwindow() {
	if (!readonly) {
		initobjct();
		offer();
		initbacklist();
		initimpset();
		initbackmemo();
	} else {
		initobjct4view();
		offerReadonly();
	}

	inithelper();

	if (view4diy == "yes") {
		eval(objkey + "_('" + flowAction + "');");
	} else if (view4diy == "no") {
	}

	// init4diy();
}

function cleanwindow() {
	if (newA && !ope && docid != "") {
		deletedoc();
	}

	if (newA && !ope && numberA != "0") {
		callbacknumber();
	}

	if (newwindow && !newwindow.closed) {
		newwindow.close();
	}
}

function inithelper() {
	var ifm = document.createElement("iframe");
	ifm.name = "helper";
	ifm.id = "helper";
	ifm.frameborder = "0";
	ifm.width = "0";
	ifm.height = "0";
	ifm.src = context + "/system/blank.jsp";
	document.body.appendChild(ifm);
	var frm = document.frames["helper"].document;
	frm.onreadystatechange = function() {
		if (frm.readyState == "complete") {
			frm.body.innerHTML = "<form method='post' name='form1'><input type='hidden' name='id' value=''></form>";
		}
	}
}

/**
 * 提供只读模式工具栏
 */
function offerReadonly() {
	var buttondiv = document.createElement("div");
	buttondiv.id = "btn";

	document.forms[0].insertBefore(buttondiv, document.forms[0].childNodes[0]);

	var tb = new Ext.Toolbar();

	tb.id = 'ExtToolBar';

	if (flowAction == 'view') {
		if (prints.length > 0) {
			var printAction = new Ext.Action({
				text : '<span style="font-size: 12px" title="打印当前稿签内容\">打印</span>',
				menu : prints,
				iconCls : 'print'
			});
			tb.add(printAction);
		}

		var traceAction = new Ext.Action({
			text : '<span style="font-size: 12px" title="查看历史流转记录\">流程跟踪</font>',
			handler : function() {
				handleTrace();
			},
			iconCls : 'trace'
		});
		// tb.add('-');
		tb.add(traceAction);

		var backAction = new Ext.Action({
					text : '<span style="font-size: 12px" title="返回上一操作页面">返回</font>',
					handler : function() {
						window.history.back(-1);
					},
					iconCls : 'back'
				});

		tb.add(backAction);
	} else if (flowAction == 'viewencyclic' || flowAction == 'lookover') {
		var closeAction = new Ext.Action({
					text : '<span style="font-size: 12px" title="关闭文件查阅页面">关闭</font>',
					handler : function() {
						window.close();
					},
					iconCls : 'close'
				});

		tb.add(closeAction);
	}

	tb.render('flowToolbarArea');
}

/* 初始化退回说明 */
function initbackmemo() {
	if (backmemo != "") {
		Ext.MessageBox.show({
					title : '文件退回说明',
					msg : backmemo + '',
					modal : true,
					icon : Ext.MessageBox.INFO
				})
	}
}

function handleFinish(nextsid) {
	if (checkObject()) {
		ope = true;

		Ext.MessageBox.confirm('提示', '确定完成办结工作', function(e) {
			if (e == "yes") {
				ope = true;

				createHidden("nextsid", nextsid);

				var url = context + '/system/flow.do?method=send';

				Ext.MessageBox.wait('提交过程中...');
				Ext.Ajax.request({
					// 请求地址
					url : url,
					// 提交参数组
					fileUpload : true,
					form : 'form1',
					scope : 'form1',
					// 成功时回调
					success : function(response, options) {
						// 获取响应的json字符串
						Ext.MessageBox.hide();

						var json = response.responseText;
						var o = Ext.JSON.decode(json);

						if (o.success) {
							alert("文件已办结！");
							try {
								eval(objkey + "_('finish');");
							} catch (error) {
								window.location.href = context
										+ '/system/flowlist.do?method=mydonelist&key='
										+ objkey;
							}
						} else {
							Ext.Msg.alert('提示', '文件处理失败！');
						}
					}
				});
			}
		});

	}
}

function handleCancel() {
	Ext.MessageBox.confirm('提示', '确定撤销当前文件办理', function(e) {
		if (e == "yes") {
			var url = context + '/system/flow.do?method=cancel';

			Ext.MessageBox.wait('提交过程中...');
			Ext.Ajax.request({
				// 请求地址
				url : url,
				params : {
					id : insid
				},
				// 成功时回调
				success : function(response, options) {
					// 获取响应的json字符串
					Ext.MessageBox.hide();

					var json = response.responseText;
					var o = Ext.JSON.decode(json);

					if (o.success) {
						alert("文件撤销成功！");
						try {
							eval(objkey + "_('cancel');");
						} catch (error) {
							window.location.href = context
									+ '/system/flowlist.do?method=mypendinglist&key='
									+ objkey;
						}
					} else {
						Ext.Msg.alert('提示', '文件撤销失败！');
					}
				}
			});
		}
	});
}

/* 点击发送按钮 */
function handleSend() {
	var r = checkObject();

	if (r > -1) {
		if (flowtype == "custom") {
			var items = [];

			Ext.override(Ext.tree.TreeNodeUI, {
						onDblClick : function(e) {
							e.preventDefault();
							if (this.disabled) {
								return;
							}
							if (!this.animating && this.node.isExpandable()) {
								this.node.toggle();
							}
							this.fireEvent("dblclick", this.node, e);
						}
					});

			var selectUserTree = new Ext.tree.TreePanel({
				id : 'selectUserTree',
				// singleExpand : true,
				frame : false,
				// checkModel : 'single',
				// onlyLeafCheckable : true,
				region : 'center',
				border : false,
				autoScroll : true,
				animate : true,
				rootVisible : false,
				loader : new Ext.tree.TreeLoader({
							dataUrl : context
									+ '/system/flow.do?method=trenduser&sid='
									+ stepid,
							baseParams : {
				// active : 'purview4GUSelectForm'
							}
						}),
				root : new Ext.tree.AsyncTreeNode({
							allowChildren : true,
							expanded : true,
							text : '选择下一步环节', // 节点名称
							draggable : false, // 是否支持拖动
							id : '0' // 节点id
						}),
				listeners : {
					'click' : function(node) {
						if (!node.isLeaf() && node.isExpanded()) {
							node.collapse();
						} else if (!node.isLeaf() && !node.isExpanded()) {
							node.expand();
						}
					},
					'load' : function(node) {
						if (node.id == '0') {

						}
					},
					'checkchange' : function(node, checked) {
						var selNodes = selectUserTree.getChecked();

						if (checked && selNodes.length > 1) {
							var sid = node.attributes.parentId;
							var sinner = trendMap.get(sid);

							Ext.each(selNodes, function(nd) {
								if (sinner == 0 && nd.id != node.id) {
									nd.attributes.checked = false;
									nd.ui.checkbox.checked = false;
								} else if (sinner == 1
										&& nd.attributes.parentId != node.attributes.parentId) {
									nd.attributes.checked = false;
									nd.ui.checkbox.checked = false;
								}
							});
						}
					}
				}
			});

			if (r == 0) {
				/* 设置文件标题 */
				var form = new Ext.FormPanel({
							id : 'titleForm',
							frame : true,
							layout : 'form',
							labelAlign : 'left',
							region : 'north',
							border : false,
							height : 50,
							autoScroll : true,
							labelWidth : 75, // label settings here cascade
							frame : false,
							bodyStyle : 'padding:5px',
							defaults : {
								width : 350

							},
							defaultType : 'textfield',
							items : [{
										fieldLabel : '文件标题',
										id : 'myTitle',
										name : 'myTitle',
										allowBlank : false,
										value : objname + '[' + tdate + ']'
									}]
						});

				items.push(form);
			}

			items.push(selectUserTree);

			var sendselectWin = new Ext.Window({
				id : 'sendselectWin',
				renderTo : Ext.getBody(),
				layout : 'border',
				width : 500,
				height : 400,
				title : '<font class="oaFont">文件发送至...</font>',
				resizable : false,
				plain : true,
				modal : true,

				items : [items],

				buttons : [{
					text : ' 提  交 ',
					handler : function() {
						if (Ext.get('titleForm')) {
							if (Ext.getCmp('titleForm').getForm().isValid()) {
								setDefaultTitle(Ext.getCmp('titleForm')
										.getForm().findField('myTitle')
										.getValue());
							} else {
								setDefaultTitle('');
								return false;
							}
						}

						var selStepNode = selectUserTree.getSelectionModel()
								.getSelectedNode();

						/* 提交结束 */
						if (selStepNode
								&& selStepNode.attributes.type != 'user'
								&& selStepNode.attributes.type == '-1') {

							createHidden('nextsid',
									selStepNode.attributes.realid);
							createHidden('nextusers', '');

							sendselectWin.close();
							Ext.MessageBox.wait('提交过程中...');
							Ext.Ajax.request({
								// 请求地址
								url : context + '/system/flow.do?method=send',
								// 提交参数组
								fileUpload : true,
								form : 'form1',
								scope : 'form1',
								// 成功时回调
								success : function(response, options) {
									// 获取响应的json字符串
									Ext.MessageBox.hide();

									var json = response.responseText;
									var o = Ext.JSON.decode(json);

									if (o.success) {

										try {
											eval(objkey + "_('send');");
										} catch (error) {
											window.location.href = context
													+ '/system/flowlist.do?method=mydonelist&key='
													+ objkey;
										}
									} else {
										Ext.Msg.alert('提示', '文件发送失败,'
														+ o.errMsg);
									}
								}
							});
						} else {
							var selNodes = selectUserTree.getChecked();

							if (selNodes.length == 0) {
								Ext.Msg.alert('提示', '请选择文件接收人！');
							} else {
								sendselectWin.close();

								ope = true;
								var stepids = '';
								var nextusers = '';
								Ext.each(selNodes, function(node) {
											stepids += node.attributes.parentId
													+ ';';
											nextusers += node.attributes.realid
													+ ';';
										});

								createHidden("nextsid", stepids.substring(0,
												stepids.length - 1));
								createHidden("nextusers", nextusers.substring(
												0, nextusers.length - 1));

								Ext.MessageBox.wait('提交过程中...');
								Ext.Ajax.request({
									// 请求地址
									url : context
											+ '/system/flow.do?method=send',
									// 提交参数组
									fileUpload : true,
									form : 'form1',
									scope : 'form1',
									// 成功时回调
									success : function(response, options) {
										// 获取响应的json字符串
										Ext.MessageBox.hide();

										var json = response.responseText;
										var o = Ext.JSON.decode(json);

										if (o.success) {

											try {
												eval(objkey + "_('send');");
											} catch (error) {
												window.location.href = context
														+ '/system/flowlist.do?method=mydonelist&key='
														+ objkey;
											}
										} else {
											Ext.Msg
													.alert('提示',
															'流转文件提交下一步处理失败,'
																	+ o.errMsg);
										}
									}
								});

							}
						}
					}
				}, {
					text : ' 关 闭 ',
					handler : function() {
						sendselectWin.close();
					}
				}]
			});
			sendselectWin.show();

		} else if (flowtype == "free") {
			dialog(	context + "/system/flow.do?method=sendpostselect&pkid="
							+ stepid + "&obj=" + objkey + "&supportcenter="
							+ supportcenter, true, "文件发送", 600, 350);
		}
		// dialogX($("trends"),true,"文件发送",250,300);
	}
}

/* 点击特送按钮 */
function handleSDSend() {
	if (checkObject()) {
		if (flowtype == "custom") {
			Ext.override(Ext.tree.TreeNodeUI, {
						onDblClick : function(e) {
							e.preventDefault();
							if (this.disabled) {
								return;
							}
							if (!this.animating && this.node.isExpandable()) {
								this.node.toggle();
							}
							this.fireEvent("dblclick", this.node, e);
						}
					});

			var selectUserTree = new Ext.tree.TreePanel({
				id : 'selectUserTree',
				// singleExpand : true,
				frame : false,
				// checkModel : 'single',
				// onlyLeafCheckable : true,
				border : false,
				autoScroll : true,
				animate : true,
				rootVisible : false,
				loader : new Ext.tree.TreeLoader({
							dataUrl : context
									+ '/system/flow.do?method=sdtrenduser&aid='
									+ aid + '&sid=' + stepid,
							baseParams : {
				// active : 'purview4GUSelectForm'
							}
						}),
				root : new Ext.tree.AsyncTreeNode({
							allowChildren : true,
							expanded : true,
							text : '选择下一步环节', // 节点名称
							draggable : false, // 是否支持拖动
							id : '0' // 节点id
						}),
				listeners : {
					'click' : function(node) {
						if (!node.isLeaf() && node.isExpanded()) {
							node.collapse();
						} else if (!node.isLeaf() && !node.isExpanded()) {
							node.expand();
						}
					},
					'load' : function(node) {
						if (node.id == '0') {

						}
					},
					'checkchange' : function(node, checked) {
						var selNodes = selectUserTree.getChecked();

						if (checked && selNodes.length > 1) {
							var sid = node.attributes.parentId;
							var sinner = trendMap.get(sid);

							Ext.each(selNodes, function(nd) {
								if (sinner == 0 && nd.id != node.id) {
									nd.attributes.checked = false;
									nd.ui.checkbox.checked = false;
								} else if (sinner == 1
										&& nd.attributes.parentId != node.attributes.parentId) {
									nd.attributes.checked = false;
									nd.ui.checkbox.checked = false;
								}
							});
						}
					}
				}
			});

			var sendselectWin = new Ext.Window({
				id : 'sendselectWin',
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 500,
				height : 400,
				title : '<font class="oaFont">文件特送至...</font>',
				resizable : false,
				plain : true,
				modal : true,

				items : [selectUserTree],

				buttons : [{
					text : ' 提  交 ',
					handler : function() {
						var selNodes = selectUserTree.getChecked();

						if (selNodes.length == 0) {
							Ext.Msg.alert('提示', '请选择文件接收人！');
						} else {
							sendselectWin.close();

							ope = true;
							var stepids = '';
							var nextusers = '';
							Ext.each(selNodes, function(node) {
										stepids += node.attributes.parentId
												+ ';';
										nextusers += node.attributes.realid
												+ ';';
									});

							createHidden("nextsid", stepids.substring(0,
											stepids.length - 1));
							createHidden("nextusers", nextusers.substring(0,
											nextusers.length - 1));

							Ext.MessageBox.wait('提交过程中...');
							Ext.Ajax.request({
								// 请求地址
								url : context + '/system/flow.do?method=send',
								// 提交参数组
								fileUpload : true,
								form : 'form1',
								scope : 'form1',
								// 成功时回调
								success : function(response, options) {
									// 获取响应的json字符串
									Ext.MessageBox.hide();

									var json = response.responseText;
									var o = Ext.JSON.decode(json);

									if (o.success) {

										try {
											eval(objkey + "_('send');");
										} catch (error) {
											window.location.href = context
													+ '/system/flowlist.do?method=mydonelist&key='
													+ objkey;
										}
									} else {
										Ext.Msg.alert('提示', '文件发送失败！');
									}
								}
							});

						}
					}
				}, {
					text : ' 关 闭 ',
					handler : function() {
						sendselectWin.close();
					}
				}]
			});
			sendselectWin.show();

		} else if (flowtype == "free") {
			dialog(	context + "/system/flow.do?method=sendpostselect&pkid="
							+ stepid + "&obj=" + objkey + "&supportcenter="
							+ supportcenter, true, "文件发送", 600, 350);
		}
		// dialogX($("trends"),true,"文件发送",250,300);
	}
}

/* 点击退回按钮 */
function handleBack() {
	var form = new Ext.FormPanel({
				frame : true,
				layout : 'form',
				labelAlign : 'left',
				border : false,
				autoScroll : true,
				labelWidth : 75, // label settings here cascade
				frame : false,
				bodyStyle : 'padding:10px',
				defaults : {
					width : 350
				},
				defaultType : 'textarea',
				items : [{
							fieldLabel : '退回说明',
							id : 'myBackMemo',
							name : 'myBackMemo',
							allowBlank : false
						}]
			});

	var win = new Ext.Window({
		renderTo : Ext.getBody(),
		layout : 'fit',
		width : 500,
		height : 200,
		title : '文件退回窗口',
		plain : true,
		modal : true,
		maximizable : false,
		items : [form],

		buttons : [{
			text : ' 退 回 ',
			id : 'backStepBtn',
			handler : function() {
				if (form.getForm().isValid()) {
					Ext.MessageBox.confirm('提示', '确定将文件退回？', function(btn) {
						if (btn == 'yes') {
							Ext.getCmp('backStepBtn').setDisabled(true);
							Ext.MessageBox.wait('文件退回过程中...');

							var url = context
									+ "/system/flow.do?method=back&key="
									+ objkey;

							Ext.MessageBox.wait('提交过程中...');
							Ext.Ajax.request({
								// 请求地址
								url : url,
								// 提交参数组
								fileUpload : true,
								form : 'form1',
								scope : 'form1',
								params : {
									bid : lastAid,
									abackmemo : form.getForm()
											.findField('myBackMemo').getValue()
								},
								// 成功时回调
								success : function(response, options) {
									// 获取响应的json字符串
									Ext.MessageBox.hide();

									var json = response.responseText;
									var o = Ext.JSON.decode(json);

									if (o.success) {
										alert("文件退回成功！");
										try {
											eval(objkey + "_('back');");
										} catch (error) {
											window.location.href = context
													+ '/system/flowlist.do?method=mypendinglist&key='
													+ objkey;
										}
									} else {
										Ext.Msg.alert('提示', '文件退回失败,'
														+ o.errMsg);
										Ext.getCmp('backStepBtn')
												.setDisabled(false);
									}
								}
							});
						}
					});
				}
			}
		}, {
			text : ' 取 消 ',
			handler : function() {
				win.close();
				win = null;
			}
		}]
	});

	win.show();
}

/* 点击数据导入按钮 */
function handleImpset() {
	dialog("数据导入", $("impset").innerHTML);
}

function handleImport(thizz) {
	var url = context + "/system/flowmanage.do?method=importdata&mykey="
			+ thizz.value + "&key=" + objkey;
	dialog(url, false, "", 480, 200);
}

/* 流程跟踪查看 */
function handleTrace() {
	/*
	 * var url = context + "/system/flow.do?method=trace&id=" +
	 * document.form1.aid.value;
	 */
	var url = context
			+ "/system/flowplotter.do?method=preplotter&type=viewing&id="
			+ flowid + "&insid=" + insid;
	/*
	 * try { top.xwin(this, url, false, "流程跟踪", 900, 550); } catch (error) {
	 * window.open(url, ""); }
	 */

	window
			.showModalDialog(
					url,
					"",
					"dialogWidth:1000px;dialogHeight:700px;center:yes;help:no;scroll:no;status:no;resizable:yes;");
}

function handleHelp() {

}

/* 初始化功能按钮 */
function initbutton() {
	var buttondiv = document.createElement("div");
	buttondiv.id = "buttondiv";
	buttondiv.style.display = "none";
	var str = "<table width=100% class=tab-noborder>";
	str += "<tr><td>";
	str += "<input type='button' value=' 发 送 ' class='button0' onclick='javascript:handleSend()'>";
	if (backA) {
		str += "<input type='button' value=' 退 回 ' class='button0' onclick='javascript:handleBack()'>";
	}
	if (!newA) {
		str += "<input type='button' value=' 流程跟踪 ' class='button0' onclick='javascript:handleTrace()'>";
	}
	str += "</td></tr>";
	str += "<tr><td><div id=handlearea></div></td></tr>";
	str += "</table>";
	buttondiv.innerHTML = str;
	document.forms[0].insertBefore(buttondiv);
}

/** 公文办理操作功能按钮 */
function offer() {
	var buttondiv = document.createElement("div");
	buttondiv.id = "btn";

	document.forms[0].insertBefore(buttondiv, document.forms[0].childNodes[0]);

	var tb = new Ext.Toolbar();

	tb.id = 'ExtToolBar';

	var backAction = new Ext.Action({
				text : '<span style="font-size: 12px" title="返回上一页面">返回</span>',
				handler : function() {
					history.back(-1);
				},
				iconCls : 'historyback'
			});

	tb.add(backAction);

	if (!D(ititle)) {
		var titleAction = new Ext.Action({
			text : '<span style="font-size: 12px" title="当前表单没有定义标题项,保存或提交前请先设置文件标题">标题</span>',
			handler : function() {
				defaultTitleSet();
			},
			iconCls : 'title'
		});

		tb.add(titleAction);
		// tb.add('-');
	}

	var saveAction = new Ext.Action({
				text : '<span style="font-size: 12px" title="保存当前文件内容">保存</span>',
				handler : function() {
					handleSave();
				},
				iconCls : 'save'
			});

	tb.add(saveAction);

	if (directFinish == 'no') {
		var sendAction = new Ext.Action({
					text : '<span style="font-size: 12px" title="发送至下一环节办理">发送</span>',
					handler : function() {
						handleSend();
					},
					iconCls : 'send'
				});
		// tb.add('-');
		tb.add(sendAction);
	}

	if (sd) {
		var sdAction = new Ext.Action({
					text : '<span style="font-size: 12px" title="特殊选择办理">特送</span>',
					handler : function() {
						handleSDSend();
					},
					iconCls : 'sdsend'
				});
		// tb.add('-');
		tb.add(sdAction);
	}

	if (startS && !newA) {
		var cancelAction = new Ext.Action({
					text : '<span style="font-size: 12px" title="取消当前文件办理">撤销</span>',
					handler : function() {
						handleCancel();
					},
					iconCls : 'cancel'
				});
		// tb.add('-');
		tb.add(cancelAction);
	}

	if (directFinish == 'yes') {
		var finishAction = new Ext.Action({
					text : '<span style="font-size: 12px" title="流程办理结束">办结</span>',
					handler : function() {
						handleFinish(directStepID);
					},
					iconCls : 'finish'
				});
		// tb.add('-');
		tb.add(finishAction);
	}

	if (backA) {
		var backAction = new Ext.Action({
			text : '<span style="font-size: 12px" title="将文件退回,不予办理">退回</span>',
			handler : function() {
				handleBack();
			},
			iconCls : 'back'
		});
		// tb.add('-');
		tb.add(backAction);
	}

	if (backmemo != '') {
		var backmemoAction = new Ext.Action({
			text : '<span style="font-size: 12px" title="查看文件被退回原因">退回说明</span>',
			handler : function() {
				initbackmemo();
			},
			iconCls : 'backmemo'
		});
		// tb.add('-');
		tb.add(backmemoAction);
	}

	if (cc) {
		var ccAction = new Ext.Action({
					text : '<span style="font-size: 12px" title="">分发</span>',
					handler : function() {
						handleCC();
					},
					iconCls : 'cc'
				});
		// tb.add('-');
		tb.add(ccAction);
	}

	if (aid != "0") {
		var traceAction = new Ext.Action({
			text : '<span style="font-size: 12px" title="查看历史流转记录">流程跟踪</span>',
			handler : function() {
				handleTrace();
			},
			iconCls : 'trace'
		});
		// tb.add('-');
		tb.add(traceAction);
	}

	var printAction = null;

	if (cprint && prints.length > 0) {
		printAction = new Ext.Action({
					text : '<span style="font-size: 12px" title="打印当前稿签内容\">打印</span>',
					menu : prints,
					iconCls : 'print'
				});
	}

	// tb.add('-');
	// tb.add(printAction);

	var flowAction = new Ext.Action({
				text : '<span style="font-size: 12px" title="查看工作流程图">流程图</span>',
				handler : function() {
					handleDraw();
				},
				iconCls : 'flow'
			});
	// tb.add('-');
	// tb.add(flowAction);

	var helpAction = new Ext.Action({
				text : '<span style="font-size: 12px" title="查看办理操作帮助">帮助</span>',
				handler : function() {
					handleHelp();
				},
				iconCls : 'help'
			});
	// tb.add('-');

	if (printAction != null) {
		var otherAction = new Ext.Action({
			text : '<span style="font-size: 12px" title="点击执行其它处理操作">更多操作</span>',
			menu : [printAction, flowAction, helpAction],
			iconCls : 'other'
		});

		tb.add(otherAction);
	} else {
		var otherAction = new Ext.Action({
			text : '<span style="font-size: 12px" title="点击其它处理操作">更多操作</span>',
			menu : [flowAction, helpAction],
			iconCls : 'other'
		});

		tb.add(otherAction);
	}

	tb.render('flowToolbarArea');
}

function offerMore() {
	var msg = "<div class=\"divn_\" onmouseover=\"javascript:this.className='divn_1';\" onmouseout=\"javascript:this.className='divn_';\" onClick=\"javascript:handleExport();closeWindow();\" title=\"将当前表单数据导出\">数据导出</div>";
	if (backA) {
		msg += "<div class=\"divn_\" onmouseover=\"javascript:this.className='divn_1';\" onmouseout=\"javascript:this.className='divn_';\" onClick=\"javascript:closeWindow();handleBack();\" title=\"将当前文件退回\">退回文件</div>";
		if (backmemo != "") {
			msg += "<div class=\"divn_\" onmouseover=\"javascript:this.className='divn_1';\" onmouseout=\"javascript:this.className='divn_';\" onClick=\"javascript:initbackmemo();closeWindow();\" title=\"查看退回操作的详细说明\">退回说明</div>";
		}
	}

	msg += "<div class=\"divn_\" onmouseover=\"javascript:this.className='divn_1';\" onmouseout=\"javascript:this.className='divn_';\" onClick=\"javascript:handleDraw();closeWindow();\" title=\"查看流程结构图\">流程图</div>";

	if (!newA) {
		msg += "<div class=\"divn_\" onmouseover=\"javascript:this.className='divn_1';\" onmouseout=\"javascript:this.className='divn_';\" onClick=\"javascript:handleTrace();closeWindow();\" title=\"查看历史流转记录\">流程跟踪</div>";
	}

	msg += "<div class=\"divn_\" onmouseover=\"javascript:this.className='divn_1';\" onmouseout=\"javascript:this.className='divn_';\" onClick=\"javascript:handleHelp();closeWindow();\" title=\"查看办理操作帮助\">操作帮助</div>";

	var objPos = mousePosition(event);
	showMessageBox("更多流转功能", msg, objPos, 150);
}

/**
 * 查看流程图
 * 
 * @param {}
 *            id
 * @param {}
 *            key
 */
function handleDraw(id) {
	var url = context
			+ "/system/flowplotter.do?method=preplotter&type=viewing&id="
			+ D("gid").value;
	window
			.showModalDialog(
					url,
					"",
					"dialogWidth:900px;dialogHeight:600px;center:yes;help:no;scroll:no;status:no;resizable:yes;");
	// dialog(url,true,"绘制流程图",800,400);
}

/* 流程定制 */
function handleTailor() {
	nowoper = "send";
	var url = context + "/system/flow.do?method=tailor&key=" + objkey;

	dialog(url, false, "", 300, 400);
	// top.xwin(this,url,false,"流程定制",900,550);
}

/*
 * 表单项内容校验 r {1 全部校验通过,0 文件标题校验未通过,-1 表单域校验未通过,-3 正文校验未通过,-4 文号校验未通过,-5
 * 传阅分发范围校验未通过}
 */
function checkObject() {
	var r = checkit();
	try {
		// r = checkit();
	} catch (error) {
		alert("自定义的表单项内容校验函数运行出现异常: " + error.message);
	}

	/* 收集多处理数据项信息 */
	if (multiTables.length > 0) {
		for (var i = 0; i < multiTables.length; i++) {
			var tmp = multiTables[i].split(",");
			/* 多数据处理关联表 */
			var tbname = tmp[0];
			/* 多数据处理计数器 */
			var ctname = tmp[1];
			/* 多数据计数返回值 */
			var ct = "";
			/* 当前存在的数据项 */
			var ctitem = document.getElementsByName(tbname + "_item_count");
			for (var j = 0; j < ctitem.length; j++) {
				/* 记录数据项编号 */
				ct += ctitem[j].value + ",";
			}

			/* 多数据处理计数器赋值 */
			$(ctname).value = ct;
		}
	}

	if (r > -1 && !hassavedoc()) {
		alert("请保存正文");
		r = -3;
	}

	if (r > -1 && !checkNumber()) {
		r = -4;
	}

	if (cc && (!$('ccids') || isblank($('ccids')))) {
		alert('请设置分发范围');
		r = -5;
	}

	return r;
}

/**
 * 保存
 */
function handleSave() {
	var r = checkObject();

	if (r > -1) {
		ope = true;
		handleCheckbox();

		var url = context + "/system/flow.do?method=save&key=" + objkey;

		if (aid != 0) {
			url = context + "/system/flow.do?method=update&key=" + objkey;
		}

		if (r == 0) {
			/* 设置文件标题 */
			var form = new Ext.FormPanel({
						frame : true,
						layout : 'form',
						labelAlign : 'left',
						border : false,
						autoScroll : true,
						labelWidth : 75, // label settings here cascade
						frame : false,
						bodyStyle : 'padding:10px',
						defaults : {
							width : 350

						},
						defaultType : 'textfield',
						items : [{
									fieldLabel : '文件标题',
									id : 'myTitle',
									name : 'myTitle',
									allowBlank : false,
									value : objname + '[' + tdate + ']'
								}]
					});

			var win = new Ext.Window({
						renderTo : Ext.getBody(),
						layout : 'fit',
						width : 500,
						height : 150,
						title : '自定义文件标题',
						plain : true,
						modal : true,
						maximizable : false,
						items : [form],

						buttons : [{
							text : ' 确 定 ',
							handler : function() {
								if (form.getForm().isValid()) {
									setDefaultTitle(form.getForm()
											.findField('myTitle').getValue());
									toSave(url);
									win.close();
									win = null;
								}
							}
						}, {
							text : '关 闭',
							handler : function() {
								win.close();
								win = null;
							}
						}]
					});

			win.show();
		} else {
			toSave(url);
		}
	}
}

function toSave(url) {
	Ext.MessageBox.wait('提交过程中...');
	Ext.Ajax.request({
				// 请求地址
				url : url,
				// 提交参数组
				fileUpload : true,
				form : 'form1',
				scope : 'form1',
				// 成功时回调
				success : function(response, options) {
					// 获取响应的json字符串
					Ext.MessageBox.hide();

					var json = response.responseText;
					var o = Ext.JSON.decode(json);

					if (o.success) {
						// alert("提交保存成功！");
						try {
							eval(objkey + "_('save');");
						} catch (error) {
							window.location.href = context
									+ '/system/flowlist.do?method=mypendinglist&key='
									+ objkey;
						}
					} else {
						Ext.Msg.alert('提示', '提交保存失败！');
					}
				}
			});
}

function initElement(item, vl, handleType) {
	/* 临时存储元素值 */
	if (item) {
		createHidden(item.name + "_temp", vl);
	}

	if (readonly) {
		handleType = 0;
	}

	if (item) {
		createHidden(item.name + "_handleType", handleType);
	}

	if (handleType == -1 && item) {
		// item.disabled = true;
		var rootSibling = item.nextSibling;
		var bindObject = document.createElement("span");
		bindObject.id = item.name + "_label";

		item.parentNode.insertBefore(bindObject, rootSibling);
		item.removeNode(true);
	} else if (handleType == 0 && item) {
		item.id = item.name;

		var rootSibling = item.nextSibling;
		if (item.type == "hidden") {
			var bindObject = document.createElement("span");
			bindObject.id = item.name + "_label";
			item.parentNode.insertBefore(bindObject, rootSibling);
			createHidden(item.name, vl);

			init4Special(item, vl, handleType);
		} else if (item.type == "text" || item.type == "textarea") {
			var bindObject = document.createElement("span");
			bindObject.id = item.name + "_label";
			item.parentNode.insertBefore(bindObject, rootSibling);

			if (vl != "") {
				bindObject.innerHTML = vl;
			}

			var itemName = item.name;
			item.removeNode(true);

			createHidden(itemName, vl);
		} else if (item.type == "checkbox") {
			item.checked = (item.value == vl);
			item.disabled = true;
		} else if (item.type == "radio") {
		} else if (item.type == "select-one") {
			var txt = "";

			init4Special(item, txt, handleType);

			for (var i = 0; i < item.length; i++) {
				if (item[i].value == vl) {
					txt = item[i].text;
					break;
				}
			}

			var bindObject = document.createElement("span");
			bindObject.id = item.name + "_label";
			item.parentNode.insertBefore(bindObject, rootSibling);
			bindObject.innerHTML = txt;

			item.style.display = "none";
		} else if (item.type == "file") {
		}
	} else if (handleType == 1 && item) {
		item.id = item.name;

		var rootSibling = item.nextSibling;
		if (item.type == "hidden") {
			var bindObject = document.createElement("span");
			bindObject.id = item.name + "_label";
			item.parentNode.insertBefore(bindObject, rootSibling);
			if (vl != "") {
				// bindObject.innerHTML = vl;
				createHidden(item.name, vl);
			}

			init4Special(item, vl, handleType);
		} else if (item.type == "text") {
			var bindObject = document.createElement("span");
			bindObject.id = item.name + "_label";
			item.parentNode.insertBefore(bindObject, rootSibling);
			// item.value = vl == "" ? item.value : vl;
			item.setAttribute("value", (vl == "" ? item.value : vl));

			init4Special(item, vl, handleType);
		} else if (item.type == "textarea") {
			var bindObject = document.createElement("span");
			bindObject.id = item.name + "_label";
			item.parentNode.insertBefore(bindObject, rootSibling);
			item.innerHTML = (vl == "" ? item.value : vl);
		} else if (item.type == "checkbox") {
			item.checked = (item.value == vl);
		} else if (item.type == "radio") {
			item.checked = (item.value == vl);
		} else if (item.type == "select-one") {
			for (var i = 0; i < item.length; i++) {
				if (item[i].value == vl) {
					item[i].selected = true;
				}
			}

			init4Special(item, vl, handleType);
		} else if (item.type == "file") {
		}
	}
}

function init4Special(item, value, handleType) {
	if (item.getAttribute("special") == "yijian") {
		initYJ(item.name, item.name + "area");
	} else if (item.getAttribute("special") == "zhengwen") {
		initZW(item.name);
	} else if (item.getAttribute("special") == "number") {
		loadnumber(item);
	} else if (item.getAttribute("special") == "dataindex") {

	} else if (item.getAttribute("special") == "date") {
		if (handleType == 1) {
			item.readOnly = true;
			item.onclick = function() {
				HS_setDate(this);
			};
		}
	} else if (item.getAttribute("special") == "gu") {
		initGU(item, handleType);
	} else if (item.getAttribute("special") == "wordbook") {
		if (item.getAttribute('wbtype') != '') {
			script4wordbookselect(item.getAttribute('wbtype'), value,
					item.name, true);
		}
	}
}

/**
 * 
 * @param {}
 *            item
 * @param {}
 *            value
 */
function initElement4Import(item, value) {
	if (item && !item.disabled) {
		if (item.type == "hidden") {
			item.value = value;
		} else if (item.type == "text" || item.type == "textarea") {
			item.value = value;
		} else if (item.type == "checkbox") {
			item.checked = (item.value == value);
		} else if (item.type == "radio") {
			item.checked = (item.value == value);
		} else if (item.type == "select-one") {
			for (var i = 0; i < item.length; i++) {
				if (item[i].value == value) {
					item[i].selected = true;
				}
			}
		}
	}
}

/* 修饰对象显示标签 */
function fitElementLabel(item, w, h) {
	var sp = $(item + "_label");
	if (sp) {
		sp.style.display = "block";
		sp.style.width = w == null ? "99%" : w + "px";
		sp.style.height = h == null ? "50px" : h + "px";
		sp.style.border = "1px solid #ffffff";
	}
}

function initElementOfFile(obj, id, name, r) {
	if (r == -1) {
		// obj.disabled = true;
		obj.removeNode(true);
	} else if (r == 0) {
		if (id != "") {
			var annex = document.createElement("span");
			annex.id = id;
			var str = "&nbsp;";
			str += "<a href=\"javascript:viewAnnex('" + id
					+ "');\" title=\"查看附件\">" + name + "</a><br>";
			annex.innerHTML = str;
			obj.parentNode.appendChild(annex);
			obj.removeNode(true);
		} else if (readonly) {
			obj.removeNode(true);
		}
	} else if (r == 1) {
		if (id != "") {
			var annex = document.createElement("span");
			annex.id = id;
			var str = "&nbsp;";
			str += "<a href=\"javascript:viewAnnex('" + id
					+ "');\" title=\"查看附件\">" + name + "</a>";
			str += "&nbsp;<a href=\"javascript:deleteAnnex('" + id + "','"
					+ name + "','" + obj.name
					+ "');\" title=\"删除附件\">删除</a><br>";
			annex.innerHTML = str;
			obj.parentNode.appendChild(annex);
			// obj.removeNode(true);
		} else if (readonly) {
			obj.removeNode(true);
		} else {
			var bindObject = document.createElement("div");
			var str = "<input type=\"file\" id=\"" + obj.id + "\" name=\""
					+ obj.name + "\" value=\"\">&nbsp;";
			bindObject.innerHTML += str;

			obj.parentNode.appendChild(bindObject);

			obj.removeNode(true);
		}
	}
}

function initElementOfAllFile(obj, id, name, r) {
	if (!obj) {
		alert("表单没有定义附件操作区域");
		return;
	}
	var area = $(obj.name + "_area");

	/* 附件显示区域 */
	if (!area) {
		/* 增加附件 */
		if (r == 1) {
			var a = document.createElement("a");
			a.href = "javascript:addFile('" + obj.name + "_area');";
			a.innerHTML = '<img src="' + context
					+ '/system/workflow/images/addfile.png" title="上传附件">';
			obj.parentNode.appendChild(a);
		}
		area = document.createElement("div");
		area.style.cssText = "border:0px #ccc solid;";
		area.id = obj.name + "_area";
		obj.parentNode.appendChild(area);
	}

	if (r == -1) {
		// obj.disabled = true;
		// obj.removeNode(true);
	} else if (r == 0) {
		if (id != "") {
			var annex = document.createElement("span");
			annex.id = id;
			var str = "&nbsp;";
			str += "<a href=\"javascript:viewAnnex('" + id
					+ "');\" title=\"查看附件\">" + name + "</a><br>";
			annex.innerHTML = str;
			area.appendChild(annex);
		}
	} else if (r == 1) {
		if (id != "") {
			var annex = document.createElement("span");
			annex.id = id;
			var str = "&nbsp;";
			str += "<a href=\"javascript:viewAnnex('" + id
					+ "');\" title=\"查看附件\">" + name + "</a>";
			str += "&nbsp;<a href=\"javascript:deleteAnnex('" + id + "','"
					+ name + "','" + obj.name
					+ "');\" title=\"删除附件\">删除</a><br>";
			annex.innerHTML = str;
			area.appendChild(annex);
		}
	}
}

/* 增加上传文件 */
function addFile(area) {
	var bindObject = document.createElement("div");
	bindObject.id = "filespan_" + allannex;
	var str = "<input type=\"file\" size=\"50%\" id=\"file_" + allannex
			+ "\" name=\"file_" + allannex + "\" value=\"\">&nbsp;";
	str += "<a href=\"javascript:void(-1);\" onclick=\"javascript:$('filespan_"
			+ allannex + "').removeNode(true);\" title=\"删除附件\">删除</a>";
	bindObject.innerHTML += str;

	$(area).appendChild(bindObject);

	allannex++;
}

function viewAnnex(id) {
	if (document.frames["helper"].src != context + "/system/blank.jsp") {
		var frm = document.frames["helper"].document;
		frm.body.innerHTML = "<form method='post' name='form1'><input type='hidden' name='id' value=''></form>";
	}

	document.frames["helper"].document.form1.id.value = id;
	document.frames["helper"].document.form1.action = context
			+ "/system/annex.do?method=view";
	document.frames["helper"].document.form1.submit();
}

function deleteAnnex(id, name, fname) {
	if (confirm("确定删除附件 '" + name + "'")) {
		var url = context + "/system/annex.do?method=delete&id=" + id;
		var res = sendRequest(url);
		if (res == 1) {
			var annex = document.createElement("input");
			annex.name = fname;
			annex.type = "file";
			annex.style.width = "635px";
			$(id).parentNode.appendChild(annex);
			$(id).parentNode.appendChild(document.createElement("br"));
			$(id).removeNode(true);
		}
	}
}

/* 处理数字类型表单项 */
function checkNumber() {
	var rnt = true;
	var items = document.getElementsByTagName("input");
	for (var i = 0; i < items.length; i++) {
		if ((items[i].getAttribute("coltype") == "integer" || items[i]
				.getAttribute("coltype") == "long")
				&& !isblank(items[i]) && !isinteger(items[i])) {
			alert(items[i].getAttribute("collabel") + "需要填写数字类型的数据(不可带小数位)");
			rnt = false;
			break;
		} else if ((items[i].getAttribute("coltype") == "double" || items[i]
				.getAttribute("coltype") == "float")
				&& !isblank(items[i]) && !isfloat(items[i])) {
			alert(items[i].getAttribute("collabel") + "需要填写数字类型的数据(可带小数位)");
			rnt = false;
			break;
		}
	}

	return rnt;
}

/* 处理checkbox表单项 */
function handleCheckbox() {
	var checkboxs = T("checkbox");

	for (var i = 0; i < checkboxs.length; i++) {
		var ht = $(checkboxs[i].name + "_handleType").value;

		if (ht == 1 && !checkboxs[i].checked) {
			var tname = checkboxs[i].name;
			checkboxs[i].name = tname + "_";

			createHidden(tname, "");
		}
	}
}

/* 抄送办理 */
function handleCC() {
	var tree = new Ext.tree.TreePanel({
		id : 'tree',
		// singleExpand : true,
		frame : false,
		// checkModel : 'single',
		// onlyLeafCheckable : true,
		border : false,
		autoScroll : true,
		animate : true,
		rootVisible : false,
		loader : new Ext.tree.TreeLoader({
			dataUrl : context
					+ '/system/group/groupmapscript.jsp?type=NOROOT_GROUPUSER_CHECKALL',
			baseParams : {
		// active : 'purview4GUSelectForm'
			}
		}),
		root : new Ext.tree.AsyncTreeNode({
					allowChildren : true,
					expanded : true,
					text : '选择传阅', // 节点名称
					draggable : false, // 是否支持拖动
					id : '0' // 节点id
				}),
		listeners : {
			'click' : function(node) {
				if (!node.isLeaf() && node.isExpanded()) {
					node.collapse();
				} else if (!node.isLeaf() && !node.isExpanded()) {
					node.expand();
				}
			},
			'load' : function(node) {
				if (node.id == '0') {

				}

				for (var j = 0; j < node.childNodes.length; j++) {
					if (hasSelectNode(node.childNodes[j])) {
						node.childNodes[j].attributes.checked = true;
					}
				}
			}
		}
	});

	tree.root.expand();

	var win = new Ext.Window({
				id : 'win',
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 400,
				height : 500,
				title : '<font class="oaFont">文件传阅范围设置...</font>',
				resizable : false,
				plain : true,
				modal : true,

				items : [tree],

				buttons : [{
					text : ' 确 定 ',
					handler : function() {
						var names = '', ids = '', types = '', selNodes = tree
								.getChecked();
						Ext.each(selNodes, function(node) {
									if (names.length > 0) {
										names += ',';
										ids += ',';
										types += ',';
									}
									names += node.text;
									ids += node.attributes.realid;
									types += node.attributes.type;
								});
						createHidden('ccids', ids);
						createHidden('ccnames', names);
						createHidden('cctypes', types);
						win.close();
					}
				}, {
					text : ' 取  消 ',
					handler : function() {
						createHidden('ccids', '');
						createHidden('ccnames', '');
						createHidden('cctypes', '');
						win.close();
					}
				}, {
					text : ' 关 闭 ',
					handler : function() {
						win.close();
					}
				}]
			});

	win.show();
}

/**
 * 是否选择了节点
 * 
 * @param {}
 *            node
 * @return {}
 */
function hasSelectNode(nd) {
	var rnt = false;

	if ($('ccids') && $('ccids').value != '') {
		var idstr = $('ccids').value.split(',');
		var typestr = $('cctypes').value.split(',');
		for (var i = 0; i < idstr.length; i++) {
			if (idstr[i] == nd.attributes.realid
					&& typestr[i] == nd.attributes.type) {
				rnt = true;
				break;
			}
		}
	}

	return rnt;
}

/**
 * 打印
 */
function handlePrint(printTempUrl) {
	if (printTempUrl && printTempUrl != "") {
		var url = context + "/system/workflow/print.jsp";

		var args = new Array();
		args[0] = (context + printTempUrl);
		args[1] = document;

		var result = window
				.showModalDialog(
						url,
						args,
						"dialogWidth:800px;dialogHeight:600px;center:yes;help:no;scroll:no;status:no;resizable:yes;");

	} else {
		alert("没有定义正文");
	}
}