

var ddlevelsmenu = {

	downarrowpointer : ["js/arrow-down.gif", 11, 7], // path to "down
																// arrow" image
																// that gets
																// added to main
																// menu items
																// (last 2
																// parameters
																// should be
																// width/height
																// of img)
	rightarrowpointer : ["js/arrow-right.gif", 12, 12], // path to
																	// "right
																	// arrow"
																	// image
																	// that gets
																	// added to
																	// LI
																	// elements
																	// within
																	// drop down
																	// menu
																	// containing
																	// additional
																	// menus
	hideinterval : 200, // delay in milliseconds before sub menu(s) disappears
						// onmouseout.
	httpsiframesrc : "blank.htm", // If menu is run on a secure (https) page,
									// the IFRAME shim feature used by the
									// script should point to an *blank* page
									// *within* the secure area to prevent an IE
									// security prompt. Specify full URL to that
									// page on your server (leave as is if not
									// applicable).

	// /No need to edit beyond here////////////////////

	topmenuids : [], // array containing ids of all the primary menus on the
						// page
	topitems : {}, // object array containing all top menu items
	subuls : {}, // object array containing all ULs
	topitemsindex : -1,
	ulindex : -1,
	hidetimers : {}, // object array timer
	shimadded : false,

	getoffset : function(what, offsettype) {
		return (what.offsetParent)
				? what[offsettype]
						+ this.getoffset(what.offsetParent, offsettype)
				: what[offsettype]
	},

	getoffsetof : function(el) {
		el._offsets = {
			left : this.getoffset(el, "offsetLeft"),
			top : this.getoffset(el, "offsetTop")
		}
	},

	getwindowsize : function() {
		this.docwidth = window.innerWidth
				? window.innerWidth - 10
				: this.standardbody.clientWidth - 10
		this.docheight = window.innerHeight
				? window.innerHeight - 15
				: this.standardbody.clientHeight - 18
	},

	gettopitemsdimensions : function() {
		for (var m = 0; m < this.topmenuids.length; m++) {
			var topmenuid = this.topmenuids[m]
			for (var i = 0; i < this.topitems[topmenuid].length; i++) {
				var header = this.topitems[topmenuid][i]
				var submenu = document.getElementById(header.parentNode
						.getAttribute('rel'))
				header._dimensions = {
					w : header.offsetWidth,
					h : header.offsetHeight,
					submenuw : submenu.offsetWidth,
					submenuh : submenu.offsetHeight
				}
			}
		}
	},

	isContained : function(m, e) {
		var e = window.event || e
		var c = e.relatedTarget
				|| ((e.type == "mouseover") ? e.fromElement : e.toElement)
		while (c && c != m)
			try {
				c = c.parentNode
			} catch (e) {
				c = m
			}
		if (c == m)
			return true
		else
			return false
	},

	addpointer : function(target, imgclass, imginfo) {
		var pointer = document.createElement("img")
		pointer.src = imginfo[0]
		pointer.style.width = imginfo[1] + "px"
		pointer.style.height = imginfo[2] + "px"
		pointer.className = imgclass
		target.appendChild(pointer)
	},

	css : function(el, targetclass, action) {
		var needle = new RegExp("(^|\\s+)" + targetclass + "($|\\s+)", "ig")
		if (action == "check")
			return needle.test(el.className)
		else if (action == "remove")
			el.className = el.className.replace(needle, "")
		else if (action == "add" && !needle.test(el.className))
			el.className += " " + targetclass
	},

	addshimmy : function(target) {
		var shim = (!window.opera)
				? document.createElement("iframe")
				: document.createElement("div") // Opera 9.24 doesnt seem to
												// support transparent IFRAMEs
		shim.className = "ddiframeshim"
		shim.setAttribute("src", location.protocol == "https:"
						? this.httpsiframesrc
						: "about:blank")
		shim.setAttribute("frameborder", "0")
		target.appendChild(shim)
		try {
			shim.style.filter = 'progid:DXImageTransform.Microsoft.Alpha(style=0,opacity=0)'
		} catch (e) {
		}
		return shim
	},

	positionshim : function(header, submenu, dir, scrollX, scrollY) {
		if (header._istoplevel) {
			var scrollY = window.pageYOffset
					? window.pageYOffset
					: this.standardbody.scrollTop
			var topgap = header._offsets.top - scrollY
			var bottomgap = scrollY + this.docheight - header._offsets.top
					- header._dimensions.h
			if (topgap > 0) {
				this.shimmy.topshim.style.left = scrollX + "px"
				this.shimmy.topshim.style.top = scrollY + "px"
				this.shimmy.topshim.style.width = "99%"
				this.shimmy.topshim.style.height = topgap + "px" // distance
																	// from top
																	// window
																	// edge to
																	// top of
																	// menu item
			}
			if (bottomgap > 0) {
				this.shimmy.bottomshim.style.left = scrollX + "px"
				this.shimmy.bottomshim.style.top = header._offsets.top
						+ header._dimensions.h + "px"
				this.shimmy.bottomshim.style.width = "99%"
				this.shimmy.bottomshim.style.height = bottomgap + "px" // distance
																		// from
																		// bottom
																		// of
																		// menu
																		// item
																		// to
																		// bottom
																		// window
																		// edge
			}
		}
	},

	hideshim : function() {
		this.shimmy.topshim.style.width = this.shimmy.bottomshim.style.width = 0
		this.shimmy.topshim.style.height = this.shimmy.bottomshim.style.height = 0
	},

	buildmenu : function(mainmenuid, header, submenu, submenupos, istoplevel,
			dir) {
		header._master = mainmenuid // Indicate which top menu this header is
									// associated with
		header._pos = submenupos // Indicate pos of sub menu this header is
									// associated with
		header._istoplevel = istoplevel
		if (istoplevel) {
			this.addEvent(header, function(e) {
				ddlevelsmenu
						.hidemenu(ddlevelsmenu.subuls[this._master][parseInt(this._pos)])
			}, "click")
		}
		this.subuls[mainmenuid][submenupos] = submenu
		header._dimensions = {
			w : header.offsetWidth,
			h : header.offsetHeight,
			submenuw : submenu.offsetWidth,
			submenuh : submenu.offsetHeight
		}
		this.getoffsetof(header)
		submenu.style.left = 0
		submenu.style.top = 0
		submenu.style.visibility = "hidden"
		this.addEvent(header, function(e) { // mouseover event
					if (!ddlevelsmenu.isContained(this, e)) {
						if (typeof ddlevelsmenu.hidetimers[this._master][parseInt(this._pos)] != "undefined")
							clearTimeout(ddlevelsmenu.hidetimers[this._master][parseInt(this._pos)])
						if (this._istoplevel)
							ddlevelsmenu.css(this, "selected", "add")
						var submenu = ddlevelsmenu.subuls[this._master][parseInt(this._pos)]
						ddlevelsmenu.getoffsetof(header)
						var scrollX = window.pageXOffset
								? window.pageXOffset
								: ddlevelsmenu.standardbody.scrollLeft
						var scrollY = window.pageYOffset
								? window.pageYOffset
								: ddlevelsmenu.standardbody.scrollTop
						var submenurightedge = this._offsets.left
								+ this._dimensions.submenuw
								+ (this._istoplevel && dir == "topbar"
										? 0
										: this._dimensions.w)
						var submenubottomedge = this._offsets.top
								+ this._dimensions.submenuh
						// Sub menu starting left position
						var menuleft = (this._istoplevel
								? this._offsets.left
										+ (dir == "sidebar"
												? this._dimensions.w
												: 0)
								: this._dimensions.w)
						if (submenurightedge - scrollX > ddlevelsmenu.docwidth) {
							menuleft += -this._dimensions.submenuw
									+ (this._istoplevel && dir == "topbar"
											? this._dimensions.w
											: -this._dimensions.w)
						}
						submenu.style.left = menuleft + "px"
						// Sub menu starting top position
						var menutop = (this._istoplevel
								? this._offsets.top
										+ (dir == "sidebar"
												? 0
												: this._dimensions.h)
								: this.offsetTop)
						if (submenubottomedge - scrollY > ddlevelsmenu.docheight) { // no
																					// room
																					// downwards?
							if (this._dimensions.submenuh < this._offsets.top
									+ (dir == "sidebar"
											? this._dimensions.h
											: 0) - scrollY) { // move up?
								menutop += -this._dimensions.submenuh
										+ (this._istoplevel && dir == "topbar"
												? -this._dimensions.h
												: this._dimensions.h)
							} else { // top of window edge
								menutop += -(this._offsets.top - scrollY)
										+ (this._istoplevel && dir == "topbar"
												? -this._dimensions.h
												: 0)
							}
						}
						submenu.style.top = menutop + "px"
						ddlevelsmenu.positionshim(this, submenu, dir, scrollX,
								scrollY)
						submenu.style.visibility = "visible"
					}
				}, "mouseover")
		this.addEvent(header, function(e) { // mouseout event
					if (this._istoplevel) {
						var submenu = ddlevelsmenu.subuls[this._master][parseInt(this._pos)]
						if (!ddlevelsmenu.isContained(this, e)
								&& !ddlevelsmenu.isContained(submenu, e)) // hide
																			// drop
																			// down
																			// ul
																			// if
																			// mouse
																			// moves
																			// out
																			// of
																			// menu
																			// bar
																			// item
																			// but
																			// not
																			// into
																			// drop
																			// down
																			// ul
																			// itself
							ddlevelsmenu.hidemenu(submenu)
					} else if (!this._istoplevel
							&& !ddlevelsmenu.isContained(this, e)) {
						var headerlist = this
						ddlevelsmenu.hidetimers[this._master][parseInt(this._pos)] = setTimeout(
								function() {
									var submenu = ddlevelsmenu.subuls[headerlist._master][parseInt(headerlist._pos)]
									ddlevelsmenu.hidemenu(submenu)
								}, ddlevelsmenu.hideinterval)
					}
				}, "mouseout")
	},

	hidemenu : function(submenu) {
		if (typeof submenu._pos != "undefined") { // if submenu is outermost
													// UL drop down menu
			this.css(this.topitems[submenu._master][parseInt(submenu._pos)],
					"selected", "remove")
			this.hideshim()
		}
		submenu.style.left = 0
		submenu.style.top = "-1000px"
		submenu.style.visibility = "hidden"
	},

	addEvent : function(target, functionref, tasktype) {
		if (target.addEventListener)
			target.addEventListener(tasktype, functionref, false);
		else if (target.attachEvent)
			target.attachEvent('on' + tasktype, function() {
						return functionref.call(target, window.event)
					});
	},

	init : function(mainmenuid, dir) {
		this.standardbody = (document.compatMode == "CSS1Compat")
				? document.documentElement
				: document.body
		this.topitemsindex = -1
		this.ulindex = -1
		this.topmenuids.push(mainmenuid)
		this.topitems[mainmenuid] = [] // declare array on object
		this.subuls[mainmenuid] = [] // declare array on object
		this.hidetimers[mainmenuid] = [] // declare array on object
		if (!this.shimadded) {
			this.shimmy = {}
			this.shimmy.topshim = this.addshimmy(document.body) // create top
																// iframe shim
																// obj
			this.shimmy.bottomshim = this.addshimmy(document.body) // create
																	// bottom
																	// iframe
																	// shim obj
			this.shimadded = true
		}
		var menubar = document.getElementById(mainmenuid)
		var menuitems = menubar.getElementsByTagName("*")
		this.getwindowsize()
		for (var i = 0; i < menuitems.length; i++) {
			if (menuitems[i].getAttribute('rel')) {
				this.topitemsindex++
				this.ulindex++
				var menulink = menuitems[i].getElementsByTagName("a")[0]
				this.topitems[mainmenuid][this.topitemsindex] = menulink // store
																			// ref
																			// to
																			// main
																			// menu
																			// links
				var dropul = document.getElementById(menuitems[i]
						.getAttribute('rel'))
				dropul.style.zIndex = 2000 // give drop down menus a high
											// z-index
				dropul._master = mainmenuid // Indicate which main menu this
											// main UL is associated with
				dropul._pos = this.topitemsindex // Indicate which main menu
													// item this main UL is
													// associated with
				this.addEvent(dropul, function() {
							ddlevelsmenu.hidemenu(this)
						}, "click")
				var arrowpointer = (dir == "sidebar")
						? "rightarrowpointer"
						: "downarrowpointer"
				this.addpointer(menulink, arrowpointer, this[arrowpointer])
				this.buildmenu(mainmenuid, menulink, dropul, this.ulindex,
						true, dir) // build top level menu
				// dropul.onmouseover=function(){
				// do nothing
				// }
				this.addEvent(dropul, function(e) { // hide menu if mouse moves
													// out of main UL element
													// into open space
							if (!ddlevelsmenu.isContained(this, e)
									&& !ddlevelsmenu
											.isContained(
													ddlevelsmenu.topitems[this._master][parseInt(this._pos)],
													e)) {
								var dropul = this
								ddlevelsmenu.hidetimers[this._master][parseInt(this._pos)] = setTimeout(
										function() {
											ddlevelsmenu.hidemenu(dropul)
										}, ddlevelsmenu.hideinterval)
							}
						}, "mouseout")
				var subuls = dropul.getElementsByTagName("ul")
				for (var c = 0; c < subuls.length; c++) {
					this.ulindex++
					var parentli = subuls[c].parentNode
					this.addpointer(parentli.getElementsByTagName("a")[0],
							"rightarrowpointer", this.rightarrowpointer)
					this.buildmenu(mainmenuid, parentli, subuls[c],
							this.ulindex, false, dir) // build sub level menus
				}
			}
		} // end for loop
		this.addEvent(window, function() {
					ddlevelsmenu.getwindowsize();
					ddlevelsmenu.gettopitemsdimensions()
				}, "resize")
	},

	setup : function(mainmenuid, dir) {
		this.addEvent(window, function() {
					ddlevelsmenu.init(mainmenuid, dir)
				}, "load")
	}

}