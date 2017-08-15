function rot13(str) {
  var codeArr=[];
  for(var i=0;i<str.length;i++){
  		var charcode  = str.charCodeAt(i);
  		codeArr.push(charcode);
  }
  var finalStr='';
  var newcode=null;
  for(var m=0;m<codeArr.length;m++){
  	var code = codeArr[m];
  	
  	if(code>=65 && code<=90){
	  	if((code + 13)>90){
	  		newcode = 65+ (code+13-90)-1;
	  	}
	  	else{
	  		newcode=code+13;
	  	}
  	}
  	else{
  		newcode=code;
  	}
  	finalStr+=String.fromCharCode(newcode);
  	console.log(code,newcode);
  	//console.log(finalStr);
  }
  console.log(finalStr);
  return finalStr;
}

rot13("SERR CVMMN!");  // 你可以修改这一行来测试你的代码