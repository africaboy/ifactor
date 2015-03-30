var pageSize = 20;

var purviewType = 'purview';
/**
 * 权限设置list
 * 
 * @param {}
 *            tabid
 * @param {}
 *            areaid
 */
function purviewlist(oid, oname, otype, otname, pt) {
	if (Ext.get('purviewListGrid')) {
		// Ext.get(areaid).dom.innerHTML = "";
	}

	if (pt && pt != '') {
		purviewType = pt;
	}

	var purviewListStore = new Ext.data.JsonStore({
				idProperty : 'id',
				remoteSort : false,
				totalProperty : 'totalCount',
				root : 'purviewList',
				fields : ['pid', 'rid', 'rname', 'rtype', 'oid', 'oname',
						'otype', 'otname', 'otype', 'purview', 'inherit'],

				// load using script tags for cross domain, if the data in
				// on
				// the same domain as
				// this page, an HttpProxy would be better
				proxy : new Ext.data.ScriptTagProxy({
							url : context
									+ '/system/purview.do?method=purview&oid='
									+ oid + '&otype=' + otype
						})
			});

	purviewListStore.load({
				callback : function(r, options, success) {
					if (success == false) {
						// do nothing
					} else {
						if (purviewListStore.getCount() > 0) {
							Ext.getCmp('purview4submit').enable();
						}
					}
				}
			});

	purviewListGrid = new Ext.grid.EditorGridPanel({
		id : 'purviewListGrid',
		store : purviewListStore,
		columns : [{
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
					editor : getWBComboStore(purviewType, '', 'purview_', '',
							null, null, '0'),
					dataIndex : 'purview'
				}, {
					header : '',
					width : 50,
					sortable : false,
					dataIndex : 'pid',
					renderer : renderPurviewRow
				}],
		stripeRows : true,
		autoExpandColumn : 'oname',
		border : false,
		autoWidth : true,
		viewConfig : {
			forceFit : true
		},
		clicksToEdit : 1,
		// config options for stateful behavior
		stateful : true,
		stateId : 'grid',
		loadMask : {
			msg : "Loading..."
		},
		tbar : new Ext.Toolbar({
			id : 'purviewtoolbar',
			autoWidth : true,
			autoShow : true,
			items : [{
				id : 'purview4roleMenu',
				iconCls : 'icon-purview4role',
				text : 'Role',
				menu : getPurview4RoleSelectMenu(oid, oname, otype, otname,
						'purview4roleMenu')
			}, '-', {
				id : 'purview4userMenu',
				iconCls : 'icon-purview4user',
				text : 'Group/User',
				menu : getPurview4GUSelectMenu(oid, oname, otype, otname,
						'purview4userMenu')
			}, '-', {
				id : 'purview4submit',
				iconCls : 'icon-purviewsubmit',
				text : 'Save',
				disabled : true,
				handler : function() {
					savePurviewObjs(oid, oname, otype, otname, purviewListGrid);
				}
			}]
		})
	});

	return purviewListGrid;
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
 * render 操作
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
function renderPurviewRow(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String
			.format(
					'<a href="javascript:void(0);" onclick="javascript:delPurviewObjs(\'{0}\', \'{1}\', \'{2}\', \'{3}\', \'{4}\');">删除</a>',
					record.data.rid, record.data.rname, record.data.rtype,
					value, rowIndex);

	return resultString;

}

function addRowInPurviewGrid(ids, names, types, oid, oname, otype, otname) {
	// purviewListGrid
	if (ids != '') {
		var idstr = ids.split(",");
		var namestr = names.split(",");
		var typestr = types.split(",");

		for (var i = 0; i < idstr.length; i++) {
			if (!hasSelectedPurview(idstr[i], typestr[i])) {
				var Plant = purviewListGrid.getStore().recordType;

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
				purviewListGrid.stopEditing();
				purviewListGrid.getStore().add(p);
			}
		}
		
		Ext.getCmp('purview4submit').enable();
	}
	// purviewListGrid.startEditing(0, 2);
	return purviewListGrid;
}

function savePurviewObjs(oid, oname, otype, otname, purviewListGrid) {
	var countName = 0;
	var countNameStr = '';

	var params = '({'

	for (var i = 0; i < Ext.getCmp('purviewListGrid').getStore().getCount(); i++) {
		var record = Ext.getCmp('purviewListGrid').getStore().getAt(i);

		params += 'rid_' + countName + ' : "' + record.data.rid + '",';
		params += 'rname_' + countName + ' : "' + record.data.rname + '",';
		params += 'rtype_' + countName + ' : "' + record.data.rtype + '",';
		params += 'pid_' + countName + ' : "' + record.data.pid + '",';
		params += 'oid_' + countName + ' : "' + record.data.oid + '",';
		params += 'oname_' + countName + ' : "' + record.data.oname + '",';
		params += 'otype_' + countName + ' : "' + record.data.otype + '",';
		params += 'otname_' + countName + ' : "' + record.data.otname + '",';
		params += 'purview_' + countName + ' : "' + record.data.purview + '",';
		params += 'inherit_' + countName + ' : "' + record.data.inherit + '",';

		countName++;
	}

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
					var vResponse = eval('(' + response.responseText + ')');
					Ext.getCmp('purviewListGrid').getStore().reload();
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
/**
 * 删除角色对象确认函数
 */

function delPurviewObjs(rid, rname, rtype, purview, idx) {
	Ext.MessageBox.confirm('Hint', 'Sure to delete permission?', removePurviewObjs);
}

/**
 * 删除角色对象函数
 */
function removePurviewObjs(btn) {
	if (btn == 'yes') {
		var index = Ext.getCmp('purviewListGrid').getSelectionModel()
				.getSelectedCell();

		var record = Ext.getCmp('purviewListGrid').getStore().getAt(index[0]);

		if (record.data.pid != '') {
			Ext.MessageBox.wait('Deleting...');

			Ext.Ajax.request({
				url : context + '/system/purview.do?method=delete',
				method : 'POST',
				params : {
					pid : record.data.pid
				},
				scope : this,
				success : function(response) {
					Ext.MessageBox.hide();
					Ext.getCmp('purviewListGrid').getStore().remove(record);

					if (Ext.getCmp('purviewListGrid').getStore().getCount() == 0) {
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
			Ext.getCmp('purviewListGrid').getStore().remove(record);

			if (Ext.getCmp('purviewListGrid').getStore().getCount() == 0) {
				Ext.getCmp('purview4submit').disable();
			}
		}
	}
};

function hasSelectedPurview(id, type) {
	var r;

	var total = Ext.getCmp('purviewListGrid').getStore().getCount();// 数据行数
	for (var j = 0; j < total; j++) {
		var record = Ext.getCmp('purviewListGrid').getStore().getAt(j);
		if (record.data.rid == id && record.data.rtype == type) {
			r = true;
			break;
		}
	}

	return r;
}