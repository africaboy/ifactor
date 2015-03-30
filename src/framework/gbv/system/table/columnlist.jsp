<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="com.alibaba.fastjson.JSON"%>
<%@ page import="org.limp.basework.Table"%>
<%@ page import="org.limp.basework.Column"%>
<%@ page import="org.limp.basework.analyzer.TableRegisterCenter"%>
<%@ page import="jt.classic.system.table.ColumnJsonBean"%>
<%@ page import="jt.classic.system.utils.SystemTool"%>
<%@ page import="jt.classic.system.wordbook.WordBookInXML"%>
<%
	String tname = request.getParameter("tname");
	String ds = request.getParameter("ds");

	TableRegisterCenter center = TableRegisterCenter.getInstance();
	if (center.containsTable(tname, ds)) {
		Table table = center.findTable(tname, ds);

		List list = table.columns();

		List resultList = new ArrayList();

		if (list != null && !list.isEmpty()) {
			for (int i = 0; i < list.size(); i++) {
				Column column = (Column) list.get(i);
		
				String typeName = WordBookInXML.getWordBookItemName("column-type",
						column.getType().toString(), "未知类型");
		
				ColumnJsonBean bean = new ColumnJsonBean();
				bean.setName(column.getName());
				bean.setFname(column.getFormName());
				bean.setKey(column.isPrimaryKey() ? 0 : -1);
				bean.setLength(column.length());
				bean.setMemo(column.getDescription());
				bean.setType(column.getType().toString());
				bean.setTypeName(typeName);
				bean.setNotnull(column.isNotNULL() ? 0 : -1);
				bean.setForeignTable(column.getForeignTable());
				bean.setForeignColumn(column.getForeignColumn());
				bean.setScale(column.scale());
		
				resultList.add(bean);
			}
		}

		String jsonArray = JSON.toJSONString(resultList);

		String jsonString = "{\"totalCount\":\"" + resultList.size()
		+ "\",\"columnList\":";
		jsonString += jsonArray;
		jsonString += "}";

		request.setAttribute("result", jsonString);

		SystemTool.returnJson(request, response);
	}
%>
