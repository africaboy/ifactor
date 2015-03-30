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
 
  var txtToAmount = $("#txtToAmount").val();
  var readyToSellAdv = $("#readyToSellAdv").val();
  var readyToSellInt = $("#readyToSellInt").val();
  var youoffadvance = $("#youoffadvance").val();
  var youoffinterest = $("#youoffinterest").val();
  var advanceSelect = $("#advanceSelect").val();
  var interestSelect = $("#interestSelect").val();
  var txtTMT = $("#txtTMT").val();
  
  var newoffrtsitatbttf = txtToAmount*readyToSellAdv/100*0.005;
  var newoffrtsietraasif = txtToAmount*readyToSellAdv/100*readyToSellInt/100*(txtTMT-2)/360;
  
  var newoffyotatbttf = txtToAmount*youoffadvance/100*0.005;
  var newoffyoetraasif = txtToAmount*youoffadvance/100*youoffinterest/100*(txtTMT-2)/360;
  
  var newoffmaotatbttf = txtToAmount*advanceSelect/100*0.005;
  var newoffmaoetraasif = txtToAmount*advanceSelect/100*interestSelect/100*(txtTMT-2)/360;
  
  var newoffrtsitatbt = txtToAmount*readyToSellAdv/100+newoffrtsitatbttf;
  var newoffrtsietraas = txtToAmount*readyToSellAdv/100+newoffrtsietraasif;
  var newoffrtsienras = newoffrtsietraasif-newoffrtsitatbttf;
  
  var newoffyotatbt = txtToAmount*youoffadvance/100+newoffyotatbttf;
  var newoffyoetraas = txtToAmount*youoffadvance/100+newoffyoetraasif;
  var newoffyoenras = newoffyoetraasif-newoffyotatbttf;
  
  var newoffmaotatbt = txtToAmount*advanceSelect/100+newoffmaotatbttf;
  var newoffmaoetraas = txtToAmount*advanceSelect/100+newoffmaoetraasif;
  var newoffmaoenras = newoffmaoetraasif-newoffmaotatbttf;
  
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
	
	//b_make_new_offer.jsp
	$("#newoffrtsitatbt").html("Total amount to be transferred: "+decimalInputFormatFuncForSum(newoffrtsitatbt)+" VND<br /> Invoice amount * Accepted advance (%)+ Transaction fees = "+decimalInputFormatFuncForSum(txtToAmount)+" * "+readyToSellAdv+"% + "+decimalInputFormatFuncForSum(newoffrtsitatbttf)+" = "+decimalInputFormatFuncForSum(newoffrtsitatbt)+" VND");
	$("#newoffrtsietraas").html("Expected total receivable amount after settlement: "+decimalInputFormatFuncForSum(newoffrtsietraas)+" *<br /> Invoice amount * Accepted advance (%) + Interest fee ** = "+decimalInputFormatFuncForSum(txtToAmount)+" * "+readyToSellAdv+"% + "+decimalInputFormatFuncForSum(newoffrtsietraasif)+" = "+decimalInputFormatFuncForSum(newoffrtsietraas)+" VND");
	$("#newoffrtsienras").html("Expected net return after settlement: "+decimalInputFormatFuncForSum(newoffrtsienras)+" VND *<br /> Interest fee** - Transaction fees = "+decimalInputFormatFuncForSum(newoffrtsietraasif)+" - "+decimalInputFormatFuncForSum(newoffrtsitatbttf)+" = "+decimalInputFormatFuncForSum(newoffrtsienras)+" VND");
	
	$("#newoffyotatbt").html("Total amount to be transferred: "+decimalInputFormatFuncForSum(newoffyotatbt)+" VND<br /> Invoice amount * Accepted advance (%)+ Transaction fees = "+decimalInputFormatFuncForSum(txtToAmount)+" * "+youoffadvance+"% + "+decimalInputFormatFuncForSum(newoffyotatbttf)+" = "+decimalInputFormatFuncForSum(newoffyotatbt)+" VND");
	$("#newoffyoetraas").html("Expected total receivable amount after settlement: "+decimalInputFormatFuncForSum(newoffyoetraas)+" VND *<br /> Invoice amount * Accepted advance (%) + Interest fee ** = "+decimalInputFormatFuncForSum(txtToAmount)+" * "+youoffadvance+"% + "+decimalInputFormatFuncForSum(newoffyoetraasif)+" = "+decimalInputFormatFuncForSum(newoffyoetraas)+" VND");
	$("#newoffyoenras").html("Expected net return after settlement: "+decimalInputFormatFuncForSum(newoffyoenras)+" VND *<br /> Interest fee** - Transaction fees = "+decimalInputFormatFuncForSum(newoffyoetraasif)+" - "+decimalInputFormatFuncForSum(newoffyotatbttf)+" = "+decimalInputFormatFuncForSum(newoffyoenras)+" VND");
	
	$("#newoffmaotatbt").html("Total amount to be transferred: "+decimalInputFormatFuncForSum(newoffmaotatbt)+" VND<br /> Invoice amount * Accepted advance (%)+ Transaction fees = "+decimalInputFormatFuncForSum(txtToAmount)+" * "+advanceSelect+"% + "+decimalInputFormatFuncForSum(newoffmaotatbttf)+" = "+decimalInputFormatFuncForSum(newoffmaotatbt)+" VND");
	$("#newoffmaoetraas").html("Expected total receivable amount after settlement: "+decimalInputFormatFuncForSum(newoffmaoetraas)+" VND *<br /> Invoice amount * Accepted advance (%) + Interest fee ** = "+decimalInputFormatFuncForSum(txtToAmount)+" * "+advanceSelect+"% + "+decimalInputFormatFuncForSum(newoffmaoetraasif)+" = "+decimalInputFormatFuncForSum(newoffmaoetraas)+" VND");
	$("#newoffmaoenras").html("Expected net return after settlement: "+decimalInputFormatFuncForSum(newoffmaoenras)+" VND *<br /> Interest fee** - Transaction fees = "+decimalInputFormatFuncForSum(newoffmaoetraasif)+" - "+decimalInputFormatFuncForSum(newoffmaotatbttf)+" = "+decimalInputFormatFuncForSum(newoffmaoenras)+" VND");
	
	$(idTrigger).addClass("if_show");
    $(idTrigger).html(lessText);
    $(idDetail).css('display','block');
  }
  return false;
}
