<%@ page contentType="text/html;charset=UTF-8"%>
<%@ page import="java.util.List"%>
<%@ page import="org.limp.mine.StringTool"%>
<%@ page import="org.limp.basework.impl.CommonBean4HSQ"%>
<%@ page import="jt.classic.system.objectquery.ObjectQuery"%>
<%@ page import="jt.classic.system.objectquery.ObjectQueryItem"%>
<%@ page import="jt.classic.system.objectquery.ObjectQueryRegister"%>
<%
	String context = jt.classic.system.context.ISystemContext.getContextPath();

	CommonBean4HSQ cbh = new CommonBean4HSQ(request);

	String queryKey = StringTool.checkString(cbh.getResource().get(
			"queryKey"));

	ObjectQueryRegister register = ObjectQueryRegister.getInstance();

	ObjectQuery query = register.get(queryKey);

	List list = (query != null ? query.iviewitems() : null);

	List list1 = (query != null ? query.iqueryitems() : null);
%>
<link rel="stylesheet" type="text/css"
	href="<%=context%>/system/wordbook/css/wbmanage.css"></link>
<script type="text/javascript"
	src="<%=context %>/system/wordbook/js/wbstore.js"></script>
<link rel="stylesheet" type="text/css"
	href="<%=context%>/system/group/css/groupmanage.css"></link>
<script type="text/javascript"
	src="<%=context %>/system/group/js/groupcombo4jsp.js"></script>
<script>
     var querykey = '<%=queryKey%>';

     <%
        if(list != null && !list.isEmpty()){
        	out.print("var viewItems = [");
        	for(int i=0;i<list.size();i++){
        		ObjectQueryItem item = (ObjectQueryItem)list.get(i);
        		out.print("'" + item.icolumn().getName() + "'");
        		
        		if(i < list.size() - 1){
        			out.print(",");
        		}
        	}
        	out.println("];");
        }else{
        	out.println("var viewItems = [];");
        }
     %>
     
     <%
        if(list1 != null && !list1.isEmpty()){
        	out.print("var queryItems = [");
        	for(int i=0;i<list1.size();i++){
        		out.print("{");
        		ObjectQueryItem item = (ObjectQueryItem)list1.get(i);
        		out.print("'columnName':'" + item.icolumn().getName() + "',");
        		out.print("'columnType':'" + item.icolumn().getType().toString() + "',");
        		out.print("'clazz':'" + item.iclass() + "',");
        		out.print("'label':'" + item.ilabel() + "',");
        		out.print("'mode':'" + item.imode() + "',");
        		out.print("'param':'" + item.iparam() + "',");
        		out.print("'type':'" + item.itype() + "'");
        		out.print("}");
        		if(i < list1.size() - 1){
        			out.print(",");
        		}
        	}
        	out.println("];"); 	
        }else{
        	out.println("var queryItems = [];");
        }
     %>
     
     /*查询参数*/
     var params;
     
     function getParamValue(id){
         var str = '';
         var pm = eval(params);
         if(pm){
             str = (eval('pm.' + id));
         }
         
         return str;
     }
     
     function queryData(tbl){
         var queryForm = new Ext.FormPanel({
			 labelWidth : 75, // label settings here cascade unless
			 frame : true,
			 bodyStyle : 'padding:5px 5px 0',
			 width : 350,
			 defaults : {
				 width : 230
			 },
			 defaultType : 'textfield'
		 });
		    
         Ext.each(queryItems, function(item) {
             if(item.type == 'input'){
                 var it = new Ext.form.TextField({
	             	fieldLabel : item.label,
					id : item.columnName,
					name : item.columnName,
					value : getParamValue(item.columnName)
	             });
	             queryForm.add(it);
             }else if(item.type == 'date'){
                 var str = getParamValue(item.columnName);

                 if(str != ''){
                    str += '000000'
                 }

                 var it = new Ext.form.DateField({
	             	fieldLabel : item.label,
					id : item.columnName,
					name : item.columnName,
					format : 'Y-m-d',
					emptyText : formatDate(str),
					value : str
	             });
	             queryForm.add(it);
             }else if(item.type == 'select'){
                 var it = getWBComboStore(item.param, '', item.name + '_', item.label, item.name, null, '0', true);
	             queryForm.add(it);
             }
         	
         });
         
         queryForm.doLayout();

         var queryWin = new Ext.Window({
				renderTo : Ext.getBody(),
				layout : 'fit',
				width : 400,
				height : 300,
				title : '<%=query.iname()%>Query',
				resizable : false,
				plain : true,
				// modal : true,

				items : [queryForm],

				buttons : [{
							id : 'userQueryButton',
							text : 'Query',
							handler : function() {			
							    params = '';
										    
								Ext.each(queryItems, function(item) {
									if(item.type == 'input'){
						         		params += item.columnName + ' : "'+Ext.getCmp(item.columnName).getValue()+'",';
						         	}else if(item.type == 'date'){
						         		var v = parseDate(Ext.getCmp(item.columnName).getEl().dom.value);
						         		if(v != ''){
						         		    //v += '000000';
						         		}
						         		params += item.columnName + ' : "'+v+'",';
						         	}else if(item.type == 'select'){
						         	    params += item.columnName + ' : "'+Ext.getCmp(item.name + '_').getValue()+'",';
						         	}
						        });
						        
						        if(params != ''){
						        	params = '({' + params.substring(0, params.length - 1) + '})';
						        }else{
						        	params = '({})';
						        }

                                clearTable(tbl);

						        init(eval(params));
						        
						        queryWin.close();
								queryWin = null;
							}
						}, {
							text : 'Close',
							handler : function() {
								queryWin.close();
								queryWin = null;
							}
						}]
			});

		  queryWin.show(this);
     }
     
     function clearTable(t) {
		 for (var i = document.getElementById(t).rows.length - 1; i >= 0; i--) {
			 if (i > 0 && document.getElementById(t).rows[i].getAttribute('datarow') == 1) {
				 document.getElementById(t).deleteRow(i);
			 }
		 }
	 }
	 
	 //window.onload = initQueryItemHidden;
</script>
