function requestFn(){
	this.options = {
		"active":['MSXML2.XMLHTTP30.','MSXML2.XMLHTTP','Microsoft.XMLHTTP'],
		"http":getHttp()
	}
	var _this = this;
	function getHttp(){
		if(window.XMLHttpRequest){
			return new XMLHttpRequest();
		}else{
			for(var i=0;i<_this.options['active'].length;i++){
				try{
					return new ActiveXObject(_this.options['active'][i]);
				}catch(e){
					console.log(e);
				}
			}
		}
	}
}
requestFn.prototype.post = function(url,data,callBackFn,async){
	//url		请求地址
	//data		请求数据
	//callBack	回调函数
	//async		异步默认true
	var _this = this;
	if(!async || async == "true"){
		async = true;
	}else{
		async = false;
	}
	var dataStr = "";
	var tempStr = "";
	var i = "";
	/**
	 * 1、判断data的类型是否为JSON形式;
	 * 2、重组字符串，形式如：key=value&key1=value1&key2=value2&.... 
	 */
	if(typeof data !== "string"){
		for(i in data){
			tempStr += i+"="+data[i]+"&";
		}
		dataStr = tempStr.substr(0,(tempStr.legnth-1));
	}else{
		console.log("data typeof is error the data typeof is JSON");
	}
	this.options['http'].onreadystatechange = callBackFunction;
	this.options['http'].open('POST',url,async);
	this.options['http'].send(dataStr);
	function callBackFunction(){
		if(_this.options['http'].readState == 4 && _this.options['http'].status == 200){
			callBackFn.call(_this,_this.options['http'].responseText);
		}else{
			
		}
	}
}
requestFn.prototype.get = function(url,callBackFn,async){
	//url		请求地址
	//callBack	回调函数
	//async		异步默认true
	if(!async || async == "true"){
		async = true;
	}else{
		async = false;
	}
	console.log(this.options['http']);
	console.log(async);
	var _this = this;
	this.options['http'].onreadystatechange = callBackFunction;
	this.options['http'].open('GET',url,async);
	this.options['http'].send();
	function callBackFunction(){
		if(_this.options['http'].readState == 4 && _this.options['http'].status == 200){
			callBackFn.call(_this,_this.options['http'].responseText);
		}else{
			
		}
	}
}


var re = new requestFn();