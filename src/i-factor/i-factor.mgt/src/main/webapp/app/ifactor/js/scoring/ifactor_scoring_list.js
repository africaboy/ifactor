/**
 * render event for list
 * 
 * @param value
 * @param cellmeta
 * @param record
 * @param rowIndex
 * @param columnIndex
 * @param store
 * @param gridId
 */
function if_scoring_category(value, cellmeta, record, rowIndex,columnIndex, store, gridId){
	var dataIndex = getGridCm(gridId).getDataIndex(columnIndex);
	if (dataIndex == 'CATEGORY') {
		var id = record.data.CATEGORYPKID;
		return '<a href="javascript:void(0);" onclick="javascript:viewEquation(\''+id+'\');" title="Click view equation">' + value + '</a>';
	}else if (dataIndex == 'SP') {
		var id = record.data.CATEGORYPKID;
		return '<a href="javascript:void(0);" onclick="javascript:zeroEdit(\''
				+ id
				+ '\',\''
				+ gridId
				+ '\');">zero setting</a>';
	}
	return value;
}

function viewEquation(id){
	var options = { 
		title : 'Scoring equation',
		querykey : 'if_scoring_equation', 
		params :{
			pkid : id
		}, 
		isDormant : true, 
		tabcontainerid : 'consoletabs', 
		tabid : 'tab_01' 
		//layout : 'border'
	};
	initTQExtTabList(options)
}

function zeroEdit(id,gridId){
	var params = {
		FSPKID : id
	};

	var tv = new initTableView4QueryList(gridId, {
				params : params
			});
	tv.newTableView('ifactor_fs_equation');
}

