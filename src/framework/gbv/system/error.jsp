<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    String error = (String)request.getAttribute("error");
%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>错误页面</title>
</head>
<style>
	body {
		font: 80% "Trebuchet MS", sans-serif;
	}
	
	h4 {
	    color : red;
	}
</style>
<body>
<h4>错误异常提示</h4>
<div class="divn"><%=error%></div> 
</body>
</html>