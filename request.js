/**
 *	自定义AJAX 
 * 		GET方法:re.get(url,function(result){codeing....},[async],[contentType],[resultType]) 
 * 		POST方法:re.post(url,data,function(result){codeing....},[async],[contentType],[resultType]) 
 * 		注：如果设置resultType时，也应该设置async，contentType，resultType这三个值，如无需设置请用''(空字符串代替)
 *	parameters:
 * 		url:string					//请求地址[必需]
 * 		callBack:function				//请求成功时的回调函数[必需]
 * 		data:json					//POST提交时，数据类型为JSON[当请求为post提交时必需，为get时可选]
 * 		async:boolean					//是否异步，默认(true:异步),可选，否(false:同步)[可选]
 * 		contentType:string				//请求头类型(对提交数据进行编码)，默认('application/x-www-form-urlencoded');[可选]
 * 			值：application/x-www-form-urlencoded	//在发送前编码所有字符（默认）
 *			　　multipart/form-data			//不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。
 *			　　text/plain				//空格转换为 "+" 加号，但不对特殊字符编码。
 * 		resultType:string				//返回值类型，默认(text)，值：text,xml,josn[可选]
 *      return:
 * 		请求成功时返回的数据
 */
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
