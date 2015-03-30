/* tab页切换 */
function secBoard(n) {
	for (i = 0; i < secTable.cells.length; i++)
		secTable.cells[i].className = "sec1";
	secTable.cells[n].className = "sec2";
	for (i = 0; i < mainTable.tBodies.length; i++)
		mainTable.tBodies[i].style.display = "none";
	mainTable.tBodies[n].style.display = "block";
}

/* 提交权限设置 */
function handlePurview() {
	var rnt = false;

	var chk = document.getElementsByName("pv");
	for (var i = 0; i < chk.length; i++) {
		if (D("purview_" + chk[i].value).checked) {
			rnt = true;
			break;
		}
	}

	if (!rnt) {
		alert("Please choose object");
	} else if (confirm("Submit")) {
		var id = "";
		for (var i = 0; i < chk.length; i++) {
			if (D("purview_" + chk[i].value).checked) {
				id += chk[i].value + ",";
			}
		}

		createHidden("countP", id.substring(0, id.length - 1));
		document.form1.submit();
	}
}

/* 选择授权对象 */
function handleChk(thizz) {
	if (thizz.checked) {
		var chks = A("chkobj", thizz.getAttribute("chkobj"));
		for (var i = 0; i < chks.length; i++) {
             if(chks[i].value != thizz.value){
             	chks[i].checked = false;
             }
		}
	}
}