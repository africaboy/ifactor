<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="java.util.Map" %>
<%@ page import="org.limp.mine.DateTrimmer" %>
<%@ page import="jt.classic.system.lic.params.SignParamsGetter" %>
<%
   String context = jt.classic.system.context.ISystemContext.getContextPath();

   SignParamsGetter spg = SignParamsGetter.getInstance();
   
   Map param = spg.getParamsMap();
%> 
<html>
<head>
<title>License认证信息</title>
</head>
<style>
.tab4edit {
	border: 0;
	font-size: 10pt;
	border-bottom: 1px solid #dcdddd;
	border-left: 1px solid #dcdddd;
	border-collapse: collapse;
}

.tab4edit td {
	border-right: 1px solid #dcdddd;
	border-top: 1px solid #dcdddd;
	padding: 4px;
	height: 25px;
}

.tab4edit td.td1 {
	font-weight: bold;
	font-size: 10pt;
	background-color: #F5F7F9;
}

.tab4edit td.td2 {
	
}
</style>
<body>
<form name="form1" method="post" action="">
<table style="position:absolute;left:expression((screen.width-this.offsetWidth)/2);TOP:expression((screen.height-this.offsetHeight)/4);" width="500" border="0" class="tab4edit" align="center"
										cellpadding="0" cellspacing="0">
		<tr>
			<td colspan="2" align="center">
				&nbsp;<span style=""><b>License 数字签名</b></span>
			</td>
		</tr>
		<tr>
			<td width="100" class="td1">
				产品版本
			</td>

			<td>
				<%=param.get("version")%>
			</td>

		</tr>
		<tr>
			<td width="100" class="td1">
				产品序列号
			</td>

			<td>
				<%=param.get("serialnumber")%>
			</td>

		</tr>
		<tr>
			<td class="td1" width="100">
				授权用户数
			</td>
			<td>
				<%=(spg.getUserSize() == -1 ? "无限制" : String.valueOf(spg.getUserSize()))%>
			</td>
		</tr>
		<tr>
			<td width="100" class="td1">
				授权使用日期
			</td>

			<td>
				<%=(spg.getDateLimit().equals("-1") ? "无限制" : DateTrimmer.getYMD_LBL(spg.getDateLimit()))%>
			</td>

		</tr>
		<tr>
			<td width="100" class="td1">
				License持有者
			</td>

			<td>
				<%=param.get("owner")%>
			</td>

		</tr>
</table>
</form>
</body>
</html>