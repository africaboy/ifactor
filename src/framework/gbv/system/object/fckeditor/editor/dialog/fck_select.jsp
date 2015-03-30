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
 * Select dialog window.
-->
<html>
	<head>
		<title>Select Properties</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta content="noindex, nofollow" name="robots">
		<script src="common/fck_dialog_common.js" type="text/javascript"></script>
		<script type="text/javascript" src="fck_select/fck_select.js"></script>
		<script type="text/javascript">

var dialog	= window.parent ;
var oEditor = dialog.InnerDialogLoaded() ;

// Gets the document DOM
var oDOM = oEditor.FCK.EditorDocument ;

var oActiveEl = dialog.Selection.GetSelectedElement() ;

var oListText ;
var oListValue ;

window.onload = function()
{
	// First of all, translate the dialog box texts
	oEditor.FCKLanguageManager.TranslatePage(document) ;

	oListText	= document.getElementById( 'cmbText' ) ;
	oListValue	= document.getElementById( 'cmbValue' ) ;

	// Fix the lists widths. (Bug #970)
	oListText.style.width = oListText.offsetWidth ;
	oListValue.style.width = oListValue.offsetWidth ;

	if ( oActiveEl && oActiveEl.tagName == 'SELECT' )
	{
		autoSetObject(oActiveEl, '<%= colName%>');
		
		GetE('txtSelValue').value	= oActiveEl.value ;
		GetE('txtLines').value		= GetAttribute( oActiveEl, 'size' ) ;
		GetE('chkMultiple').checked	= oActiveEl.multiple ;
		GetE('cssClazz').value = oActiveEl.className;
		
		if(GetAttribute( oActiveEl, 'colneed' ) == "1"){
		   GetE('colneed').checked = true;
		}
		if(GetAttribute( oActiveEl, 'special' ) == "wordbook"){
		   GetE('number').checked = true;
		   GetE('numbere').value = GetAttribute( oActiveEl, 'wbtype' ) ;
		}

		// Load the actual options
		for ( var i = 0 ; i < oActiveEl.options.length ; i++ )
		{
			var sText	= HTMLDecode( oActiveEl.options[i].innerHTML ) ;
			var sValue	= oActiveEl.options[i].value ;

			AddComboOption( oListText, sText, sText ) ;
			AddComboOption( oListValue, sValue, sValue ) ;
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

	var sSize = GetE('txtLines').value ;
	if ( sSize == null || isNaN( sSize ) || sSize <= 1 )
		sSize = '' ;

	oActiveEl = CreateNamedElement( oEditor, oActiveEl, 'SELECT', {name: GetE('colName').value} ) ;

	SetAttribute( oActiveEl, 'size'	, sSize ) ;
	SetAttribute( oActiveEl, 'colname', GetE('colname').value ) ;
	SetAttribute( oActiveEl, 'collabel', GetE('txtName').value ) ;
	SetAttribute( oActiveEl, 'coltype', GetE('coltype').value ) ;
	SetAttribute( oActiveEl, 'colsize', GetE('colsize').value ) ;
	SetAttribute( oActiveEl, 'class', GetE('cssClazz').value ) ;
	
	if(GetE('colneed').checked){
	   SetAttribute( oActiveEl, 'colneed', GetE('colneed').value ) ;
	}else{
	   SetAttribute( oActiveEl, 'colneed', "0" ) ;
	}
	if(GetE('number').checked){
	   SetAttribute( oActiveEl, 'special', 'wordbook') ;
	   SetAttribute( oActiveEl, 'wbtype', GetE('numbere').value ) ;
	}else{
	   SetAttribute( oActiveEl, 'special', '') ;
	   SetAttribute( oActiveEl, 'wbtype', '') ;
	}
	oActiveEl.multiple = ( sSize.length > 0 && GetE('chkMultiple').checked ) ;

	// Remove all options.
	while ( oActiveEl.options.length > 0 )
		oActiveEl.remove(0) ;

	// Add all available options.
	for ( var i = 0 ; i < oListText.options.length ; i++ )
	{
		var sText	= oListText.options[i].value ;
		var sValue	= oListValue.options[i].value ;
		if ( sValue.length == 0 ) sValue = sText ;

		var oOption = AddComboOption( oActiveEl, sText, sValue, oDOM ) ;

		if ( sValue == GetE('txtSelValue').value )
		{
			SetAttribute( oOption, 'selected', 'selected' ) ;
			oOption.selected = true ;
		}
	}

	return true ;
}

		</script>
	</head>
	<body style="overflow: hidden">
		<table width="100%" height="100%">
			<tr>
				<td>
					<table width="100%">
						<tr>
							<td nowrap><span fckLang="DlgSelectName">Name</span>&nbsp;</td>
							<td width="100%" colSpan="2"><input id="txtName" style="WIDTH: 100%" type="text"></td>
						</tr>
						<tr>
							<td nowrap><span fckLang="DlgSelectValue">Value</span>&nbsp;</td>
							<td width="100%" colSpan="2"><input id="txtSelValue" style="WIDTH: 100%; BACKGROUND-COLOR: buttonface" type="text" readonly></td>
						</tr>
						<tr>
						<td nowrap>css样式</td>
						<td width="100%" colSpan="2">
							<input id="cssClazz" type="text" size="20" value=""/>
						</td>
						</tr>
						<tr>
						<td><span fcklang="DlgItemName">Column Name</span><br />
							<input id="colname" type="text" size="20" value=""/>
						</td>
						<td>
							&nbsp;</td>
						<td>
							<span fcklang="DlgItemNeed">必填项</span><br />
							<input type="checkbox" id="colneed" value="1">
						</td>
					</tr>
						<tr>
						<td>
							<span fcklang="DlgItemType">字段类型</span><br />
							<select id="coltype">
								<option value="varchar" selected="selected">字符</option>
								<option value="integer">整数</option>
								<option value="float">浮点数</option>
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
							<span>数据字典</span><br />
							<input type="checkbox" id="number" value="1">
						</td>
						<td>
							&nbsp;</td>
						<td><span>字典类别</span><br />
							<input id="numbere" type="text" value=""/>
						</td>
					</tr>
						<tr>
							<td nowrap><span fckLang="DlgSelectSize">Size</span>&nbsp;</td>
							<td nowrap><input id="txtLines" type="text" size="2" value="">&nbsp;<span fckLang="DlgSelectLines">lines</span></td>
							<td nowrap align="right"><input id="chkMultiple" type="checkbox"><label for="chkMultiple" fckLang="DlgSelectChkMulti">Allow
									multiple selections</label></td>
						</tr>
					</table>
					<br>
					<hr style="POSITION: absolute">
					<span style="LEFT: 10px; POSITION: relative; TOP: -7px" class="BackColor">&nbsp;<span fckLang="DlgSelectOpAvail">Available
							Options</span>&nbsp;</span>
					<table width="100%">
						<tr>
							<td width="50%"><span fckLang="DlgSelectOpText">Text</span><br>
								<input id="txtText" style="WIDTH: 100%" type="text">
							</td>
							<td width="50%"><span fckLang="DlgSelectOpValue">Value</span><br>
								<input id="txtValue" style="WIDTH: 100%" type="text">
							</td>
							<td vAlign="bottom"><input onclick="Add();" type="button" fckLang="DlgSelectBtnAdd" value="Add"></td>
							<td vAlign="bottom"><input onclick="Modify();" type="button" fckLang="DlgSelectBtnModify" value="Modify"></td>
						</tr>
						<tr>
							<td rowSpan="2"><select id="cmbText" style="WIDTH: 100%" onchange="GetE('cmbValue').selectedIndex = this.selectedIndex;Select(this);"
									size="5"></select>
							</td>
							<td rowSpan="2"><select id="cmbValue" style="WIDTH: 100%" onchange="GetE('cmbText').selectedIndex = this.selectedIndex;Select(this);"
									size="5"></select>
							</td>
							<td vAlign="top" colSpan="2">
							</td>
						</tr>
						<tr>
							<td vAlign="bottom" colSpan="2"><input style="WIDTH: 100%" onclick="Move(-1);" type="button" fckLang="DlgSelectBtnUp" value="Up">
								<br>
								<input style="WIDTH: 100%" onclick="Move(1);" type="button" fckLang="DlgSelectBtnDown"
									value="Down">
							</td>
						</tr>
						<TR>
							<TD vAlign="bottom" colSpan="4"><INPUT onclick="SetSelectedValue();" type="button" fckLang="DlgSelectBtnSetValue" value="Set as selected value">&nbsp;&nbsp;
								<input onclick="Delete();" type="button" fckLang="DlgSelectBtnDelete" value="Delete"></TD>
						</TR>
					</table>
				</td>
			</tr>
		</table>
	</body>
</html>
