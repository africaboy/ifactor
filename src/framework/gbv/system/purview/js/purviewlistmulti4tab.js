var pageSize = 20;

var purviewType = 'purview';
/**
 * 权限设置list返回对象作为tab页容器)
 * 
 * @param {}
 *            tabid
 * @param {}
 *            areaid
 */
function purviewList4multi(oid, oname, otype, otname, pt, title) {
	if (pt && pt != "") {
		purviewType = pt;
	}

	var cm = new Ext.grid.ColumnModel([{
				header : 'Object',
				width : 150,
				sortable : true,
				dataIndex : 'rname'
			}, {
				header : 'Type',
				width : 75,
				sortable : true,
				dataIndex : 'rtype',
				renderer : renderPurviewType
			}, {
				header : 'Permission',
				width : 100,
				sortable : false,
				renderer : renderMultiPurviewSet,
				dataIndex : 'purview'
			}, {
				header : '',
				width : 100,
				sortable : false,
				dataIndex : 'pid',
				renderer : renderMultiPurviewRow
			}]);
	var fd = ['pid', 'rid', 'rname', 'rtype', 'oid', 'oname', 'otype',
			'otname', 'otype', 'purview', 'purviewName', 'inherit'];

	var url = context + '/system/purview.do?method=purview&oid=' + oid
			+ '&otype=' + otype + '&wbtype=' + purviewType;

	if (Ext.getCmp('purviewList4multiGrid')) {
		Ext.getCmp('purviewList4multiGrid').reconfigure(
				new Ext.data.JsonStore({
							url : url,
							idProperty : 'id',
							remoteSort : false,
							totalProperty : 'totalCount',
							root : 'purviewList',
							fields : fd
						}), cm);

		var store = Ext.getCmp('purviewList4multiGrid').getStore();
		Ext.getCmp('purviewList4multiGrid').getBottomToolbar().bind(store);
		store.reload();
	} else {
		var store = new Ext.data.JsonStore({
					url : url,
					idProperty : 'id',
					remoteSort : false,
					totalProperty : 'totalCount',
					root : 'purviewList',
					fields : fd
				});

		store.load({
					callback : function(r, options, success) {
						if (success == false) {
							// do nothing
						} else {
							if (store.getCount() > 0) {
								Ext.getCmp('purview4submit').enable();
							}
						}
					}
				});

		purviewList4multiGrid = new Ext.grid.EditorGridPanel({
					id : 'purviewList4multiGrid',
					store : store,
					cm : cm,
					title : title,
					stripeRows : true,
					autoExpandColumn : 'rname',
					border : false,
					autoWidth : true,
					height : 200,
					viewConfig : {
						forceFit : true
					},
					// config options for stateful behavior
					stateful : true,
					stateId : 'grid',
					loadMask : {
						msg : "Loading..."
					},
					tbar : new Ext.Toolbar({
								id : 'purviewmultitoolbar',
								autoWidth : true,
								autoShow : true,
								items : []
							}),
					bbar : new Ext.PagingToolbar({
								pageSize : pageSize,// 每页显示的记录值
								store : store,
								displayInfo : true,
								displayMsg : 'Total records {0} - {1} of {2}',
								emptyMsg : "No records"
							})
				});
	}

	var tb = Ext.getCmp('purviewList4multiGrid').getTopToolbar();

	if (tb.items.length > 0) {
		var item0 = tb.items.get(0);
		var item1 = tb.items.get(1);
		var item2 = tb.items.get(2);
		var item3 = tb.items.get(3);
		var item4 = tb.items.get(4);

		item0.destroy();
		item1.destroy();
		item2.destroy();
		item3.destroy();
		item4.destroy();
	}
	tb.addButton({
				id : 'purview4roleMenu',
				iconCls : 'icon-purview4role',
				text : 'Role',
				menu : getPurview4RoleSelectMenu(oid, oname, otype, otname,
						'purview4roleMenu', true)
			});

	tb.add('-');

	tb.addButton({
				id : 'purview4userMenu',
				iconCls : 'icon-purview4user',
				text : 'Group/User',
				menu : getPurview4GUSelectMenu(oid, oname, otype, otname,
						'purview4userMenu', true)
			});

	tb.add('-');

	tb.addButton({
				id : 'purview4submit',
				iconCls : 'icon-purviewsubmit',
				text : 'Save',
				disabled : true,
				handler : function() {
					saveMultiPurviewObjs(oid, oname, otype, otname,
							purviewList4multiGrid);
				}
			});

	return purviewList4multiGrid;
}

/**
 * render 类型
 * 
 * @param {}
 *            value
 * @param {}
 *            cellmeta
 * @param {}
 *            record
 * @param {}
 *            rowIndex
 * @param {}
 *            columnIndex
 * @param {}
 *            store
 * @return {}
 */
function renderPurviewType(value, cellmeta, record, rowIndex, columnIndex,
		store) {
	var tpname = '';
	if (record.data.rtype == 'role') {
		tpname = 'Role';
	} else if (record.data.rtype == 'group') {
		tpname = 'Group';
	} else if (record.data.rtype == 'user') {
		tpname = 'User';
	}

	return tpname;
}

/**
 * render 授权列表
 * 
 * @param {}
 *            value
 * @param {}
 *            cellmeta
 * @param {}
 *            record
 * @param {}
 *            rowIndex
 * @param {}
 *            columnIndex
 * @param {}
 *            store
 * @return {}
 */
function renderMultiPurviewSet(value, cellmeta, record, rowIndex, columnIndex,
		store) {
	var psetid = 'pset_' + record.data.rid;

	var divhtml = '';
	var purviews = record.data.purview;

	if (purviews != '') {
		purviewstr = purviews.split(',');
		var pnamestr = record.data.purviewName.split(',');
		var pidstr = record.data.pid.split(',');
		for (var i = 0; i < purviewstr.length; i++) {
			var did = psetid + '_' + purviewstr[i];

			divhtml += '<div id="'
					+ did
					+ '" pid="'
					+ pidstr[i]
					+ '" purview="'
					+ purviewstr[i]
					+ '" pname="'
					+ pnamestr[i]
					+ '">&nbsp;<img style="cursor:hand;" src="'
					+ context
					+ '/system/purview/images/del.gif" title="Delete it" style="cursor:hand;" onclick="javascript:removeDivSet(\''
					+ did + '\');"/>&nbsp;' + pnamestr[i] + '</div>';
		}
	}

	var resultString = String.format('<div id="' + psetid
					+ '" style="margin-bottom:2px;">' + divhtml + '</div>',
			record.data.rid, record.data.rname, record.data.rtype, value,
			rowIndex);

	return resultString;

}

/**
 * 多授权设置
 * 
 * @param {}
 *            id
 * 
 */
function MultiPurviewSet(id) {
	var ids = getSelectedPurview(id);

	// purviewType
	var multiPurviewSetWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 400,
				height : 400,
				title : 'Permission settings',
				resizable : false,
				plain : true,
				modal : true,

				items : [wbgridlist(purviewType, ids)],

				buttons : [{
							text : 'Save',
							handler : function() {
								handleMultiPurviewSet(id);
								multiPurviewSetWin.close();
								multiPurviewSetWin = null;
							}
						}, {
							text : 'Close',
							handler : function() {
								multiPurviewSetWin.close();
								multiPurviewSetWin = null;
							}
						}]
			});
	multiPurviewSetWin.show(this);
}

/**
 * 获取已选中的权限键值
 * 
 * @param {}
 *            id
 */
function getSelectedPurview(id) {
	var ids = '';
	var items = Ext.get(id).dom.getElementsByTagName('div');
	for (var i = 0; i < items.length; i++) {
		ids += items[i].getAttribute('purview') + ',';
	}

	return ids;
}

/**
 * 已存在授权信息id(不包括尚未保存的授权信息)
 * 
 * @param {}
 *            id
 * @return {}
 */
function getSelectedPid(id) {
	var ids = '';
	var items = Ext.get(id).dom.getElementsByTagName('div');
	for (var i = 0; i < items.length; i++) {
		if (items[i].getAttribute('pid') != '') {
			ids += items[i].getAttribute('pid') + ',';
		}
	}

	return ids;
}

/**
 * 已存在授权信息id(包括尚未保存的授权信息)
 * 
 * @param {}
 *            id
 * @return {}
 */
function getSelectedPid1(id) {
	var ids = '';
	var items = Ext.get(id).dom.getElementsByTagName('div');
	for (var i = 0; i < items.length; i++) {
		if (items[i].getAttribute('pid') != '') {
			ids += items[i].getAttribute('pid') + ',';
		} else {
			ids += 0 + ','
		}
	}

	return ids;
}

/**
 * 保存成功后设置权限id
 * 
 * @param {}
 *            areaid
 * @param {}
 *            ids
 */
function setSelectedPid(areaid, ids) {
	var idstr = ids.split(",");

	var items = Ext.get(areaid).dom.getElementsByTagName('div');
	for (var i = 0; i < items.length; i++) {
		items[i].setAttribute('pid', idstr[i]);
	}
}

/**
 * 选择权限后返回处理
 * 
 * @param {}
 *            id
 */
function handleMultiPurviewSet(id) {
	var divhtml = '';
	var ids = '';
	var names = '';

	var selNodes = Ext.getCmp('wblistgrid').getSelectionModel().getSelections();
	Ext.each(selNodes, function(node) {
		var did = id + '_' + node.data.id;

		if (Ext.get(did) == null) {
			divhtml += '<div id="'
					+ did
					+ '" pid="" purview="'
					+ node.data.id
					+ '" pname="'
					+ node.data.name
					+ '">&nbsp;<img style="cursor:hand;" src="'
					+ context
					+ '/system/purview/images/del.gif" title="Delete it" style="cursor:hand;" onclick="javascript:removeDivSet(\''
					+ did + '\');"/>&nbsp;' + node.data.name + '</div>';
		}
	});
	Ext.get(id).dom.innerHTML += divhtml;
}

/**
 * 删除权限设置
 * 
 * @param {}
 *            did
 */
function removeDivSet(did) {
	if (Ext.get(did).dom.getAttribute('pid') != '') {
		removeDivSetReal(did);
	} else {
		var pNode = Ext.get(did).dom.parentNode;
		pNode.removeChild(Ext.get(did).dom);
	}
}

/**
 * 
 * @param {}
 *            did
 */
function removeDivSetReal(did) {
	Ext.MessageBox.wait('Deleting...');

	var pid = Ext.get(did).dom.getAttribute('pid');

	Ext.Ajax.request({
				url : context + '/system/purview.do?method=delete',
				method : 'POST',
				params : {
					pid : pid
				},
				scope : this,
				success : function(response) {
					Ext.MessageBox.hide();
					var pNode = Ext.get(did).dom.parentNode;
					pNode.removeChild(Ext.get(did).dom);
				},
				failure : function(response) {
					Ext.MessageBox.hide();
					Ext.MessageBox.show({
								title : 'Hint',
								msg : response.responseText,
								icon : Ext.MessageBox.ERROR
							});
				}

			});
}

function renderMultiPurviewRow(value, cellmeta, record, rowIndex, columnIndex,
		store) {
	var psetid = 'pset_' + record.data.rid;

	var resultString = String
			.format(
					'<a href="javascript:void(0);" onclick="javascript:MultiPurviewSet(\''
							+ psetid
							+ '\');">Permission settings</a>&nbsp;'
							+ '<a href="javascript:void(0);" onclick="javascript:delMultiPurviewObjs(\'{0}\', \'{1}\', \'{2}\', \'{3}\', \'{4}\', \'{5}\');">Delete</a>',
					record.data.rid, record.data.rname, record.data.rtype,
					value, rowIndex, psetid);

	return resultString;

}

function addRowInMultiPurviewGrid(ids, names, types, oid, oname, otype, otname) {
	// purviewList4multiGrid
	var idstr = ids.split(",");
	var namestr = names.split(",");
	var typestr = types.split(",");
	if (ids != '') {
		for (var i = 0; i < idstr.length; i++) {
			if (!hasSelectedMultiPurview(idstr[i], typestr[i])) {
				var Plant = Ext.getCmp('purviewList4multiGrid').getStore().recordType;

				var p = new Plant({
							rid : idstr[i],
							rname : namestr[i],
							rtype : typestr[i],
							purview : 0,
							oid : oid,
							oname : oname,
							otype : otype,
							otname : otname,
							inherit : 0,
							pid : ''
						});

				Ext.getCmp('purviewList4multiGrid').getStore().add(p);
			}
		}

		Ext.getCmp('purview4submit').enable();
	}
	// purviewList4multiGrid.startEditing(0, 2);
}

function saveMultiPurviewObjs(rid, rname, rtype, pid, rowIdx, areaid) {
	var countName = 0;
	var countNameStr = '';

	var params = '({'

	for (var i = 0; i < Ext.getCmp('purviewList4multiGrid').getStore()
			.getCount(); i++) {
		var record = Ext.getCmp('purviewList4multiGrid').getStore().getAt(i);

		var areaid = 'pset_' + record.data.rid;

		var ids = getSelectedPurview(areaid);
		var pids = getSelectedPid1(areaid);

		if (ids == '') {
			Ext.Msg.alert('Hint', 'Please grant permission to (' + record.data.rname + ')');
			params = null;
			break;
		}

		var idstr = ids.substring(0, ids.length - 1).split(',');
		var pidstr = pids.substring(0, pids.length - 1).split(',');

		for (var j = 0; j < idstr.length; j++) {
			params += 'rid_' + countName + ' : "' + record.data.rid + '",';
			params += 'rname_' + countName + ' : "' + record.data.rname + '",';
			params += 'rtype_' + countName + ' : "' + record.data.rtype + '",';
			params += 'pid_' + countName + ' : "'
					+ (pidstr[j] == '0' ? '' : pidstr[j]) + '",';
			params += 'oid_' + countName + ' : "' + record.data.oid + '",';
			params += 'oname_' + countName + ' : "' + record.data.oname + '",';
			params += 'otype_' + countName + ' : "' + record.data.otype + '",';
			params += 'otname_' + countName + ' : "' + record.data.otname
					+ '",';
			params += 'purview_' + countName + ' : "' + idstr[j] + '",';
			params += 'inherit_' + countName + ' : "' + record.data.inherit
					+ '",';

			countName++;
		}

	}

	if (params) {
		for (var i = 0; i < countName; i++) {
			if (i == countName - 1) {
				countNameStr += i;
			} else {
				countNameStr += i + ',';
			}
		}

		params += 'countName : "' + countNameStr + '"';

		params += '})';

		Ext.MessageBox.wait('Saving...');

		Ext.Ajax.request({
					url : context + '/system/purview.do?method=remixM',
					method : 'POST',
					params : eval(params),
					scope : this,
					success : function(response) {
						Ext.MessageBox.hide();
						Ext.Msg.alert('Hint', 'Grant permission success');

						Ext.getCmp('purviewList4multiGrid').getStore().reload();
					},
					failure : function(response) {
						Ext.MessageBox.hide();
						Ext.MessageBox.show({
									title : 'Hint',
									msg : response.responseText,
									icon : Ext.MessageBox.ERROR
								});
					}

				});
	}
}

var nowDelDivSet;
/**
 * 删除角色对象确认函数
 */
function delMultiPurviewObjs(rid, rname, rtype, purview, idx, areaid) {
	nowDelDivSet = areaid;
	Ext.MessageBox.confirm('Hint', 'Sure to delete permission', removeMultiPurviewObjs);
}

/**
 * 删除角色对象函数
 */
function removeMultiPurviewObjs(btn) {
	if (btn == 'yes') {
		var index = Ext.getCmp('purviewList4multiGrid').getSelectionModel()
				.getSelectedCell();

		var record = Ext.getCmp('purviewList4multiGrid').getStore()
				.getAt(index[0]);

		var ids = getSelectedPid(nowDelDivSet);

		if (ids != '') {
			Ext.MessageBox.wait('Deleting...');

			Ext.Ajax.request({
						url : context + '/system/purview.do?method=delete',
						method : 'POST',
						params : {
							pid : ids.substring(0, ids.length - 1)
						},
						scope : this,
						success : function(response) {
							Ext.MessageBox.hide();
							Ext.getCmp('purviewList4multiGrid').getStore()
									.remove(record);
							if (Ext.getCmp('purviewList4multiGrid').getStore()
									.getCount() == 0) {
								Ext.getCmp('purview4submit').disable();
							}
						},
						failure : function(response) {
							Ext.MessageBox.hide();
							Ext.MessageBox.show({
										title : 'Hint',
										msg : response.responseText,
										icon : Ext.MessageBox.ERROR
									});
						}

					});
		} else {
			Ext.getCmp('purviewList4multiGrid').getStore().remove(record);
			if (Ext.getCmp('purviewList4multiGrid').getStore().getCount() == 0) {
				Ext.getCmp('purview4submit').disable();
			}
		}
	}
};

/**
 * 是否已经设置该权限
 * 
 * @param {}
 *            id
 * @param {}
 *            type
 * @return {}
 */
function hasSelectedMultiPurview(id, type) {
	var r;

	var total = Ext.getCmp('purviewList4multiGrid').getStore().getCount();// 数据行数
	for (var j = 0; j < total; j++) {
		var record = Ext.getCmp('purviewList4multiGrid').getStore().getAt(j);
		if (record.data.rid == id && record.data.rtype == type) {
			r = true;
			break;
		}
	}

	return r;
}