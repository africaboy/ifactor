
/**
 * <p>
 * Description:
 * </p>
 * <p>
 * Copyright: Copyright (c) xio.name 2006
 * </p>
 * 
 * @author xio
 */
function MetaNodeShowDetailMouseListener(metaNodeModel, wrapper) {
	this.metaNodeModel = metaNodeModel;
	this.wrapper = wrapper;
}
MetaNodeShowDetailMouseListener.prototype = new MouseListener();

MetaNodeShowDetailMouseListener.prototype.onMouseOver = function(e) {
	if (showTrace && this.metaNodeModel.type != MetaNodeModel.TYPE_END_NODE) {
		// alert(event);
		var msg = nodesDetailMap.get(this.metaNodeModel.getID());

		if (!msg) {
			msg = "尚未到达该环节";
			event.srcElement.title = msg;
		} else {
			var objPos = mousePosition(event);
			showMessageBox(this.metaNodeModel.getText(), msg, objPos, 240);
		}
	}
};

MetaNodeShowDetailMouseListener.prototype.onMouseOut = function(e) {
	if (showTrace && document.getElementById("mesWindow")) {
		closeWindow();
	}
};
