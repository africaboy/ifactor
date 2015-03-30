
/**
 * <p>Title: Node</p>
 * <p>Description: </p>
 * <p>Copyright: Copyright (c) xio.name 2006</p>
 * @author xio
 */
function CirculateNode(model, wrapper) {
    this.base = MetaNode;
    this.type = 2;
    var imageUrl = XiorkFlowWorkSpace.XIORK_FLOW_PATH + "images/xiorkflow/node.gif";
    this.base(model, imageUrl, wrapper);
}
CirculateNode.prototype = new MetaNode();

