<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ page import="org.limp.basework.Table" %>
<%@ page import="org.limp.basework.Column" %>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="jt.classic.system.workflow.WObjectRegister"%>
<%@ page import="org.limp.mine.StringTool" %>
<%@ page import="java.util.List" %>
<%@ page import="jt.classic.system.utils.SystemTool" %>
<%
    String obj = StringTool.checkString(request.getParameter("obj"));

    String type = StringTool.checkString(request.getParameter("type"));

	WObjectRegister register = WObjectRegister.getInstance();
	WObject object = register.findWObject(obj);
	
	StringBuffer str = new StringBuffer();
	
	List tlist = object.itables();
	
	str.append("<table id=\""+type+"itemlist\" width=\"100%\">");
	
	for (int i = 0; i < tlist.size(); i++) {
		/*流程对象关联表*/
		Table table = (Table) tlist.get(i);
		
		String handle = "Single Data Processing Table";
		
		if(object.handleTable(table) == 1){
			handle = "Multiple Data Processing Table";
		}
		
		str.append("<tr>");
		str.append("<td>&nbsp;<b>" + table.getDescription() + "</b> <br/>&nbsp;(" + table.getName() + " - " + handle + ")<hr style=\"COLOR: #eee; HEIGHT: 1px;\"/></td>");
		str.append("</tr>");
		
		str.append("<tr><td style=\"padding:5px;\">");
	    List columns = table.columns();
		
	    int idxcount = 0;
	    
	    for (int j = 0; j < columns.size(); j++) {
			/*表字段*/
			Column column = (Column) columns.get(j);
	
			if (!column.isAnnex() && !column.isLob()
					&& !column.isPremaryKey()) {
	
				str.append("<div idx=\""+idxcount+"\" class=\"divn\" style=\"BORDER: #cccccc 1px solid;padding:2px;margin-top:2px;width:200px;\"><input type=\"checkbox\" style=\"vertical-align:middle\" id=\""+type+"item_"+idxcount+"\" tname=\""+table.getName()+"\" ilabel=\""+column.getDescription()+"\" value=\""+column.getName()+"\">&nbsp;"+column.getDescription() + " (" + column.getName() + ")" +"</div>");
			
				idxcount++;
			}
	    }
	    
	    str.append("</td></tr>");
	}
	
	str.append("</table>");
	
	request.setAttribute("result", "{success: true, resultCode: '" + str.toString() + "'}");
	
	SystemTool.returnJson(request, response);
%>