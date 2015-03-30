var decimalInputFormatFunc = function(str1){
    		if(!str1 || $.trim(str1) == ''){
    			return '';
    		}
    		var str = str1 + "";
    		str = str.split(",").join("");
    		$('#finInvAmount').val(str);
    		if(parseFloat(str)){
    			var value = str += "";
    			var index = str.lastIndexOf(".");
    			var extension = "";
    			if(index >= 0){
    				value = str.substring(0,index);
    				extension = str.substring(index,str.length);
    			}
    			
    			var array = value.split('');
    			value = '';
    			var j = 1;
    			for ( var i = array.length -1; i >= 0 ; i--) {
    				if(i != 0 && array[i-1] != '-' && j%3==0){
    					value = ',' + array[i] + value;
    				}else{
    					value = array[i] + value;
    				}
    				j++;
    			}
    			return value + extension;
    		}
    		return str1;
    	};
    	
    	var decimalInputFormatFuncForSum = function(str1){
    		if(!str1 || $.trim(str1) == ''){
    			return '';
    		}
    		var str = str1 + "";
    		str = str.split(",").join("");
    		if(parseFloat(str)){
    			var value = str += "";
    			var index = str.lastIndexOf(".");
    			var extension = "";
    			if(index >= 0){
    				value = str.substring(0,index);
    				extension = str.substring(index,str.length);
    			}
    			
    			var array = value.split('');
    			value = '';
    			var j = 1;
    			for ( var i = array.length -1; i >= 0 ; i--) {
    				if(i != 0 && array[i-1] != '-' && j%3==0){
    					value = ',' + array[i] + value;
    				}else{
    					value = array[i] + value;
    				}
    				j++;
    			}
    			return value + extension;
    		}
    		return str1;
    	};
    	
    	$('input.numberFormat').each(function(){
    		$(this).bind("keyup",function(event){
    			if((event.keyCode >= 96 && event.keyCode <= 105) 
    					|| (event.keyCode >= 48 && event.keyCode <= 57
    					|| event.keyCode == 8 || event.keyCode == 46)){
    				$(this).val(decimalInputFormatFunc($(this).val()));
    			}
    			
    		});
    		
    	});