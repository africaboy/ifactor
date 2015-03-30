<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="org.limp.mine.RandomUtil"%>
<%
String colName = "COL_" + RandomUtil.getRandomString(10, true);
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<!--
 * FCKeditor - The text editor for Internet - http://www.fckeditor.net
 * Copyright (C) 2003-2009 Frederico Caldeira Knabben
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 *
 * Text field dialog window.
-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta content="noindex, nofollow" name="robots" />
<script src="common/fck_dialog_common.js" type="text/javascript"></script>
<script type="text/javascript">

var dialog	= window.parent ;
var oEditor = dialog.InnerDialogLoaded() ;

// Gets the document DOM
var oDOM = oEditor.FCK.EditorDocument ;

var oActiveEl = dialog.Selection.GetSelectedElement() ;

window.onload = function()
{
	// First of all, translate the dialog box texts
	oEditor.FCKLanguageManager.TranslatePage(document) ;

	if ( oActiveEl && oActiveEl.tagName == 'INPUT' && ( oActiveEl.type == 'text' || oActiveEl.type == 'password' ) )
	{
		autoSetObject(oActiveEl, '<%= colName%>');

		GetE('txtValue').value	= oActiveEl.value ;
		GetE('txtSize').value	= GetAttribute( oActiveEl, 'size' ) ;
		GetE('txtMax').value	= GetAttribute( oActiveEl, 'maxLength' ) ;
		GetE('txtType').value	= oActiveEl.type ;
		
		if(GetAttribute( oActiveEl, 'colneed' ) == "1"){
		   GetE('colneed').checked = true;
		}
		
		var s = GetEN('rad');
		
		for(var i=0;i<s.length;i++){
		    if(s[i].value == GetAttribute( oActiveEl, 'special' )){
		       s[i].checked = true;
		       break;
		    }
		}
		
		GetE('cssClazz').value = GetAttribute( oActiveEl, 'class' );
	}
	else{
		oActiveEl = null ;
		GetE('colname').value = "<%=colName%>";
	}

	dialog.SetOkButton( true ) ;
	dialog.SetAutoSize( true ) ;
	SelectField( 'txtName' ) ;
}

function Ok()
{
	if ( isNaN( GetE('txtMax').value ) || GetE('txtMax').value < 0 )
	{
		alert( "请设置正确的数字" ) ;
		GetE('txtMax').focus() ;
		return false ;
	}
	else if( isNaN( GetE('txtSize').value ) || GetE('txtSize').value < 0 )
	{
		alert( "请设置正确的数字" ) ;
		GetE('txtSize').focus() ;
		return false ;
	}

	oEditor.FCKUndo.SaveUndoStep() ;

	oActiveEl = CreateNamedElement( oEditor, oActiveEl, 'INPUT', {name: GetE('colName').value, type: GetE('txtType').value } ) ;

	SetAttribute( oActiveEl, 'value'	, GetE('txtValue').value ) ;
	SetAttribute( oActiveEl, 'size'		, GetE('txtSize').value ) ;
	SetAttribute( oActiveEl, 'maxlength', GetE('txtMax').value ) ;
	SetAttribute( oActiveEl, 'colname', GetE('colname').value ) ;
	SetAttribute( oActiveEl, 'collabel', GetE('txtName').value ) ;
	SetAttribute( oActiveEl, 'coltype', GetE('coltype').value ) ;
	SetAttribute( oActiveEl, 'colsize', GetE('colsize').value ) ;
	if(GetE('colneed').checked){
	   SetAttribute( oActiveEl, 'colneed', GetE('colneed').value ) ;
	}else{
	   SetAttribute( oActiveEl, 'colneed', "0" ) ;
	}
	
	var s = GetEN('rad');

	for(var i=0;i<s.length;i++){
	    if(s[i].checked){
	       SetAttribute( oActiveEl, 'special', s[i].value ) ;
	       break;
	    }
	}
	
	SetAttribute( oActiveEl, 'class', GetE('cssClazz').value) ;

	return true ;
}

	</script>
</head>
<body style="overflow: hidden">
<table width="100%" style="height: 100%">
	<tr>
		<td align="center">
		<table cellspacing="0" cellpadding="0" border="0">
		    <tr>
				<td colspan="3">
					<span>css样式</span><br>
					<input id=cssClazz type="text">
				</td>	
			</tr>
			<tr>
				<td><span fcklang="DlgTextName">Name</span><br />
				<input id="txtName" type="text" size="20" /></td>
				<td></td>
				<td><span fcklang="DlgTextValue">Value</span><br />
				<input id="txtValue" type="text" size="25" /></td>
			</tr>
			<tr>
				<td><span fcklang="DlgTextCharWidth">Character Width</span><br />
				<input id="txtSize" type="text" size="5" /></td>
				<td></td>
				<td><span fcklang="DlgTextMaxChars">Maximum Characters</span><br />
				<input id="txtMax" type="text" size="5" /></td>
			</tr>
			<tr>
				<td><span fcklang="DlgTextType">Type</span><br />
				<select id="txtType">
					<option value="text" selected="selected" fcklang="DlgTextTypeText">Text</option>
					<option value="password" fcklang="DlgTextTypePass">Password</option>
				</select></td>
				<td>&nbsp;</td>
				<td><span fcklang="DlgItemName">Column Name</span><br />
				<input id="colname" type="text" size="20" value="" /></td>
			</tr>
			<tr>
				<td><span fcklang="DlgItemType">字段类型</span><br />
				<select id="coltype">
					<option value="varchar" selected="selected">字符</option>
					<option value="integer">整数</option>
					<option value="long">长整数</option>
					<option value="float">浮点</option>
				</select></td>
				<td>&nbsp;</td>
				<td><span fcklang="DlgItemSize">字段大小</span><br />
				<input id="colsize" type="text" size="20" value="20" /></td>
			</tr>
			<tr>
				<td colspan="3"><span>必填项</span><input type="checkbox"
					id="colneed" value="1">&nbsp; <span>普通</span><input
					type="radio" id="special" name="rad" checked value="normal">&nbsp;
				<span>标题</span><input type="radio" id="special" name="rad"
					value="title">&nbsp; <span>时间</span><input type="radio"
					id="special" name="rad" value="date">&nbsp; <span>选择</span><input
					type="radio" id="special" name="rad" value="select"></td>
			</tr>
		</table>
		</td>
	</tr>
</table>
</body>
</html>
