$(function () {
	$('#lang-select').select2({ 
		containerCssClass: 'lang-select-container',
		dropdownCssClass: 'lang-select-dropdown'
	}).on('change select2-blur select2-selecting',function(e) {
		// alert(e.val);
		var target = $(e.target);
		if(target.val()=='EN') {
			window.location = app.selfUrl + '?locale=en_US';
		} else if(target.val()=='VN') {
			// ${self.url}?locale=vi_VN
			window.location = app.selfUrl + '?locale=vi_VN';
		}
	});
	
	function getQueryString(locurl) {
		/*var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); 
		return null;*/
		var url = locurl.search; //获取url中"?"符后的字串
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i ++) {
				theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}
});