<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="jt.classic.system.utils.SystemTool"%>
<%@ page import="jt.classic.system.objectquery.ObjectQuery"%>
<%@ page import="jt.classic.system.objectquery.ObjectQueryItem"%>
<%@ page import="jt.classic.system.wordbook.WordBookInXML"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

    ObjectQuery query = (ObjectQuery) request.getAttribute("query");

	String result = null;

	if (query == null) {
		result = "{success: false}";
	} else {
		String purview = query.ipurviewstring();
		
		String purviewstring = "";
		
		if(!purview.equals("")){
			String[] purviewStr = purview.split(";");
			
			if(purviewStr != null && purviewStr.length > 0){
				for(int i=0 ; i < purviewStr.length; i++){
					String rid = purviewStr[i].split(",")[0];
					String rname = purviewStr[i].split(",")[1];
					String rtype = purviewStr[i].split(",")[2];
					
					String rtypeName = "";
					
					if (rtype.equals("role")) {
						rtypeName = "Role";
	                } else if (rtype.equals("group")) {
	                	rtypeName = "Group";
	                } else if (rtype.equals("user")) {
	                	rtypeName = "User";
	                }
					
					String did = rid + "_" + rtype;
					
					purviewstring += "<div range=\"item\" id=\""
					+ did
					+ "\" oid=\""
					+ rid
					+ "\" oname=\""
					+ rname
					+ "\" otype=\""
					+ rtype
					+ "\" style=\"float:left;width:120px;\"> "
					+ rname
					+ " ("
					+ rtypeName
					+ ")"
					+ " <img src=\""
					+ context
					+ "/system/objquery/images/del.gif\" title=\"Delete\" style=\"cursor:hand;\" onclick=\"javascript:removeRange(\\'"
					+ did + "\\');\"/></div>";
				}
			}
		}
		
		String queryItemString = "";
		
		List queryList = query.iqueryitems();
		
		if(queryList != null && !queryList.isEmpty()){
			for(int i = 0 ; i < queryList.size(); i++){
				ObjectQueryItem item = (ObjectQueryItem)queryList.get(i);
				
				String itemid = "query_" + item.icolumn().associateTable().getName() + "_"
				+ item.icolumn().getName();
				
				queryItemString += "<div id=\""+itemid+"\" idiv=\"qitem\" style=\"BORDER: #cccccc 0px solid;margin:2px;float:left;\">";

				queryItemString += "<input type=\"hidden\" id=\"chk_" + itemid
						+ "\" ilabel=\"" + item.ilabel() + "\" ";
				queryItemString += "itableName=\"" + item.icolumn().associateTable().getName()
						+ "\" value=\"" + item.icolumn().getName()
						+ "\"> ";
				queryItemString += item.ilabel();
				/* 关联字段 */
				queryItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_column\" value=\"" + item.icolumn().getName()
						+ "\">";
				/* 关联表 */
				queryItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_table\" value=\"" + item.icolumn().associateTable().getName()
						+ "\">";
				/* 查询标签 */
				queryItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_label\" value=\""
						+ item.ilabel() + "\">";
				/* 表单类型 */
				queryItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_type\" value=\"" + item.itype()
						+ "\">";
				/* 默认参数 */
				queryItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_param\" value=\"" + item.iparam()
						+ "\">";
				/* 比较方式 */
				queryItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_mode\" value=\"" + item.imode()
						+ "\">";
				/* 显示顺序 */
				queryItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_idx\" value=\"" + (i + 1)
						+ "\">";

				queryItemString += "&nbsp;<img style=\"vertical-align:middle\" src=\""
						+ context + "/system/objquery/images/del.gif\"";
				queryItemString += " onclick=\"javascript:removeItem(\\'" + itemid
						+ "\\');\" title=\"Delete\">";
						
				queryItemString += "</div>";		
			}
		}
		
        String viewItemString = "";
		
		List viewList = query.iviewitems();
		
		if(viewList != null && !viewList.isEmpty()){
			for(int i = 0 ; i < viewList.size(); i++){
				ObjectQueryItem item = (ObjectQueryItem)viewList.get(i);
				
				String itemid = "view_" + item.icolumn().associateTable().getName() + "_"
				+ item.icolumn().getName();
				
				viewItemString += "<div id=\""+itemid+"\" idiv=\"qitem\" style=\"BORDER: #cccccc 0px solid;margin:2px;float:left;\">";

				viewItemString += "<input type=\"hidden\" id=\"chk_" + itemid
						+ "\" ilabel=\"" + item.ilabel() + "\" ";
				viewItemString += "itableName=\"" + item.icolumn().associateTable().getName()
						+ "\" value=\"" + item.icolumn().getName()
						+ "\"> ";
						viewItemString += item.ilabel();
				/* 关联字段 */
				viewItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_column\" value=\"" + item.icolumn().getName()
						+ "\">";
				/* 关联表 */
				viewItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_table\" value=\"" + item.icolumn().associateTable().getName()
						+ "\">";
				/* 查询标签 */
				viewItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_label\" value=\""
						+ item.ilabel() + "\">";
				/* 表单类型 */
				viewItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_type\" value=\"" + item.itype()
						+ "\">";
				/* 默认参数 */
				viewItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_param\" value=\"" + item.iparam()
						+ "\">";
				/* 比较方式 */
				viewItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_mode\" value=\"" + item.imode()
						+ "\">";
				/* 显示顺序 */
				viewItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_idx\" value=\"" + (i + 1)
						+ "\">";

				viewItemString += "&nbsp;<img style=\"vertical-align:middle\" src=\""
						+ context + "/system/objquery/images/del.gif\"";
				viewItemString += " onclick=\"javascript:removeItem(\\'" + itemid
						+ "\\');\" title=\"Delete\">";
						
				viewItemString += "</div>";		
			}
		}
		
        String restraintItemString = "";
		
		List restraintList = query.irestraintitems();
		
		if(restraintList != null && !restraintList.isEmpty()){
			for(int i = 0 ; i < restraintList.size(); i++){
				ObjectQueryItem item = (ObjectQueryItem)restraintList.get(i);
				
				String itemid = "restraint_" + item.icolumn().associateTable().getName() + "_"
				+ item.icolumn().getName();
				
				restraintItemString += "<div id=\""+itemid+"\" idiv=\"qitem\" style=\"BORDER: #cccccc 0px solid;margin:2px;float:left;\">";

				restraintItemString += "<input type=\"hidden\" id=\"chk_" + itemid
						+ "\" ilabel=\"" + item.ilabel() + "\" ";
				restraintItemString += "itableName=\"" + item.icolumn().associateTable().getName()
						+ "\" value=\"" + item.icolumn().getName()
						+ "\"> ";
				restraintItemString += item.icolumn().getDescription();
				/* 关联字段 */
				restraintItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_column\" value=\"" + item.icolumn().getName()
						+ "\">";
				/* 关联表 */
				restraintItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_table\" value=\"" + item.icolumn().associateTable().getName()
						+ "\">";
				/* 查询标签 */
				restraintItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_label\" value=\""
						+ item.ilabel() + "\">";
				/* 表单类型 */
				restraintItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_type\" value=\"" + item.itype()
						+ "\">";
				/* 默认参数 */
				restraintItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_param\" value=\"" + item.iparam()
						+ "\">";
				/* 比较方式 */
				restraintItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_mode\" value=\"" + item.imode()
						+ "\">";
				/* 显示顺序 */
				restraintItemString += "<input type=\"hidden\" id=\"" + itemid
						+ "_idx\" value=\"" + (i + 1)
						+ "\">";

				restraintItemString += "&nbsp;<img style=\"vertical-align:middle\" src=\""
						+ context + "/system/objquery/images/del.gif\"";
				restraintItemString += " onclick=\"javascript:removeItem(\\'" + itemid
						+ "\\');\" title=\"Delete\">";
						
				restraintItemString += "</div>";		
			}
		}
		
		result = "{success: true, data:{";
		result += "qname:'" + query.iname() + "',";
		result += "qkey:'" + query.id() + "',";
		result += "qjs:'" + query.iJsUrl() + "',";
		result += "qcss:'" + query.iCssUrl() + "',";
		result += "queryurl:'" + query.iqueryurl() + "',";
		result += "qresulturl:'" + query.iresulturl() + "',";
		result += "qdesc:'" + query.idesc() + "',";
		result += "objectName: '" + query.iobject().iname() + "',";
		result += "object:'" + query.iobject().ikey() + "',";
		result += "qsession:'" + query.isession() + "',";
		result += "qchk:'" + (query.ishowchk() ? "1" : "0") + "',";
		result += "qcreatestime:'" + query.icreatestime() + "',";
		result += "qcreateetime:'" + query.icreateetime() + "',";
		result += "qpurview:'" + query.ipurview() + "',";
		result += "qpurviewname:'" + query.ipurviewname() + "',";
		result += "purviewstring:'" + purviewstring + "',";
		result += "queryItemString:'" + queryItemString + "',";
		result += "viewItemString:'" + viewItemString + "',";
		result += "restraintItemString:'" + restraintItemString + "'";
		result += "}}";
	}

	request.setAttribute("result", result);

	SystemTool.returnJson(request, response);
%>
