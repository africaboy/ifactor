Ext.namespace('Ext.ux');

Ext.ux.CustomNumberField = Ext.extend(Ext.form.NumberField, {
			fieldClass : 'x-form-field x-form-customnumber-field',
			prefixChar : '',
			suffixChar : '',
			numberDelim : ',',
			delimLength : 3,
			alwaysShowCents : true,
			onRender : function() {
				Ext.ux.CustomNumberField.superclass.onRender.apply(this,
						arguments);
				var name = this.name || this.el.dom.name;
				this.hiddenField = this.el.insertSibling({
							tag : 'input',
							type : 'hidden',
							name : name,
							value : this.parseValue(this.value)
						});
				this.hiddenName = name;
				this.el.dom.removeAttribute('name');
				this.el.on({
							keyup : {
								scope : this,
								fn : this.updateHidden
							},
							blur : {
								scope : this,
								fn : this.updateHidden
							}
						}, Ext.isIE ? 'after' : 'before');
				this.setValue = this.setValue.createSequence(this.updateHidden);
			},
			initEvents : function() {
				Ext.ux.CustomNumberField.superclass.initEvents.call(this);
				var allowed = this.baseChars + '';
				var stripBeforeParse = [];

				if (this.allowDecimals) {
					allowed += this.decimalSeparator;
				}
				if (this.allowNegative) {
					allowed += '-';
				}
				if (this.prefixChar) {
					allowed += this.prefixChar;
					stripBeforeParse.push(Ext.escapeRe(this.prefixChar));
				}
				if (this.suffixChar) {
					allowed += this.suffixChar;
					stripBeforeParse.push(Ext.escapeRe(this.suffixChar));
				}
				if (this.numberDelim) {
					allowed += this.numberDelim;
					stripBeforeParse.push(Ext.escapeRe(this.numberDelim));
				}
				this.maskRe = new RegExp('[' + Ext.escapeRe(allowed) + ']');
				this.stripBeforeParseRe = new RegExp('['
								+ stripBeforeParse.join('|') + ']', 'g');
			},
			updateHidden : function() {
				this.hiddenField.dom.value = this.parseValue(this.getValue());
			},
			getErrors : function() {
				var errors = Ext.form.NumberField.superclass.getErrors.apply(
						this, arguments);
				return errors;
			},

			setValue : function(v) {
				v = this.formatValue(this.parseValue(v));
				Ext.form.NumberField.superclass.setValue.call(this, v);
			},

			parseValue : function(value) {
				value = String(value).replace(this.stripBeforeParseRe, '');
				value = Ext.ux.CustomNumberField.superclass.parseValue.call(
						this, value);
				return value;
			},

			formatValue : function(value) {
				if (Ext.isEmpty(value))
					return '';
				value = String(Ext.ux.CustomNumberField.superclass.fixPrecision
						.call(this, value));
				var vSplit = value.split('.');

				var cents = (vSplit[1]) ? '.' + vSplit[1] : '';
				if (this.alwaysShowCents && cents == '')
					cents = '.00';

				if (this.numberDelim && this.delimLength) {
					var numbers = vSplit[0].split('');
					var sNumbers = [];
					var c = 0;
					while (numbers.length > 0) {
						c++;
						if (c > this.delimLength)
							c = 1;
						sNumbers.unshift(numbers.pop());
						if (c == this.delimLength && numbers.length > 0)
							sNumbers.unshift(this.numberDelim);
					}
					value = sNumbers.join('') + cents;
				} else {
					value = vSplit[0] + cents;
				}
				if (this.prefixChar)
					value = this.prefixChar + String(value);
				if (this.suffixChar)
					value = String(value) + this.suffixChar;
				return value;
			}
		});

Ext.reg('custnumberfield', Ext.ux.CustomNumberField);

Ext.ux.MoneyField = Ext.extend(Ext.ux.CustomNumberField, {
			currencyChar : '¥',
			initComponent : function() {
				Ext.apply(this, {
							prefixChar : this.currencyChar
						});
				Ext.ux.MoneyField.superclass.initComponent.apply(this,
						arguments);
			}
		});

Ext.reg('moneyfield', Ext.ux.MoneyField);

Ext.ux.PercentField = Ext.extend(Ext.ux.CustomNumberField, {
			percentChar : '%',
			initComponent : function() {
				Ext.apply(this, {
							suffixChar : this.percentChar
						});
				Ext.ux.PercentField.superclass.initComponent.apply(this,
						arguments);
			}
		});

Ext.reg('percentfield', Ext.ux.PercentField);

Ext.form.viewimg = Ext.extend(Ext.BoxComponent, {
			onRender : function(ct, position) {
				if (!this.el) {
					this.el = document.createElement('img');
					this.el.src = this.src;
					if (this.forId) {
						this.el.setAttribute('htmlFor', this.forId);
					}
				}
				Ext.form.Label.superclass.onRender.call(this, ct, position);
			}
		});
Ext.reg('viewimg', Ext.form.viewimg);

Ext.form.CompositeField = Ext.extend(Ext.form.Field, {

	defaultMargins : '0 5 0 0',

	skipLastItemMargin : true,

	isComposite : true,

	combineErrors : false,

	labelConnector : ', ',

	initComponent : function() {
		var labels = [], items = this.items, item;

		for (var i = 0, j = items.length; i < j; i++) {
			item = items[i];

			labels.push(item.fieldLabel);

			Ext.apply(item, this.defaults);

			if (!(i == j - 1 && this.skipLastItemMargin)) {
				Ext.applyIf(item, {
							margins : this.defaultMargins
						});
			}
		}

		this.fieldLabel = this.fieldLabel || this.buildLabel(labels);

		this.fieldErrors = new Ext.util.MixedCollection(true, function(item) {
					return item.field;
				});

		this.fieldErrors.on({
					scope : this,
					add : this.updateInvalidMark,
					remove : this.updateInvalidMark,
					replace : this.updateInvalidMark
				});

		Ext.form.CompositeField.superclass.initComponent.apply(this, arguments);
	},

	onRender : function(ct, position) {
		if (!this.el) {

			var innerCt = this.innerCt = new Ext.Container({
						layout : 'hbox',
						renderTo : ct,
						items : this.items,
						cls : 'x-form-composite',
						defaultMargins : '0 3 0 0'
					});

			this.el = innerCt.getEl();

			var fields = innerCt.findBy(function(c) {
						return c.isFormField;
					}, this);

			this.items = new Ext.util.MixedCollection();
			this.items.addAll(fields);

			if (this.combineErrors) {
				this.eachItem(function(field) {
							Ext.apply(field, {
										markInvalid : this.onFieldMarkInvalid
												.createDelegate(this, [field],
														0),
										clearInvalid : this.onFieldClearInvalid
												.createDelegate(this, [field],
														0)
									});
						});
			}

			var l = this.el.parent().parent().child('label', true);
			if (l) {
				l.setAttribute('for', this.items.items[0].id);
			}
		}

		Ext.form.CompositeField.superclass.onRender.apply(this, arguments);
	},

	onFieldMarkInvalid : function(field, message) {
		var name = field.getName(), error = {
			field : name,
			error : message
		};

		this.fieldErrors.replace(name, error);

		field.el.addClass(field.invalidClass);
	},

	onFieldClearInvalid : function(field) {
		this.fieldErrors.removeKey(field.getName());

		field.el.removeClass(field.invalidClass);
	},

	updateInvalidMark : function() {
		var ieStrict = Ext.isIE6 && Ext.isStrict;

		if (this.fieldErrors.length == 0) {
			this.clearInvalid();

			if (ieStrict) {
				this.clearInvalid.defer(50, this);
			}
		} else {
			var message = this
					.buildCombinedErrorMessage(this.fieldErrors.items);

			this.sortErrors();
			this.markInvalid(message);

			if (ieStrict) {
				this.markInvalid(message);
			}
		}
	},

	validateValue : function() {
		var valid = true;

		this.eachItem(function(field) {
					if (!field.isValid())
						valid = false;
				});

		return valid;
	},

	buildCombinedErrorMessage : function(errors) {
		var combined = [], error;

		for (var i = 0, j = errors.length; i < j; i++) {
			error = errors[i];

			combined.push(String.format("{0}: {1}", error.field, error.error));
		}

		return combined.join("<br />");
	},

	sortErrors : function() {
		var fields = this.items;

		this.fieldErrors.sort("ASC", function(a, b) {
			var findByName = function(key) {
				return function(field) {
					return field.getName() == key;
				};
			};

			var aIndex = fields.findIndexBy(findByName(a.field)), bIndex = fields
					.findIndexBy(findByName(b.field));

			return aIndex < bIndex ? -1 : 1;
		});
	},

	reset : function() {
		this.eachItem(function(item) {
					item.reset();
				});

(function() {
			this.clearInvalid();
		}).defer(50, this);
	},

	clearInvalidChildren : function() {
		this.eachItem(function(item) {
					item.clearInvalid();
				});
	},

	buildLabel : function(segments) {
		return Ext.clean(segments).join(this.labelConnector);
	},

	isDirty : function() {

		if (this.disabled || !this.rendered) {
			return false;
		}

		var dirty = false;
		this.eachItem(function(item) {
					if (item.isDirty()) {
						dirty = true;
						return false;
					}
				});
		return dirty;
	},

	eachItem : function(fn, scope) {
		if (this.items && this.items.each) {
			this.items.each(fn, scope || this);
		}
	},

	onResize : function(adjWidth, adjHeight, rawWidth, rawHeight) {
		var innerCt = this.innerCt;

		if (this.rendered && innerCt.rendered) {
			innerCt.setSize(adjWidth, adjHeight);
		}

		Ext.form.CompositeField.superclass.onResize.apply(this, arguments);
	},

	doLayout : function(shallow, force) {
		if (this.rendered) {
			var innerCt = this.innerCt;

			innerCt.forceLayout = this.ownerCt.forceLayout;
			innerCt.doLayout(shallow, force);
		}
	},

	beforeDestroy : function() {
		Ext.destroy(this.innerCt);

		Ext.form.CompositeField.superclass.beforeDestroy.call(this);
	},

	setReadOnly : function(readOnly) {
		if (readOnly == undefined) {
			readOnly = true;
		}
		readOnly = !!readOnly;

		if (this.rendered) {
			this.eachItem(function(item) {
						item.setReadOnly(readOnly);
					});
		}
		this.readOnly = readOnly;
	},

	onShow : function() {
		Ext.form.CompositeField.superclass.onShow.call(this);
		this.doLayout();
	},

	onDisable : function() {
		this.eachItem(function(item) {
					item.disable();
				});
	},

	onEnable : function() {
		this.eachItem(function(item) {
					item.enable();
				});
	}
});

Ext.reg('compositefield', Ext.form.CompositeField);
