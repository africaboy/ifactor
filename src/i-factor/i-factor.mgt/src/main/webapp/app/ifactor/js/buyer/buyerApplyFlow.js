/**
 * 初始化buyer流转办理视图前的函数
 * 
 * @param {}
 *            flow
 * @param {}
 *            view
 * @param {}
 *            options
 * @return {Boolean}
 */
function buyerApplyFlow_beforeshow(flow, view, options) {
	if(flow.action == 'todo'){
		var lastStepKey = flow.lastStepKey;
		var currentStepKey = flow.currentStep.key;
		if ((currentStepKey == 'frTGUAcenq' || currentStepKey == 'xzaEBsKadm' || currentStepKey == 'ZgoGbrkOWm' || currentStepKey == 'PBwYjzcgYL')
				&& view.id == 'ifactor_buyer_apply') {
			var putOn = true;
			if(currentStepKey == 'PBwYjzcgYL'){
				putOn = false;
			}
			if(lastStepKey != 'xzaEBsKadm'|| (lastStepKey == 'xzaEBsKadm'&& currentStepKey != 'frTGUAcenq')){
				// 在stockings对象容器中为指定的视图创建options
				if(currentStepKey == 'ZgoGbrkOWm'){
					options.stockings[view.id] = {
						putOn : putOn,
						title : ifactorTranslator.getLangLabel('ifcommon-language', 'input_ambiguous'),
						// 当click checkbox时回调的自定义函数
						putOnFunc : 'buyerPutOnStockings',
						stripOffFunc : 'buyerStripOffStockings',
						items : {},
						targetItems : mgt.buyerConfirmTargetItems
					};
				}else{
					options.stockings[view.id] = {
						putOn : putOn,
						title : ifactorTranslator.getLangLabel('ifcommon-language', 'input_ambiguous'),
						// 当click checkbox时回调的自定义函数
						putOnFunc : 'buyerPutOnStockings',
						stripOffFunc : 'buyerStripOffStockings',
						items : {},
						targetItems : mgt.buyerTargetItems
					};

				}
			}
		}
	}
	return true;
}

function buyerApplyFlow_beforesubmit(flow, options) {
	var currentStepKey = flow.currentStep.key;
	if (currentStepKey == 'frTGUAcenq' || currentStepKey == 'xzaEBsKadm') {
		var rnt = false;
		var count = 0;
		var countmd = '';

		var url = context
				+ '/system/baseworksave.do?tableNames=IF_MGT_DMODIFY_RECORD&handleTypes=multi&counterNames=countmd';

		Ext.each(options.stockings, function(stockingsItem) {
			for (var i in stockingsItem) {
				for (var j in stockingsItem[i].items) {

					url = url + '&WORK_FLOW_' + count + '=buyerApplyFlow';
					url = url
							+ '&APP_PK_ID_'
							+ count
							+ '='
							+ flow.currentStep.beanData['ifactor_buyer_apply'].APP_PK_ID;
					url = url + '&MODIFY_FIELD_' + count + '='
							+ stockingsItem[i].items[j].dataField;
					url = url + '&CREATE_DATE_' + count + '=' + nowTime();
					url = url + '&STATUS_' + count + '=1';

					if (count == 0) {
						countmd = count;
					} else {
						countmd = countmd + ',' + count;
					}

					count++;

				}
			}
		});
		url = url + '&countmd=' + countmd;
		var resultXMLHttp = sendRequestObject(url);
		if (resultXMLHttp.status == 200) {
			var resultJson = Ext.util.JSON.decode(resultXMLHttp.responseText);

			if (resultJson.success) {
				rnt = true;
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
function buyerPutOnStockings(thiz, itemId, formId, viewId) {
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

		buyerStripOffStockings(stockings, Ext.getCmp(formId).plugObject.options);
	}
}

/**
 * display stockings items by free style
 * 
 * @param {}
 *            stockings
 */
function buyerStripOffStockings(stockings, options) {
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
	
	if(currentStepKey=='frTGUAcenq' || currentStepKey=='xzaEBsKadm'){
		if(str==''){
			buyerOpinionCheck1(options.flow,'Confirmed','fc_opinion');
		}else{
			buyerOpinionCheck1(options.flow,'Modify','fc_opinion');
		}
	}
}

function buyerApplyFlow(flow, tbar, options) {
	var currentStepKey = flow.currentStep.key;
	var lastStepKey = flow.lastStepKey;
	var action = flow.action;
	/**var businessfrom = flow.currentStep.tableView[0].form.getForm().findField('BUSINESSFROM').getValue();
	if(businessfrom==''){
		 flow.currentStep.tableView[0].form.getForm().findField('BUSINESSFROM').hidden = true;
	}
	var cpbusinessfrom = flow.currentStep.tableView[0].form.getForm().findField('CPBUSINESSFROM').getValue();
	if(cpbusinessfrom==''){
		 flow.currentStep.tableView[0].form.getForm().findField('CPBUSINESSFROM').hidden = true;
	}**/
	if (currentStepKey == 'yjoUTSRriH') {
		// 黑名单校验环节
		var options = {
			querykey : 'ifactor_blacklist_result',
			layout : 'border',
			params : {
				pkId : flow.currentStep.tableView[0].form.getForm()
						.findField('IBA_PK_ID').getValue()
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
		// }lastStepKey != 'xzaEBsKadm'
	} else if (currentStepKey == 'wqeytIZGJg') {
		removeUploadImages = true;
		if(action == 'todo'){
			showBUploadPicture(workflowMethods, tbar, flow, currentStepKey);
		}
		showBPictureView(workflowMethods, tbar, flow, removeUploadImages,false);

	} else if (currentStepKey == 'frTGUAcenq' || currentStepKey == 'xzaEBsKadm'
			|| currentStepKey == 'PBwYjzcgYL' || currentStepKey == 'ZgoGbrkOWm') {
		removeUploadImages = false;
		if((currentStepKey == 'frTGUAcenq'&&lastStepKey == 'xzaEBsKadm')||currentStepKey == 'ZgoGbrkOWm'){
			showBPictureView(workflowMethods, tbar, flow, removeUploadImages,false);
		}else{
			if(action == 'todo'){
				showBPictureView(workflowMethods, tbar, flow, removeUploadImages,true);
			}else{
				showBPictureView(workflowMethods, tbar, flow, removeUploadImages,false);
			}
			
		}
	}
}

function showBUploadPicture(workflowMethods, tbar, flow, currentStepKey) {
	workflowMethods.tbarsplit(tbar);

	var itemCode = '';
	if(currentStepKey=="wqeytIZGJg"){
		itemCode = 'signedDocument,signedContract';
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
										.getValue()+'_buyer',
								itemCode : itemCode, 
								defaultItemCode : defaultItemCode,
								flowType:'buyer'
							},
							resizable : true,
							modal : true,
							maximizable : true
						}
						showImageUploadItemList(options);

		}
	});

}
function showBPictureView(workflowMethods, tbar, flow, removeUploadImages,isCheckView) {
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
											.getValue()+'_buyer',
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

// first check opinion view layout
function ifactor_buyer_flow_firstcheck_opinion_layout(
		tableViewJson, form, formLoadData, options) {
	if(options.plugObject!='undefind'&&options.plugObject!=null){
		var flow = options.plugObject.workflow;
		if(flow.action == 'todo'){
			var lastStepKey = flow.lastStepKey;
			if(lastStepKey == 'xzaEBsKadm'){
				var reference = flow.lastStep.opinion.OPINION_REFERENCE;
				var imageRemark = flow.lastStep.opinion.IMAGE_REMARK;
				form.getForm().findField('IMAGE_REMARK').setValue(imageRemark);
				form.getForm().findField('IMAGE_REMARK').readOnly = true;
				form.getForm().findField('IMAGE_REMARK').style="background:rgb(240, 240, 240);";
				form.getForm().findField('OPINION_REFERENCE').setValue(reference);
				buyerOpinionCheck1(flow,'Modify','fc_opinion');
				form.getForm().findField(form.id + '_OPINION_').readOnly = true;
				form.getForm().findField(form.id + '_OPINION_').style="background:rgb(240, 240, 240);";
			}
		}
	}
}

// blacklist check opinion view layout
function ifactor_buyer_flow_blacklistcheck_opinion_layout(
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
								pkid :flow.currentStep.tableView[0].form.getForm().findField('IBA_PK_ID').getValue()
							},
							success : function(form1, action) {
								var resultInfo = listSimpleJson(action.result.data);
								if(resultInfo.get("info")==true){
									buyerOpinionCheck1(flow,'Reject','blc_opinion');
								}else{
									buyerOpinionCheck1(flow,'Accept','blc_opinion');
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
function buyerblacklistOpinionCheck(id, name, node, formId, options) {
	var opinionVal = node.data[name];
	var form = Ext.getCmp(formId).getForm();
	var result = form.findField('CHECK_RESULT').getValue();
	if (opinionVal!=result) {
		Ext.Msg.confirm(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('ifcommon-language', 'opinion_check').formatstr(result),function(btn){       
			if(btn!='yes'){          
				if(result==getWBMapValueLocalData('blc_opinion','Accept')){
					buyerOpinionCheck1(flow,'Accept','blc_opinion');
				}else{
					buyerOpinionCheck1(flow,'Reject','blc_opinion');
				}							       
			}             
		},this);
	}
}

function buyerCheckOption(id, name, node, formId, options) {
	var opinionVal = node.data[id];
	var form = Ext.getCmp(formId).getForm();
	var result = form.findField('CHECK_RESULT').getValue();
	var reference = form.findField('OPINION_REFERENCE').getValue();
	if(reference == '' && opinionVal == 'Modify'){
		buyerOpinionCheck1(options.plugObject.workflow,'Confirmed','dc_opinion');
		Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'), ifactorTranslator.getLangLabel('ifcommon-language', 'tickbox'));
	}else{
		if(result!=''){
			if (node.data[name]!=result) {
				Ext.Msg.confirm(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('ifcommon-language', 'opinion_check').formatstr(result),function(btn){        
					if(btn!='yes'){          
						if(result==getWBMapValueLocalData('dc_opinion','Confirmed')){
							buyerOpinionCheck1(options.plugObject.workflow,'Confirmed','dc_opinion');
						}else{
							buyerOpinionCheck1(options.plugObject.workflow,'Modify','dc_opinion');
						}							       
					}             
				},this);
			}
		}else{
			form.findField('CHECK_RESULT').setValue(node.data[name]);
		}
	}
}

function buyerOpinionCheck1(flow,result,tp){
	var opinionForm = flow.currentStep.opinionForm;
	opinionForm.form.findField(opinionForm.id + '_OPINION_').setValue(getWBMapValueLocalData(tp,result));
	opinionForm.form.findField('OPINION').setValue(result);
	opinionForm.form.findField('OPINION_VAL').setValue(getWBMapValueLocalData(tp,result));
	opinionForm.form.findField('CHECK_RESULT').setValue(getWBMapValueLocalData(tp,result));
}

function buyerCheckBalance(value,form,options){
	Ext.Msg.alert("Hint","Calibration interface has not been developed");
}

function ifactor_buyer_apply_layout(resultJson, thiz, formLoadData, options) {
	if(options.plugObject!='undefind'&&options.plugObject!=null){
		//var flow = options.plugObject.workflow;
		//if(flow.action == 'todo'){
			var tableArr = ['IF_MGT_BUYER_APPLY','IF_MGT_BUYER_BASIC_INFO','IF_MGT_BUYER_PRIVATE_INFO','IF_MGT_BUYER_COMPANY_INFO'];
			var fieldtype = '';
			initTableI('IF_MGT_DMODIFY_RECORD', options.beanData.APP_PK_ID, 'APP_PK_ID',
					'multi', function(record) {
						Ext.each(record.list,function(item){
							if((item.STATUS==2||item.STATUS==1)&&item.WORK_FLOW=='buyerApplyFlow'){
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