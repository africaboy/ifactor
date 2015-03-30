<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="org.limp.basework.Table"%>
<%@ page import="org.limp.basework.Column"%>
<%@ page import="org.limp.basework.analyzer.TableRegisterCenter"%>
<%@ page import="jt.classic.system.utils.SystemTool"%>
<%@ page import="jt.classic.system.workflow.WStep"%>
<%@ page import="jt.classic.system.workflow.WFlow"%>
<%@ page import="jt.classic.system.workflow.WHandle"%>
<%@ page import="com.alibaba.fastjson.JSON"%>
<%
	WStep step = (WStep) request.getAttribute("step");

	WFlow flow = (WFlow) request.getAttribute("flow");

	List tables = flow.iobject().itables();

	List resultList = new ArrayList();

	int multi = 0;

	if (tables != null && !tables.isEmpty()) {
		for (int i = 0; i < tables.size(); i++) {
			Map tempMap = new HashMap();
			List tempList = new ArrayList();

			Table table = (Table) tables.get(i);

			int tHandle = flow.iobject().handleTable(table);

			if (tHandle == 1) {
				multi = 1;
			}

			List columns = table.columns();

			for (int j = 0; j < columns.size(); j++) {
				Column column = (Column) columns.get(j);
		
				if (!column.isPremaryKey()) {
					WHandle handle = step.ihandle(table.getName(),
					column.getName());
		
					Map info = new HashMap();
		
					info
					.put("PAGINATION_NUMBER", String
							.valueOf(j + 1));
					info.put("H_ID", handle != null ? handle.id() : "");
					info.put("S_ID", step.id());
					info.put("OBJ_ITEM", column.getName());
					info.put("OBJ_ITEMTYPE", column.getType()
					.toString());
					info.put("OBJ_ITEMNAME", column.getDescription());
					info.put("H_TYPE", (handle != null ? String
					.valueOf(handle.itype()) : "-1"));
					info.put("OBJ_TABLE", table.getName());
					info.put("OBJ_TABLENAME", table.getDescription());
					info.put("OBJ_TABLEHANDLE", (tHandle == 0 ? "单数据处理"
					: "多数据处理"));
		
					tempList.add(info);
				}
			}

			Map temp = new HashMap();

			temp.put("resultList", tempList);

			tempMap.put("tableName", table.getName());
			tempMap.put("tableMemo", table.getDescription());
			tempMap.put("tableHandle", String.valueOf(tHandle));
			tempMap.put("columnList", temp);

			WHandle ahandle = step.iMAddhandle(table.getName());
			tempMap.put("tableAdd", ahandle != null ? ahandle.itype()
			: "0");
			tempMap.put("tableAddId", ahandle != null ? ahandle.id()
			: "");

			WHandle dhandle = step.iMDelhandle(table.getName());
			tempMap.put("tableDel", dhandle != null ? dhandle.itype()
			: "0");
			tempMap.put("tableDelId", dhandle != null ? dhandle.id()
			: "");

			resultList.add(tempMap);
		}
		
		if (!flow.iopinionTable().equals("")) {
			Table opinionTable = TableRegisterCenter.getInstance().findTable(flow.iopinionTable());
			List columns = opinionTable.columns();
			List tempList = new ArrayList();
			
			for (int j = 0; j < columns.size(); j++) {
				Column column = (Column) columns.get(j);
		
				if (!column.isPremaryKey()) {
					WHandle handle = step.ihandle(opinionTable.getName(),
					column.getName());
		
					Map info = new HashMap();
		
					info
					.put("PAGINATION_NUMBER", String
							.valueOf(j + 1));
					info.put("H_ID", handle != null ? handle.id() : "");
					info.put("S_ID", step.id());
					info.put("OBJ_ITEM", column.getName());
					info.put("OBJ_ITEMTYPE", column.getType()
					.toString());
					info.put("OBJ_ITEMNAME", column.getDescription());
					info.put("H_TYPE", (handle != null ? String
					.valueOf(handle.itype()) : "-1"));
					info.put("OBJ_TABLE", opinionTable.getName());
					info.put("OBJ_TABLENAME", opinionTable.getDescription());
					info.put("OBJ_TABLEHANDLE", "单数据处理");
		
					tempList.add(info);
				}
			}

			Map tempMap = new HashMap();
			Map temp = new HashMap();

			temp.put("resultList", tempList);

			tempMap.put("tableName", opinionTable.getName());
			tempMap.put("tableMemo", opinionTable.getDescription());
			tempMap.put("tableHandle", "0");
			tempMap.put("columnList", temp);

			WHandle ahandle = step.iMAddhandle(opinionTable.getName());
			tempMap.put("tableAdd", ahandle != null ? ahandle.itype() : "0");
			tempMap.put("tableAddId", ahandle != null ? ahandle.id() : "");

			WHandle dhandle = step.iMDelhandle(opinionTable.getName());
			tempMap.put("tableDel", dhandle != null ? dhandle.itype() : "0");
			tempMap.put("tableDelId", dhandle != null ? dhandle.id() : "");

			resultList.add(tempMap);
		}
		
		String jsonArray = JSON.toJSONString(resultList);

		String jsonString = "{\"success\":\"true\",\"handleList\":";
		jsonString += jsonArray;
		jsonString += "}";

		request.setAttribute("result", jsonString);

	} else {
		String jsonString = "{}";

		request.setAttribute("result", jsonString);
	}

	SystemTool.returnJson(request, response);
%>
