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
 
  var txtExpectSettle = $("#txtExpectSettle").val();
  var startDate = $("#startDate").val();
  var bestBuyerAdv = $("#bestBuyerAdv").val();
  var txtToAmount = $("#txtToAmount").val();
  var txtAdvance = $("#txtAdvance").val();
  var txtInterest = $("#txtInterest").val();
  var bestAdvance = $("#bestAdvance").val();
  var bestInterest = $("#bestInterest").val();
  
  var newfinExpPmtDate = StringToDate(txtExpectSettle);
  var newStartDate = StringToDate(startDate);
  var days= newStartDate.DateDiff('d',newfinExpPmtDate);
  
  
  var saccanoffrtsienaatbrtf = txtToAmount*txtAdvance/100*0.015;
  var saccanoffrtsieraasif = txtToAmount*txtAdvance/100*txtInterest/100*[(days-2)/360];
  
  var saccanoffaccaoenaatbrtf = txtToAmount*bestAdvance/100*0.015;
  var saccanoffaccaoeraasif = txtToAmount*bestAdvance/100*bestInterest/100*[(days-2)/360];
  
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
	  
	  var finInvAmountRead=decimalInputFormatFunc(txtToAmount);
	
	//s_accept_an_offer.jsp
	$("#saccanoffrtsienaatbr").html("<b>- Expected net advance amount to be received: "+decimalInputFormatFuncForSum(saccanoffrtsienaatbr)+" VND<br /></b> Invoice amount * Accepted advance (%) - Transaction fee = "+finInvAmountRead+" * "+txtAdvance+"% - "+decimalInputFormatFuncForSum(saccanoffrtsienaatbrtf)+" = "+decimalInputFormatFuncForSum(saccanoffrtsienaatbr)+" VND");
	$("#saccanoffrtsieraas").html("<b>- Expected receivable amount after settlement *<br /></b> Settled amount - Invoice amount * Accepted advance (%) - Interest fee** = "+finInvAmountRead+" - "+finInvAmountRead+" * "+txtAdvance+"% - "+decimalInputFormatFuncForSum(saccanoffrtsieraasif)+" = "+decimalInputFormatFuncForSum(saccanoffrtsieraas)+" VND");
	
	$("#saccanoffaccaoenaatbr").html("<b>- Expected net advance amount to be received: "+decimalInputFormatFuncForSum(saccanoffaccaoenaatbr)+" VND<br /></b> Invoice amount * Accepted advance (%) - Transaction fee = "+finInvAmountRead+" * "+bestAdvance+"% - "+decimalInputFormatFuncForSum(saccanoffaccaoenaatbrtf)+" = "+decimalInputFormatFuncForSum(saccanoffaccaoenaatbr)+" VND");
	$("#saccanoffaccaoeraas").html("<b>- Expected receivable amount after settlement *<br /></b> Settled amount - Invoice amount * Accepted advance (%) - Interest fee** = "+finInvAmountRead+" - "+finInvAmountRead+" * "+bestAdvance+"% - "+decimalInputFormatFuncForSum(saccanoffaccaoeraasif)+" = "+decimalInputFormatFuncForSum(saccanoffaccaoeraas)+" VND");
	
	$(idTrigger).addClass("if_show");
    $(idTrigger).html(lessText);
    $(idDetail).css('display','block');
  }
  return false;
}
