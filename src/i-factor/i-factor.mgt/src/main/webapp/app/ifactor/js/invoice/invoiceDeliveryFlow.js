/**
 * 初始化invoice流转办理视图前的函数
 * 
 * @param {}
 *            flow
 * @param {}
 *            view
 * @param {}
 *            options
 * @return {Boolean}
 */
function invoiceDeliveryFlow_beforeshow(flow, view, options) {
	if(flow.action == 'todo'){
		var currentStepKey = flow.currentStep.key;

		if ((currentStepKey == 'mVolpvvEFY' || currentStepKey == 'ibvYshlyGv' || currentStepKey == 'OHMcXwKBdZ')
				&& view.id == 'ifactor_invoice_delivery_apply') {

			// 在stockings对象容器中为指定的视图创建options
			options.stockings[view.id] = {
				putOn : true,
				title : ifactorTranslator.getLangLabel('ifcommon-language', 'input_ambiguous'),
				// 当click checkbox时回调的自定义函数
				putOnFunc : 'invoicePutOnStockings',
				stripOffFunc : 'invoiceStripOffStockings',
				items : {},
				targetItems : mgt.invoiceTargetItems
			};
		}
	}
	return true;
}
function invoiceDeliveryFlow_beforesubmit(flow, options) {
	var currentStepKey = options.flow.currentStep.key;
	
	if(currentStepKey=='mVolpvvEFY' || currentStepKey=='ibvYshlyGv'){
		var rnt = false;
		var count = 0;
		var countmd = '';
		
		var url = context + '/system/baseworksave.do?tableNames=IF_MGT_DMODIFY_RECORD&handleTypes=multi&counterNames=countmd';
		Ext.each(options.stockings, function(stockingsItem) {
				for (var i in stockingsItem) {
					for (var j in stockingsItem[i].items) {
						
						url = url+'&WORK_FLOW_'+count+'=invoiceDeliveryFlow';
						url = url+'&APP_PK_ID_'+count+'='+flow.currentStep.beanData['ifactor_invoice_delivery_apply'].APP_PK_ID;
						url = url+'&MODIFY_FIELD_'+count+'='+stockingsItem[i].items[j].dataField;
						url = url+'&CREATE_DATE_'+count+'='+nowTime();
						url = url+'&STATUS_'+count+'=1';

						if (count == 0) {
							countmd = count;
						} else {
							countmd = countmd + ',' + count;
						}

						count++;

					}
				}
			});
			url = url+'&countmd='+countmd;
			var resultXMLHttp = sendRequestObject(url);
			if (resultXMLHttp.status == 200) {
				var resultJson = Ext.util.JSON
						.decode(resultXMLHttp.responseText);

				if (resultJson.success) {
					rnt =true;
				}
			}

		return rnt;	
	}
}

/**
 * (自定义)获取check input结果函数
 * 
 * @param {}
 *            thiz (label checkbox)
 * @param {}
 *            thizItem (input item)
 * @param {}
 *            formId (formpanel id)
 * @param {}
 *            viewId (tableview id)
 */
function invoicePutOnStockings(thiz, itemId, formId, viewId) {
	if (Ext.getCmp(formId).plugObject.options.stockings == null) {
		alert(ifactorTranslator.getLangLabel('ifcommon-language', 'stockings_view')+'(' + viewId + ')');
	} else {
		var stockings = Ext.getCmp(formId).plugObject.options.stockings[viewId];

		// view register json
		var resultJson = Ext.getCmp(formId).resultJson;

		// all items in view
		var componentItems = resultJson.component;

		// find the item
		var item = componentItems[itemId];

		if (thiz.checked) {
			// create stockings item
			stockings.items[formId + '_' + itemId] = {
				name : item.label,
				dataField:item.name,
				type : 'input',
				view : resultJson.name
			};
		} else {
			// remove stockings item
			delete stockings.items[formId + '_' + itemId];
		}

		invoiceStripOffStockings(stockings,
				Ext.getCmp(formId).plugObject.options);
	}
}

/**
 * display stockings items by free style
 * 
 * @param {}
 *            stockings
 */
function invoiceStripOffStockings(stockings, options) {
	var str = '';

	for (var i in stockings.items) {
		if (stockings.items[i].type == 'input') {
			str += ifactorTranslator.getLangLabel('ifcommon-language', 'input_field').formatstr(stockings.items[i].name)+'\n';
		} else if (stockings.items[i].type == 'image') {
			str += ifactorTranslator.getLangLabel('ifcommon-language', 'input_file').formatstr(stockings.items[i].name)+'\n';
		}
	}

	if (options.flow.currentStep.opinionForm) {
		options.flow.currentStep.opinionForm.getForm()
				.findField('OPINION_REFERENCE').setValue(str);
	}

	var currentStepKey = options.flow.currentStep.key;
	
	if(currentStepKey=='mVolpvvEFY'){
		if(str==''){
			invoiceOpinionCheck(options.flow,'Confirmed','ida_fc_opinion');
		}else{
			invoiceOpinionCheck(options.flow,'Modify','ida_fc_opinion');
		}
	}else if(currentStepKey=='ibvYshlyGv'){
		if(str==''){
			invoiceOpinionCheck(options.flow,'Confirmed','smecheck_opinion');
		}else{
			invoiceOpinionCheck(options.flow,'Modify','smecheck_opinion');
		}
	}
}
/**
 * invoice delivery flow handle function
 * 
 * @param flow
 * @param tbar
 * @param options
 */
function invoiceDeliveryFlow(flow, tbar, options) {
	// 当前处理环节步骤
	var currentStepKey = flow.currentStep.key;
	var action = flow.action;
	if (currentStepKey == 'vBdcCEIXvk') {
		// 黑名单校验环节
		var options = {
			querykey : 'ifactor_blacklist_result',
			layout : 'border',
			params : {
				pkId : flow.currentStep.tableView[0].form.getForm()
						.findField('IIDA_PK_ID').getValue()
			},
			resizable : true,
			modal : true,
			maximizable : true
		}

		var grid = tvquery(options);

		grid.title = ifactorTranslator.getLangLabel('ifcommon-language', 'blacklist_check');

		workflowMethods.tbarsplit(tbar);

		tbar.push({
					text : ifactorTranslator.getLangLabel('ifcommon-language', 'blacklist_check_btn'),
					iconCls : 'icon-end',
					tooltip : ifactorTranslator.getLangLabel('ifcommon-language', 'blacklist_check_results'),
					style : {
						overflow : 'visible' // For the Combo popup
					},
					menu : new Ext.menu.Menu({
								style : {
									overflow : 'visible'
								},
								items : [new Ext.TabPanel({
											width : 600,
											height : 300,
											activeTab : 0,
											items : [grid]
										})]
							})
				});
		// }
	} else if (currentStepKey == 'bquDuCwisW') {
		if(action == 'todo'){
			showIUploadPicture(workflowMethods, tbar, flow,currentStepKey);
			showIPictureView(workflowMethods, tbar, flow, true,false);
		}else{
			showIPictureView(workflowMethods, tbar, flow, true,false);
		}
	} else if (currentStepKey == 'mVolpvvEFY' || currentStepKey == 'ibvYshlyGv') {
		if(action == 'todo'){
			showIPictureView(workflowMethods, tbar, flow, false,true);
		}else{
			showIPictureView(workflowMethods, tbar, flow, false,false);
		}
	} else if (currentStepKey == 'YCcCAeFtUg'){
		showIPictureView(workflowMethods, tbar, flow, false,false);
	}

}

function showIUploadPicture(workflowMethods, tbar, flow,currentStepKey) {
	workflowMethods.tbarsplit(tbar);

	var itemCode = '';
	if(currentStepKey=="bquDuCwisW"){
		itemCode = 'checkDoc';
	}
	var defaultItemCode = '';

	tbar.push({
		text :ifactorTranslator.getLangLabel('ifcommon-language', 'image_upload'),
		iconCls : 'picture-add',
		tooltip :ifactorTranslator.getLangLabel('ifcommon-language', 'image_describe'),
		handler : function() {
			
			var options = {
							querykey : 'imageUploadList',
							layout : 'border',
							params : {
								loanId : flow.currentStep.tableView[0].form
										.getForm().findField('APP_PK_ID')
										.getValue()+'_invoice',
								itemCode : itemCode, 
								defaultItemCode : defaultItemCode,
								flowType:'invoice'
							},
							resizable : true,
							modal : true,
							maximizable : true
						}
						showImageUploadItemList(options);

		}
	});

}
function showIPictureView(workflowMethods, tbar, flow, removeUploadImages,isCheckView) {
	workflowMethods.tbarsplit(tbar);

	tbar.push({
				text :ifactorTranslator.getLangLabel('ifcommon-language', 'image_view'),
				iconCls : 'picture-view',
				tooltip : ifactorTranslator.getLangLabel('ifcommon-language', 'image_vdescribe'),
				handler : function() {

					showPreviewImagePanel({
								params : {
									applyCode : flow.currentStep.tableView[0].form
											.getForm().findField('APP_PK_ID')
											.getValue()+'_invoice',
									actId : flow.actId,
									action : flow.action
								},
								removeUploadImages : removeUploadImages,
								removeUploadImageTypes : '',
								isCheckView : isCheckView,
								formId : flow.currentStep.tableView[0].form.id
							});
				}

			});
}

function ifactor_invoice_delivery_apply_layout(tableViewJson, thiz, formLoadData, options) {
	/**if(options.plugObject!='undefind'&&options.plugObject!=null){
		var flow = options.plugObject.workflow;
		var currentStepKey = flow.currentStep.key;
		if(currentStepKey=='OHMcXwKBdZ'){
			form.getForm().findField('IDA_ADVANCE').readOnly = false;
			form.getForm().findField('IDA_ADVANCE').style="background:#ffffff;";
			form.getForm().findField('IDA_INTEREST').readOnly = false;
			form.getForm().findField('IDA_INTEREST').style="background:#ffffff;";
		}
	}
	var date = (new Date()).format("yyyy-MM-dd");
	var settlementDate =  form.getForm().findField('EXPECTED_PAYMENT_DATE_assistant_').getValue();
	var days = parseInt(DateDiff(settlementDate,date));
	var remainingTerm = parseInt(form.getForm().findField('REMAINING_TERM').getValue());
	if(remainingTerm < days){
		form.getForm().findField('REMAINING_TERM').setValue(days);
	}**/
	if(options.plugObject!='undefind'&&options.plugObject!=null){
		//var flow = options.plugObject.workflow;
		//if(flow.action == 'todo'){
			var tableArr = ['IF_MGT_INVOICE_APPLY','IF_MGT_INVOICE_SELLER','IF_MGT_INVOICE_DEBTOR','IF_MGT_INVOICE_FINANC'];
			var fieldtype = '';
			initTableI('IF_MGT_DMODIFY_RECORD', options.beanData.APP_PK_ID, 'APP_PK_ID',
					'multi', function(record) {
						Ext.each(record.list,function(item){
							if((item.STATUS==2||item.STATUS==1)&&item.WORK_FLOW=='invoiceDeliveryFlow'){
								for(var tablename in tableArr){
									var fielditem = thiz.resultJson.component[tableArr[tablename] + "_" + item.MODIFY_FIELD];
									if(fielditem != undefined){
										fieldtype = fielditem.type;
										break;
									}
								}
								if(fieldtype == 'input'){
									Ext.getCmp(thiz.id).getForm().findField(item.MODIFY_FIELD).addClass("x-form-field-red");
								}else if(fieldtype == 'date' || fieldtype == 'time'){
									Ext.getCmp(thiz.id).getForm().findField(item.MODIFY_FIELD+'_assistant_').addClass("x-form-field-red");
								}else if(fieldtype == 'select'){
									Ext.getCmp(thiz.id).getForm().findField(item.MODIFY_FIELD+"_").addClass("x-form-field-red");
								}
							}
						});
					});
		//}
	}
}
// doublemanual opinion view layout
function ifactor_invoice_delivery_flow_doublemanual_opinion_layout(
		tableViewJson, form, formLoadData, options) {
	if(options.plugObject!='undefind'&&options.plugObject!=null){
		var flow = options.plugObject.workflow;
		if(flow.action == 'todo'){
			var yesorno = form.getForm().findField('OPINION').getValue();
			var opinionId = form.id + '_REJECT_RESON_';

			if (yesorno == 'Confirmed') {
				// yes
				methods.dynamicHandleFormItem(form.getForm(), form.getForm().findField('CYCLE'), true);
				methods.dynamicHandleFormItem(form.getForm(), form.getForm().findField('CYCLEDATE_assistant_'), true);
				methods.dynamicHandleFormItem(form.getForm(), Ext.getCmp(opinionId), false, true);
				var cycledate = form.getForm().findField('CYCLEDATE').getValue();
				cycledate = cycledate.substring(0,4) + "-" + cycledate.substring(4,6) + "-" + cycledate.substring(6,8);
				checkCycle(cycledate,form.id,options);
			} else {
				// no
				methods.dynamicHandleFormItem(form.getForm(), form.getForm().findField('CYCLE'), false);
				methods.dynamicHandleFormItem(form.getForm(), form.getForm().findField('CYCLEDATE_assistant_'), false);
				methods.dynamicHandleFormItem(form.getForm(), Ext.getCmp(opinionId), true, false);
			}
		}
	}
}
function ifactor_invoice_delivery_flow_oriver_opinion_layout(
	tableViewJson, form, formLoadData, options){
	if(options.plugObject!='undefind'&&options.plugObject!=null){
		var flow = options.plugObject.workflow;
		var formPanel = flow.currentStep.tableViewForm['ifactor_invoice_delivery_apply'];
		var isverification = formPanel.getForm().findField('ISVERIFICATION').getValue();
		if(isverification=='1'){
			//invoiceOpinionCheck(options.plugObject.workflow,'Accept','oriver_opinion');
			var opinionForm = flow.currentStep.opinionForm;
			var result = 'Accept';
			var tp = 'oriver_opinion';
			//opinionForm.form.findField(opinionForm.id + '_OPINION_').setValue(getWBMapValueLocalData(tp,result));
			//opinionForm.form.findField('OPINION_').setValue(getWBMapValueLocalData(tp,result));
			//opinionForm.form.findField('OPINION').setValue(result);
			//opinionForm.form.findField('OPINION_VAL').setValue(getWBMapValueLocalData(tp,result));
			opinionForm.form.findField('CHECK_RESULT').setValue(result);
			opinionForm.form.findField('CHECK_RESULT_VAL').setValue(getWBMapValueLocalData(tp,result));
		}else if(isverification=='0'){
			var opinionForm = flow.currentStep.opinionForm;
			var result = 'Reject';
			//var tp = 'oriver_opinion';
			//opinionForm.form.findField('OPINION_').setValue(getWBMapValueLocalData(tp,result));
			//opinionForm.form.findField('OPINION').setValue(result);
			//opinionForm.form.findField('OPINION_VAL').setValue(getWBMapValueLocalData(tp,result));
			opinionForm.form.findField('CHECK_RESULT').setValue(result);
			opinionForm.form.findField('CHECK_RESULT_VAL').setValue(getWBMapValueLocalData(tp,result));
		}
	}
}
// doublemanual opinion view layout
function doublemanualOpinionYESORNOreturnFunc(id, name, node, formId, options) {
	var opinionId = formId + '_REJECT_RESON_';
	var flow = options.plugObject.workflow;
	var formPanel = flow.currentStep.tableViewForm['ifactor_invoice_delivery_apply'];
	if (node.data[id] == 'Confirmed') {
		var opinionForm = flow.currentStep.opinionForm;
		/**opinionForm.form.load({
			url : context + "/views/oriver/getCheckResult",
			params : {
				appPkId :flow.currentStep.tableView[0].form.getForm().findField('APP_PK_ID').getValue()
			},
			success : function(form1, action) {
				var resultInfo = listSimpleJson(action.result.data);
				if(resultInfo.get("info")==true){
					methods.dynamicHandleFormItem(Ext.getCmp(formId).getForm(), Ext
						.getCmp(formId).getForm().findField('CYCLE'), true);
					methods.dynamicHandleFormItem(Ext.getCmp(formId).getForm(), Ext
									.getCmp(formId).getForm().findField('CYCLEDATE_assistant_'), true);
					methods.dynamicHandleFormItem(Ext.getCmp(formId).getForm(), Ext
									.getCmp(opinionId), false, true);
				}else{
					opinionForm.form.findField(opinionForm.id + '_OPINION_').setValue('');
					opinionForm.form.findField('OPINION').setValue('');
					opinionForm.form.findField('OPINION_VAL').setValue('');
					Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'), ifactorTranslator.getLangLabel('invoice-language', 'oriver_result_hit'));
				}
			},
			failure : function(form, action) {
				Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'), ifactorTranslator.getLangLabel('ifcommon-language', 'get_oriver_result'));
			}
		});**/
		methods.dynamicHandleFormItem(Ext.getCmp(formId).getForm(), Ext
						.getCmp(formId).getForm().findField('CYCLE'), true);
		methods.dynamicHandleFormItem(Ext.getCmp(formId).getForm(), Ext
						.getCmp(formId).getForm().findField('CYCLEDATE_assistant_'), true);
		methods.dynamicHandleFormItem(Ext.getCmp(formId).getForm(), Ext
						.getCmp(opinionId), false, true);
	} else {
		methods.dynamicHandleFormItem(Ext.getCmp(formId).getForm(), Ext
						.getCmp(formId).getForm().findField('CYCLE'), false);
		methods.dynamicHandleFormItem(Ext.getCmp(formId).getForm(), Ext
						.getCmp(formId).getForm().findField('CYCLEDATE_assistant_'), false);
		formPanel.getForm().findField('IDA_CYCLESTART').setValue('');
		formPanel.getForm().findField('IDA_CYCLEEND').setValue('');
		methods.dynamicHandleFormItem(Ext.getCmp(formId).getForm(), Ext
						.getCmp(opinionId), true, false);
	}
}

function checkCycle(value,form,options){
	if(value!=''){
		var flow = options.plugObject.workflow;
		var formPanel = flow.currentStep.tableViewForm['ifactor_invoice_delivery_apply'];
		//var issuanceDate = formPanel.getForm().findField('INVOICE_ISSUANCE_DATE').getValue();
		//var dueDate = formPanel.getForm().findField('DUE_DATE').getValue());
		var paymentDate = formPanel.getForm().findField('EXPECTED_PAYMENT_DATE').getValue();
		paymentDate = paymentDate.substring(0,4) + "-" + paymentDate.substring(4,6) + "-" + paymentDate.substring(6,8);
		paymentDate = paymentDate.replace(/-/g,"/");
		paymentDate = getthedate(paymentDate,0);
		var startDate = new Date();
		startDate = getthedate(startDate,1);
		var endDate = value.replace(/-/g,"/");
		endDate = getthedate(endDate,0);
		if(DateDiff(endDate,startDate) < 0){
			Ext.getCmp(form).getForm().findField("CYCLE").setValue('');
			Ext.getCmp(form).getForm().findField("CYCLEDATE_assistant_").setValue('');
			Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('invoice-language', 'auction_end_check1'));
		}else if(DateDiff(paymentDate,endDate)< 22){
			Ext.getCmp(form).getForm().findField("CYCLE").setValue('');
			Ext.getCmp(form).getForm().findField("CYCLEDATE_assistant_").setValue('');
			Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('invoice-language', 'auction_end_check2'));
		}else{
			var cycleDays = DateDiff(endDate,startDate) + 1;
			Ext.getCmp(form).getForm().findField("CYCLE").setValue(cycleDays);
			formPanel.getForm().findField('IDA_CYCLESTART_assistant_').setValue((new Date(startDate.replace(/-/g,"/"))).format('yyyy-MM-dd'));
			formPanel.getForm().findField('IDA_CYCLESTART').setValue(startDate.replace(/-/g,'')+'000000');
			formPanel.getForm().findField('IDA_CYCLEEND_assistant_').setValue((new Date(endDate.replace(/-/g,"/"))).format('yyyy-MM-dd'));
			formPanel.getForm().findField('IDA_CYCLEEND').setValue(endDate.replace(/-/g,'')+'000000');
		}
	}
}
Date.prototype.format = function(format)
{
	var o = {
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(), //day
            "h+" : this.getHours(), //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3), //quarter
            "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format))
	format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
	if(new RegExp("("+ k +")").test(format))
	format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}

function getthedate(dd,dadd){
	var a = new Date(dd);
	a = a.valueOf();
	a = a + dadd * 24 * 60 * 60 * 1000;
	a = new Date(a);
	var m = a.getMonth() + 1;
	if(m.toString().length == 1){
		m='0'+m;
	}
	var d = a.getDate();
	if(d.toString().length == 1){
		d='0'+d;
	}
	var year = a.getFullYear()+'';
	var result = year + '-' + m + '-' + d;
	return result;
}

//计算天数差的函数，通用  
function  DateDiff(sDate1,  sDate2){    //sDate1和sDate2是2006-12-18格式  
   var  aDate,  oDate1,  oDate2,  iDays; 
   aDate  =  sDate1.split("-");
   oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);    //转换为12-18-2006格式  
   aDate  =  sDate2.split("-");  
   oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]); 
   iDays  =  parseInt(Math.abs(oDate1  -  oDate2)  /  1000  /  60  /  60  /24);    //把相差的毫秒数转换为天数
   if(oDate1 > oDate2){
		return  iDays; 
   }else{
		return  -iDays;
   }
    
}  

// blacklist check opinion view layout
function ifactor_invoice_delivery_flow_check_opinion_layout(
		tableViewJson, form, formLoadData, options) {
	if(options.plugObject!='undefind'&&options.plugObject!=null){
		var flow = options.plugObject.workflow;
		if(flow.action == 'todo'){
			var yesorno = form.getForm().findField('OPINION').getValue();
			var result = form.getForm().findField('CHECK_RESULT').getValue();
			if(yesorno=='' && result==''){
				form.getForm().load({
							url : context + "/views/blacklist/getCheckResult",
							params : {
								pkid :flow.currentStep.tableView[0].form.getForm().findField('IIDA_PK_ID').getValue()
							},
							success : function(form1, action) {
								var resultInfo = listSimpleJson(action.result.data);
								if(resultInfo.get("info")==true){
									invoiceOpinionCheck(options.plugObject.workflow,'Reject','ida_mp_opinion');
								}else{
									invoiceOpinionCheck(options.plugObject.workflow,'Confirmed','ida_mp_opinion');
								}
							},
							failure : function(form, action) {
								Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'), ifactorTranslator.getLangLabel('ifcommon-language', 'get_blacklist_result'));
							}
						});
			}
		}
	}
}

// blacklist check opinion select
function invoiceblacklistOpinionCheck(id, name, node, formId, options) {
	var opinionVal = node.data[name];
	var form = Ext.getCmp(formId).getForm();
	var result = form.findField('CHECK_RESULT').getValue();
	if (opinionVal!=result) {
		Ext.Msg.confirm(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('ifcommon-language', 'opinion_check').formatstr(result),function(btn){      
			if(btn!='yes'){          
				if(result==getWBMapValueLocalData('ida_mp_opinion','Confirmed')){
					invoiceOpinionCheck(options.plugObject.workflow,'Reject','ida_mp_opinion');
				}else{
					invoiceOpinionCheck(options.plugObject.workflow,'Confirmed','ida_mp_opinion');
				}							       
			}             
		},this);
	}
}

function invoiceOpinionCheck(flow,result,tp){
	var opinionForm = flow.currentStep.opinionForm;
	opinionForm.form.findField(opinionForm.id + '_OPINION_').setValue(getWBMapValueLocalData(tp,result));
	opinionForm.form.findField('OPINION').setValue(result);
	opinionForm.form.findField('OPINION_VAL').setValue(getWBMapValueLocalData(tp,result));
	opinionForm.form.findField('CHECK_RESULT').setValue(getWBMapValueLocalData(tp,result));
}

function invoiceFirstCheckOption(id, name, node, formId, options) {
	var opinionVal = node.data[id];
	var form = Ext.getCmp(formId).getForm();
	var result = form.findField('CHECK_RESULT').getValue();
	var reference = form.findField('OPINION_REFERENCE').getValue();
	if(reference == '' && opinionVal == 'Modify'){
		invoiceOpinionCheck(options.plugObject.workflow,'Confirmed','ida_fc_opinion');
		Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'), ifactorTranslator.getLangLabel('ifcommon-language', 'tickbox'));
	}else{
		if(result!=''){
			if (node.data[name]!=result) {
				Ext.Msg.confirm(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('ifcommon-language', 'opinion_check').formatstr(result),function(btn){ 
					if(btn!='yes'){          
						if(result==getWBMapValueLocalData('ida_fc_opinion','Confirmed')){
							invoiceOpinionCheck(options.plugObject.workflow,'Confirmed','ida_fc_opinion');
						}else{
							invoiceOpinionCheck(options.plugObject.workflow,'Modify','ida_fc_opinion');
						}							       
					}             
				},this);
			}
		}else{
			 form.findField('CHECK_RESULT').setValue(node.data[name]);
		}
	}
}

function invoiceDoubleCheckOption(id, name, node, formId, options) {
	var opinionVal = node.data[id];
	var form = Ext.getCmp(formId).getForm();
	var result = form.findField('CHECK_RESULT').getValue();
	var reference = form.findField('OPINION_REFERENCE').getValue();
	if(reference == '' && opinionVal == 'Modify'){
		invoiceOpinionCheck(options.plugObject.workflow,'Confirmed','smecheck_opinion');
		Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'), ifactorTranslator.getLangLabel('ifcommon-language', 'tickbox'));
	}else{
		if(result!=''){
			if (node.data[name]!=result) {
				Ext.Msg.confirm(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('ifcommon-language', 'opinion_check').formatstr(result),function(btn){        
					if(btn!='yes'){          
						if(result=='Confirmed'){
							invoiceOpinionCheck(options.plugObject.workflow,'Confirmed','smecheck_opinion');
						}else{
							invoiceOpinionCheck(options.plugObject.workflow,'Modify','smecheck_opinion');
						}							       
					}             
				},this);
			}
		}else{
			form.findField('CHECK_RESULT').setValue(node.data[name]);
		}
	}
}

function ifactor_invoice_delivery_flow_firstcheck_opinion_layout(
		tableViewJson, form, formLoadData, options) {
	if(options.plugObject!='undefind'&&options.plugObject!=null){
		var flow = options.plugObject.workflow;
		if(flow.action == 'todo'){
			var lastStepKey = flow.lastStepKey;
			if(lastStepKey == 'ibvYshlyGv'){
				var reference = flow.lastStep.opinion.OPINION_REFERENCE;
				var imageRemark = flow.lastStep.opinion.IMAGE_REMARK;
				form.getForm().findField('IMAGE_REMARK').setValue(imageRemark);
				form.getForm().findField('IMAGE_REMARK').readOnly = true;
				form.getForm().findField('IMAGE_REMARK').style="background:rgb(240, 240, 240);";
				form.getForm().findField('OPINION_REFERENCE').setValue(reference);
				invoiceDeliveryOpinionCheck(flow,'Modify','ida_fc_opinion');
				form.getForm().findField(form.id + '_OPINION_').readOnly = true;
				form.getForm().findField(form.id + '_OPINION_').style="background:rgb(240, 240, 240);";
			}
		}
	}
}

function invoiceDeliveryOpinionCheck(flow,result,tp){
	var opinionForm = flow.currentStep.opinionForm;
	opinionForm.form.findField(opinionForm.id + '_OPINION_').setValue(getWBMapValueLocalData(tp,result));
	opinionForm.form.findField('OPINION').setValue(result);
	opinionForm.form.findField('OPINION_VAL').setValue(getWBMapValueLocalData(tp,result));
	opinionForm.form.findField('CHECK_RESULT').setValue(getWBMapValueLocalData(tp,result));
}