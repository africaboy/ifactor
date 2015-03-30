var pageSize = 20;
/**
 * 权限设置list
 * 
 * @param {}
 *            tabid
 * @param {}
 *            areaid
 */
function purviewlist(oid, oname, otype, otname, areaid, pt) {
	var purviewType = 'purview';

	if (Ext.get('purviewListGrid')) {
		Ext.get(areaid).dom.innerHTML = '';
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
						//do nothing
					} else {
						if(purviewListStore.getCount() > 0){
							Ext.getCmp('purview4submit').enable();
						}
					}
				}
			});

	var purviewListGrid = new Ext.grid.EditorGridPanel({
		id : 'purviewListGrid',
		store : purviewListStore,
		columns : [{
					header : 'Object name',
					width : 150,
					sortable : true,
					dataIndex : 'rname'
				}, {
					header : 'Object type',
					width : 75,
					sortable : true,
					dataIndex : 'rtype',
					renderer : renderPurviewType
				}, {
					header : 'Permissions',
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
		autoExpandColumn : 'rname',
		border : false,
		autoWidth : true,
		height : Ext.get(areaid).getHeight(),
		viewConfig : {
			forceFit : true
		},
		clicksToEdit : 1,
		// config options for stateful behavior
		stateful : true,
		stateId : 'grid',
		loadMask : {
			msg : "Data loading, please wait a moment..."
		},
		tbar : new Ext.Toolbar({
			id : 'purviewtoolbar',
			autoWidth : true,
			autoShow : true,
			items : [{
				id : 'purview4roleMenu',
				iconCls : 'icon-purview4role',
				text : 'Select role',
				menu : getPurview4RoleSelectMenu(oid, oname, otype, otname,
						'purview4roleMenu')
			}, '-', {
				id : 'purview4userMenu',
				iconCls : 'icon-purview4user',
				text : 'Select groups/users',
				menu : getPurview4GUSelectMenu(oid, oname, otype, otname,
						'purview4userMenu')
			}, '-', {
				id : 'purview4submit',
				iconCls : 'icon-purviewsubmit',
				text : 'Submit to save',
				disabled : true,
				handler : function() {
					savePurviewObjs(oid, oname, otype, otname, purviewListGrid);
				}
			}]
		})
	});

	// Ext.getDom('test').value
	// render the grid to the specified div in the page
	purviewListGrid.render(areaid);
}

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

function renderPurviewRow(value, cellmeta, record, rowIndex, columnIndex, store) {
	var resultString = String
			.format(
					'<a href="javascript:void(0);" onclick="javascript:delPurviewObjs(\'{0}\', \'{1}\', \'{2}\', \'{3}\', \'{4}\');">Delete</a>',
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
				var Plant = Ext.getCmp('purviewListGrid').getStore().recordType;

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
				Ext.getCmp('purviewListGrid').stopEditing();
				Ext.getCmp('purviewListGrid').getStore().add(p);
			}
		}

		Ext.getCmp('purview4submit').enable();
	}
	// purviewListGrid.startEditing(0, 2);
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

	Ext.MessageBox.wait('Submission process...');

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
								title : 'Prompt information',
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
	Ext.MessageBox.confirm('Hint', 'Determine the delete permission Settings?', removePurviewObjs);
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
			Ext.MessageBox.wait('In the process of removing...');

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
								title : 'Prompt information',
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