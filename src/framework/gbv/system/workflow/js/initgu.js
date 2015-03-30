/**
 * 初始化用户/组选择树
 * 
 * @param {}
 *            item
 * @param ht
 */
function initGU(item, ht) {
	if (ht == 1) {
		var span = document.createElement("span");
		span.innerHTML = '<img style="cursor:hand;" border="0" onclick="javascript:selectGroupOnly(\''
				+ (item.name)
				+ '\',\''
				+ (item.name + '_NAME')
				+ '\',\'NOROOT_GROUP_CHECK\',null,false);" src="'
				+ context
				+ '/system/workflow/images/group.png">';

		var rootSibling = item.nextSibling;
		item.parentNode.insertBefore(span, rootSibling);
	}

	/*
	 * item.onclick = function() { selectGroupOnly((item.name + '_IDS'),
	 * item.name, 'NOROOT_GROUP_CHECK', null, false); }
	 */
}