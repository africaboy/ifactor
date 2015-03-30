<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="java.util.List"%>
<%@ page import="java.util.ArrayList"%>
<%@ page import="org.limp.basework.Table"%>
<%@ page import="org.limp.basework.Column"%>
<%@ page import="org.limp.mine.annex.AnnexInfo"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="jt.classic.system.utils.SystemTool"%>
<%@ page import="jt.classic.system.object.IObject"%>
<%@ page import="jt.classic.system.workflow.WObject"%>
<%@ page import="com.alibaba.fastjson.JSON"%>

<%
	IObject object = (IObject) request.getAttribute("object");

	WObject obj = object.iobject();

	String result = null;

	if (obj == null) {
		result = "{success: false, errorCode : -1}";
	} else {
		result = "{success: true, object:{oname:'"
		+ obj.iname()
		+ "', okey:'"
		+ obj.ikey()
		+ "',ohandle:'"
		+ StringTool.checkString(obj.ieventhandler())
		+ "',system:'"
		+ (obj.isupport() != null ? obj.isupport().ikey() : "")
		+ "',system1:'"
		+ (obj.isupport() != null ? obj.isupport().iname() : "")
		+ "'}";

		StringBuffer resultStr = new StringBuffer();
		resultStr.append(",core:{");
		resultStr.append("okid:'" + object.id() + "',");
		resultStr.append("oname:'" + object.iname() + "',");
		resultStr.append("okey:'" + object.ikey() + "',");
		resultStr.append("ocreatorid:'" + object.icreatorid() + "',");
		resultStr.append("ocreatorname:'" + object.icreatorname()
		+ "',");
		resultStr.append("ounitid:'"
		+ object.getResource().get("OBJ_UNITID") + "',");
		resultStr.append("ounitname:'"
		+ object.getResource().get("OBJ_UNITNAME") + "',");
		resultStr.append("ounitnumber:'"
		+ object.getResource().get("OBJ_UNITNUMBER") + "',");
		resultStr.append("ocreatetime:'" + object.icreatetime() + "',");
		resultStr.append("oupdatetime:'" + object.iupdatetime() + "',");
		resultStr.append("oremark:'"
		+ object.getResource().get("OBJ_REMARK") + "',");
		resultStr.append("okeyword:'" + object.ikeyword() + "',");
		resultStr.append("osummary:'" + object.isummary() + "',");
		resultStr.append("osize:'" + object.size() + "'},data:");

		List list = obj.itables();

		Map dataContent = new HashMap();

		if (list != null && !list.isEmpty()) {
			Map annexItem = new HashMap();

			for (int i = 0; i < list.size(); i++) {
		Table table = (Table) list.get(i);

		List columnList = table.columns();

		if (obj.handleTable(table) == 0
				&& object.icontent(table) != null) {
			Map info = (Map) ((List) object.icontent(table))
			.get(0);

			List tempList = new ArrayList();
			Map tempMap = new HashMap();
			tempList.add(tempMap);

			for (int j = 0; j < columnList.size(); j++) {
				Column column = (Column) columnList.get(j);

				if (column.isAnnex()
				&& info.containsKey(column.getName())) {
			List annexList = new ArrayList();
			Map annexInfo = new HashMap();

			AnnexInfo[] annexs = (AnnexInfo[]) info
					.get(column.getName());
			for (int kk = 0; kk < annexs.length; kk++) {
				AnnexInfo ai = annexs[kk];
				annexInfo.put("id", ai.getID());
				annexInfo.put("name", ai.getName());
				annexList.add(annexInfo);
			}

			annexItem.put(column.getName(), annexList);
			tempMap.put(column.getName(), annexList);
				} else {
			tempMap.put(column.getFormName(),
					StringTool.checkString(info
					.get(column.getName())));
				}
			}

			dataContent.put(table.getName(), tempList);
		} else if (obj.handleTable(table) == 1
				&& object.icontent(table) != null) {
			List tempList = new ArrayList();

			List infoList = (List) object.icontent(table);

			for (int k = 0; k < infoList.size(); k++) {
				Map info = (Map) infoList.get(k);
				Map tempMap = new HashMap();

				for (int j = 0; j < columnList.size(); j++) {
			Column column = (Column) columnList.get(j);

			if (column.isAnnex()
					&& info.containsKey(column
					.getName())) {
				List annexList = new ArrayList();
				Map annexInfo = new HashMap();

				AnnexInfo[] annexs = (AnnexInfo[]) info
				.get(column.getName());
				for (int kk = 0; kk < annexs.length; kk++) {
					AnnexInfo ai = annexs[kk];
					annexInfo.put("id", ai.getID());
					annexInfo.put("name", ai.getName());
					annexList.add(annexInfo);
				}

				annexItem.put(column.getName() + "_"
				+ k, annexList);
			} else {
				tempMap.put(column.getFormName() + "_"
				+ k, StringTool
				.checkString(info.get(column
						.getName())));
			}
				}

				tempList.add(tempMap);
			}

			dataContent.put(table.getName(), tempList);

			dataContent.put(table.getName() + "_countName", obj
			.countName(table));
		}
			}

			dataContent.put("ANNEX", annexItem);
		}

		//JSONObject jsonObject = JSONArray.fromObject(dataContent);

		String jsonObject = JSON.toJSONString(dataContent);

		resultStr.append(jsonObject);

		result += resultStr.toString();
		result += "}";
	}

	request.setAttribute("result", result);

	SystemTool.returnJson(request, response);
%>
