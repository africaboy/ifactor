/**
 * 
 * @param {}
 *            url
 * @param {}
 *            params
 */
function initQueryList4Export(key, tp) {
	var o = parent.getExportParams(key);
	if (o == null) {
		alert('数据导出参数获取失败');
	} else {
		listSimpleJson4Hidden(o.params);
		createHidden('labels', o.labels == null ? '' : o.labels);
		document.form1.action = o.exportURL + '&exptype=' + tp;
		document.form1.submit();

		setTimeout(function() {
					parent.releaseExportloading();
				}, 2000);

	}

}