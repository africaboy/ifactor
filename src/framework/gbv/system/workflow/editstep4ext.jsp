<%@page import="jt.classic.system.tableview.TableView"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.mine.RandomUtil"%>
<%@ page import="jt.classic.system.wordbook.WordBookUtil"%>
<%@ page import="jt.classic.system.utils.SystemTool"%>
<%@ page import="jt.classic.system.workflow.WStep"%>
<%
	WStep step = (WStep) request.getAttribute("step");

    String key = step.ikey();
    
    if(key.equals("")){
        key = RandomUtil.getRandomString(10);
    }	

	String plugJsonData = "";

	List introList = step.iplug4intro();

	if (introList != null && !introList.isEmpty()) {
		for (int i = 0; i < introList.size(); i++) {
			String clzName = (String) introList.get(i);
			if (i < introList.size() - 1) {
		plugJsonData += "{tp : 'intro', clzName : '" + clzName
				+ "'},";
			} else {
		plugJsonData += "{tp : 'intro', clzName : '" + clzName
				+ "'}";
			}
		}
	}

	List outroList = step.iplug4outro();

	if (outroList != null && !outroList.isEmpty()) {
		if (!plugJsonData.equals("")) {
			plugJsonData += ",";
		}
		for (int i = 0; i < outroList.size(); i++) {
			String clzName = (String) outroList.get(i);
			if (i < outroList.size() - 1) {
		plugJsonData += "{tp : 'outro', clzName : '" + clzName
				+ "'},";
			} else {
		plugJsonData += "{tp : 'outro', clzName : '" + clzName
				+ "'}";
			}
		}
	}
	
	List lockedList = step.iplug4locked();

	if (lockedList != null && !lockedList.isEmpty()) {
		if (!plugJsonData.equals("")) {
			plugJsonData += ",";
		}
		for (int i = 0; i < lockedList.size(); i++) {
			String clzName = (String) lockedList.get(i);
			if (i < lockedList.size() - 1) {
		plugJsonData += "{tp : 'locked', clzName : '" + clzName
				+ "'},";
			} else {
		plugJsonData += "{tp : 'locked', clzName : '" + clzName
				+ "'}";
			}
		}
	}
	
	List lingerList = step.iplug4linger();

	if (lingerList != null && !lingerList.isEmpty()) {
		if (!plugJsonData.equals("")) {
			plugJsonData += ",";
		}
		for (int i = 0; i < lingerList.size(); i++) {
			String clzName = (String) lingerList.get(i);
			if (i < lingerList.size() - 1) {
		plugJsonData += "{tp : 'linger', clzName : '" + clzName
				+ "'},";
			} else {
		plugJsonData += "{tp : 'linger', clzName : '" + clzName
				+ "'}";
			}
		}
	}

	List iptList = step.iplug4import();

	if (iptList != null && !iptList.isEmpty()) {
		if (!plugJsonData.equals("")) {
			plugJsonData += ",";
		}
		for (int i = 0; i < iptList.size(); i++) {
			String clzName = (String) iptList.get(i);

			if (i < iptList.size() - 1) {
		plugJsonData += "{tp : 'import', clzName : '" + clzName
				+ "'},";
			} else {
		plugJsonData += "{tp : 'import', clzName : '" + clzName
				+ "'}";
			}
		}
	}

	List eptList = step.iplug4export();

	if (eptList != null && !eptList.isEmpty()) {
		if (!plugJsonData.equals("")) {
			plugJsonData += ",";
		}
		for (int i = 0; i < eptList.size(); i++) {
			String clzName = (String) eptList.get(i);
			if (i < eptList.size() - 1) {
		plugJsonData += "{tp : 'export', clzName : '" + clzName
				+ "'},";
			} else {
		plugJsonData += "{tp : 'export', clzName : '" + clzName
				+ "'}";
			}
		}
	}
	
	String tvJson = "[";
	if (step.iflow().iobject().itableView() != null
			&& !step.iflow().iobject().itableView().isEmpty()) {
		for (int i = 0; i < step.iflow().iobject().itableView().size(); i++) {
			TableView tv = step.iflow().iobject().itableView().get(i);
			
			boolean handle = step.ihandleTableView(tv.id());
			
			if(i < step.iflow().iobject().itableView().size() - 1){
				tvJson += "{id : '"+tv.id()+"', name : '"+tv.iname()+"', checked : "+handle+"},";
			}else{
				tvJson += "{id : '"+tv.id()+"', name : '"+tv.iname()+"', checked : "+handle+"}";
			}
		}
	}
	
	tvJson += "]";

	String result = null;

	if (step == null) {
		result = "{success: false}";
	} else {
		String typename = WordBookUtil.getWordBookItemName("step-type",
		String.valueOf(step.itype()));
		String innername = WordBookUtil.getWordBookItemName("inner-type",
				String.valueOf(step.inner()));

		result = "{success: true, data:{sid:'" + step.id()
		+ "', iname:'" + step.iname() + "',imemo:'"
		+ step.imemo() + "',gname:'" + step.iflow().iname()
		+ "',oname:'" + step.iflow().iobject().iname()
		+ "',surportName:'"
		+ step.iflow().iobject().isupport().iname()
		+ "',itype:'" + step.itype() + "',itrans:'"
		+ (step.itrans() ? "1" : "0") + "',ipara:'"
		+ step.ipara() + "',ikey:'" + key + "',icc:'" + step.icc() + "',iopinion:'" + StringTool.checkString(step.getResource().get("S_OPINION")) + "',iopinionquery:'" + StringTool.checkString(step.getResource().get("S_OPINIONQUERY")) + "',iopinionview:'" + StringTool.checkString(step.getResource().get("S_OPINIONVIEW")) + "',ired:'" + StringTool.checkString(step.getResource().get("S_RED")) + "',istamp:'" + StringTool.checkString(step.getResource().get("S_STAMP")) + "',iprint:'" + StringTool.checkString(step.getResource().get("S_PRINT")) + "',iback:'" + StringTool.checkString(step.getResource().get("S_BACK")) + "',ibackstep:'" + StringTool.checkString(step.getResource().get("S_BACKSTEP")) + "',iparavalue:'" + step.iparavalue()
		+ "',iscorr:'" + step.iscorr() + "',isd:'" + StringTool.checkString(step.getResource().get("S_SD"))
		+ "',isguid:'"+step.iguids()+"',isguname:'"+step.igunames()+"',itname:'"+step.idefaultTrendName()+"',isroleid:'"+step.iroleids()+"',isrolename:'"+step.irolenames()+"',inner_:'"+step.inner()+"',iinner:'"+step.inner()+"',innername:'"+innername+"', itypename:'" + typename + "', plug : ["
		+ plugJsonData + "], isenders: "+step.isenders()+", tableView : "+tvJson+"}}";
	}

	request.setAttribute("result", result);

	SystemTool.returnJson(request, response);
%>
