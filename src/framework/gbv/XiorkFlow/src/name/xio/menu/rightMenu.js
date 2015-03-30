// --------------- 有关数据 -----------------//

var IconList = new Array();   // icon图片 集合， 下标从 1 开始

        IconList[1] = new Image();
        
        IconList[1].src = XiorkFlowWorkSpace.XIORK_FLOW_PATH + "src/name/xio/menu/images/icon_host.gif";
        
        IconList[2] = new Image();
        
        IconList[2].src = XiorkFlowWorkSpace.XIORK_FLOW_PATH + "src/name/xio/menu/images/icon_ip.gif";

        IconList[3] = new Image();
        
        IconList[3].src = XiorkFlowWorkSpace.XIORK_FLOW_PATH + "src/name/xio/menu/images/icon_mailbody.gif";        
        
        IconList[4] = new Image();
        
        IconList[4].src = XiorkFlowWorkSpace.XIORK_FLOW_PATH + "src/name/xio/menu/images/icon_mailer.gif";        

// ---------------- 检测变量 菜单的显示隐藏就靠它了！！！ ------------------//

var JustMenuID = "";

var SubMenuList = new Array();

var NowSubMenu = "";        

var mouseCanSound = true;          // --------------------------- 声音开关 ------
									// 声音开关 ------------------//

var menuSpeed     =  50;   // ---------- 菜单显示速度 ------------//

var alphaStep     =  30;   // ---------- Alpaha 变化 度 -----------//


// -----------菜单动作所需要的参数--------------//
var oID;
var oName;
var oType;
var oParentID;
var oObjectID;
var ooObjectID;
// -----------------------------------------//
var mousex = 100;
var mousey = 100;
        
// ------------- 构建 主菜单 对象 -------------//

function MouseMenu(objName)
{
        this.id           = "Menu_"+objName;
        this.obj          = objName;
        this.length  = 0;
        
        
        this.addMenu = addMenu;
        this.addLink = addLink;
        this.addHR   = addHR;        
        
        // 当前要显示的菜单ID
        JustMenuID = this.id;
        
        document.body.insertAdjacentHTML('beforeEnd','<table id="'+this.id+'" border="0" cellspacing="0" cellpadding="0" style="top: 0; left: 0; visibility: hidden; filter:Alpha(Opacity=0);" class="menutable" onmousedown=event.cancelBubble=true; onmouseup=event.cancelBubble=true></table>');
}

// ----------- 构建 子菜单 对象 -------------//

function SubMenu(objName,objID)
{
        this.obj = objName;
        this.id  = objID;

        this.addMenu = addMenu;
        this.addLink = addLink;
        this.addHR   = addHR;

        this.length  = 0;
}


// -------------- 生成 菜单 makeMenu 方法 -----------//
function makeMenu(subID,oldID,word,icon,url,target,thetitle)
{
        var thelink = '';
        

        if(icon&&icon!="")
        {
                icon = '<img border="0" src="'+IconList[icon].src+'">';
        }
        else
        {
                icon = '';
        }
        
        if(!thetitle||thetitle=="")
        {
                thetitle = '';
        }
        
        
        if(url&&url!="")
        {
                thelink += '<a href="'+url+'" ';
                
                if(target&&target!="")
                {
                        thelink += '  ';
                        thelink += 'target="'+target+'" '
                }
                
                thelink += '></a>';
        }
        
        var Oobj = document.getElementById(oldID);

        /*--------------------------------------------- 菜单html样式
        
          <tr class="menutrout" id="trMenu_one_0" title="I am title">
      <td class="menutd0"><img src="icon/sub.gif" border="0" width="16" height="16"></td>
      <td><a href="javascript:alert('I am menu');" target="_self"></a><nobr>菜单一</nobr></td>
      <td class="menutd1">4</td>
      <td class="menutd2">&nbsp;</td>
    </tr>

        
        --------------------------------------------------*/
        
        Oobj.insertRow();
        

        with(Oobj.rows(Oobj.rows.length-1))
        {
                id                         = "tr"+subID;
                className        = "menutrout";
                
                title       = thetitle;

        }
        
        eventObj = "tr"+subID;
        
        eval(eventObj+'.attachEvent("onmouseover",MtrOver('+eventObj+'))');        
        eval(eventObj+'.attachEvent("onclick",MtrClick('+eventObj+'))');        
                
        var trObj = eval(eventObj);

        for(i=0;i<4;i++)
        {
                trObj.insertCell();
        }

        with(Oobj.rows(Oobj.rows.length-1))
        {
                cells(0).className = "menutd0";
                cells(0).innerHTML = icon;

                cells(1).innerHTML = thelink+'<nobr class=indentWord>'+word+'</nobr>';
                cells(1).calssName = "indentWord"
                
                cells(2).className = "menutd1";
                cells(2).innerHTML = "4";
                
                cells(3).className = "menutd2";
                cells(3).innerText = " ";
                
        }        
        
        
        
        document.body.insertAdjacentHTML('beforeEnd','<table id="'+subID+'" border="0" cellspacing="0" cellpadding="0" style="top: 0; left: 0; visibility: hidden; filter:Alpha(Opacity=0);" class="menutable" onmousedown=event.cancelBubble=true; onmouseup=event.cancelBubble=true></table>');
        
        
                
}


// ---------------- 生成连接 makeLink 方法 ------------//
function makeLink(subID,oldID,word,icon,url,target,thetitle)
{
        
        
        var thelink = '';
        
        if(icon&&icon!="")
        {
                icon = '<img border="0" src="'+IconList[icon].src+'">';
        }
        else
        {
                icon = '';
        }
        
        if(!thetitle||thetitle=="")
        {
                thetitle = '';
        }
        
        
        if(url&&url!="")
        {                
                if(url.indexOf("javascript:" > -1)){
                	thelink += '<a onclick="'+url+'" ';
                }else{
                    thelink += '<a href="'+url+'" ';
                }
                
                if(target&&target!="")
                {
                        thelink += '  ';
                        thelink += 'target="'+target+'" '
                }
                
                thelink += '></a>';
        }
        
        var Oobj = document.getElementById(oldID);
        
        
        /*--------------------------------------------- 连接html样式
        
          <tr class="menutrout" id="trMenu_one_0" title="I am title">
      <td class="menutd0"><img src="icon/sub.gif" border="0" width="16" height="16"></td>
      <td><a href="javascript:alert('I am link');" target="_self"></a><nobr>连接一</nobr></td>
      <td class="linktd1"></td>
      <td class="menutd2">&nbsp;</td>
    </tr>

        
        --------------------------------------------------*/        
        
        Oobj.insertRow();
        

        with(Oobj.rows(Oobj.rows.length-1))
        {
                id                         = "tr"+subID;
                className        = "menutrout";                
                title       = thetitle;

        }
        
        eventObj = "tr"+subID;
        
        eval(eventObj+'.attachEvent("onmouseover",LtrOver('+eventObj+'))');        
        eval(eventObj+'.attachEvent("onmouseout",LtrOut('+eventObj+'))');                
        eval(eventObj+'.attachEvent("onclick",MtrClick('+eventObj+'))');        
                
        var trObj = eval(eventObj);

        for(i=0;i<4;i++)
        {
                trObj.insertCell();
        }

        with(Oobj.rows(Oobj.rows.length-1))
        {
                cells(0).className = "menutd0";
                cells(0).innerHTML = icon;

                cells(1).innerHTML = thelink+'<nobr class=indentWord>'+word+'</nobr>';

                cells(2).className = "linktd1";
                cells(2).innerText = " ";
                
                cells(3).className = "menutd2";
                cells(3).innerText = " ";
                
        }        

}


// -------------- 菜单对象 addMenu 方法 ------------//
function addMenu(word,icon,url,target,title)
{
        var subID    = this.id + "_" + this.length;
        var subObj  = this.obj+"["+this.length+"]";
        
        var oldID   = this.id;
        
        eval(subObj+"= new SubMenu('"+subObj+"','"+subID+"')");
        
         makeMenu(subID,oldID,word,icon,url,target,title);
         
         this.length++;
        
}


// ------------- 菜单对象 addLink 方法 -------------//
function addLink(word,icon,url,target,title)
{
        var subID    = this.id + "_" + this.length;
        var oldID  = this.id;
        
         makeLink(subID,oldID,word,icon,url,target,title);
         
         this.length++;        
}

// ------------ 菜单对象 addHR 方法 -----------------//
function addHR()
{
        var oldID = this.id;

        var Oobj = document.getElementById(oldID);
        
        Oobj.insertRow();
        
        /*------------------------------------------
        
         <tr>
      <td colspan="4">
                <hr class="menuhr" size="1" width="95%">
       </td>
    </tr>
        
        --------------------------------------------*/        

        
        Oobj.rows(Oobj.rows.length-1).insertCell();

        with(Oobj.rows(Oobj.rows.length-1))
        {
                cells(0).colSpan= 4;
                cells(0).insertAdjacentHTML('beforeEnd','<hr class="menuhr" size="1" width="95%">');                
        }        
        
}






// --------- MtrOver(obj)-------------------//
function MtrOver(obj)
{
        return sub_over;
        
        function sub_over()
        {
        
                var sonid = obj.id.substring(2,obj.id.length);
                
                var topobj = obj.parentElement.parentElement; 
                
                NowSubMenu = topobj.id;
                
                if(obj.className=="menutrout")
                {
                        mouseWave();
                }                
                
                HideMenu(1);                
                
                SubMenuList[returnIndex(NowSubMenu)] = NowSubMenu;

                ShowTheMenu(sonid,MPreturn(sonid))                
                
                SubMenuList[returnIndex(obj.id)] = sonid;
                
                if(topobj.oldTR)
                { 
                        eval(topobj.oldTR+'.className = "menutrout"'); 
                } 

                obj.className = "menutrin"; 

                topobj.oldTR = obj.id; 
                

        }
}

// --------- LtrOver(obj)-------------------//
function LtrOver(obj)
{
        return sub_over;
        
        function sub_over()
        {
                var topobj = obj.parentElement.parentElement; 

                NowSubMenu = topobj.id;
                
                HideMenu(1);
                
                SubMenuList[returnIndex(NowSubMenu)] = NowSubMenu;
                                
                if(topobj.oldTR)
                { 
                        eval(topobj.oldTR+'.className = "menutrout"'); 
                } 

                obj.className = "menutrin"; 

                topobj.oldTR = obj.id; 

        }
}

// --------- LtrOut(obj)-------------------//
function LtrOut(obj)
{
        return sub_out;
        
        function sub_out()
        {
                var topobj = obj.parentElement.parentElement; 
                
                obj.className = "menutrout"; 
                
                topobj.oldTR = false; 
        }
}

// ----------MtrClick(obj)-----------------//

function MtrClick(obj)
{
        return sub_click;
        
        function sub_click()
        {
        	if(obj.cells(1).all.tags("A").length>0)
                {
                        obj.cells(1).all.tags("A")(0).click();
                }        

        }
        
        
}


// ---------- returnIndex(str)--------------//

function returnIndex(str)
{
        return (str.split("_").length-3)
}


// ---------ShowTheMenu(obj,num)-----------------//

function ShowTheMenu(obj,num)
{
        var topobj = eval(obj.substring(0,obj.length-2));
        
        var trobj  = eval("tr"+obj);
        
        var obj = eval(obj);
        
        if(num==0)
        {
                with(obj.style)
                {
                        pixelLeft = topobj.style.pixelLeft +topobj.offsetWidth;
                        pixelTop  = topobj.style.pixelTop + trobj.offsetTop;
                }
        }
        if(num==1)
        {
                with(obj.style)
                {
                        pixelLeft = topobj.style.pixelLeft + topobj.offsetWidth;
                        pixelTop  = topobj.style.pixelTop  + trobj.offsetTop + trobj.offsetHeight - obj.offsetHeight;
                }
        }
        if(num==2)
        {
                with(obj.style)
                {
                        pixelLeft = topobj.style.pixelLeft -  obj.offsetWidth;
                        pixelTop  = topobj.style.pixelTop + trobj.offsetTop;
                }        
        }
        if(num==3)
        {
                with(obj.style)
                {
                        pixelLeft = topobj.style.pixelLeft -  obj.offsetWidth;
                        pixelTop  = topobj.style.pixelTop  + trobj.offsetTop + trobj.offsetHeight - obj.offsetHeight;
                }        
        }
        
        obj.style.visibility  = "visible";         
        
        if(obj.alphaing)
        {
                clearInterval(obj.alphaing);
        }
        
        obj.alphaing = setInterval("menu_alpha_up("+obj.id+","+alphaStep+")",menuSpeed);        
}

// ----------HideMenu(num)-------------------//

/*----------------------
var SubMenuList = new Array();

var NowSubMenu = "";        

---------------------*/

function HideMenu(num)
{
        var thenowMenu = "";
        
        var obj = null;
        
        if(num==1)
        {
                thenowMenu = NowSubMenu
        }
        
        
        
        for(i=SubMenuList.length-1;i>=0;i--)
        {
                if(SubMenuList[i]&&SubMenuList[i]!=thenowMenu)
                {
                        
                        obj = eval(SubMenuList[i]);
                        
                        if(obj.alphaing)
                        {
                                clearInterval(obj.alphaing);
                        }        

                        obj.alphaing = setInterval("menu_alpha_down("+obj.id+","+alphaStep+")",menuSpeed);
                        
                        obj.style.visibility = "hidden";                
                        
                        eval("tr"+SubMenuList[i]).className = "menutrout";
                                                
                        SubMenuList[i] = null;        
                }
                else
                {
                        if(SubMenuList[i]==thenowMenu)
                        {
                                return;
                        }
                }
        }
        
        NowSubMenu = "";
}




// -----------MainMenuPosition return()------------//

function MMPreturn()
{
        var obj = eval(JustMenuID);
        
        var x = event.clientX;
        var y = event.clientY;
        
        var judgerX = x + obj.offsetWidth;
        var judgerY = y + obj.offsetHeight;

        var px = 0;
        var py = 0;
        
        if(judgerX>document.body.clientWidth)
        {
                px = 2;
        }
        if(judgerY>document.body.clientHeight)
        {
                py = 1;
        }
                
        return (px+py);
}

// -----------MenuPosition return(obj)--------------//

function MPreturn(obj)
{
        var topobj = eval(obj.substring(0,obj.length-2));
        
        var trobj  = eval("tr"+obj);
        
        var x = topobj.style.pixelLeft + topobj.offsetWidth;
        var y = topobj.style.pixelTop  + trobj.offsetTop;

        obj = eval(obj);
        
        var judgerY =  obj.offsetHeight + y;
        var judgerX =  obj.offsetWidth  + x;
        
        var py = 0;
        var px = 0;
        
        if(judgerY>=document.body.clientHeight)
        {
                py = 1;
        }
        
        if(judgerX>= document.body.clientWidth)
        {
                px = 2;
        } 
                        
        return (px+py);
}

// -----------mouseWave()-------------//

function mouseWave()
{
        if(mouseCanSound)
        {
                // theBS.src= "sound/sound.wav";
        }        
}

// ----------- menu_alpha_down -------//

function menu_alpha_down(obj,num)
{
                var obj = eval(obj);
                
                if(obj.filters.Alpha.Opacity > 0 )
                {
                        obj.filters.Alpha.Opacity += -num;
                }        
                else
                {        
                        clearInterval(obj.alphaing);
                        obj.filters.Alpha.Opacity = 0;
                        obj.alphaing = false;                        
                        obj.style.visibility = "hidden";
                }        
}


// ------------ menu_alpha_up --------//

function menu_alpha_up(obj,num)
{
                var obj = eval(obj);
                
                if(obj.filters.Alpha.Opacity<100)
                        obj.filters.Alpha.Opacity += num;
                else
                {        
                        clearInterval(obj.alphaing);
                        obj.filters.Alpha.Opacity = 100;
                        obj.alphaing = false;
                }        
}


// ----------- IE ContextMenu -----------------//

function document.oncontextmenu()
{
        return false;
}


// ----------- IE Mouseup ----------------//
function showMenu()
{
        var ID = arguments[0];
        oID = arguments[1];
        oName = arguments[2];
        oType = arguments[3];
        oParentID = arguments[4];
        oObjectID = arguments[5];
        ooObjectID = arguments[6];

        // event.button==2
        if(event.button==2)
        {
                // HideMenu(0);
                
                closeNow();

                JustMenuID = "Menu_" + ID;
                
                var obj = eval(JustMenuID)
                
                
                        obj.style.visibility = "hidden";
                        
                        
                        if(obj.alphaing)
                        {
                                clearInterval(obj.alphaing);
                        }
                        
                        obj.filters.Alpha.Opacity = 0;
                        
                        var judger = MMPreturn()
                        
                        if(judger==0)
                        {
                                with(obj.style)
                                {
                                        pixelLeft = event.clientX + document.body.scrollLeft;
                                        pixelTop  = event.clientY + document.body.scrollTop;
                                }
                        }
                        if(judger==1)
                        {
                                with(obj.style)
                                {
                                        pixelLeft = event.clientX + document.body.scrollLeft;
                                        pixelTop  = event.clientY - obj.offsetHeight + document.body.scrollTop;
                                }
                        }
                        if(judger==2)
                        {
                                with(obj.style)
                                {
                                        pixelLeft = event.clientX - obj.offsetWidth + document.body.scrollLeft;
                                        pixelTop  = event.clientY + document.body.scrollTop;
                                }
                        }
                        if(judger==3)
                        {
                                with(obj.style)
                                {
                                        pixelLeft = event.clientX - obj.offsetWidth + document.body.scrollLeft;
                                        pixelTop  = event.clientY - obj.offsetHeight + document.body.scrollTop;
                                }
                        }
                        
                        mouseWave();
                                                
                        obj.style.visibility = "visible";
                        
                        obj.alphaing = setInterval("menu_alpha_up("+obj.id+","+alphaStep+")",menuSpeed);

                
                
        }
}

// ---------- IE MouseDown --------------//

function document.onmousedown()
{
        if(event.button==1)
        {
                HideMenu();
                
                var obj = eval(JustMenuID)
                
                if(obj.alphaing)
                {
                        clearInterval(obj.alphaing);
                }
                
                obj.alphaing = setInterval("menu_alpha_down("+obj.id+","+alphaStep+")",menuSpeed);
                
        }
}

function closeNow(){
  if(event){
    mousex = event.clientX;
    mousey = event.clientY;
  }

  HideMenu();
                
  var obj = eval(JustMenuID)
                
  if(obj.alphaing)
  {
          clearInterval(obj.alphaing);
  }
  
  obj.alphaing = setInterval("menu_alpha_down("+obj.id+","+alphaStep+")",menuSpeed);
}

