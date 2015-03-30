$(document).ready(function () {
  var divs = $(".if_filter_hidden");
  for( var i=0; i<divs.length; i++ ){
    $(divs[i]).css('display','none');
  }
  /*$(".if_toggle").click(function () {
    moreText = '<a href="#" class="if_toggle">More&nbsp;&nbsp;<i class="icon-arrow-down"></i></a>';
    lessText = '<a href="#" class="if_toggle">Less&nbsp;&nbsp;<i class="icon-arrow-up"></i></a>';
    if ($(this).hasClass("if_show")) {
      $(this).removeClass("if_show");
      $(this).html(lessText);
    } else {
      $(this).addClass("if_show");
      $(this).html(moreText);
    }
    toggle(".if_filter_hidden");
    return false;
  });*/

  $(".if-tooltip a").tooltip({
    placement : 'top'
  });
  $(".if-tooltip td").tooltip({
    placement : 'top'
  });
});

function toggle(moreText, lessText, showClass, hideClass){
  moreText =  moreText+ '<i class="icon-arrow-down"></i>';
  lessText =  lessText+ '<i class="icon-arrow-up"></i>';
  if ($("#toggle_link").hasClass("if_show")) {
    $("#toggle_link").removeClass("if_show");
    $("#toggle_link").html(lessText);
  } else {
    $("#toggle_link").addClass("if_show");
    $("#toggle_link").html(moreText);
  }
  toggle1(".if_filter_hidden",showClass, hideClass);
  return false;
}

function toggle1(className, showClass, hideClass) {
  var divs = $(className);
  var isShow = true;
  for( var i=0; i<divs.length; i++ ){
    if($(divs[i]).hasClass("if_show")){
      $(divs[i]).removeClass("if_show");
      $(divs[i]).css('display','none');
      isShow = false;
    }else{
      $(divs[i]).removeClass("if_show");
      $(divs[i]).addClass("if_show");
      $(divs[i]).css('display','block');
      isShow = true;
    }
    if(isShow){
      $("#ifFilterButton").attr("class",hideClass);
    }else{
      $("#ifFilterButton").attr("class",showClass);
    }
  }
}

/**
 * update luoxunda 2015/01/04
 * 
 * @param moreText
 * @param lessText
 * @param idTrigger
 * @param idDetail
 * @returns {Boolean}
 */
function toggleDetail(moreText, lessText, idTrigger, idDetail){
 
  var finInvAmount = $("#finInvAmount").val();
  var readyToSellAdv = $("#readyToSellAdv").val();
  var readyToSellInt = $("#readyToSellInt").val();
  var finExpPmtDate = $("#finExpPmtDate").val();
  var bestBuyerAdv = $("#bestBuyerAdv").val();
  var txtToAmount = $("#txtToAmount").val();
  var advanceSelect = $("#advanceSelect").val();
  var readyToSellAdv1 = $("#readyToSellAdv1").val();
  var youoffadvance = $("#youoffadvance").val();
  var newoffadvanceSelect = $("#newoffadvanceSelect").val();
  var txtAdvance = $("#txtAdvance").val();
  var bestAdvance = $("#bestAdvance").val();
  
  /*var newfinExpPmtDate = StringToDate(finExpPmtDate);
  var timeDate = new Date();
  var days= timeDate.DateDiff('d',newfinExpPmtDate);*/
  
  var fee = finInvAmount*readyToSellAdv/100*0.015;
  var intfee = finInvAmount*readyToSellAdv/100*readyToSellInt/100*[(362-2)/360];
  var rtsitatbttf = txtToAmount*readyToSellAdv/100*0.005;
  var rtsietraasif = txtToAmount*readyToSellAdv/100*0.015;
  var maotatbttf = txtToAmount*advanceSelect/100*0.005;
  var maoetraasif = txtToAmount*advanceSelect/100*0.015;
  var newoffrtsitatbttf = txtToAmount*readyToSellAdv1/100*0.005;
  var newoffrtsietraasif = txtToAmount*readyToSellAdv1/100*0.015;
  var newoffyotatbttf = txtToAmount*youoffadvance/100*0.005;
  var newoffyoetraasif = txtToAmount*youoffadvance/100*0.015;
  var newoffmaotatbttf = txtToAmount*newoffadvanceSelect/100*0.005;
  var newoffmaoetraasif = txtToAmount*newoffadvanceSelect/100*0.015;
  var saccanoffrtsienaatbrtf = txtToAmount*txtAdvance/100*0.005;
  var saccanoffrtsieraasif = txtToAmount*txtAdvance/100*0.015;
  var saccanoffaccaoenaatbrtf = txtToAmount*bestAdvance/100*0.005;
  var saccanoffaccaoeraasif = txtToAmount*bestAdvance/100*0.015;
  
  var sum = finInvAmount*readyToSellAdv/100-fee;
  var intsum = finInvAmount-finInvAmount*readyToSellAdv/100-intfee;
  var rtsitatbt = txtToAmount*readyToSellAdv/100+rtsitatbttf;
  var rtsietraas = txtToAmount*readyToSellAdv/100+rtsietraasif;
  var rtsienras = rtsietraasif-rtsitatbttf;
  var maotatbt = txtToAmount*advanceSelect/100+maotatbttf;
  var maoetraas = txtToAmount*advanceSelect/100+maoetraasif;
  var maoenras = maoetraasif-maotatbttf;
  var newoffrtsitatbt = txtToAmount*readyToSellAdv1/100+newoffrtsitatbttf;
  var newoffrtsietraas = txtToAmount*readyToSellAdv1/100+newoffrtsietraasif;
  var newoffrtsienras = newoffrtsietraasif-newoffrtsitatbttf;
  var newoffyotatbt = txtToAmount*youoffadvance/100+newoffyotatbttf;
  var newoffyoetraas = txtToAmount*youoffadvance/100+newoffyoetraasif;
  var newoffyoenras = newoffyoetraasif-newoffyotatbttf;
  var newoffmaotatbt = txtToAmount*newoffadvanceSelect/100+newoffmaotatbttf;
  var newoffmaoetraas = txtToAmount*newoffadvanceSelect/100+newoffmaoetraasif;
  var newoffmaoenras = newoffmaoetraasif-newoffmaotatbttf;
  var saccanoffrtsienaatbr = txtToAmount*txtAdvance/100-saccanoffrtsienaatbrtf;
  var saccanoffrtsieraas = txtToAmount-txtToAmount*txtAdvance/100-saccanoffrtsieraasif;
  var saccanoffaccaoenaatbr = txtToAmount*bestAdvance/100-saccanoffaccaoenaatbrtf;
  var saccanoffaccaoeraas = txtToAmount-txtToAmount*bestAdvance/100-saccanoffaccaoeraasif;
  
  console.log(moreText);
  moreText =  moreText+ '<i class="icon-arrow-down"></i>';
  lessText =  lessText+ '<i class="icon-arrow-up"></i>';
  if ($(idTrigger).hasClass("if_show")) {
    $(idTrigger).removeClass("if_show");
    $(idTrigger).html(moreText);
    $(idDetail).css('display','none');
  } else {
	  if($("#readyToSellAdv") != null && $("#readyToSellAdv") != ""){
		  $("#readyToSellAdv");
	  } else {
		  $("#bestBuyerAdv");
	  }
	//s_new_invoice_upload.jsp
	// $("#showbuyer").html("<b>- Expected net advance amount to be received: "+sum+" VND<br /></b> Invoice amount * Accepted advance (%) - Transaction fee = "+finInvAmount+" * "+readyToSellAdv+"% - "+finInvAmount+" * "+readyToSellAdv+"% * 1.5% = "+sum+" VND");
	// $("#showseller").html("<b>- Expected receivable amount after settlement *<br /></b> Settled amount - Invoice amount * Accepted advance (%) - Interest fee** = "+finInvAmount+" - "+finInvAmount+" * "+readyToSellAdv+"% - "+finInvAmount+" * "+readyToSellAdv+"% * "+readyToSellInt+"% * [("+days+" - 2) / 360 days] = "+intsum+" VND");
    
	//b_make_offer.jsp
	$("#rtsitatbt").html("Total amount to be transferred: "+rtsitatbt+" VND<br />Invoice amount * Accepted advance (%)+ Transaction fees = "+txtToAmount+" * "+readyToSellAdv+"% + "+rtsitatbttf+" = "+rtsitatbt+" VND");
	$("#rtsietraas").html("Expected total receivable amount after settlement: "+rtsietraas+" VND *<br /> Invoice amount * Accepted advance (%) + Interest fee ** = "+txtToAmount+" * "+readyToSellAdv+"% + "+rtsietraasif+" = "+rtsietraas+" VND");
	$("#rtsienras").html("Expected net return after settlement: "+rtsienras+" VND *<br />Interest fee** - Transaction fees = "+rtsietraasif+" - "+rtsitatbttf+" = "+rtsienras+" VND");
	
	$("#maotatbt").html("Total amount to be transferred: "+maotatbt+" VND<br /> Invoice amount * Accepted advance (%)+ Transaction fees = "+txtToAmount+" * "+advanceSelect+"% + "+maotatbttf+" = "+maotatbt+" VND");
	$("#maoetraas").html("Expected total receivable amount after settlement: "+maoetraas+" VND *<br /> Invoice amount * Accepted advance (%) + Interest fee ** = "+txtToAmount+" * "+advanceSelect+"% + "+maoetraasif+" = "+maoetraas+" VND");
	$("#maoenras").html("Expected net return after settlement: "+maoenras+" VND *<br /> Interest fee** - Transaction fees = "+maoetraasif+" - "+maotatbttf+" = "+maoenras+" VND");
	
	//b_make_new_offer.jsp
	$("#newoffrtsitatbt").html("Total amount to be transferred: "+newoffrtsitatbt+" VND<br /> Invoice amount * Accepted advance (%)+ Transaction fees = "+txtToAmount+" * "+readyToSellAdv1+"% + "+newoffrtsitatbttf+" = "+newoffrtsitatbt+" VND");
	$("#newoffrtsietraas").html("Expected total receivable amount after settlement: "+newoffrtsietraas+" *<br /> Invoice amount * Accepted advance (%) + Interest fee ** = "+txtToAmount+" * "+readyToSellAdv1+"% + "+newoffrtsietraasif+" = "+newoffrtsietraas+" VND");
	$("#newoffrtsienras").html("Expected net return after settlement: "+newoffrtsienras+" VND *<br /> Interest fee** - Transaction fees = "+newoffrtsietraasif+" - "+newoffrtsitatbttf+" = "+newoffrtsienras+" VND");
	
	$("#newoffyotatbt").html("Total amount to be transferred: "+newoffyotatbt+" VND<br /> Invoice amount * Accepted advance (%)+ Transaction fees = "+txtToAmount+" * "+youoffadvance+"% + "+newoffyotatbttf+" = "+newoffyotatbt+" VND");
	$("#newoffyoetraas").html("Expected total receivable amount after settlement: "+newoffyoetraas+" VND *<br /> Invoice amount * Accepted advance (%) + Interest fee ** = "+txtToAmount+" * "+youoffadvance+"% + "+newoffyoetraasif+" = "+newoffyoetraas+" VND");
	$("#newoffyoenras").html("Expected net return after settlement: "+newoffyoenras+" VND *<br /> Interest fee** - Transaction fees = "+newoffyoetraasif+" - "+newoffyotatbttf+" = "+newoffyoenras+" VND");
	
	$("#newoffmaotatbt").html("Total amount to be transferred: "+newoffmaotatbt+" VND<br /> Invoice amount * Accepted advance (%)+ Transaction fees = "+txtToAmount+" * "+newoffadvanceSelect+"% + "+newoffmaotatbttf+" = "+newoffmaotatbt+" VND");
	$("#newoffmaoetraas").html("Expected total receivable amount after settlement: "+newoffmaoetraas+" VND *<br /> Invoice amount * Accepted advance (%) + Interest fee ** = "+txtToAmount+" * "+newoffadvanceSelect+"% + "+newoffmaoetraasif+" = "+newoffmaoetraas+" VND");
	$("#newoffmaoenras").html("Expected net return after settlement: "+newoffmaoenras+" VND *<br /> Interest fee** - Transaction fees = "+newoffmaoetraasif+" - "+newoffmaotatbttf+" = "+newoffmaoenras+" VND");
	
	//s_accept_an_offer.jsp
	$("#saccanoffrtsienaatbr").html("<b>- Expected net advance amount to be received: "+saccanoffrtsienaatbr+" VND<br /></b> Invoice amount * Accepted advance (%) - Transaction fee = "+txtToAmount+" * "+txtAdvance+" - "+saccanoffrtsienaatbrtf+" = "+saccanoffrtsienaatbr+" VND");
	$("#saccanoffrtsieraas").html("<b>- Expected receivable amount after settlement *<br /></b> Settled amount - Invoice amount * Accepted advance (%) - Interest fee** = "+txtToAmount+" - "+txtToAmount+" * "+txtAdvance+" - "+saccanoffrtsieraasif+" = "+saccanoffrtsieraas+" VND");
	
	$("#saccanoffaccaoenaatbr").html("<b>- Expected net advance amount to be received: "+saccanoffaccaoenaatbr+" VND<br /></b> Invoice amount * Accepted advance (%) - Transaction fee = "+txtToAmount+" * "+bestAdvance+" - "+saccanoffaccaoenaatbrtf+" = "+saccanoffaccaoenaatbr+" VND");
	$("#saccanoffaccaoeraas").html("<b>- Expected receivable amount after settlement *<br /></b> Settled amount - Invoice amount * Accepted advance (%) - Interest fee** = "+txtToAmount+" - "+txtToAmount+" * "+bestAdvance+" - "+saccanoffaccaoeraasif+" = "+saccanoffaccaoeraas+" VND");
	
	$(idTrigger).addClass("if_show");
    $(idTrigger).html(lessText);
    $(idDetail).css('display','block');
  }
  return false;
}

function realSysTime(){ 
	var now=new Date(); //��缓Date瀵硅薄 
	var year=now.getFullYear(); //�峰�骞翠唤 
	var month=now.getMonth(); //�峰���唤 
	var date=now.getDate(); //�峰��ユ�
	
	month=month+1; 
	var time=month+"/"+date+"/ "+year;
	
}
