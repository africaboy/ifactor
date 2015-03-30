document.write("<script src=\"" + context
		+ "/system/role/js/rolelist.js\"></script>");
document.write("<script src=\"" + context
		+ "/system/role/js/roleadd.js\"></script>");
document.write("<script src=\"" + context
		+ "/system/role/js/roleedit.js\"></script>");

/**
 * 创建角色对象多数据返回值
 * 
 * @param {}
 *            ids
 * @param {}
 *            names
 * @param {}
 *            types
 * @param {}
 *            form
 */
function countRoleObjectItem(rid, ids, names, types, params) {
	var idstr = ids.split(',');
	var namestr = names.split(',');
	var typestr = types.split(',');

	var countO = "";

	for (var i = 0; i < idstr.length; i++) {
		if (rid != null) {
			params['rid_' + i] = rid;		
		}

		params['oid_' + i] = idstr[i];			
		params['oname_' + i] = namestr[i];	
		params['otype_' + i] = typestr[i];	

		if (i < idstr.length - 1) {
			countO += i + ",";
		} else {
			countO += i;
		}
	}

	params.countO = countO;	
}