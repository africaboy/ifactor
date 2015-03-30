function initDesktopPortal() {
	Ext.getCmp('consoletabs').add(initLogList());
	Ext.getCmp('consoletabs').setActiveTab('logListGrid');
	
	Ext.getCmp('logListGrid').setIconClass('helptabs');
	//initRuntimeParamsForm();
}