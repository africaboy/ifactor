Ext.namespace('swfupload');
swfupload.uploadPanel = function(cfg) {
	this.width = 600;
	this.height = 200;
	this.imageItemKeyMap = new HashMap();
	Ext.apply(this, cfg);
	this.gp = new Ext.grid.GridPanel({
				border : false,
				store : new Ext.data.Store({
							fields : ['id', 'name', 'type', 'size', 'state',
									'percent']
						}),
				columns : [new Ext.grid.RowNumberer({
									header : ifactorTranslator.getLangLabel('image-language', 'no.'),
									width : 40
								}), {
							header : ifactorTranslator.getLangLabel('image-language', 'file_name'),
							width : 100,
							sortable : true,
							dataIndex : 'name',
							menuDisabled : true
						}, {
							header : ifactorTranslator.getLangLabel('image-language', 'file_type'),
							width : 70,
							sortable : true,
							dataIndex : 'type',
							menuDisabled : true
						}, {
							header : ifactorTranslator.getLangLabel('image-language', 'size'),
							width : 70,
							sortable : true,
							dataIndex : 'size',
							menuDisabled : true,
							renderer : this.formatFileSize
						}, {
							header : ifactorTranslator.getLangLabel('image-language', 'progress'),
							width : 130,
							sortable : true,
							dataIndex : 'percent',
							menuDisabled : true,
							renderer : this.formatProgressBar,
							scope : this
						}, {
							header : ifactorTranslator.getLangLabel('image-language', 'status'),
							width : 70,
							sortable : true,
							dataIndex : 'state',
							menuDisabled : true,
							renderer : this.formatFileState,
							scope : this
						}, {
							header : '&nbsp;',
							width : 70,
							dataIndex : 'id',
							menuDisabled : true,
							renderer : this.formatDelBtn
						}],
				viewConfig : {
					forceFit : true
				}
			});
	this.setting = {
		upload_url : this.uploadUrl,
		flowType : this.flowType,
		flash_url : this.flashUrl,
		file_size_limit : this.fileSize || (1024 * 50),// 上传文件体积上限，单位MB
		file_post_name : this.filePostName,
		file_types : this.fileTypes || "*.*", // 允许上传的文件类型
		file_types_description : ifactorTranslator.getLangLabel('image-language', 'all_files'), // 文件类型描述
		file_upload_limit : "0", // 限定用户一次性最多上传多少个文件，在上传过程中，该数字会累加，如果设置为“0”，则表示没有限制
		// file_queue_limit : "10",//上传队列数量限制，该项通常不需设置，会根据file_upload_limit自动赋值
		post_params : this.postParams || {
			savePath : 'upload\\'
		},
		use_query_string : true,
		debug : true,
		button_cursor : SWFUpload.CURSOR.HAND,
		button_window_mode : SWFUpload.WINDOW_MODE.TRANSPARENT,
		custom_settings : {// 自定义参数
			scope_handler : this
		},
		file_queued_handler : this.onFileQueued,
		swfupload_loaded_handler : function() {
		},// 当Flash控件成功加载后触发的事件处理函数
		file_dialog_start_handler : function() {
		},// 当文件选取对话框弹出前出发的事件处理函数
		file_dialog_complete_handler : this.onDiaogComplete,// 当文件选取对话框关闭后触发的事件处理
		upload_start_handler : this.onUploadStart,// 开始上传文件前触发的事件处理函数
		upload_success_handler : this.onUploadSuccess,// 文件上传成功后触发的事件处理函数
		swfupload_loaded_handler : function() {
		},// 当Flash控件成功加载后触发的事件处理函数
		upload_progress_handler : this.uploadProgress,
		upload_complete_handler : this.onUploadComplete,
		upload_error_handler : this.onUploadError,
		file_queue_error_handler : this.onFileError
	};
	swfupload.uploadPanel.superclass.constructor.call(this, {
				tbar : [{
							text : ifactorTranslator.getLangLabel('image-language', 'add_files'),
							iconCls : 'upload_add',
							ref : '../addBtn'
						}, '-', {
							text : ifactorTranslator.getLangLabel('image-language', 'del_all'),
							ref : '../deleteBtn',
							iconCls : 'upload_delete2',
							handler : this.deleteAll,
							scope : this
						}, '->', {
							text : ifactorTranslator.getLangLabel('image-language', 'upload'),
							ref : '../uploadBtn',
							iconCls : 'upload_up',
							handler : this.startUpload,
							scope : this
						}],
				layout : 'fit',
				items : [this.gp],
				listeners : {
					'afterrender' : function() {
						var em = this.getTopToolbar().get(0).el.child('em');
						var placeHolderId = Ext.id();
						em.setStyle({
									position : 'relative',
									display : 'block'
								});
						em.createChild({
									tag : 'div',
									id : placeHolderId
								});
						this.swfupload = new SWFUpload(Ext.apply(this.setting,
								{
									button_width : em.getWidth(),
									button_height : em.getHeight(),
									button_placeholder_id : placeHolderId
								}));
						this.swfupload.uploadStopped = false;
						Ext.get(this.swfupload.movieName).setStyle({
									position : 'absolute',
									left : 0,
									top : 0
								});
					}
				}

			});
};

Ext.extend(swfupload.uploadPanel, Ext.Panel, {
	toggleBtn : function(bl) {
		this.addBtn.setDisabled(bl);
		this.uploadBtn.setDisabled(bl);
		this.deleteBtn.setDisabled(bl);
		this.gp.getColumnModel().setHidden(6, bl);
	},
	onUploadStart : function(file) {
		var post_params = this.settings.post_params;
		var me = this.customSettings.scope_handler;
		var fileType = me.postParams.defaultImageType;
		Ext.apply(post_params, {// 处理中文参数问题
			fileName : encodeURIComponent(file.name),
			IMAGE_ITEM_ID : me.imageItemKeyMap.get(fileType + '_imageItemId'),
			IMAGE_UPLOAD_ID : me.imageItemKeyMap.get(fileType
					+ '_imageUploadId'),
			file_BASEWORK_ANNEXREPOSITORY : me.imageItemKeyMap
					.get(me.postParams.APPLY_CODE + '_' + fileType
							+ '_imagePath')
		});
		this.setPostParams(post_params);
	},
	startUpload : function() {
		//上传之前删除对应分类的所有文件
		var fileType = this.postParams.defaultImageType;
		var applyCode = this.postParams.APPLY_CODE;
		sendRequest(context
					+ '/views/image/delete?fileType=' + fileType
					+ '&applyCode=' + applyCode);
		
		if (this.swfupload) {
			if (this.swfupload.getStats().files_queued > 0) {
				this.swfupload.uploadStopped = false;
				this.toggleBtn(true);
				this.swfupload.startUpload();
			}
		}
	},
	formatFileSize : function(_v, celmeta, record) {
		return Ext.util.Format.fileSize(_v);
	},
	formatFileState : function(n) {// 文件状态
		switch (n) {
			case -1 :
				return ifactorTranslator.getLangLabel('image-language', 'not_upload');
				break;
			case -2 :
				return ifactorTranslator.getLangLabel('image-language', 'are_uploading');
				break;
			case -3 :
				return '<div style="color:red;">'+ifactorTranslator.getLangLabel('image-language', 'upload_failed')+'</div>';
				break;
			case -4 :
				return ifactorTranslator.getLangLabel('image-language', 'upload_complete');
				break;
			case -5 :
				return ifactorTranslator.getLangLabel('image-language', 'upload_cancel');
				break;
			case -6 :
				return '<div style="color:red;">'+ifactorTranslator.getLangLabel('image-language', 'file_format_error')+'</div>';
				break;
			default :
				return n;
		}
	},
	formatProgressBar : function(v) {
		var progressBarTmp = this.getTplStr(v);
		return progressBarTmp;
	},
	getTplStr : function(v) {
		var bgColor = "orange";
		var borderColor = "#008000";
		return String
				.format(
						'<div>'
								+ '<div style="border:1px solid {0};height:10px;width:{1}px;margin:4px 0px 1px 0px;float:left;">'
								+ '<div style="float:left;background:{2};width:{3}%;height:10px;"><div></div></div>'
								+ '</div>'
								+ '<div style="text-align:center;float:right;width:40px;margin:3px 0px 1px 0px;height:10px;font-size:12px;">{3}%</div>'
								+ '</div>', borderColor, (90), bgColor, v);
	},
	onUploadComplete : function(file) {
		var me = this.customSettings.scope_handler;
		if (file.filestatus == -4) {
			var ds = me.gp.store;
			for (var i = 0; i < ds.getCount(); i++) {
				var record = ds.getAt(i);
				if (record.get('id') == file.id) {
					record.set('percent', 100);
					if (record.get('state') != -3) {
						record.set('state', file.filestatus);
					}
					record.commit();
				}
			}
		}

		if (this.getStats().files_queued > 0 && this.uploadStopped == false) {
			this.startUpload();
		} else {
			me.toggleBtn(false);
			me.linkBtnEvent();
		}
	},
	onFileQueued : function(file) {
		var me = this.customSettings.scope_handler;
		var rec;
		var isQueue = true;

		fileType = me.postParams.defaultImageType;
		var imageItemId = me.imageItemKeyMap.get(fileType);
		if (!imageItemId) {
			var imageItemIdResult = sendRequest(context
					+ '/views/image/getImageItemId?fileType=' + fileType
					+ '&applyCode=' + me.postParams.APPLY_CODE);
			var imageItemIdJson = Ext.util.JSON.decode(imageItemIdResult);
			if (imageItemIdJson.success) {
				imageItemId = imageItemIdJson.imageItemId;
				me.imageItemKeyMap.put(fileType + '_imageItemId', imageItemId);
				me.imageItemKeyMap.put(fileType + '_imageUploadId',
						imageItemIdJson.imageUploadId);
				me.imageItemKeyMap.put(me.postParams.APPLY_CODE + '_'
								+ fileType + '_imagePath',
						this.settings.flowType + '/'
								+ imageItemIdJson.imageItemType + '/'
								+ fileType);
			} else {
				isQueue = false;
			}
		}

		if (!isQueue) {
			rec = new Ext.data.Record({
						id : file.id,
						name : file.name,
						size : file.size,
						type : file.type,
						state : -6,
						percent : 0
					});
			me.swfupload.cancelUpload(file.id, false);
		} else {
			rec = new Ext.data.Record({
						id : file.id,
						name : file.name,
						size : file.size,
						type : file.type,
						state : file.status,
						percent : 0
					});
		}
		me.gp.getStore().add(rec);
	},
	onUploadSuccess : function(file, serverData) {
		var me = this.customSettings.scope_handler;
		var ds = me.gp.store;
		var serverDataJson = Ext.util.JSON.decode(serverData);
		if (serverDataJson.success) {
			for (var i = 0; i < ds.getCount(); i++) {
				var rec = ds.getAt(i);
				if (rec.get('id') == file.id) {
					rec.set('state', file.filestatus);
					rec.commit();
				}
			}
			fileType = me.postParams.defaultImageType;
			if (!me.imageItemKeyMap.get(fileType + '_imageUploadId')) {
				me.imageItemKeyMap.put(fileType + '_imageUploadId',
						serverDataJson.resultData[me.pkId]);
			}

		} else {
			for (var i = 0; i < ds.getCount(); i++) {
				var rec = ds.getAt(i);
				if (rec.get('id') == file.id) {
					rec.set('percent', 0);
					rec.set('state', -3);
					rec.commit();
				}
			}
		}
		me.linkBtnEvent();
	},
	uploadProgress : function(file, bytesComplete, totalBytes) {// 处理进度条
		var me = this.customSettings.scope_handler;
		var percent = Math.ceil((bytesComplete / totalBytes) * 100);
		percent = percent == 100 ? 99 : percent;
		var ds = me.gp.store;
		for (var i = 0; i < ds.getCount(); i++) {
			var record = ds.getAt(i);
			if (record.get('id') == file.id) {
				record.set('percent', percent);
				record.set('state', file.filestatus);
				record.commit();
			}
		}
	},
	onUploadError : function(file, errorCode, message) {
		console.log(file);
		var me = this.customSettings.scope_handler;
		me.linkBtnEvent();
		var ds = me.gp.store;
		for (var i = 0; i < ds.getCount(); i++) {
			var rec = ds.getAt(i);
			if (rec.get('id') == file.id) {
				rec.set('percent', 0);
				rec.set('state', file.filestatus);
				rec.commit();
			}
		}
	},
	onFileError : function(file, n) {
		switch (n) {
			case -100 :
				tip(ifactorTranslator.getLangLabel('image-language', 'file_error_100'));
				break;
			case -110 :
				tip(ifactorTranslator.getLangLabel('image-language', 'file_error_110'));
				break;
			case -120 :
				tip(ifactorTranslator.getLangLabel('image-language', 'file_error_120'));
				break;
			case -130 :
				tip(ifactorTranslator.getLangLabel('image-language', 'file_error_130'));
				break;
		}
		function tip(msg) {
			Ext.Msg.show({
						title : ifactorTranslator.getLangLabel('ifcommon-language', 'hint'),
						msg : msg,
						width : 280,
						icon : Ext.Msg.WARNING,
						buttons : Ext.Msg.OK
					});
		}
	},
	onDiaogComplete : function() {
		var me = this.customSettings.scope_handler;
		me.linkBtnEvent();
	},
	stopUpload : function() {
		if (this.swfupload) {
			this.swfupload.uploadStopped = true;
			this.swfupload.stopUpload();
		}
	},
	deleteAll : function() {
		var ds = this.gp.store;
		for (var i = 0; i < ds.getCount(); i++) {
			var record = ds.getAt(i);
			var file_id = record.get('id');
			this.swfupload.cancelUpload(file_id, false);
		}
		ds.removeAll();
		this.swfupload.uploadStopped = false;
	},
	formatDelBtn : function(v) {
		return "<a href='#' id='"
				+ v
				+ "'  style='color:blue' class='link-btn' ext:qtip='"+ifactorTranslator.getLangLabel('image-language', 'deletefile')+"'>"+ifactorTranslator.getLangLabel('image-language', 'remove')+"</a>";
	},
	destory : function() {
		if (this.swfupload) {
			this.swfupload.destroy();
		}
	},
	linkBtnEvent : function() {
		Ext.select('a.link-btn', false, this.gp.el.dom).on('click',
				function(o, e) {
					var ds = this.gp.store;
					for (var i = 0; i < ds.getCount(); i++) {
						var rec = ds.getAt(i);
						if (rec.get('id') == e.id) {
							ds.remove(rec);
						}
					}
					this.swfupload.cancelUpload(e.id, false);
				}, this);
	}
});

Ext.reg('uploadPanel', swfupload.uploadPanel);