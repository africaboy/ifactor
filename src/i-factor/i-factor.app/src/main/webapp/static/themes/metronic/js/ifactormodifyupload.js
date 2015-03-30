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
  var readyToSellAdv = $("#readyToSellAdvRead").val();
  var readyToSellInt = $("#readyToSellIntRead").val();
  var finExpPmtDate = $("#finExpPmtDateRead").val();
  
  var newfinExpPmtDate = StringToDate(finExpPmtDate);
  var timeDate = new Date();
  var days= timeDate.DateDiff('d',newfinExpPmtDate);
  
  var fee = finInvAmount*readyToSellAdv/100*0.015;
  var intfee = finInvAmount*readyToSellAdv/100*readyToSellInt/100*[(days-2)/360];
  
  var sum = finInvAmount*readyToSellAdv/100-fee;
  var intsum = finInvAmount-finInvAmount*readyToSellAdv/100-intfee;
  
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
	  
	  var finInvAmountRead=decimalInputFormatFunc(finInvAmount);
	  
	//s_modify_invoice.jsp
	$("#showbuyer").html("<b>- Expected net advance amount to be received: "+decimalInputFormatFuncForSum(sum)+" VND<br /></b> Invoice amount * Accepted advance (%) - Transaction fee = "+finInvAmountRead+" * "+readyToSellAdv+"% - "+finInvAmountRead+" * "+readyToSellAdv+"% * 1.5% = "+decimalInputFormatFuncForSum(sum)+" VND");
	$("#showseller").html("<b>- Expected receivable amount after settlement *<br /></b> Settled amount - Invoice amount * Accepted advance (%) - Interest fee** = "+finInvAmountRead+" - "+finInvAmountRead+" * "+readyToSellAdv+"% - "+finInvAmountRead+" * "+readyToSellAdv+"% * "+readyToSellInt+"% * [("+days+" - 2) / 360 days] = "+decimalInputFormatFuncForSum(intsum)+" VND");
    
	$(idTrigger).addClass("if_show");
    $(idTrigger).html(lessText);
    $(idDetail).css('display','block');
  }
  return false;
}
