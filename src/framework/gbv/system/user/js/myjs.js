/* 验证登录ID是否合法 */
function checkLogID(logid) {
	if (document.form1.uorlogid.value != ""
			&& document.form1.uorlogid.value != logid) {
		var url = context + "/system/user.do?method=checklogid&logid=" + logid;
		var res = sendRequest(url);
		var r = (res != 1);
		return r;
	}

	return true;
}

/* 保存提交 */
function handleSubmit() {
	if (checkit() && confirm("确定提交")) {
		if (document.form1.birthday1) {
			var birth = "";
			if (!isblank(document.form1.birthday1)) {
				birth = parseDate(document.form1.birthday1.value);
			}
			createHidden("birthday", birth);
		}
		document.form1.submit();
	}
}

/* 设置默认密码 */
function setDefaultPWD(thizz) {
	if (confirm("设置缺省密码")) {
		document.form1.pwd.value = thizz.getAttribute("pwd");
		document.form1.pwd1.value = thizz.getAttribute("pwd");
	}
}

/* 删除用户所属组设置 */
function handleRemove() {
	document.form1.gname.value = "";
	document.form1.gid.value = "";
}

var cal1;
function onload() {
	cal1 = new dhtmlxCalendarObject('birthday1');
	cal1.setSkin('dhx_blue');

	var tabbar = new dhtmlXTabBar("a_tabbar", "top");
	tabbar.setImagePath(context + "/resources/dhtmlx/codebase/imgs/");
	tabbar.enableAutoReSize(true);
	tabbar.addTab("a1", "用户信息编辑", "100px");
	tabbar.setTabActive("a1");

	//var toolbar = new dhtmlXToolbarObject("toolbarObj");
	var toolbar = tabbar.cells("a1").attachToolbar();
	toolbar.setIconsPath(context
			+ "/resources/dhtmlx/codebase/imgs/dhxtoolbar_dhx_imgs/");
	toolbar.addButton("save", 1, "提交修改", "save.gif", "save_dis.gif");
	toolbar.addButton("partset", 2, "兼职设置", "new.gif", "new_dis.gif");
	toolbar.attachEvent("onClick", function(id) {
				if (id == "save") {
					handleSubmit();
				} else if (id == "partset") {
					handlePart();
				}
			});
	var myForm = new dhtmlXForm("form1");
	//tabbar.cells("a1").attachObject(myForm);
	tabbar.setContent("a1", "content");
	//tabbar.setContentHTML("a1", $("content").innerHTML);
}