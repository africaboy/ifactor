<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="java.util.Map"%>
<%@ page import="java.util.Iterator"%>
<script>
    function initqueryparam(){
<%
    Map query = (Map)request.getAttribute("query");
        
    Iterator iter = query.keySet().iterator();
    
    while(iter.hasNext()){
    	String key = (String)iter.next();
    	String value = (String)query.get(key);
    	out.println("createHidden(\""+key+"\",\""+value+"\");\n");
    }
%>
    }
</script>