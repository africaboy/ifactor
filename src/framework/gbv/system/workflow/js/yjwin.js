var isIe = (document.all) ? true : false;
// 设置select的可见状态
function setSelectState(state) {
	var objl = document.getElementsByTagName('select');
	for (var i = 0; i < objl.length; i++) {
		objl[i].style.visibility = state;
	}
}
function mousePosition(ev) {
	if (ev.pageX || ev.pageY) {
		return {
			x : ev.pageX,
			y : ev.pageY
		};
	}
	return {
		x : ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y : ev.clientY + document.body.scrollTop - document.body.clientTop
	};
}
// 弹出方法
function showMessageBox(wTitle, content, pos, wWidth) {
	closeWindow();
	var bWidth = parseInt(document.documentElement.scrollWidth);
	var bHeight = parseInt(document.documentElement.scrollHeight);
	if (isIe) {
		setSelectState('hidden');
	}
	var back = document.createElement("div");
	back.id = "back";
	var styleStr = "top:0px;left:0px;position:absolute;background:#666;width:"
			+ bWidth + "px;height:" + bHeight + "px;";
	styleStr += (isIe) ? "filter:alpha(opacity=40);" : "opacity:0.40;";
	back.style.cssText = styleStr;
	// document.body.appendChild(back);
	var mesW = document.createElement("div");
	mesW.id = "mesWindow";
	mesW.className = "mesWindow";
	mesW.innerHTML = "<div class='mesWindowTop'><table width='100%' height='100%'><tr><td>"
			+ wTitle
			+ "</td><td style='width:1px;'><input type='button' onclick='closeWindow();' title='关闭窗口' class='mesWindowClose' value='关闭' /></td></tr></table></div><div class='mesWindowContent' id='mesWindowContent'>"
			+ content + "</div><div class='mesWindowBottom'></div>";

	styleStr = "left:" + (((pos.x - wWidth) > 0) ? (pos.x - wWidth) : pos.x)
			+ "px;top:" + (pos.y) + "px;position:absolute;width:" + wWidth
			+ "px;";
	mesW.style.cssText = styleStr;
	document.body.appendChild(mesW);

	//mesW.style.pixelLeft = mousex();
	//mesW.style.pixelTop = mousey();
}

// 弹出方法
function showUrlBox(wTitle, url, pos, wWidth) {
	closeWindow();
	if (pos == null) {
		pos = mousePosition(event);
	}

	var bWidth = parseInt(document.documentElement.scrollWidth);
	var bHeight = parseInt(document.documentElement.scrollHeight);
	if (isIe) {
		setSelectState('hidden');
	}
	var back = document.createElement("div");
	back.id = "back";
	var styleStr = "top:0px;left:0px;position:absolute;background:#666;width:"
			+ bWidth + "px;height:" + bHeight + "px;";
	styleStr += (isIe) ? "filter:alpha(opacity=40);" : "opacity:0.40;";
	back.style.cssText = styleStr;
	// document.body.appendChild(back);
	var mesW = document.createElement("div");
	mesW.id = "mesWindow";
	mesW.className = "mesWindow";
	var str = '<iframe name="ss" id="ss" frameborder="0" width="100%" height="'
				+ bHeight + '" scrolling="auto" src="' + url + '"></iframe>';
	mesW.innerHTML = "<div class='mesWindowTop'><table width='100%' height='100%'><tr><td>"
			+ wTitle
			+ "</td><td style='width:1px;'><input type='button' onclick='closeWindow();' title='关闭窗口' class='close' value='关闭' /></td></tr></table></div><div class='mesWindowContent' id='mesWindowContent'>"
			+ str + "</div><div class='mesWindowBottom'></div>";

	styleStr = "left:" + (((pos.x - wWidth) > 0) ? (pos.x - wWidth) : pos.x)
			+ "px;top:" + (pos.y) + "px;position:absolute;width:" + wWidth
			+ "px;";
	mesW.style.cssText = styleStr;
	document.body.appendChild(mesW);

	mesW.style.pixelLeft = mousex();
	mesW.style.pixelTop = mousey();
}

function showBackground(obj, endInt) {
	obj.filters.alpha.opacity += 1;
	if (obj.filters.alpha.opacity < endInt) {
		setTimeout(function() {
					showBackground(obj, endInt)
				}, 8);
	}
}
// 关闭窗口
function closeWindow() {
	if (document.getElementById('back') != null) {
		document.getElementById('back').parentNode.removeChild(document
				.getElementById('back'));
	}
	if (document.getElementById('mesWindow') != null) {
		document.getElementById('mesWindow').parentNode.removeChild(document
				.getElementById('mesWindow'));
	}

	if (isIe) {
		setSelectState('');
	}
}

self.onError = null;
currentX = currentY = 0;
whichIt = null;
lastScrollX = 0;
lastScrollY = 0;
NS = (document.layers) ? 1 : 0;
IE = (document.all) ? 1 : 0;
function heartBeat() {
	if (IE) {
		diffY = document.body.scrollTop;
		diffX = document.body.scrollLeft;
	}
	if (NS) {
		diffY = self.pageYOffset;
		diffX = self.pageXOffset;
	}
	if (diffY != lastScrollY) {
		percent = .1 * (diffY - lastScrollY);
		if (percent > 0)
			percent = Math.ceil(percent);
		else
			percent = Math.floor(percent);
		if (IE)
			document.all.mesWindow.style.pixelTop += percent;
		if (NS)
			document.mesWindow.top += percent;
		lastScrollY = lastScrollY + percent;
	}
	if (diffX != lastScrollX) {
		percent = .1 * (diffX - lastScrollX);
		if (percent > 0)
			percent = Math.ceil(percent);
		else
			percent = Math.floor(percent);
		if (IE)
			document.all.mesWindow.style.pixelLeft += percent;
		if (NS)
			document.mesWindow.left += percent;
		lastScrollX = lastScrollX + percent;
	}
}

function checkFocus(x, y) {
	stalkerx = document.mesWindow.pageX;
	stalkery = document.mesWindow.pageY;
	stalkerwidth = document.mesWindow.clip.width;
	stalkerheight = document.mesWindow.clip.height;
	if ((x > stalkerx && x < (stalkerx + stalkerwidth))
			&& (y > stalkery && y < (stalkery + stalkerheight)))
		return true;
	else
		return false;
}
function grabIt(e) {
	if (IE) {
		whichIt = event.srcElement;
		while (whichIt.id && whichIt.id.indexOf("mesWindow") == -1) {
			whichIt = whichIt.parentElement;
			if (whichIt == null) {
				return true;
			}
		}
		if (whichIt.style) {
			whichIt.style.pixelLeft = whichIt.offsetLeft;
			whichIt.style.pixelTop = whichIt.offsetTop;
			currentX = (event.clientX + document.body.scrollLeft);
			currentY = (event.clientY + document.body.scrollTop);
		}
	} else {
		window.captureEvents(Event.MOUSEMOVE);
		if (checkFocus(e.pageX, e.pageY)) {
			whichIt = document.mesWindow;
			stalkerTouchedX = e.pageX - document.mesWindow.pageX;
			StalkerTouchedY = e.pageY - document.mesWindow.pageY;
		}
	}
	return true;
}
function moveIt(e) {
	if (whichIt == null) {
		return false;
	}
	if (IE) {
		if (whichIt.style) {
			newX = (event.clientX + document.body.scrollLeft);
			newY = (event.clientY + document.body.scrollTop);
			distanceX = (newX - currentX);
			distanceY = (newY - currentY);
			currentX = newX;
			currentY = newY;
			whichIt.style.pixelLeft += distanceX;
			whichIt.style.pixelTop += distanceY;
			if (whichIt.style.pixelTop < document.body.scrollTop)
				whichIt.style.pixelTop = document.body.scrollTop;
			if (whichIt.style.pixelLeft < document.body.scrollLeft)
				whichIt.style.pixelLeft = document.body.scrollLeft;
			if (whichIt.style.pixelLeft > document.body.offsetWidth
					- document.body.scrollLeft - whichIt.style.pixelWidth - 20)
				whichIt.style.pixelLeft = document.body.offsetWidth
						- whichIt.style.pixelWidth - 20;
			if (whichIt.style.pixelTop > document.body.offsetHeight
					+ document.body.scrollTop - whichIt.style.pixelHeight - 5)
				whichIt.style.pixelTop = document.body.offsetHeight
						+ document.body.scrollTop - whichIt.style.pixelHeight
						- 5;
			event.returnValue = false;
		}
	} else {
		whichIt.moveTo(e.pageX - StalkerTouchedX, e.pageY - StalkerTouchedY);
		if (whichIt.left < 0 + self.pageXOffset)
			whichIt.left = 0 + self.pageXOffset;
		if (whichIt.top < 0 + self.pageYOffset)
			whichIt.top = 0 + self.pageYOffset;
		if ((whichIt.left + whichIt.clip.width) >= (window.innerWidth
				+ self.pageXOffset - 17))
			whichIt.left = ((window.innerWidth + self.pageXOffset) - whichIt.clip.width)
					- 17;
		if ((whichIt.top + whichIt.clip.height) >= (window.innerHeight
				+ self.pageYOffset - 17))
			whichIt.top = ((window.innerHeight + self.pageYOffset) - whichIt.clip.height)
					- 17;
		return false;
	}
	return false;
}
function dropIt() {
	whichIt = null;
	if (NS)
		window.releaseEvents(Event.MOUSEMOVE);
	return true;
}


/*if(NS) { window.captureEvents(Event.MOUSEUP|Event.MOUSEDOWN);
 window.onmousedown = grabIt; window.onmousemove = moveIt; window.onmouseup =
 dropIt; } if(IE) { document.onmousedown = grabIt; document.onmousemove =
 moveIt; document.onmouseup = dropIt; }*/
 