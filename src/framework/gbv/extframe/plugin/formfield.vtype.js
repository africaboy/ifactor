Ext.apply(Ext.form.VTypes, {
	// 首先定义一个vtype名称，和他的验证函数，val参数是文本框的值，field是文本框。一般我就使用val和正则表达式比较就OK了。
	// 然后定义一个vtype的报错信息，与vtype名称加Text后缀。OK了。
	password : function(val, field) {
		var rnt = false;
		/* 待比较目标文本框组件 */
		if (field.confirmTo) {
			// var formId = field.confirmTo.formId;
			// if (formId == null || Ext.getCmp(formId) == null) {
			// return false;
			// }

			// var pwd = Ext.getCmp(formId).getForm()
			// .findField(field.confirmTo);
			var pwd = Ext.getCmp(field.confirmTo.formId).getForm()
					.findField(field.confirmTo.confirmTo);

			if (val == pwd.getValue()) {
				rnt = true;
			} else {
				// Ext.Msg.alert('提示', '密码确认错误！');
				rnt = false;
			}
		}
		return rnt;
	},
	passwordText : 'Two input password is not consistent！',

	chinese : function(val, field) {
		var reg = /^[\u4e00-\u9fa5]+$/i;
		if (!reg.test(val)) {
			return false;
		}
		return true;
	},
	chineseText : 'Please type in Chinese',

	age : function(val, field) {
		try {
			if (parseInt(val) >= 18 && parseInt(val) <= 100)
				return true;
			return false;
		} catch (err) {
			return false;
		}
	},
	ageText : 'Age wrong input',

	alphanum : function(val, field) {
		try {
			if (!/W/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	alphanumText : 'Please enter the letters or Numbers, other characters are not allowed.',

	url : function(val, field) {
		var strRegex = '^((https|http|ftp|rtsp|mms)?://)'
				+ '?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' // ftp的user@
				+ '(([0-9]{1,3}.){3}[0-9]{1,3}' // IP形式的URL- 199.194.52.184
				+ '|' // 允许IP和DOMAIN（域名）
				+ '([0-9a-z_!~*\'()-]+.)*' // 域名- www.
				+ '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' // 二级域名
				+ '[a-z]{2,6})' // first level domain- .com or .museum
				+ '(:[0-9]{1,4})?' // 端口- :80
				+ '((/?)|' // a slash isn't required if there is no file name
				+ '(/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+/?)$';
		var re = new RegExp(strRegex);

		try {
			if (re.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	urlText : 'Please enter a valid URL address.',

	max : function(val, field) {
		try {
			if (parseFloat(val) <= parseFloat(field.max))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	maxText : 'More than the maximum',

	min : function(val, field) {
		try {
			if (parseFloat(val) >= parseFloat(field.min))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	minText : 'Less than the minimum',

	datecn : function(val, field) {
		try {
			var regex = /^(d{4})-(d{2})-(d{2})$/;
			if (!regex.test(val))
				return false;
			var d = new Date(val.replace(regex, '$1/$2/$3'));
			return (parseInt(RegExp.$2, 10) == (1 + d.getMonth()))
					&& (parseInt(RegExp.$3, 10) == d.getDate())
					&& (parseInt(RegExp.$1, 10) == d.getFullYear());
		} catch (e) {
			return false;
		}
	},
	datecnText : 'Please use the date format: yyyy - mm - dd. For example: 2008-06-20.',

	integer : function(val, field) {
		try {
			if (/^[-+]?[d]+$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	integerText : 'Please enter the correct integer',

	Pinteger : function(val, field) {
		try {
			if (/^\\d+$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	PintegerText : 'Please enter the correct integer',

	minlength : function(val, field) {
		try {
			if (val.length >= parseInt(field.minlen))
				return true;
			return false
		} catch (e) {
			return false;
		}
	},
	minlengthText : 'Through the small',

	maxlength : function(val, field) {
		try {
			if (val.length <= parseInt(field.maxlen))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	maxlengthText : 'The length is too large',

	ip : function(val, field) {
		try {
			if ((/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
					.test(val)))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	ipText : 'Please enter the IP address of the right',

	phone : function(val, field) {
		try {
			if (/^((0[1-9]{3})?(0[12][0-9])?[-])?d{6,8}$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	phoneText : 'Please enter a correct phone number, such as: 0920-29392929',

	mobilephone : function(val, field) {
		try {
			if (/(^0?[1][35][0-9]{9}$)/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	mobilephoneText : 'Please enter the correct phone number',

	alpha : function(val, field) {
		try {
			if (/^[a-zA-Z]+$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}
	},
	alphaText : 'Please enter the letters in English',

	money : function(val, field) {
		try {
			if (/^d+.d{2}$/.test(val))
				return true;
			return false;
		} catch (e) {
			return false;
		}

	},
	moneyText : 'Please input the correct amount',
	dateRange : function(val, field) {
		if (field.dateRange) {
			var formId = field.dateRange.formId;
			if (formId == null || Ext.getCmp(formId) == null) {
				return false;
			}

			if (Ext.getCmp(formId).getForm().findField(field.dateRange.begin) == null
					|| Ext.getCmp(formId).getForm()
							.findField(field.dateRange.begin) == null) {
				return false;
			}

			if (Ext.getCmp(formId).getForm().findField(field.dateRange.end) == null
					|| Ext.getCmp(formId).getForm()
							.findField(field.dateRange.end) == null) {
				return false;
			}

			var beginDate = Ext.getCmp(formId).getForm()
					.findField(field.dateRange.begin).getValue();
			var endDate = Ext.getCmp(formId).getForm()
					.findField(field.dateRange.end).getValue();

			if (beginDate == '' || endDate == '') {
				return true;
			}

			if (beginDate <= endDate) {
				return true;
			} else {
				return false;
			}
		}

		return false;
	},
	// 验证失败信息
	dateRangeText : 'Start date cannot be greater than end date'
});