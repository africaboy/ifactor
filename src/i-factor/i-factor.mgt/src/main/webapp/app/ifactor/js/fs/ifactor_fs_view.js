
function if_cp_fs_add_layout(tableViewJson, form, formLoadData, options) {
	setFieldValue(form,options);
}

function if_cp_fs_add1_layout(tableViewJson, form, formLoadData, options) {
	setFieldValue(form,options);
}

function setFieldValue(form,options){
	if(options.plugObject!='undefind'&&options.plugObject!=null){
		var flow = options.plugObject.workflow;
		var formPanel = flow.currentStep.tableViewForm['if_cp_apply_add'];
		form.getForm().findField('BRNUMBER').setValue(formPanel.getForm().findField('CPNUMBER').getValue());
	}
}

function calculateAdd(obj,form){
	/**var formObj = Ext.getCmp(form).getForm();
	var formValues = formObj.getValues();
	var val = '';
	//Cash and Cash equivalents
	if(obj.name=="STACCECASH"||obj.name=="STACCECASHE"){
		val = parseFloat(formValues["STACCECASHE"]) + parseFloat(formValues["STACCECASH"]);
		formObj.findField("STACCE").setValue(val);
		//Short-term asset(100=110+120+130+140+150)
		val = val + parseFloat(formValues["STASTFI"]) + parseFloat(formValues["STASTR"]) + parseFloat(formValues["INVENTORYTOTAL"])  + parseFloat(formValues["OSTATOTAL"]);
		calculateHelper(formObj,formValues,val,"STATOTAL");
	}
	//Short-term financial investment 
	else if(obj.name=="STASTFISTI" || obj.name=="STASTFIPDSTI"){
		val = parseFloat(formValues["STASTFISTI"]) - parseFloat(formValues["STASTFIPDSTI"]);
		formObj.findField("STASTFI").setValue(val);
		val = val + parseFloat(formValues["STACCE"]) + parseFloat(formValues["STASTR"]) + parseFloat(formValues["INVENTORYTOTAL"])  + parseFloat(formValues["OSTATOTAL"]);
		calculateHelper(formObj,formValues,val,"STATOTAL");
	}
	// Short-term receivables
	else if(obj.name=="STASTRRC" || obj.name=="STASTRPS" || obj.name=="STASTRSTIR" || obj.name=="STASTRRPC" || obj.name=="STASTROR" || obj.name=="STASTRPR" ){
		val = parseFloat(formValues["STASTRRC"]) + parseFloat(formValues["STASTRPS"]) + parseFloat(formValues["STASTRSTIR"]) + parseFloat(formValues["STASTRRPC"]) + parseFloat(formValues["STASTROR"]) + parseFloat(formValues["STASTRPR"]);
		formObj.findField("STASTR").setValue(val);
		val = val + parseFloat(formValues["STACCE"]) + parseFloat(formValues["STASTFI"]) + parseFloat(formValues["INVENTORYTOTAL"])  + parseFloat(formValues["OSTATOTAL"]);
		calculateHelper(formObj,formValues,val,"STATOTAL");
	}
	//Inventory INVENTORY  INVENTORYPDPI
	else if(obj.name=="INVENTORY" || obj.name=="INVENTORYPDPI"){
		val = parseFloat(formValues["INVENTORY"]) + parseFloat(formValues["INVENTORYPDPI"]);
		formObj.findField("INVENTORYTOTAL").setValue(val);
		val = val + parseFloat(formValues["STACCE"]) + parseFloat(formValues["STASTFI"]) + parseFloat(formValues["STASTR"])  + parseFloat(formValues["OSTATOTAL"]);
		calculateHelper(formObj,formValues,val,"STATOTAL");
	}
	//Other short-term asset OSTASTA OSTAAV OSTATFR  OSTAOTHERS
	else if(obj.name=="OSTASTA" || obj.name=="OSTAAV" || obj.name=="OSTATFR" || obj.name=="OSTAOTHERS"){
		val = parseFloat(formValues["OSTASTA"]) + parseFloat(formValues["OSTAAV"]) + parseFloat(formValues["OSTATFR"]) + parseFloat(formValues["OSTAOTHERS"]);
		formObj.findField("OSTATOTAL").setValue(val);
		val = val + parseFloat(formValues["STACCE"]) + parseFloat(formValues["STASTFI"]) + parseFloat(formValues["STASTR"])  + parseFloat(formValues["INVENTORYTOTAL"]);
		calculateHelper(formObj,formValues,val,"STATOTAL");
	}
	//Long-term receivables LTARC LTABCS LTALTIR LTAOTHERS LTAPLTR
	else if(obj.name=="LTARC" || obj.name=="LTABCS" || obj.name=="LTALTIR" || obj.name=="LTAOTHERS"|| obj.name=="LTAPLTR"){
		val = parseFloat(formValues["LTARC"]) + parseFloat(formValues["LTABCS"]) + parseFloat(formValues["LTALTIR"]) + parseFloat(formValues["LTAOTHERS"]) + parseFloat(formValues["LTAPLTR"]);
		formObj.findField("LTALTR").setValue(val);
		//Long-term asset (200 = 210 + 220 + 240 + 250 + 260)
		val = val + parseFloat(formValues["FATOTAL"]) + parseFloat(formValues["IRETOTAL"]) + parseFloat(formValues["LTFITOTAL"])  + parseFloat(formValues["OLATOTAL"]);
		calculateHelper(formObj,formValues,val,"LTATOTAL");
	}
	// Fixed assets 220 = 221 + 224 + 227 + 230 
	//Tangible fixed assets  FATFAOC  FATFAAD
	else if(obj.name=="FATFAOC" || obj.name == "FATFAAD"){
		val = parseFloat(formValues["FATFAOC"]) - parseFloat(formValues["FATFAAD"]);
		formObj.findField("FATFA").setValue(val);
		//Fixed assets
		val = val + parseFloat(formValues["FAFLA"]) + parseFloat(formValues["FAIFA"]) + parseFloat(formValues["FAWBCC"]);
		formObj.findField("FATOTAL").setValue(val);
		//Long-term asset (200 = 210 + 220 + 240 + 250 + 260)
		val = val + parseFloat(formValues["LTALTR"]) + parseFloat(formValues["IRETOTAL"]) + parseFloat(formValues["LTFITOTAL"])  + parseFloat(formValues["OLATOTAL"]);
		calculateHelper(formObj,formValues,val,"LTATOTAL");
	}
	//financial leasing asset FAFLAOC FAFLAAD
	else if(obj.name=="FAFLAOC" || obj.name == "FAFLAAD"){
		val = parseFloat(formValues["FAFLAOC"]) - parseFloat(formValues["FAFLAAD"]);
		formObj.findField("FAFLA").setValue(val);
		//Fixed assets
		val = val + parseFloat(formValues["FATFA"]) + parseFloat(formValues["FAIFA"]) + parseFloat(formValues["FAWBCC"]);
		formObj.findField("FATOTAL").setValue(val);
		//Long-term asset (200 = 210 + 220 + 240 + 250 + 260)
		val = val + parseFloat(formValues["LTALTR"]) + parseFloat(formValues["IRETOTAL"]) + parseFloat(formValues["LTFITOTAL"])  + parseFloat(formValues["OLATOTAL"]);
		calculateHelper(formObj,formValues,val,"LTATOTAL");
	}
	//Intangible fixed assets  FAIFAOC  FAIFAAD
	else if(obj.name=="FAIFAOC" || obj.name == "FAIFAAD"){
		val = parseFloat(formValues["FAIFAOC"]) - parseFloat(formValues["FAIFAAD"]);
		formObj.findField("FAIFA").setValue(val);
		//Fixed assets
		val = val + parseFloat(formValues["FATFA"]) + parseFloat(formValues["FAFLA"]) + parseFloat(formValues["FAWBCC"]);
		formObj.findField("FATOTAL").setValue(val);
		//Long-term asset (200 = 210 + 220 + 240 + 250 + 260)
		val = val + parseFloat(formValues["LTALTR"]) + parseFloat(formValues["IRETOTAL"]) + parseFloat(formValues["LTFITOTAL"])  + parseFloat(formValues["OLATOTAL"]);
		calculateHelper(formObj,formValues,val,"LTATOTAL");
	}
	//WIP basic construction cost FAWBCC
	else if(obj.name=="FAWBCC"){
		val = parseFloat(formValues["FATFA"]) + parseFloat(formValues["FAFLA"]) + parseFloat(formValues["FAIFA"]) + parseFloat(formValues["FAWBCC"]);
		formObj.findField("FATOTAL").setValue(val);
		//Long-term asset (200 = 210 + 220 + 240 + 250 + 260)
		val = val + parseFloat(formValues["LTALTR"]) + parseFloat(formValues["IRETOTAL"]) + parseFloat(formValues["LTFITOTAL"])  + parseFloat(formValues["OLATOTAL"]);
		calculateHelper(formObj,formValues,val,"LTATOTAL");
	}
	//Invested real estates
	else if(obj.name=="IREOC" || obj.name=="IREAD"){
		val = parseFloat(formValues["IREOC"]) - parseFloat(formValues["IREAD"]);
		formObj.findField("IRETOTAL").setValue(val);
		//Long-term asset (200 = 210 + 220 + 240 + 250 + 260)
		val = val + parseFloat(formValues["FATOTAL"]) + parseFloat(formValues["LTALTR"]) + parseFloat(formValues["LTFITOTAL"])  + parseFloat(formValues["OLATOTAL"]);
		calculateHelper(formObj,formValues,val,"LTATOTAL");
	}
	//Long-term financial investment LTFIIS  LTFIIAJV  LTFIOTHER LTFIPDLFI
	else if(obj.name=="LTFIIS" || obj.name=="LTFIIAJV" || obj.name=="LTFIOTHER" || obj.name=="LTFIPDLFI"){
		val = parseFloat(formValues["LTFIIS"]) + parseFloat(formValues["LTFIIAJV"]) + parseFloat(formValues["LTFIOTHER"]) - parseFloat(formValues["LTFIPDLFI"]);
		formObj.findField("LTFITOTAL").setValue(val);
		//Long-term asset (200 = 210 + 220 + 240 + 250 + 260)
		val = val + parseFloat(formValues["FATOTAL"]) + parseFloat(formValues["LTALTR"]) + parseFloat(formValues["IRETOTAL"])  + parseFloat(formValues["OLATOTAL"]);
		calculateHelper(formObj,formValues,val,"LTATOTAL");
	}
	//Other longterm asset   OLALTPE OLADIT OLA  OLACA
	else if(obj.name=="OLALTPE" || obj.name=="OLADIT" || obj.name=="OLA" || obj.name=="OLACA"){
		val = parseFloat(formValues["OLALTPE"]) + parseFloat(formValues["OLADIT"]) + parseFloat(formValues["OLA"]) + parseFloat(formValues["OLACA"]);
		formObj.findField("OLATOTAL").setValue(val);
		//Long-term asset (200 = 210 + 220 + 240 + 250 + 260)
		val = val + parseFloat(formValues["FATOTAL"]) + parseFloat(formValues["LTALTR"]) + parseFloat(formValues["IRETOTAL"])  + parseFloat(formValues["LTFITOTAL"]);
		calculateHelper(formObj,formValues,val,"LTATOTAL");
	}
	//Liabilities 负债 (300 = 310 + 330)
	//Current Liabilities CLSTB CLSTBLTDM  CLAP  CLPAR  CLTP  CLSEP  CLAE  CLIP  CLPAPC   CLOTHERS  CLPCL  CLWF
	else if(obj.name=="CLSTB" || obj.name=="CLSTBLTDM" || obj.name=="CLAP" || obj.name=="CLPAR" || obj.name=="CLTP" || obj.name=="CLSEP" || obj.name=="CLAE" || obj.name=="CLIP" || obj.name=="CLPAPC" || obj.name=="CLOTHERS" || obj.name=="CLPCL" || obj.name=="CLWF"){
		val = parseFloat(formValues["CLSTB"]) + parseFloat(formValues["CLSTBLTDM"]) + parseFloat(formValues["CLAP"]) + parseFloat(formValues["CLPAR"]) + parseFloat(formValues["CLTP"]) + parseFloat(formValues["CLSEP"]) + parseFloat(formValues["CLAE"]) + parseFloat(formValues["CLIP"]) + parseFloat(formValues["CLPAPC"]) + parseFloat(formValues["CLOTHERS"]) + parseFloat(formValues["CLPCL"]) + parseFloat(formValues["CLWF"]);
		formObj.findField("CLTOTAL").setValue(val);
		//Liabilities 负债 (300 = 310 + 330)
		val = val + parseFloat(formValues["NCLTOTAL"]);
		calculateHelper(formObj,formValues,val,"LIABILITIES");
	}
	//Non-current Liabilities NCLLTAP  NCLLTIP  NCLOTHERS  NCLLTB  NCLDTR  NCLRA  NCLPLTL  NCLUR  NCLRDF
	else if(obj.name=="NCLLTAP" || obj.name=="NCLLTIP" || obj.name=="NCLOTHERS" || obj.name=="NCLLTB" || obj.name=="NCLDTR" || obj.name=="NCLRA" || obj.name=="NCLPLTL" || obj.name=="NCLUR" || obj.name=="NCLRDF"){
		val = parseFloat(formValues["NCLLTAP"]) + parseFloat(formValues["NCLLTIP"]) + parseFloat(formValues["NCLOTHERS"]) + parseFloat(formValues["NCLLTB"]) + parseFloat(formValues["NCLDTR"]) + parseFloat(formValues["NCLRA"]) + parseFloat(formValues["NCLPLTL"]) + parseFloat(formValues["NCLUR"]) + parseFloat(formValues["NCLRDF"]);
		formObj.findField("NCLTOTAL").setValue(val);
		//Liabilities 负债 (300 = 310 + 330)
		val = val + parseFloat(formValues["CLTOTAL"]);
		calculateHelper(formObj,formValues,val,"LIABILITIES");
	}
	//Equity (400 = 410 + 430)
	//Equity EQIC EQSE  EQOS  EQTS  EQRS EQFED EQIDF EQFFR EQOF EQUPAT EQCCI EQBASF
	else if(obj.name=="EQIC" || obj.name=="EQSE" || obj.name=="EQOS" || obj.name=="EQTS" || obj.name=="EQRS" || obj.name=="EQFED" || obj.name=="EQIDF" || obj.name=="EQFFR" || obj.name=="EQOF" || obj.name=="EQUPAT" || obj.name=="EQCCI" || obj.name=="EQBASF"){
		val = parseFloat(formValues["EQIC"]) + parseFloat(formValues["EQSE"]) + parseFloat(formValues["EQOS"]) - parseFloat(formValues["EQTS"]) + parseFloat(formValues["EQRS"]) + parseFloat(formValues["EQFED"]) + parseFloat(formValues["EQIDF"]) + parseFloat(formValues["EQFFR"]) + parseFloat(formValues["EQOF"]) + parseFloat(formValues["EQUPAT"]) + parseFloat(formValues["EQCCI"]) + parseFloat(formValues["EQBASF"]);
		formObj.findField("EQTOTAL").setValue(val);
		//Equity (400 = 410 + 430)
		val = val + parseFloat(formValues["FOFTOTAL"]);
		calculateHelper(formObj,formValues,val,"EQUITY");
	}
	//Funds and Other Funds  EOFFUNDS  EOFFIFA
	else if(obj.name=="EOFFUNDS" || obj.name=="EOFFIFA"){
		val = parseFloat(formValues["EOFFUNDS"]) + parseFloat(formValues["EOFFIFA"]);
		formObj.findField("FOFTOTAL").setValue(val);
		//Equity (400 = 410 + 430)
		val = val + parseFloat(formValues["EQTOTAL"]);
		calculateHelper(formObj,formValues,val,"EQUITY");
	}
	//Minority Interest  MITOTAL
	else if(obj.name=="MITOTAL"){
		val = parseFloat(formValues["MITOTAL"]);
		//TOTAL EQUITY  (440=300+400+439)
		val = val + parseFloat(formValues["LIABILITIES"]) + parseFloat(formValues["EQUITY"]);
		formObj.findField("TOTALEQUITY").setValue(val);
		//ASSETS - CAPITAL (500=270-440)
		val = parseFloat(formValues["TOTALASSETS"]) - val;
		formObj.findField("TOTALASSETSEQUITY").setValue(val);
	}
	//OPERATING RESULTS
	//Net Revenues from goods and services
	else if(obj.name=="ORRGS" || obj.name=="ORRDI"){
		val = parseFloat(formValues["ORRGS"]) - parseFloat(formValues["ORRDI"]);
		formObj.findField("ORNRGS").setValue(val);
		val = val - parseFloat(formValues["ORCS"]);
		formObj.findField("ORGP").setValue(val);
		val = val + parseFloat(formValues["ORFR"]) - parseFloat(formValues["ORFE"]) - parseFloat(formValues["ORIE"]) - parseFloat(formValues["ORSE"]) - parseFloat(formValues["ORMAE"]) + parseFloat(formValues["ORDIVIDENDS"]);
		formObj.findField("ORNPO").setValue(val);
		val = val + parseFloat(formValues["OROP"]) + parseFloat(formValues["ORPLAJV"]);
		formObj.findField("ORPT").setValue(val);
		val = val - parseFloat(formValues["ORCT"]) - parseFloat(formValues["ORDT"]);
		formObj.findField("ORPCT").setValue(val);
	}
	//Gross Profits
	else if(obj.name == "ORCS"){
		val = parseFloat(formValues["ORNRGS"]) - parseFloat(formValues["ORCS"]);
		formObj.findField("ORGP").setValue(val);
		val = val + parseFloat(formValues["ORFR"]) - parseFloat(formValues["ORFE"]) - parseFloat(formValues["ORIE"]) - parseFloat(formValues["ORSE"]) - parseFloat(formValues["ORMAE"]) + parseFloat(formValues["ORDIVIDENDS"]);
		formObj.findField("ORNPO").setValue(val);
		val = val + parseFloat(formValues["OROP"]) + parseFloat(formValues["ORPLAJV"]);
		formObj.findField("ORPT").setValue(val);
		val = val - parseFloat(formValues["ORCT"]) - parseFloat(formValues["ORDT"]);
		formObj.findField("ORPCT").setValue(val);
	}
	//Net profits from operation ORFR ORFE ORIE ORSE ORMAE ORDIVIDENDS
	else if (obj.name == "ORFR"||obj.name == "ORFE"||obj.name == "ORIE"||obj.name == "ORSE"||obj.name == "ORMAE"||obj.name == "ORDIVIDENDS"){
		val = parseFloat(formValues["ORGP"]) + parseFloat(formValues["ORFR"]) - parseFloat(formValues["ORFE"]) - parseFloat(formValues["ORIE"]) - parseFloat(formValues["ORSE"]) - parseFloat(formValues["ORMAE"]) + parseFloat(formValues["ORDIVIDENDS"]);
		formObj.findField("ORNPO").setValue(val);
		val = val + parseFloat(formValues["OROP"]) + parseFloat(formValues["ORPLAJV"]);
		formObj.findField("ORPT").setValue(val);
		val = val - parseFloat(formValues["ORCT"]) - parseFloat(formValues["ORDT"]);
		formObj.findField("ORPCT").setValue(val);
	}
	//Other Income  OROI  OROE
	else if(obj.name == "OROI"|| obj.name == "OROE"){
		val = parseFloat(formValues["OROI"]) - parseFloat(formValues["OROE"]);
		formObj.findField("OROP").setValue(val);
		val = val + parseFloat(formValues["ORNPO"]) + parseFloat(formValues["ORPLAJV"]);
		formObj.findField("ORPT").setValue(val);
		val = val - parseFloat(formValues["ORCT"]) - parseFloat(formValues["ORDT"]);
		formObj.findField("ORPCT").setValue(val);
	}
	//Profits/Losses from Associates and Joint Ventures  
	else if(obj.name == "ORPLAJV"){
		val = parseFloat(formValues["ORNPO"]) + parseFloat(formValues["OROP"]) + parseFloat(formValues["ORPLAJV"]);
		formObj.findField("ORPT").setValue(val);
		val = val - parseFloat(formValues["ORCT"]) - parseFloat(formValues["ORDT"]);
		formObj.findField("ORPCT").setValue(val);
	}
	//Profit after Corporate Tax 
	else if(obj.name == "ORCT" || obj.name == "ORDT"){
		val = parseFloat(formValues["ORPT"]) - parseFloat(formValues["ORCT"]) - parseFloat(formValues["ORDT"]);
		formObj.findField("ORPCT").setValue(val);
	}**/
}

/**
*@param formObj
*form 表单对象
*@param formValues
*
*form表单所有属性值集合
*
*val累加的值
*filed 长期资产、短期资产、负债、股本的字段
*/
function calculateHelper(formObj,formValues,val,field){
	formObj.findField(field).setValue(val);
	//Total Assets( 270=100+200 )
	if(field=="STATOTAL"){
		val = val + parseFloat(formValues["LTATOTAL"]);
	}//Total Assets( 270=100+200 )
	else if(field == "LTATOTAL"){
		val = val + parseFloat(formValues["STATOTAL"]);
	}
	//TOTAL EQUITY (440=300+400+439)
	else if(field == "LIABILITIES"){
		val = val + parseFloat(formValues["EQUITY"]) + parseFloat(formValues["MITOTAL"]);
	}
	//TOTAL EQUITY (440=300+400+439)
	else if(field == "EQUITY"){
		val = val + parseFloat(formValues["LIABILITIES"]) + parseFloat(formValues["MITOTAL"]);
	}
	if(field=="STATOTAL"||field=="LTATOTAL"){
		formObj.findField("TOTALASSETS").setValue(val);
		//ASSETS - CAPITAL (500=270-440)
		val = val - parseFloat(formValues["TOTALEQUITY"]);
	}else if(field == "LIABILITIES"||field == "EQUITY"){
		formObj.findField("TOTALEQUITY").setValue(val);
		//ASSETS - CAPITAL (500=270-440)
		val = parseFloat(formValues["TOTALASSETS"]) - val;
	}
	formObj.findField("TOTALASSETSEQUITY").setValue(val);
}