function RandomStringUtils(){
	this.jsjava_class="jsorg.apache.commons.lang.RandomStringUtils";
}

/**
 * Creates a random string whose length is the number of characters specified.
 * @param count the length of random string to create
 * @param letters(boolean) if true, generated string will include alphabetic characters
 * @param numbers(boolean) if true, generated string will include numeric characters 
 */
RandomStringUtils.random=function(count,letters,numbers){
	if(isNaN(count)){
		return;
	}
	if(count<0){
		return;
	}
	if(count==0){
		return "";
	}
	var minAlpha="a".charCodeAt(0);
	var maxAlpha="z".charCodeAt(0);
	var alphas=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	var digits=["0","1","2","3","4","5","6","7","8","9"];
	if(!letters&&numbers){
		var str="";
		for(var i=0;i<count;i++){
			str+=digits[Math.floor(Math.random()*10)];
		}
		return str;
	}
	if(letters&&!numbers){
		var str="";
		for(var i=0;i<count;i++){
			str+=alphas[Math.floor(Math.random()*26)];
		}
		return str;
	}
	if(letters&&numbers||!letters&&!numbers){
		var str="";
		for(var i=0;i<count;i++){
			var r=Math.floor(Math.random()*2);
			if(r==0){
				str+=alphas[Math.floor(Math.random()*26)];
			}else if(r==1){
				str+=digits[Math.floor(Math.random()*10)];
			}
		}
		return str;
	}
	return "";
};

/**
 * Creates a random string whose length is the number of characters specified.
 * @param count
 */
RandomStringUtils.randomAlphabetic=function(count){
	return RandomStringUtils.random(count,true,false);
};

/**
 * Creates a random string whose length is the number of characters specified.
 * @param count
 */
RandomStringUtils.randomAlphanumeric=function(count){
	return RandomStringUtils.random(count,true,true);
};

/**
 * Creates a random string whose length is the number of characters specified.
 * @param count
 */
RandomStringUtils.randomNumeric=function(count){
	return RandomStringUtils.random(count,false,true);
};