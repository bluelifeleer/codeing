/**
 *	@fn_name browserStorage()
 *	@param string:type 	要设置的类型，有：session(sessionStorage),local(localStorage),cookie(cookie)，默认为cookie可以不写;
 *	@using var oStorage = new browserStorage(type);
 *	@set oStorage.set(key,value);	//设置
 *	@get oStorage.get(key);			//获取
 *	@remove oStorage.remove(key);	//删除
 *	@getAll	oStorage.getAll();		//获取所有
 *	@clear oStorage.clear()			//清除所有
 *	@auther bluelifelee
 *	@email thebulelife@163.com
 *	@QQ	703294267
 *	@phone 15167167331
 */




function browserStorage(type){
	this.storage = null;
	this.isCookie = false;
	switch(type){
		case "session":
			if(window.sessionStorage){
				this.storage = window.sessionStorage;
				this.isCookie = false;
			}else{
				this.storage = document.cookie;
				this.isCookie = true;
			}
		break;
		case "local":
			if(window.sessionStorage){
				this.storage = window.localStorage;
				this.isCookie = false;
			}else{
				this.storage = document.cookie;
				this.isCookie = true;
			}
		break;
		default:
			this.storage = document.cookie;
			this.isCookie = true;
		break;
	}
	return this;
}

browserStorage.prototype.set = function(key,value){
	if(!this.isCookie){
		this.storage.setItem(key,value);
	}else{
		var day = 7;
		var date = new Date();
		date.setTime(date.getTime()+day*(1000*60*60*24));
		this.storage = key+"="+value+"; expires="+date.toGMTString();
		//console.log(key+"="+value+"; expires="+date.toGMTString());
	}
}
browserStorage.prototype.get = function(key){
	if(!this.isCookie){
		return this.storage.getItem(key);
	}else{
		var temp = "";
		var jsonStr = "";
		var strToArr = this.storage.split(' ');
		for(var i=0; i<strToArr.length; i++){
			temp+= strToArr[i].substr(0,strToArr[i].length-1).replace(/=/,'":"')+'","';
		}
		jsonStr = '{"'+temp.substr(0,temp.length-2)+"}";
		jsonStrToObject = eval("("+jsonStr+")");
		return jsonStrToObject[key];

	}
	
}
browserStorage.prototype.remove = function(key){
	if(!this.isCookie){
		this.storage.removeItem(key);
	}else{
		var temp = "";
		var jsonStr = "";
		var strToArr = this.storage.split(' ');
		for(var i=0; i<strToArr.length; i++){
			temp+= strToArr[i].substr(0,strToArr[i].length-1).replace(/=/,'":"')+'","';
		}
		jsonStr = '{"'+temp.substr(0,temp.length-2)+"}";
		jsonStrToObject = eval("("+jsonStr+")");
		//return jsonStrToObject[key];
		delete jsonStrToObject[key];
		var j=0;
		var jsonToStr = "";
		for(j in jsonStrToObject){
			jsonToStr+=j+"="+jsonToStr[j]+"; ";
		}
		var day = 7;
		var date = new Date();
		date.setTime(date.getTime()+day*(1000*60*60*24));
		this.storage = jsonToStr+"expires="+date.toGMTString();
		//console.log(jsonToStr+"expires="+date.toGMTString());
	}
	
}
browserStorage.prototype.getAll = function(){
	if(!this.isCookie){
		return this.storage;
	}else{
		var temp = "";
		var jsonStr = "";
		var strToArr = this.storage.split(' ');
		for(var i=0; i<strToArr.length; i++){
			temp+= strToArr[i].substr(0,strToArr[i].length-1).replace(/=/,'":"')+'","';
		}
		jsonStr = '{"'+temp.substr(0,temp.length-2)+"}";
		jsonStrToObject = eval("("+jsonStr+")");
		return jsonStrToObject;
	}
	
}
browserStorage.prototype.clear = function(){
	if(!this.isCookie){
		this.storage.clear();
	}else{
		this.storage = "";
	}
	
}
