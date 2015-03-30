
$(function(){
    // 判断整数value是否等于0 
    $.validator.addMethod("isIntEqZero", function(value, element) { 
         value=parseInt(value);      
         return this.optional(element) || value==0;       
    }, "Integer must equal 0"); 
    
    // 下拉框验证
    $.validator.addMethod("selectNone", function(value, element) {
    	return value == "";
    }, "nothing selected!");
    
    $.validator.addMethod('isBeforeToday', function(value, element){
    	var d1 = new Date(Date.parse(value.replace(/\-/g, "\/")));
    	var d2 = new Date();
    	return d1<=d2;
    }, 'The date should before today');
    
    
    $.validator.addMethod('isAfterToday', function(value, element){
    	var d1 = new Date(Date.parse(value.replace(/\-/g, "\/")));
    	var d2 = new Date();
    	return d1>=d2;
    }, 'The date should after today');
    
    
    $.validator.addMethod('isAdult', function(value, element){
    	var d1 = new Date(Date.parse(value.replace(/\-/g, "\/")));
    	var d2 = new Date();
    	var y= d1.DateDiff('y',d2);
    	return y>=18;
    }, 'Age must be greater than 18');
    
    
    $.validator.addMethod('isAfterDueDate', function(value, element){
    	var settleDate = new Date(Date.parse(value.replace(/\-/g, "\/")));
    	var dueDate = new Date($("#finDueDateAccToCont").val().replace(/\-/g, "\/"));
    	var newDueDate= dueDate.DateAdd('d',30);
    	return dueDate<=settleDate && settleDate<=newDueDate;
    }, 'Expected settlement date must be within 30 days of the due date according to the contract');
    
    
    
});
