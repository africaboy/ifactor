/**
 * 保存单表内容信息
 * 
 * @param {}
 *            fun1
 * @param {}
 *            fun10
 */
function saveTableSilently(tableNames, handleTypes, counterNames, checkFunc,
		forwardFunc, lis) {
	var params = {
		tableNames : tableNames,
		handleTypes : handleTypes,
		counterNames : counterNames,
		listener : (lis != null ? lis : '')
	};

	if (checkFunc == null || checkFunc(params) == true) {
		Ext.Ajax.request({
					// 请求地址
					url : context + '/system/baseworksave.do',
					params : params,
					// 成功时回调
					success : function(response, options) {
						// 获取响应的json字符串
						Ext.MessageBox.hide();

						var json = response.responseText;
						var o = Ext.util.JSON.decode(json);

						if (o.success) {
							// alert("提交处理成功！");

							if (forwardFunc != null) {
								forwardFunc();
							}
						} else {
							// Ext.Msg.alert('提示', o.msg);

							Ext.MessageBox.show({
										title : 'Submitted to deal with failure',
										msg : o.msg,
										icon : Ext.MessageBox.ERROR
									});
						}
					}
				});
	}
}

/**
 * 保存单表内容信息
 * 
 * @param {}
 *            fun1
 * @param {}
 *            fun10
 */
function saveTable(tableNames, handleTypes, counterNames, checkFunc,
		forwardFunc, msg, lis) {
	var params = {
		tableNames : tableNames,
		handleTypes : handleTypes,
		counterNames : counterNames,
		listener : (lis != null ? lis : '')
	};

	if (checkFunc == null || checkFunc(params) == true) {
		Ext.MessageBox.confirm('Hint', (msg != null
						? msg
						: 'Sure to submit to save？'), function(e) {
					if (e == "yes") {
						Ext.MessageBox.wait('Submitted in the process...');
						Ext.Ajax.request({
							// 请求地址
							url : context + "/system/baseworksave.do",
							params : params,
							// 提交参数组
							fileUpload : true,
							form : 'form1',
							scope : 'form1',
							// 成功时回调
							success : function(response, options) {
								// 获取响应的json字符串
								Ext.MessageBox.hide();

								var json = response.responseText;
								var o = Ext.util.JSON.decode(json);

								if (o.success) {
									// alert("提交处理成功！");

									if (forwardFunc != null) {
										forwardFunc();
									}
								} else {
									// Ext.Msg.alert('提示', o.msg);

									Ext.MessageBox.show({
										title : 'Submitted to deal with failure',
										msg : o.msg,
										icon : Ext.MessageBox.ERROR
									});
								}
							}
						});
					}
				});
	}
}

/**
 * 保存单表内容信息(ext form)
 * 
 * @param {}
 *            fun1
 * @param {}
 *            fun10
 */
function saveTable4Ext(tableNames, handleTypes, counterNames, checkFunc,
		forwardFunc, extForm, msg, lis) {
	var params = {
		tableNames : tableNames,
		handleTypes : handleTypes,
		counterNames : counterNames,
		listener : (lis != null ? lis : '')
	};

	if (checkFunc == null || checkFunc(params) == true) {
		Ext.MessageBox.confirm('Hint', (msg != null
						? msg
						: 'Sure to submit to save？'), function(e) {
					if (e == "yes") {
						Ext.MessageBox.wait('Submitted in the process...');

						extForm.getForm().submit({
							url : context + "/system/baseworksave.do",
							params : params,
							method : 'POST',
							success : function(form, action) {
								// 获取响应的json字符串
								Ext.MessageBox.hide();

								var json = action.response.responseText;
								var o = Ext.util.JSON.decode(json);

								if (forwardFunc != null) {
									forwardFunc();
								}
							},
							failure : function(form, action) {
								Ext.MessageBox.show({
											title : 'Submitted to deal with failure',
											msg : action.response.responseText,
											icon : Ext.MessageBox.ERROR
										});
							}
						});

					}
				});
	}
}

/**
 * 修改单表内容信息
 * 
 * @param {}
 *            fun1
 * @param {}
 *            fun10
 */
function updateTable(tableNames, handleTypes, counterNames, checkFunc,
		forwardFunc, msg, lis) {
	var params = {
		tableNames : tableNames,
		handleTypes : handleTypes,
		counterNames : counterNames,
		listener : (lis != null ? lis : '')
	};

	if (checkFunc == null || checkFunc(params) == true) {
		Ext.MessageBox.confirm('Hint', (msg != null
						? msg
						: 'Determine commit changes?'), function(e) {
					if (e == "yes") {
						Ext.MessageBox.wait('Submitted in the process...');
						Ext.Ajax.request({
							// 请求地址
							url : context + "/system/baseworkupdate.do",
							params : params,
							// 提交参数组
							fileUpload : true,
							form : 'form1',
							scope : 'form1',
							// 成功时回调
							success : function(response, options) {
								// 获取响应的json字符串
								Ext.MessageBox.hide();

								var json = response.responseText;
								var o = Ext.util.JSON.decode(json);

								if (o.success) {
									// alert("提交修改成功！");

									if (forwardFunc != null) {
										forwardFunc();
									}
								} else {
									// Ext.Msg.alert('提示', '提交修改失败！');
									Ext.MessageBox.show({
										title : 'Submitted to deal with failure',
										msg : o.msg,
										icon : Ext.MessageBox.ERROR
									});
								}
							}
						});
					}
				});
	}
}

/**
 * 保存单表内容信息(ext form)
 * 
 * @param {}
 *            fun1
 * @param {}
 *            fun10
 */
function updateTable4Ext(tableNames, handleTypes, counterNames, checkFunc,
		forwardFunc, extForm, msg, lis) {
	var params = {
		tableNames : tableNames,
		handleTypes : handleTypes,
		counterNames : counterNames,
		listener : (lis != null ? lis : '')
	};

	if (checkFunc == null || checkFunc(params) == true) {
		Ext.MessageBox.confirm('Hint', (msg != null
						? msg
						: 'Determine commit changes?'), function(e) {
					if (e == "yes") {
						Ext.MessageBox.wait('Submitted in the process...');

						extForm.getForm().submit({
							url : context + "/system/baseworkupdate.do",
							params : params,
							method : 'POST',
							success : function(form, action) {
								// 获取响应的json字符串
								Ext.MessageBox.hide();

								var json = action.response.responseText;
								var o = Ext.util.JSON.decode(json);

								if (forwardFunc != null) {
									forwardFunc();
								}
							},
							failure : function(form, action) {
								Ext.MessageBox.show({
											title : 'Submitted to deal with failure',
											msg : action.response.responseText,
											icon : Ext.MessageBox.ERROR
										});
							}
						});

					}
				});
	}
}

/**
 * 混合操作表内容信息
 * 
 * @param {}
 *            fun1
 * @param {}
 *            fun10
 */
function remixTable(tableNames, handleTypes, counterNames, checkFunc,
		forwardFunc, msg, lis) {
	var params = {
		tableNames : tableNames,
		handleTypes : handleTypes,
		counterNames : counterNames,
		listener : (lis != null ? lis : '')
	};

	if (checkFunc == null || checkFunc(params) == true) {
		Ext.MessageBox.confirm('Hint', (msg != null
						? msg
						: 'Sure to submit to save?'), function(e) {
					if (e == "yes") {
						Ext.MessageBox.wait('Submitted in the process...');
						Ext.Ajax.request({
									// 请求地址
									url : context + "/system/baseworkremix.do",
									params : params,
									// 提交参数组
									fileUpload : true,
									form : 'form1',
									scope : 'form1',
									// 成功时回调
									success : function(response, options) {
										// 获取响应的json字符串
										Ext.MessageBox.hide();

										var json = response.responseText;
										var o = Ext.util.JSON.decode(json);

										if (o.success) {
											// alert("提交修改成功！");

											if (forwardFunc != null) {
												forwardFunc();
											}
										} else {
											// Ext.Msg.alert('提示', '提交处理失败！');
											Ext.MessageBox.show({
														title : '提交处理失败',
														msg : o.msg,
														icon : Ext.MessageBox.ERROR
													});
										}
									}
								});
					}
				});
	}
}

/**
 * 混合操作表内容信息(ext form)
 * 
 * @param {}
 *            fun1
 * @param {}
 *            fun10
 */
function remixTable4Ext(tableNames, handleTypes, counterNames, checkFunc,
		forwardFunc, extForm, msg, lis) {
	var params = {
		tableNames : tableNames,
		handleTypes : handleTypes,
		counterNames : counterNames,
		listener : (lis != null ? lis : '')
	};

	if (checkFunc == null || checkFunc(params) == true) {
		Ext.MessageBox.confirm('Hint', (msg != null
						? msg
						: 'Sure to submit to save?'), function(e) {
					if (e == "yes") {
						Ext.MessageBox.wait('Submitted in the process...');

						extForm.getForm().submit({
							url : context + "/system/baseworkremix.do",
							params : params,
							method : 'POST',
							success : function(form, action) {
								// 获取响应的json字符串
								Ext.MessageBox.hide();

								var json = action.response.responseText;
								var o = Ext.util.JSON.decode(json);

								if (forwardFunc != null) {
									forwardFunc(o);
								}
							},
							failure : function(form, action) {
								Ext.MessageBox.show({
											title : 'Submitted to deal with failure',
											msg : action.response.responseText,
											icon : Ext.MessageBox.ERROR
										});
							}
						});

					}
				});
	}
}

/**
 * 删除单表内容信息
 * 
 * @param {}
 *            fun1
 * @param {}
 *            fun10
 */
function deleteTable(tableNames, handleTypes, counterNames, checkFunc,
		forwardFunc, lis) {
	var params = {
		tableNames : tableNames,
		handleTypes : handleTypes,
		counterNames : counterNames,
		listener : (lis != null ? lis : '')
	};

	if (checkFunc == null || checkFunc(params) == true) {
		Ext.MessageBox.confirm('Hint', 'Sure to delete?', function(e) {
			if (e == "yes") {
				Ext.MessageBox.wait('Deleting...');
				Ext.Ajax.request({
					// 请求地址
					url : context + "/system/baseworkdelete.do",
					params : params,
					// 提交参数组
					fileUpload : true,
					form : 'form1',
					scope : 'form1',
					// 成功时回调
					success : function(response, options) {
						// 获取响应的json字符串
						Ext.MessageBox.hide();

						var json = response.responseText;
						var o = Ext.util.JSON.decode(json);

						if (o.success) {
							// alert("删除成功！");

							if (forwardFunc != null) {
								forwardFunc();
							}
						} else {
							// Ext.Msg.alert('提示', '删除失败！');
							Ext.MessageBox.show({
										title : 'Submitted to deal with failure',
										msg : o.msg,
										icon : Ext.MessageBox.ERROR
									});
						}
					}
				});
			}
		});
	}
}

/**
 * 删除主表及子表内容信息
 * 
 * @param {}
 *            fun1
 * @param {}
 *            fun10
 */
function deleteTableI(primaryTableName, tableNames, pkId, checkFunc,
		forwardFunc, lis) {
	var params = {
		tableNames : tableNames,
		primaryTableName : primaryTableName,
		id : pkId,
		listener : (lis != null ? lis : '')
	};

	if (checkFunc == null || checkFunc(params) == true) {
		Ext.MessageBox.confirm('Hint', 'Sure to delete?', function(e) {
					if (e == "yes") {
						Ext.MessageBox.wait('Deleting...');
						Ext.Ajax.request({
									// 请求地址
									url : context
											+ "/system/baseworkdeleteI.do",
									params : params,
									method : 'POST',
									// 成功时回调
									success : function(response, options) {
										// 获取响应的json字符串
										Ext.MessageBox.hide();

										var json = response.responseText;
										var o = Ext.util.JSON.decode(json);

										if (o.success) {

											if (forwardFunc != null) {
												forwardFunc();
											}
										} else {
											Ext.Msg.alert('Hint',
													'Delete failed!');
										}
									}
								});
					}
				});
	}
}

/**
 * 修改单表指定的字段内容信息
 * 
 * @param {}
 *            fun1
 * @param {}
 *            fun10
 */
function updateColumn(tableNames, handleTypes, counterNames, params, checkFunc,
		forwardFunc, lis) {
	if (checkFunc == null || checkFunc(params) == true) {
		if (params == null) {
			alert('Update parameter is invalid, can not to update the data!');
		} else {
			params.tableNames = tableNames;
			params.handleTypes = handleTypes;
			params.counterNames = counterNames;
			params.listener = (lis != null ? lis : '');

			Ext.MessageBox.wait('Submitted in the process...');
			Ext.Ajax.request({
						// 请求地址
						url : context + '/system/baseworkupdate.do',
						params : params,
						// 成功时回调
						success : function(response, options) {
							// 获取响应的json字符串
							Ext.MessageBox.hide();

							var json = response.responseText;
							var o = Ext.util.JSON.decode(json);

							if (o.success) {
								// alert('提交处理成功！');

								if (forwardFunc != null) {
									forwardFunc();
								}
							} else {
								// Ext.Msg.alert('提示', '提交处理失败！');
								Ext.MessageBox.show({
											title : 'Submitted to deal with failure',
											msg : o.msg,
											icon : Ext.MessageBox.ERROR
										});
							}
						}
					});
		}
	}
}

/**
 * 初始化table信息
 * 
 * @param {}
 *            tableName 表名称
 * @param {}
 *            id 主键字段ID
 * @param {}
 *            tp 查询类型
 * @param {}
 *            initFunc 回调函数
 * @param {}
 *            orderByName 排序字段名称
 * @param {}
 *            orderBy 排序方式
 * 
 * 
 */
function initTable(tableName, id, tp, initFunc, orderByName, orderBy) {
	if (trim(id) != '') {
		Ext.MessageBox.wait('Data loading...');
		Ext.Ajax.request({
					// 请求地址
					url : context + '/system/baseworkselect.do',
					params : {
						tableName : tableName,
						handleType : tp,
						id : id,
						orderByName : orderByName,
						orderBy : orderBy
					},
					// 成功时回调
					success : function(response, options) {
						// 获取响应的json字符串
						Ext.MessageBox.hide();

						var json = response.responseText;
						var o = Ext.util.JSON.decode(json);

						if (o.success) {

							if (initFunc != null) {
								initFunc(o);
							}
						} else {
							Ext.Msg.alert('Hint', 'The data load failed!');
						}
					},
					failure : function(rs, request) {
						Ext.Msg.alert('Hint', 'Unknown exception error');
					}
				});
	} else {
		if (initFunc != null) {
			initFunc(null);
		}
	}
}

/**
 * 初始化table信息
 * 
 * @param {}
 *            tableName 表名称
 * @param {}
 *            id 查询项值
 * @param {}
 *            columnName 查询项对应字段名称
 * @param {}
 *            tp 查询类型
 * @param {}
 *            initFunc 回调函数
 * @param {}
 *            orderByName 排序字段名称
 * @param {}
 *            orderBy 排序方式
 * 
 * 
 */
function initTableI(tableName, id, columnName, tp, initFunc, orderByName,
		orderBy) {
	if (trim(id) != '') {
		Ext.MessageBox.wait('Data loading...');
		Ext.Ajax.request({
					// 请求地址
					url : context + '/system/baseworkselectI.do',
					params : {
						tableName : tableName,
						handleType : tp,
						id : id,
						columnName : columnName,
						orderByName : orderByName,
						orderBy : orderBy
					},
					// 成功时回调
					success : function(response, options) {
						// 获取响应的json字符串
						Ext.MessageBox.hide();

						var json = response.responseText;
						var o = Ext.util.JSON.decode(json);

						if (o.success) {

							if (initFunc != null) {
								initFunc(o);
							}
						} else {
							Ext.Msg.alert('Hint', 'The data load failed!');
						}
					},
					failure : function(rs, request) {
						Ext.Msg.alert('Hint', 'Unknown exception error');
					}
				});
	} else {
		if (initFunc != null) {
			initFunc(null);
		}
	}
}

/**
 * 初始化table信息
 * 
 * @param {}
 *            tableName 表名称
 * @param {}
 *            id 查询项值
 * @param {}
 *            columnName 查询项对应字段名称
 * @param {}
 *            tp 查询类型
 * @param {}
 *            initFunc 回调函数
 * @param {}
 *            orderByName 排序字段名称
 * @param {}
 *            orderBy 排序方式
 * 
 * 
 */
function initTableII(jsonparams, initFunc) {
	if (trim(id) != '') {
		Ext.MessageBox.wait('Data loading...');
		Ext.Ajax.request({
					// 请求地址
					url : context + '/system/baseworkselectII.do',
					params : {
						jsonparams : jsonparams
					},
					// 成功时回调
					success : function(response, options) {
						// 获取响应的json字符串
						Ext.MessageBox.hide();

						var json = response.responseText;
						var o = Ext.util.JSON.decode(json);

						if (o.success) {

							if (initFunc != null) {
								initFunc(o);
							}
						} else {
							Ext.Msg.alert('Hint', 'The data load failed!');
						}
					},
					failure : function(rs, request) {
						Ext.Msg.alert('Hint', 'Unknown exception error');
					}
				});
	} else {
		if (initFunc != null) {
			initFunc(null);
		}
	}
}

/**
 * 初始化table-vew信息
 * 
 * @param {}
 *            tableName 表名称
 * @param {}
 *            id 查询项值
 * @param {}
 *            columnName 查询项对应字段名称
 * @param {}
 *            tp 查询类型
 * @param {}
 *            initFunc 回调函数
 * @param {}
 *            orderByName 排序字段名称
 * @param {}
 *            orderBy 排序方式
 * 
 * 
 */
function initTableView(tableViewID, pkid, initFunc, warting) {
	if (trim(pkid) != '') {
		if (warting == null || warting == true) {
			Ext.MessageBox.wait('Data loading...');
		}
		Ext.Ajax.request({
					// 请求地址
					url : context
							+ '/system/tableview.do?method=getTableViewData',
					params : {
						tableViewID : tableViewID,
						pkid : pkid
					},
					// 成功时回调
					success : function(response, options) {
						// 获取响应的json字符串
						Ext.MessageBox.hide();

						var json = response.responseText;
						var o = Ext.util.JSON.decode(json);

						if (o.success) {

							if (initFunc != null) {
								initFunc(o);
							}
						} else {
							Ext.Msg.alert('Hint', 'The data load failed!');
						}
					},
					failure : function(rs, request) {
						Ext.Msg.alert('Hint', 'Unknown exception error!');
					}
				});
	} else {
		if (initFunc != null) {
			initFunc(null);
		}
	}
}

/**
 * 混合操作视图内容信息(ext form)
 * 
 * @param {}
 *            fun1
 * @param {}
 *            fun10
 */
function remixTableView4Ext(tableViewID, checkFunc, forwardFunc, extForm, msg) {
	var params = {
		tableViewID : tableViewID
	};

	if (checkFunc == null || checkFunc(params) == true) {
		Ext.MessageBox.confirm('Hint', (msg != null ? msg : 'Sure to submit to save?'), function(
						e) {
					if (e == "yes") {
						Ext.MessageBox.wait('Submitted in the process...');

						extForm.getForm().submit({
							url : context
									+ "/system/tableview.do?method=remixTableViewData",
							params : params,
							method : 'POST',
							success : function(form, action) {
								// 获取响应的json字符串
								Ext.MessageBox.hide();

								var json = action.response.responseText;
								var o = Ext.util.JSON.decode(json);

								if (forwardFunc != null) {
									forwardFunc(o);
								}
							},
							failure : function(form, action) {
								Ext.MessageBox.show({
											title : 'Submitted to deal with failure',
											msg : action.response.responseText,
											icon : Ext.MessageBox.ERROR
										});
							}
						});

					}
				});
	}
}
