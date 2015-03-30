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
 * Checkbox dialog window.
-->
<html>
	<head>
		<title>Checkbox Properties</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta content="noindex, nofollow" name="robots">
		<script src="common/fck_dialog_common.js" type="text/javascript"></script>
		<script type="text/javascript">

var dialog	= window.parent ;
var oEditor	= dialog.InnerDialogLoaded() ;

// Gets the document DOM
var oDOM = oEditor.FCK.EditorDocument ;

var oActiveEl = dialog.Selection.GetSelectedElement() ;

window.onload = function()
{
	// First of all, translate the dialog box texts
	oEditor.FCKLanguageManager.TranslatePage(document) ;

	if ( oActiveEl && oActiveEl.tagName == 'INPUT' && oActiveEl.type == 'checkbox' )
	{
		autoSetObject(oActiveEl, '<%= colName%>');
		
		GetE('txtValue').value		= oEditor.FCKBrowserInfo.IsIE ? oActiveEl.value : GetAttribute( oActiveEl, 'value' ) ;
		GetE('txtSelected').checked	= oActiveEl.checked ;

		if(GetAttribute( oActiveEl, 'colneed' ) == "1"){
		   GetE('colneed').checked = true;
		}
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
	oEditor.FCKUndo.SaveUndoStep() ;

	oActiveEl = CreateNamedElement( oEditor, oActiveEl, 'INPUT', {name: GetE('colName').value, type: 'checkbox' } ) ;

	if ( oEditor.FCKBrowserInfo.IsIE )
		oActiveEl.value = GetE('txtValue').value ;
	else
		SetAttribute( oActiveEl, 'value', GetE('txtValue').value ) ;

	var bIsChecked = GetE('txtSelected').checked ;
	SetAttribute( oActiveEl, 'checked', bIsChecked ? 'checked' : null ) ;	// For Firefox
	oActiveEl.checked = bIsChecked ;
	
	SetAttribute( oActiveEl, 'colname', GetE('colname').value ) ;
	SetAttribute( oActiveEl, 'collabel', GetE('txtName').value ) ;
	SetAttribute( oActiveEl, 'coltype', GetE('coltype').value ) ;
	SetAttribute( oActiveEl, 'colsize', GetE('colsize').value ) ;
	if(GetE('colneed').checked){
	   SetAttribute( oActiveEl, 'colneed', GetE('colneed').value ) ;
	}else{
	   SetAttribute( oActiveEl, 'colneed', "0" ) ;
	}

	return true ;
}

		</script>
	</head>
	<body style="OVERFLOW: hidden" scroll="no">
		<table height="100%" width="100%">
			<tr>
				<td align="center">
					<table border="0" cellpadding="0" cellspacing="0" width="80%">
						<tr>
							<td colspan="3">
								<span fckLang="DlgCheckboxName">Name</span><br>
								<input type="text" size="20" id="txtName" style="WIDTH: 100%">
							</td>
						</tr>
						<tr>
							<td colspan="3">
								<span fckLang="DlgCheckboxValue">Value</span><br>
								<input type="text" size="20" id="txtValue" style="WIDTH: 100%">
							</td>
						</tr>
						<tr>
							<td colspan="3"><input type="checkbox" id="txtSelected"><label for="txtSelected" fckLang="DlgCheckboxSelected">Checked</label></td>
						</tr>
						<tr>
						<td>
							<span fcklang="DlgItemType">字段类型</span><br />
							<select id="coltype">
								<option value="varchar" selected="selected">字符</option>
								<option value="integer">整数</option>
								<option value="float">浮点</option>
							</select>
						</td>
						<td>
							&nbsp;</td>
						<td><span fcklang="DlgItemSize">字段大小</span><br />
							<input id="colsize" type="text" size="20" value="20"/>
						</td>
					</tr>
					<tr>
						<td>
							<span fcklang="DlgItemNeed">必填项</span><br />
							<input type="checkbox" id="colneed" value="1">
						</td>
						<td>
							&nbsp;</td>
						<td><span fcklang="DlgItemName">Column Name</span><br />
							<input id="colname" type="text" size="20" value=""/>
						</td>
					</tr>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>
