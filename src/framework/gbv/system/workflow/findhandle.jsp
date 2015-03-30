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


    List ResultList = new ArrayList();


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

            tempMap.put("id", tableView.id());
            tempMap.put("name", tableView.iname());
            tempMap.put("htype",
                    (handle != null ? String.valueOf(handle.itype())
                            : "1"));
            List<Table> tables = tableView.itable();
            if (tables != null && !tables.isEmpty()) {
                List<Map> childrenList = new ArrayList<Map>();
                tempMap.put("tableList", childrenList);
                for (int j = 0; j < tables.size(); j++) {
                    Map subTempMap = new HashMap();
                    Table table = tables.get(j);
                    subTempMap.put("id", table.getName());
                    subTempMap.put("name", table.getDescription());
                    WHandle subhandle = step.ihandle(tableView.id(),
                            table.getName());
                    subTempMap.put(
                            "htype",
                            (subhandle != null ? String
                                    .valueOf(subhandle.itype()) : "1"));
                    childrenList.add(subTempMap);
                    List columns = table.columns();
                    List tempColumnList = new ArrayList();
                    for (int k = 0; k < columns.size(); k++) {
                        Column column = (Column) columns.get(k);

                        if (!column.isPremaryKey()) {
                            WHandle handleTable = step.ihandle(
                                    table.getName(), column.getName());

                            Map info = new HashMap();

                            info.put("id", column.getName());
                            info.put("name", column.getDescription());
                            info.put(
                                    "htype",
                                    (handleTable != null ? String
                                            .valueOf(handleTable
                                                    .itype()) : "1"));

                            tempColumnList.add(info);
                        }
                    }

                    subTempMap.put("columnList", tempColumnList);

                }
            }
            ResultList.add(tempMap);
            count++;
        }

        String jsonArray = JSON.toJSONString(ResultList);

        String jsonString = "{\"success\":\"true\",\"handleList\":";
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
