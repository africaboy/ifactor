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
 * Hidden Field dialog window.
-->
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Hidden Field Properties</title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta content="noindex, nofollow" name="robots" />
	<script src="common/fck_dialog_common.js" type="text/javascript"></script>
	<script type="text/javascript">

var dialog	= window.parent ;
var oEditor = dialog.InnerDialogLoaded() ;

var FCK = oEditor.FCK ;

// Gets the document DOM
var oDOM = FCK.EditorDocument ;

// Get the selected flash embed (if available).
var oFakeImage = dialog.Selection.GetSelectedElement() ;
var oActiveEl ;

if ( oFakeImage )
{
	if ( oFakeImage.tagName == 'IMG' && oFakeImage.getAttribute('_fckinputhidden') )
		oActiveEl = FCK.GetRealElement( oFakeImage ) ;
	else
		oFakeImage = null ;
}

window.onload = function()
{
	// First of all, translate the dialog box texts
	oEditor.FCKLanguageManager.TranslatePage(document) ;

	if ( oActiveEl )
	{
		autoSetObject(oActiveEl, '<%= colName%>');
		
		GetE('txtValue').value		= oActiveEl.value ;
		
		GetE('orcolname').value	= GetAttribute( oActiveEl, 'colname' ) ;
		if(GetAttribute( oActiveEl, 'colneed' ) == "1"){
		   GetE('colneed').checked = true;
		}
		
		var s = GetEN('rad');
		
		for(var i=0;i<s.length;i++){
		    if(s[i].value == GetAttribute( oActiveEl, 'special' )){
		       s[i].checked = true;
		       
		       initColtype(s[i].value);
		       
		       if(GetAttribute( oActiveEl, 'special' ) == 'dataindex'){
		            GetE('paramValue').value = GetAttribute( oActiveEl, 'wbtype' ) ;
		       }else if(GetAttribute( oActiveEl, 'special' ) == 'gu'){
		            GetE('paramValue').value = GetAttribute( oActiveEl, 'gutype' ) ;
		       }
		       
		       break;
		    }
		}
	}else{
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

	oActiveEl = CreateNamedElement( oEditor, oActiveEl, 'INPUT', {name: GetE('colName').value, type: 'hidden' } ) ;

	SetAttribute( oActiveEl, 'value', GetE('txtValue').value ) ;
	
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
	       
	       if(s[i].value == 'dataindex'){
		       SetAttribute( oActiveEl, 'wbtype', GetE('paramValue').value);
	       }else if(s[i].value == 'gu'){
	           SetAttribute( oActiveEl, 'gutype', GetE('paramValue').value);
	       }
	       
	       break;
	    }
	}

	if ( !oFakeImage )
	{
		oFakeImage	= oEditor.FCKDocumentProcessor_CreateFakeImage( 'FCK__InputHidden', oActiveEl ) ;
		oFakeImage.setAttribute( '_fckinputhidden', 'true', 0 ) ;

		oActiveEl.parentNode.insertBefore( oFakeImage, oActiveEl ) ;
		oActiveEl.parentNode.removeChild( oActiveEl ) ;
	}
	else
		oEditor.FCKUndo.SaveUndoStep() ;

	return true ;
}

function initColtype(tp){
    document.getElementById('coltype').options.length = 0;
    if(tp == 'normal'){
        document.getElementById('coltype').options.add(new Option('字符', 'varchar'));
        document.getElementById('coltype').options.add(new Option('长整数', 'long'));
        document.getElementById('coltype').options.add(new Option('浮点', 'float'));
        document.getElementById('coltype').options.add(new Option('整数', 'integer'));
        document.getElementById('coltype').options.add(new Option('CLOB', 'clob'));
        document.getElementById('coltype').options.add(new Option('BLOB', 'blob'));
    }else if(tp == 'yijian'){
        document.getElementById('coltype').options.add(new Option('CLOB', 'clob'));
    }else if(tp == 'zhengwen'){
        document.getElementById('coltype').options.add(new Option('BLOB', 'blob'));
    }else if(tp == 'file'){
        document.getElementById('coltype').options.add(new Option('附件(自由存储)', 'freeannex'));
		document.getElementById('coltype').options.add(new Option('附件(限制存储)', 'annex'));
    }else if(tp == 'number' || tp == 'dataindex' || tp == 'gu'){
        document.getElementById('coltype').options.add(new Option('字符', 'varchar'));
    }
}

function handleColType(thizz){
    if(thizz.value == 'freeannex'){
        GetE('colname').value = 'ALLFREE';
    }else if(thizz.value == 'annex'){
        GetE('colname').value = 'ALLRESTRICT';
    }
}
	</script>
</head>
<body style="overflow: hidden" scroll="no">
    <input type="hidden" id="orcolname" value="<%=colName%>">
	<table height="100%" width="100%">
		<tr>
			<td align="center">
				<table border="0" class="inhoud" cellpadding="0" cellspacing="0" width="80%">
					<tr>
						<td>
							<span fcklang="DlgHiddenName">Name</span><br />
							<input type="text" size="20" id="txtName" style="width: 100%" />
						</td>
					</tr>
					<tr>
						<td>
							<span fcklang="DlgHiddenValue">Value</span><br />
							<input type="text" size="30" id="txtValue" style="width: 100%" />
						</td>
					</tr>
					<tr>
						<td>
							<span fcklang="">辅助参数</span><br />
							<input type="text" title="当表单项为‘数据类别选择’或‘组/用户选择’时，辅助参数可作为显示结构树根节点ID" size="30" id="paramValue" style="width: 100%" />
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
						<td colspan="3"><span fcklang="">普通</span>
							<input type="radio" id="special" name="rad" checked value="normal" onclick="javascript:GetE('colname').value = GetE('orcolname').value;initColtype('normal');">&nbsp;
						<span fcklang="">签署意见</span>
							<input type="radio" id="special" name="rad" value="yijian" onclick="javascript:GetE('colname').value = GetE('orcolname').value;initColtype('yijian');">&nbsp;
						<span fcklang="">正文</span>
							<input type="radio" id="special" name="rad" value="zhengwen" onclick="javascript:GetE('colname').value = GetE('orcolname').value;initColtype('zhengwen');">&nbsp;
						<span fcklang="">附件</span>
							<input type="radio" id="special" name="rad" value="file" onclick="javascript:GetE('colname').value = 'ALLFREE';initColtype('file');">
						<span fcklang="">文号</span>
							<input type="radio" id="special" name="rad" value="number" onclick="javascript:GetE('colname').value = GetE('orcolname').value;initColtype('number');">	
						<span fcklang="">数据类别选择</span>
							<input type="radio" id="special" name="rad" value="dataindex" onclick="javascript:GetE('colname').value = GetE('orcolname').value;initColtype('dataindex');">	
						<span fcklang="">组/用户选择</span>
							<input type="radio" id="special" name="rad" value="gu" onclick="javascript:GetE('colname').value = GetE('orcolname').value;initColtype('gu');">		
						</td>
					</tr>
						<tr>
						<td>
							<span fcklang="DlgItemType">字段类型</span><br />
							<select id="coltype" onchange="javascript:handleColType(this);">
							    <option value="varchar">字符</option>
							    <option value="long">长整数</option>
					            <option value="float">浮点</option>
							    <option value="integer">整数</option>
								<option value="clob">CLOB</option>
								<option value="blob">BLOB</option>
							</select>
						</td>
						<td>
							&nbsp;</td>
						<td><span fcklang="DlgItemSize">字段大小</span><br />
							<input id="colsize" type="text" size="20" value="20"/>
						</td>
					</tr>
				</table>
			</td>
		</tr>
	</table>
</body>
</html>
