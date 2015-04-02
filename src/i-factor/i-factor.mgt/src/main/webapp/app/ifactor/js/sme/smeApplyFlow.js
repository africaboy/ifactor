function smeApplyFlow_beforesubmit(flow, options) {
	var currentStepKey = flow.currentStep.key;
	if(currentStepKey=='FUoVuacHWV' || currentStepKey=='mRizDYBctr'){
		var rnt = false;
		var count = 0;
		var countmd = '';

		var url = context
				+ '/system/baseworksave.do?tableNames=IF_MGT_DMODIFY_RECORD&handleTypes=multi&counterNames=countmd';

		Ext.each(options.stockings, function(stockingsItem) {
			for (var i in stockingsItem) {
				for (var j in stockingsItem[i].items) {

					url = url + '&WORK_FLOW_' + count + '=smeApplyFlow';
					url = url
							+ '&APP_PK_ID_'
							+ count
							+ '='
							+ flow.currentStep.beanData['if_cp_apply_add'].APP_PK_ID;
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
 * 初始化sme流转办理视图前的函数
 * 
 * @param {}
 *            flow
 * @param {}
 *            view
 * @param {}
 *            options
 * @return {Boolean}
 */
function smeApplyFlow_beforeshow(flow, view, options) {
	if(flow.action == 'todo'){
		var lastStepKey = flow.lastStepKey;
		var currentStepKey = flow.currentStep.key;
		if(currentStepKey == 'FUoVuacHWV'&& view.id == 'if_cp_apply_add'){
			if(lastStepKey != 'mRizDYBctr'){
				options.stockings[view.id] = {
					putOn : true,
					title : ifactorTranslator.getLangLabel('ifcommon-language', 'input_ambiguous'),
					// 当click checkbox时回调的自定义函数
					putOnFunc : 'smePutOnStockings',
					stripOffFunc : 'smeStripOffStockings',
					items : {},
					targetItems : mgt.sellerTargetItems
				};
			}
		}else if ((currentStepKey == 'mRizDYBctr'
				|| currentStepKey == 'cPjfdskOtZ' || currentStepKey == 'HQrcOamWus' 
				|| currentStepKey == 'mKISSmbTdc' || currentStepKey == 'VmnUSmpded')
				&& view.id == 'if_cp_apply_add') {
			var puton = true;
			if (currentStepKey == 'HQrcOamWus'
					|| currentStepKey == 'mKISSmbTdc'|| currentStepKey == 'VmnUSmpded'
					|| currentStepKey == 'cPjfdskOtZ') {
				puton = false;
			}
			// 在stockings对象容器中为指定的视图创建options
			options.stockings[view.id] = {
				putOn : puton,
				title : ifactorTranslator.getLangLabel('ifcommon-language', 'input_ambiguous'),
				// 当click checkbox时回调的自定义函数
				putOnFunc : 'smePutOnStockings',
				stripOffFunc : 'smeStripOffStockings',
				items : {},
				targetItems : mgt.sellerTargetItems
			};
		}
		/**else if (currentStepKey == 'wVbebSTCKW' && view.id == 'if_cp_cic') {
			// 在stockings对象容器中为指定的视图创建options
			options.stockings[view.id] = {
				putOn : true,
				title : 'If the input is ambiguous, please check it!',
				// 当click checkbox时回调的自定义函数
				putOnFunc : 'smePutOnStockings',
				stripOffFunc : 'smeStripOffStockings',
				items : {},
				targetItems : mgt.sellerCicItems
			};
		}**/
		/**else if (currentStepKey == 'KJtCGqzGmT' && (view.id == 'if_cp_fs_add'||view.id == 'if_cp_fs_add1'||view.id == 'if_cp_apply_add')) {
			// 在stockings对象容器中为指定的视图创建options
			options.stockings['if_cp_fs_add'] = {
				putOn : true,
				title : ifactorTranslator.getLangLabel('ifcommon-language', 'input_ambiguous'),
				// 当click checkbox时回调的自定义函数
				putOnFunc : 'smePutOnStockings',
				stripOffFunc : 'smeStripOffStockings',
				items : {},
				targetItems : mgt.sellerFsItems
			};
			options.stockings['if_cp_fs_add1'] = {
				putOn : true,
				title : ifactorTranslator.getLangLabel('ifcommon-language', 'input_ambiguous'),
				// 当click checkbox时回调的自定义函数
				putOnFunc : 'smePutOnStockings',
				stripOffFunc : 'smeStripOffStockings',
				items : {},
				targetItems : mgt.sellerFsItems
			};
			options.stockings['if_cp_apply_add'] = {
				putOn : true,
				title : ifactorTranslator.getLangLabel('ifcommon-language', 'input_ambiguous'),
				// 当click checkbox时回调的自定义函数
				putOnFunc : 'smePutOnStockings',
				stripOffFunc : 'smeStripOffStockings',
				items : {},
				targetItems : mgt.sellerFsStepItems
			};
		}**/
	}
	return true;
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
function smePutOnStockings(thiz, itemId, formId, viewId) {
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

		smeStripOffStockings(null,Ext.getCmp(formId).plugObject.options);
	}
}

/**
 * display stockings items by free style
 * 
 * @param {}
 *            stockings
 */
function smeStripOffStockings(stockings1,options) {
	var str = '';

	for (var viewId in options.stockings){
		var stockings = options.stockings[viewId];
		for (var i in stockings.items) {
			if (stockings.items[i].type == 'input') {
				str += ifactorTranslator.getLangLabel('ifcommon-language', 'input_field').formatstr(stockings.items[i].name)+'\n';
			} else if (stockings.items[i].type == 'image') {
				str += ifactorTranslator.getLangLabel('ifcommon-language', 'input_file').formatstr(stockings.items[i].name)+'\n';
			}
		}
	}

	if (options.flow.currentStep.opinionForm) {
		options.flow.currentStep.opinionForm.getForm()
				.findField('OPINION_REFERENCE').setValue(str);
	}
	var currentStepKey = options.flow.currentStep.key;

	if(currentStepKey=='FUoVuacHWV' || currentStepKey=='mRizDYBctr'){
		if(str==''){
			smeOpinionCheck(options.flow,'Confirmed','smecheck_opinion');
		}else{
			smeOpinionCheck(options.flow,'Modify','smecheck_opinion');
		}
	}
	
}
function if_cp_apply_add_layout(tableViewJson, thiz, formLoadData, options) {
	if(options.plugObject!='undefind'&&options.plugObject!=null){
		//var flow = options.plugObject.workflow;
		//if(flow.action == 'todo'){
			var prefield = "IF_MGT_CP_APPLY_";
			initTableI('IF_MGT_DMODIFY_RECORD', options.beanData.APP_PK_ID, 'APP_PK_ID',
					'multi', function(record) {
						Ext.each(record.list,function(item){
							if((item.STATUS==2||item.STATUS==1)&&item.WORK_FLOW=='smeApplyFlow'){
								var fieldtype = thiz.resultJson.component[prefield + item.MODIFY_FIELD].type;
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

function smeApplyFlow(flow, tbar, options) {
	var currentStepKey = flow.currentStep.key;
	var lastStepKey = flow.lastStepKey;
	var action = flow.action;
	if (currentStepKey == 'zXusSDxdAs') {
		// 黑名单校验环节
		var options = {
			querykey : 'ifactor_blacklist_result',
			layout : 'border',
			params : {
				pkId : flow.currentStep.tableView[0].form.getForm()
						.findField('PK_ID').getValue()
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
	} else if (currentStepKey == 'LmZdhEzbKy' || currentStepKey == 'KDJlQmRchM' || currentStepKey == 'BlSPDaIKLf') {
		if(action == 'todo'){
			showSUploadPicture(workflowMethods, tbar, flow,currentStepKey);
		}
		showSPictureView(workflowMethods, tbar, flow, true,false);
	} else if (currentStepKey == 'FUoVuacHWV'|| currentStepKey == 'mRizDYBctr' || 
		       currentStepKey == 'cPjfdskOtZ'|| currentStepKey == 'HQrcOamWus' ||
		       currentStepKey == 'mKISSmbTdc') {
		removeUploadImages = false;
		if(currentStepKey == 'FUoVuacHWV'&&lastStepKey == 'mRizDYBctr'){
			showSPictureView(workflowMethods, tbar, flow, false,false);
		}else{
			if(action == 'todo'){
				showSPictureView(workflowMethods, tbar, flow, true,true);
			}else{
				showSPictureView(workflowMethods, tbar, flow, true,false);
			}
		}	
	} else if(currentStepKey == 'pvPsOAQpXx'||currentStepKey == 'inertjGixd'|| currentStepKey == 'zIeeUKnBZF'|| 
		currentStepKey == 'KJtCGqzGmT'|| currentStepKey == 'VmnUSmpded') {
		removeUploadImages = false;
		showSPictureView(workflowMethods, tbar, flow, false,false);
	}
}

/**function if_cp_apply_add_layout(tableViewJson, form, formLoadData, options) {
	var flow = options.plugObject.workflow;
	var currentStepKey = flow.currentStep.key;
	if(currentStepKey=='pvPsOAQpXx'){
		form = form.getForm();
		for (var i = 0; i < form.length; i++) {
			var element = form[i];
			if (element != '' && element != null && element.value != ""
					&& element.value != null) {
				alert(element.name);
				if(element.name!="COMPANIESTYPE_"){
					element.style="background:#F0F0F0;";
					element.readOnly = true;
				}
			}
		}
	}
}**/
function showSUploadPicture(workflowMethods, tbar, flow,currentStepKey) {
	workflowMethods.tbarsplit(tbar);
	
	var itemCode = '';
	if(currentStepKey=="BlSPDaIKLf"){
		itemCode = 'fieldVisitForm';
	}else if(currentStepKey=="LmZdhEzbKy"){
		itemCode = 'fieldVisitCheck';
	}else if(currentStepKey=="KDJlQmRchM"){
		itemCode = 'signedDocument,signedContract';
	}
	var defaultItemCode = '';

	tbar.push({
		id :flow.actId + '_uploadMenu',
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
										.getValue()+'_seller',
								itemCode : itemCode, 
								defaultItemCode : defaultItemCode,
								flowType:'seller'
							},
							resizable : true,
							modal : true,
							maximizable : true
						}
						showImageUploadItemList(options);

		}
	});

}
function showSPictureView(workflowMethods, tbar, flow, removeUploadImages,isCheckView) {
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
											.getValue()+"_seller",
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
function if_sme_flow_firstcheck_opinion_layout(
		tableViewJson, form, formLoadData, options) {
	if(options.plugObject!='undefind'&&options.plugObject!=null){
		var flow = options.plugObject.workflow;
		if(flow.action == 'todo'){
			var lastStepKey = flow.lastStepKey;
			if(lastStepKey == 'mRizDYBctr'){
				var reference = flow.lastStep.opinion.OPINION_REFERENCE;
				var imageRemark = flow.lastStep.opinion.IMAGE_REMARK;
				form.getForm().findField('OPINION_REFERENCE').setValue(reference);
				form.getForm().findField('IMAGE_REMARK').setValue(imageRemark);
				form.getForm().findField('IMAGE_REMARK').readOnly = true;
				form.getForm().findField('IMAGE_REMARK').style="background:rgb(240, 240, 240);";
				smeOpinionCheck(flow,'Modify','smecheck_opinion');
				form.getForm().findField(form.id + '_OPINION_').readOnly = true;
				form.getForm().findField(form.id + '_OPINION_').style="background:rgb(240, 240, 240);";
			}
		}
	}
}

function smeCheckOption(id, name, node, formId, options) {
	var opinionVal = node.data[id];
	var form = Ext.getCmp(formId).getForm();
	var result = form.findField('CHECK_RESULT').getValue();
	var reference = form.findField('OPINION_REFERENCE').getValue();
	if(reference == '' && opinionVal == 'Modify'){
		smeOpinionCheck(options.plugObject.workflow,'Confirmed','smecheck_opinion');
		Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'), ifactorTranslator.getLangLabel('ifcommon-language', 'tickbox'));
	}else{
		if(result!=''){
			if (node.data[name]!=result) {
				Ext.Msg.confirm(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('ifcommon-language', 'opinion_check').formatstr(result),function(btn){        
					if(btn!='yes'){          
						if(result==getWBMapValueLocalData('smecheck_opinion','Confirmed')){
							smeOpinionCheck(options.plugObject.workflow,'Confirmed','smecheck_opinion');
						}else{
							smeOpinionCheck(options.plugObject.workflow,'Modify','smecheck_opinion');
						}							       
					}             
				},this);
			}
		}else{
			form.findField('CHECK_RESULT').setValue(node.data[name]);
		}
	}
}

// blacklist check opinion view layout
function if_sme_flow_blacklistcheck_opinion_layout(
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
								pkid :flow.currentStep.tableView[0].form.getForm().findField('PK_ID').getValue()
							},
							success : function(form1, action) {
								var resultInfo = listSimpleJson(action.result.data);
								if(resultInfo.get("info")==true){
									smeOpinionCheck(options.plugObject.workflow,'Reject','common_opinion');
								}else{
									smeOpinionCheck(options.plugObject.workflow,'Confirmed','common_opinion');
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
function blacklistOpinionCheck(id, name, node, formId, options) {
	var opinionVal = node.data[id];
	var form = Ext.getCmp(formId).getForm();
	var result = form.findField('CHECK_RESULT').getValue();
	if (opinionVal!=result) {
		Ext.Msg.confirm(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('ifcommon-language', 'opinion_check').formatstr(result),function(btn){       
			if(btn!='yes'){          
				if(result==getWBMapValueLocalData('common_opinion','Confirmed')){
					smeOpinionCheck(options.plugObject.workflow,'Confirmed','common_opinion');
				}else{
					smeOpinionCheck(options.plugObject.workflow,'Reject','common_opinion');
				}							       
			}             
		},this);
	}
}

// score check opinion view layout 
function if_sme_flow_mapscore_opinion_layout(
		tableViewJson, form, formLoadData, options) {
	if(options.plugObject!='undefind'&&options.plugObject!=null){
		var flow = options.plugObject.workflow;
		if(flow.action == 'todo'){
			form.getForm().load({
				url : context + "/views/score/isSystemCalculate",
				success : function(form1, action) {
					var resultInfo = action.result.data;
					if(resultInfo.ifSystemCheck=='yes'){
						Ext.fly(form.id+'_OPINION_').setStyle('background', '#F0F0F0');
						form.getForm().findField(form.id+'_OPINION_').readOnly=true;
						//var yesorno = form.getForm().findField('OPINION').getValue();
						//var result = form.getForm().findField('CHECK_RESULT').getValue();
						//if(yesorno=='' && result==''){
						var formPanel = flow.currentStep.tableViewForm['if_scoring_result'];	
						var riskLevel = formPanel.getForm().findField('RISKLEVEL').getValue();
						if(riskLevel == 'L'){
							mapScoreOpinionCheck(flow,'Confirmed','mapscore_opinion');
							Ext.fly(form.id+'_OPINION_').setStyle('color', '#000000');
						}else if(riskLevel == 'H'){
							mapScoreOpinionCheck(flow,'Review','mapscore_opinion');
							Ext.fly(form.id+'_OPINION_').setStyle('color', '#000000');
						}else{
							mapScoreOpinionCheck(flow,'Reject','mapscore_opinion');
							Ext.fly(form.id+'_OPINION_').setStyle('color', '#000000');
						}
					}else{
						form.getForm().findField('CHECK_RESULT').setValue(getWBMapValueLocalData('mapscore_opinion',"Confirmed"));
					}
				},
				failure : function(form, action) {
					Ext.Msg.alert(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'), ifactorTranslator.getLangLabel('ifcommon-language', 'get_blacklist_result'));
				}
			});
		}
	}
}
function mapScoreOpinionCheck(flow,result,tp){
	var opinionForm = flow.currentStep.opinionForm;
	opinionForm.form.findField(opinionForm.id+'_OPINION_').setValue(getWBMapValueLocalData(tp,result));
	opinionForm.form.findField('OPINION').setValue(result);
	opinionForm.form.findField('OPINION_VAL').setValue(getWBMapValueLocalData(tp,result));
	opinionForm.form.findField('CHECK_RESULT').setValue(getWBMapValueLocalData(tp,result));
}
// score check opinion select
function scoreOpinionCheck(id, name, node, formId, options) {
	var opinionVal = node.data[id];
	var form = Ext.getCmp(formId).getForm();
	var result = form.findField('CHECK_RESULT').getValue();
	if (opinionVal!=result) {
		Ext.Msg.confirm(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('ifcommon-language', 'opinion_check').formatstr(result),function(btn){      
			if(btn!='yes'){          
				if(result==getWBMapValueLocalData('mapscore_opinion','Confirmed')){
					smeOpinionCheck(flow,'Confirmed','mapscore_opinion');
				}else if(result == getWBMapValueLocalData('mapscore_opinion','Review')){
					smeOpinionCheck(flow,'Review','mapscore_opinion');
				}else{
					smeOpinionCheck(flow,'Reject','mapscore_opinion');
				}							       
			}             
		},this);
	}
}


function smeOpinionCheck(flow,result,tp){
	var opinionForm = flow.currentStep.opinionForm;
	opinionForm.form.findField(opinionForm.id + '_OPINION_').setValue(getWBMapValueLocalData(tp,result));
	opinionForm.form.findField('OPINION').setValue(result);
	opinionForm.form.findField('OPINION_VAL').setValue(getWBMapValueLocalData(tp,result));
	opinionForm.form.findField('CHECK_RESULT').setValue(getWBMapValueLocalData(tp,result));
}

function checkBalance(value,form,options){
	Ext.Msg.alert("Hint","Calibration interface has not been developed");
}

// assign to opinion view layout
/**function if_sme_flow_assign_opinion_layout(tableViewJson, form, formLoadData, options) {
	if(options.plugObject!='undefind'&&options.plugObject!=null){
		var flow = options.plugObject.workflow;
		var assignTo = form.getForm().findField('ASSIGNTO').getValue();
		if(assignTo == '' || assignTo == null){
			Ext.getCmp(flow.actId + '_uploadMenu').disable();
		}else{
			Ext.getCmp(flow.actId + '_uploadMenu').enable();
		}
	}
}**/

function assignToListenBlur(obj,form,options){
	if(options.plugObject!='undefind'&&options.plugObject!=null){
		var flow = options.plugObject.workflow;
		var assinTo = Ext.getCmp(form).getForm().findField("ASSIGNTO").getValue();
		if(assinTo == '' || assinTo == null){
			Ext.getCmp(flow.actId + '_uploadMenu').disable();
		}else{
			Ext.getCmp(flow.actId + '_uploadMenu').enable();
		}
	}
}