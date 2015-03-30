<%@ page language="java" contentType="text/html; charset=UTF-8"%>
<%
    String result = (String)request.getAttribute("result");
%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
<title>操作成功</title>
</head>
<jsp:include page="../head.jsp"></jsp:include>
<body>
<div class="divn">删除操作已成功</div>
</body>
</html>
<script>
    alert("删除操作已成功");
    parent.removeItem();
</script>