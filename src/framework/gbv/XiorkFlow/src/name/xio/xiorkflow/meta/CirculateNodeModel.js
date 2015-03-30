
/**
 * <p>Title: </p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) xio.name 2006</p>
 * @author xio
 */
function CirculateNodeModel() {
    this.base = MetaNodeModel;
    this.base();

    //
    this.setText("传阅节点");

    //
    this.setSize(new Dimension(80, 30));
}
CirculateNodeModel.prototype = new MetaNodeModel();

//
CirculateNodeModel.prototype.toString = function () {
	//节点
    return "[\u8282\u70b9:" + this.getText() + "]";
};

//
CirculateNodeModel.prototype.type = MetaNodeModel.TYPE_CIRCULATE_NODE;

