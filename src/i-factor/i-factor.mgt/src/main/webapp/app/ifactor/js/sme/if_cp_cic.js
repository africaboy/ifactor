

function if_cp_cic_layout(tableViewJson, form, formLoadData, options) {
	var form1 = form.getForm();
	var formId = form.id;
	var cicko1obj = form1.findField(formId + '_CICKO1_');
	if(cicko1obj!=null){
		var ncifVal = form1.radios[0].radioGroup.items;
		for(var i=0;i<ncifVal.length;i++){
			 if(ncifVal[i].checked){
				 haveornoinit(form1,ncifVal[i].inputValue,formId,options);
				 break;
			 }
		}
	}
}


function haveOrnoCic(checkitem, checked, formId, options){
	var form = Ext.getCmp(formId).getForm();
	if(checked){
		haveornoinit(form,checkitem.inputValue,formId,options);
	}
}

function haveornoinit(form,ncifVal,formId,options){
	if(ncifVal=='01'){
		methods.dynamicHandleFormItem(form, form.findField(formId + '_CICKO1_'), true);
		methods.dynamicHandleFormItem(form, form.findField(formId + '_CICKO2_'), true);
		methods.dynamicHandleFormItem(form, form.findField('CICKO3'), true);
		methods.dynamicHandleFormItem(form, form.findField('TSTATEMENT'), true);
		changeVal(form,options,formId);
	}else if(ncifVal=='02'){
		methods.dynamicHandleFormItem(form, form.findField(formId + '_CICKO1_'), false);
		methods.dynamicHandleFormItem(form, form.findField(formId + '_CICKO2_'), false);
		methods.dynamicHandleFormItem(form, form.findField('CICKO3'), false);
		methods.dynamicHandleFormItem(form, form.findField('TSTATEMENT'), false);
		opinionCheck(options,'Confirmed');
	}
}

function opinionCheck(options,result){
	if(options.plugObject!='undefind'&&options.plugObject!=null){
		var flow = options.plugObject.workflow;
		smeOpinionCheck(flow,result,'common_opinion');
	}
}
function changeVal(form,options,formId){
	if(form.findField(formId + '_CICKO1_').getValue()=='01'||form.findField(formId + '_CICKO2_').getValue()=='01'||parseInt(form.findField('CICKO3').getValue())>= 2){
		opinionCheck(options,'Reject');
	}else{
		opinionCheck(options,'Confirmed');
	}
}
function setOpinionCheckResult(id, name, node, formId, options){
	changeVal(Ext.getCmp(formId).getForm(),options,formId);
}
function setOpinionCheckResult3(obj,formId,options){
	changeVal(Ext.getCmp(formId).getForm(),options,formId);
}
/**
// cic check opinion view layout
function if_sme_flow_ciccheck_opinion_layout(
		tableViewJson, form, formLoadData, options) {
	var flow = options.plugObject.workflow;
	var yesorno = form.getForm().findField('OPINION').getValue();
	var result = form.getForm().findField('CHECK_RESULT').getValue();
	if(yesorno=='' && result==''){
		if(resultInfo.get("info")==true){
			form.getForm().findField('CHECK_RESULT').setValue('Reject');
			form.getForm().findField(form.id + '_OPINION_').setValue('Reject');
			form.getForm().findField('OPINION_VAL').setValue('Reject');
			form.getForm().findField('OPINION').setValue('Reject');
		}else{
			form.getForm().findField('CHECK_RESULT').setValue('Confirmed');
			form.getForm().findField(form.id + '_OPINION_').setValue('Confirmed');
			form.getForm().findField('OPINION').setValue('Confirmed');
			form.getForm().findField('OPINION_VAL').setValue('Confirmed');
		}
	}
}**/

// cic check opinion select
function cicOpinionCheck(id, name, node, formId, options) {
	var opinionVal = node.data[name];
	var form = Ext.getCmp(formId).getForm();
	var result = form.findField('CHECK_RESULT').getValue();
	if (opinionVal!=result) {
		Ext.Msg.confirm(ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),ifactorTranslator.getLangLabel('ifcommon-language', 'opinion_check').formatstr(result),function(btn){          
			if(btn != 'yes'){          
				if(result==getWBMapValueLocalData('common_opinion','Confirmed')){
					smeOpinionCheck(flow,'Confirmed','common_opinion');
				}else{
					smeOpinionCheck(flow,'Reject','common_opinion');
				}							       
			}             
		},this);
	}
}