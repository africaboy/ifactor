   /*当前正在选择角色授权div的id*/
   var nowselect = "";
   
   /*选择授权角色*/
   function handleSelect(thizz){
     nowselect = thizz.id;
     var url = context + "/system/role.do?method=selectlist&type=checkbox";
     top.dialog(url,true,"授权角色",500,300);
   }
   
   /*删除角色授权角色*/
   function handleRemove(id){
      document.getElementById(id).removeNode(true);
   }
   
   function setParameter(ids,names){
      document.form1.ids.value = ids;
      var n = names.split(",");
      var d = ids.split(",");
      var txt = "";
      for(var i=0;i<n.length;i++){
          txt += "<div id='"+nowselect+"_role_"+d[i]+"' dtype='roleobj' dname='"+n[i]+"'>" + n[i] + "&nbsp;<span title='删除' style='cursor:hand;' onclick=\"javascript:handleRemove('"+nowselect+"_role_"+d[i]+"');\">X</span>;</div>";
      }
      document.getElementById(nowselect).innerHTML = txt;
   }
   
   function handleSubmit(){
      if(isblank(document.form1.mname)){
         alert("请定义模块名称");
      }else if(countMenu() && confirm("确定提交")){
         document.form1.submit();
      }
   }
   
   function countMenu(){
      var rnt = false;
      var countMN = "";
      
      for(var i=0;i<DragContainer1.childNodes.length;i++){
         /*ID of div*/
         var oid = DragContainer1.childNodes[i].id;
         /*ID of item*/
         oid = oid.substring(oid.indexOf("_")+1,oid.length);
        
         /*sort of item*/
         createHidden("mnsort_" + oid,i);
         createHidden("mnpid_" + oid,"0");

         countMN += oid + ",";
	  }

	  if(countMN != ""){
	     createHidden("countMN",countMN.substring(0,countMN.length-1));
	     rnt = true;
	  }else if(isblank(document.form1.murl)){
	     alert("请定义模块菜单");
	  }else{
	     rnt = true;
	  }
	  
	  return rnt;
   }
   
   function addMenu(pid){
      window.location.href = context + "/system/module.do?method=addmenu&id=" + pid;
   }
   
   function countChildMenu(){
      var rnt = false;
      var countMN = "";
      
      for(var i=0;i<DragContainer1.childNodes.length;i++){
         /*ID of div*/
         var oid = DragContainer1.childNodes[i].id;
         /*ID of item*/
         oid = oid.substring(oid.indexOf("_")+1,oid.length);
        
         /*sort of item*/
         createHidden("mnsort_" + oid,i);
         createHidden("mnpid_" + oid,document.form1.mnpid.value);
         createHidden("mid_" + oid,document.form1.moduleid.value);

         countMN += oid + ",";
	  }

	  if(countMN != ""){
	     createHidden("countMN",countMN.substring(0,countMN.length-1));
	     rnt = true;
	  }else{
	     alert("请定义子菜单");
	  }
	  
	  return rnt;
   }
   
   function handleSaveMenu(){
      if(countChildMenu() && confirm("确定提交")){
         document.form1.submit();
      }
   }