var APP;

(function() {
	APP = APP || {};

	// invoice delivery流程对象步骤定义
	APP.IDFlowStep = {
		manualProcess : 'bquDuCwisW'
	};

	APP.edit = function(id, table, gridId, pk, suffix) {
		var params = {};
		params[pk || 'PK_ID'] = id;
		var tv = new initTableView4QueryList(gridId, {
			params : params
		});
		tv.newTableView(table.toLowerCase() + concat('_edit', suffix));
	};

	APP.view = function(id, table, gridId, pk, suffix) {
		var params = {};
		params[pk || 'PK_ID'] = id;
		var tv = new initTableView4QueryList(gridId, {
			tabid : 'tab_' + id,
			params : params
		});
		tv.newTableView(table.toLowerCase() + concat('_view', suffix));
	};

	APP.remove = function(id, table, gridId, pk) {
		deleteTable(table.toUpperCase(), 'single', '-1', function(params) {
			params[pk || 'PK_ID'] = id;
			return true;
		}, function() {
			reloadTQList(gridId);
		}, null);
	};

	APP.$link = function(param, action, text) {
		var params = [];

		if (Object.prototype.toString.call(param) === '[object Array]') {
			for (var i = 0; i < param.length; i++) {
				params.push("'" + param[i] + "'");
			}
		} else {
			params.push("'" + param + "'");
		}
		return '<a href="javascript:void(0);" onclick="APP[\'' + action
				+ '\'](' + params + ');">' + text + '</a>';
	};
	var concat = function(s1, s2) {
		if (!s2) {
			return s1;
		}
		return s1 + '_' + s2
	};
})();
