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
  var advanceSelect = $("#advanceSelect").val();
  var interestSelect = $("#interestSelect").val();
  var txtTMT = $("#txtTMT").val();
  
  var rtsitatbttf = txtToAmount*readyToSellAdv/100*0.005;
  var rtsietraasif = txtToAmount*readyToSellAdv/100*readyToSellInt/100*(txtTMT-2)/360;
  
  var maotatbttf = txtToAmount*advanceSelect/100*0.005;
  var maoetraasif = txtToAmount*advanceSelect/100*interestSelect/100*(txtTMT-2)/360;
  
  var rtsitatbt = txtToAmount*readyToSellAdv/100+rtsitatbttf;
  var rtsietraas = txtToAmount*readyToSellAdv/100+rtsietraasif;
  var rtsienras = rtsietraasif-rtsitatbttf;
  
  var maotatbt = txtToAmount*advanceSelect/100+maotatbttf;
  var maoetraas = txtToAmount*advanceSelect/100+maoetraasif;
  var maoenras = maoetraasif-maotatbttf;
  
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
    
	//b_make_offer.jsp
	$("#rtsitatbt").html("Total amount to be transferred: "+decimalInputFormatFuncForSum(rtsitatbt)+" VND<br />Invoice amount * Accepted advance (%)+ Transaction fees = "+decimalInputFormatFuncForSum(txtToAmount)+" * "+readyToSellAdv+"% + "+decimalInputFormatFuncForSum(rtsitatbttf)+" = "+decimalInputFormatFuncForSum(rtsitatbt)+" VND");
	$("#rtsietraas").html("Expected total receivable amount after settlement: "+decimalInputFormatFuncForSum(rtsietraas)+" VND *<br /> Invoice amount * Accepted advance (%) + Interest fee ** = "+decimalInputFormatFuncForSum(txtToAmount)+" * "+readyToSellAdv+"% + "+decimalInputFormatFuncForSum(rtsietraasif)+" = "+decimalInputFormatFuncForSum(rtsietraas)+" VND");
	$("#rtsienras").html("Expected net return after settlement: "+decimalInputFormatFuncForSum(rtsienras)+" VND *<br />Interest fee** - Transaction fees = "+decimalInputFormatFuncForSum(rtsietraasif)+" - "+decimalInputFormatFuncForSum(rtsitatbttf)+" = "+decimalInputFormatFuncForSum(rtsienras)+" VND");
	
	$("#maotatbt").html("Total amount to be transferred: "+decimalInputFormatFuncForSum(maotatbt)+" VND<br /> Invoice amount * Accepted advance (%)+ Transaction fees = "+decimalInputFormatFuncForSum(txtToAmount)+" * "+advanceSelect+"% + "+decimalInputFormatFuncForSum(maotatbttf)+" = "+decimalInputFormatFuncForSum(maotatbt)+" VND");
	$("#maoetraas").html("Expected total receivable amount after settlement: "+decimalInputFormatFuncForSum(maoetraas)+" VND *<br /> Invoice amount * Accepted advance (%) + Interest fee ** = "+txtToAmount+" * "+advanceSelect+"% + "+maoetraasif+" = "+maoetraas+" VND");
	$("#maoenras").html("Expected net return after settlement: "+decimalInputFormatFuncForSum(maoenras)+" VND *<br /> Interest fee** - Transaction fees = "+decimalInputFormatFuncForSum(maoetraasif)+" - "+decimalInputFormatFuncForSum(maotatbttf)+" = "+decimalInputFormatFuncForSum(maoenras)+" VND");
	
	$(idTrigger).addClass("if_show");
    $(idTrigger).html(lessText);
    $(idDetail).css('display','block');
  }
  return false;
}
