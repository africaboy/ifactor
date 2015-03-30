/*选择角色相关*/
   function handleSelect(){
     var url = context + "/system/tree.do?method=selectgroupall&type=checkbox";
     dialog(url,true,"组织机构",300,400);
   }
   
    /*选择用户所属组后返回值设置*/
   function responseResult(ids,names,types){
     document.form1.ids.value = ids;
     var n = names.split(",");
     var d = ids.split(",");
     var txt = "";
     for(var i=0;i<n.length;i++){
         txt += "<div id='"+d[i]+"' class=\"ndiv\" dtype='roleobj' dname='"+n[i]+"'>" + n[i] + "&nbsp;<span title='删除' style='cursor:hand;' onclick=\"javascript:handleRemove('"+d[i]+"');\">删除</span>;</div>";
     }
     document.getElementById("names").innerHTML = txt;
     closeDialog();
   }
   
   /*删除角色相关设置*/
   function handleRemove(id){
      document.getElementById(id).removeNode(true);
   }
   
   function handleType(thizz){
      if(thizz.checked && thizz.value == "1"){
         document.getElementById("names").style.display = "block";
         document.getElementById("vir").style.display = "none";
      }else if(thizz.checked && thizz.value == "0"){
         document.getElementById("vir").style.display = "block";
         document.getElementById("names").style.display = "none";
      }
   }
   
   function handleSubmit(){
     if(isblank(document.form1.rname)){
        alert("请定义角色名称");
        document.form1.rname.focus();
     }else{
        var rad = document.form1.rrv;
        if(rad[0].checked && document.getElementById("names").innerHTML == ""){
           alert("请选择角色包含的组或用户");
        }else if(rad[1].checked && isblank(document.form1.rrvrating)){
           alert("请设置相关级别");
        }else if(confirm("确定保存")){
           if(rad[0].checked){
              initObj();
           }
           /*if(document.form1.raccede.checked){
              createHidden("raccede","1");
           }*/
           document.form1.submit();
        }
     }
   }
   
   function initObj(){
     var countO = "";
     var ro = document.getElementsByTagName("DIV");
     var rid = document.getElementById("rid")? document.getElementById("rid").value:"";
     for(var i=0;i<ro.length;i++){
        if(ro[i].getAttribute("dtype") == "roleobj"){
           var id = ro[i].id;
           var name = ro[i].getAttribute("dname")
           createHidden("rid_" + i,rid);
           createHidden("oname_" + i,name);
           if(id.indexOf("g") > -1){
              createHidden("oid_" + i,id.replace("g",""));
              createHidden("otype_" + i,"g");
           }else if(id.indexOf("u") > -1){
              createHidden("oid_" + i,id.replace("u",""));
              createHidden("otype_" + i,"u");
           }
           countO += i + ",";
        }
     }
     
     createHidden("countO",countO.substring(0,countO.length -1));
   }
   
   function handleDelete(){
     if(confirm("确定删除")){
        document.form1.action = context + "/system/role.do?method=delete";
        document.form1.submit();
     }
   }