<%@page import="jt.classic.system.tableview.TableView"%>
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

    List<TableView> tableViews = flow.iobject().itableView();

    Map result = new HashMap();

    List treeResultList = new ArrayList();

    Map columnResult = new HashMap();

    int count = 0;
    if (tableViews != null && !tableViews.isEmpty()) {
        for (int i = 0; i < tableViews.size(); i++) {
            Map tempMap = new HashMap();

            TableView tableView = (TableView) tableViews.get(i);

            boolean canHandleView = step.ihandleTableView(tableView
                    .id());
            if (!canHandleView)
                continue;

            WHandle handle = step.ihandleView(tableView.id());

            tempMap.put("id", "tv_" + tableView.id());
            tempMap.put("realid", tableView.id());
            tempMap.put("text", tableView.iname() + "_tableView");
            tempMap.put("type", "tableview");
            tempMap.put("H_ID", handle != null ? handle.id() : "");
            tempMap.put("H_TYPE",
                    (handle != null ? String.valueOf(handle.itype())
                            : "-1"));
            tempMap.put("S_ID", step.id());

            List<Table> tables = tableView.itable();
            if (tables != null && !tables.isEmpty()) {
                List<Map> childrenList = new ArrayList<Map>();
                tempMap.put("children", childrenList);
                for (int j = 0; j < tables.size(); j++) {
                    Map subTempMap = new HashMap();
                    Table table = tables.get(j);
                    subTempMap.put("id", "table_" + table.getName());
                    subTempMap.put("realid", table.getName());
                    subTempMap.put("text", table.getDescription()
                            + "_"+table.getName());
                    subTempMap.put("type", "table");
                    subTempMap.put("leaf", true);
                    
                    WHandle subhandle = step.ihandle(tableView.id(),table.getName());
                    subTempMap.put("H_ID", subhandle != null ? subhandle.id() : "");
                    subTempMap.put("H_TYPE",
                            (subhandle != null ? String.valueOf(subhandle.itype())
                                    : "-1"));
                    subTempMap.put("S_ID", step.id());
                    
                    childrenList.add(subTempMap);

                    List columns = table.columns();
                    List tempColumnList = new ArrayList();
                    for (int k = 0; k < columns.size(); k++) {
                        Column column = (Column) columns.get(k);
                        if (!column.isPrimaryKey()) {
                            WHandle handleTable = step.ihandle(
                                    table.getName(), column.getName());

                            Map info = new HashMap();

                            info.put(
                                    "H_ID",
                                    handleTable != null ? handleTable
                                            .id() : "");
                            info.put("S_ID", step.id());
                            info.put("OBJ_ITEM", column.getName());
                            info.put("OBJ_ITEMNAME",
                                    column.getDescription());
                            info.put(
                                    "H_TYPE",
                                    (handleTable != null ? String
                                            .valueOf(handleTable
                                                    .itype()) : "-1"));

                            tempColumnList.add(info);
                        }
                    }

                    columnResult.put(table.getName() + "_columnList",
                            tempColumnList);

                }
            }
            treeResultList.add(tempMap);
            count++;
        }

        result.put("columnListJson", columnResult);
        result.put("treeJson", treeResultList);

        String jsonArray = JSON.toJSONString(result);

        String jsonString = "{\"success\":\"true\",\"data\":";
        jsonString += jsonArray;
        jsonString += "}";

        request.setAttribute("result", jsonString);

    }

    if (count == 0) {
        String jsonString = "{}";

        request.setAttribute("result", jsonString);
    }

    SystemTool.returnJson(request, response);
%>
