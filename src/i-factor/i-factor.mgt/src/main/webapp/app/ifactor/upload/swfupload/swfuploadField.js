Ext.ux.SwfUploadButton = Ext.extend(Ext.Button, {
	// single select  
	single : true, /*单个文件*/
	swffu : null, /*swfUpload对象*/
	fileTypes : "*.jpg;*.gif;*.png;*.jpeg",
	typeDescription : 'The image file',
	flash_url : "./swfupload.swf",
	url : null,
	flashReady : false,
	initComponent : function() {
		Ext.ux.SwfUploadButton.superclass.initComponent.call(this);
	},
	afterRender : function() {
		if (!this.url)
			Ext.Msg.show({
						msg : 'You do not specify a url attribute. The component will not be available!',
						icon : Ext.Msg.ERROR,
						buttons : Ext.Msg.OK,
						animEl : this.el
					});

		Ext.ux.SwfUploadButton.superclass.afterRender.call(this);
		this.el.child('em').insertFirst({
					tag : 'div',
					cls : 'x-swf-button',
					children : [{
								tag : 'div'
							}]
				});

		if (!this.swffu) {
			this.swffu = new SWFUpload({
				button_action : this.single
						? SWFUpload.BUTTON_ACTION.SELECT_FILE
						: SWFUpload.BUTTON_ACTION.SELECT_FILES,
				post_params : this.params || null,
				use_query_string : false,
				file_post_name : this.name || 'FileData',
				file_types : this.fileTypes,
				file_types_description : this.typeDescription,
				upload_url : this.url || null,
				flash_url : this.flash_url,
				flash_url : this.flash9_url,
				button_placeholder_id : this.el.child('div').child('div').dom.id,
				button_width : this.el.child('button').getWidth(),
				button_height : this.el.child('button').getHeight(),
				button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
				button_cursor : SWFUpload.CURSOR.HAND,
				swfupload_loaded_handler : function() {
					var b = this.customSettings.scope;
					b.flashReady = true;
					this.setButtonDisabled(b.disabled)
				},
				file_queued_handler : this.file_queued,
				file_dialog_complete_handler : this.file_dialog_complete,
				upload_start_handler : this.file_upload_start,
				upload_error_handler : this.file_upload_failure,
				upload_complete_handler : this.upload_complete,
				upload_progress_handler : this.upload_progres,
				upload_success_handler : this.file_upload_success,
				debut : true,
				custom_settings : {
					scope : this
				}
			});
		}
		if (this.tooltip.text) {
			Ext.QuickTips.register({
						target : this,
						title : this.tooltip.title,
						text : this.tooltip.text,
						enabled : true,
						showDelay : 20
					});
		}
	},
	// private   
	file_dialog_complete : function(num, numQueue) {
		try {
			if (num > 0) {
				this.customSettings.scope.setDisabled(true);
			}
			this.startUpload();
		} catch (ex) {
			this.debug(ex);
		}
	},
	file_upload_start : function(f) {
		var b = this.customSettings.scope;
		b.fireEvent('start', b, b.swffu, f);// args button,swfObject,file  
	},
	file_upload_failure : function(f, c, m) {
		var b = this.customSettings.scope;
		b.fireEvent('failure', b, b.swffu, f, c, m);// args button,swfObject,file,code,message  
	},
	file_upload_success : function(f, d) {
		var b = this.customSettings.scope;
		b.fireEvent('successed', b, b.swffu, f, d);// args button,swfObject,file,data  
	},
	upload_complete : function(f) {
		var b = this.customSettings.scope;
		b.fireEvent('completed', b, b.swffu, f);
		if (this.getStats().files_queued === 0) {
			this.customSettings.scope.setDisabled(false);
		} else {
			this.startUpload()
		}
	},
	upload_progres : function(f, bytes, total) {
		var b = this.customSettings.scope;
		b.fireEvent('progress', b, b.swffu, f, bytes, total);
	},
	onDisableChange : function(o) {
		Ext.ux.SwfUploadButton.superclass.onDisableChange.call(this, o);
		if (this.flashReady) {
			this.swffu.setButtonDisabled(o);
		}

	}
});
Ext.reg('swfupbutton', Ext.ux.SwfUploadButton);