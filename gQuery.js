/**
 * @param Varg
 * @returns {element}
 * @constructor
 */

function addEvent(el,ev,fn){
    if(typeof el !== null || typeof el !== undefined){
        if(typeof window.addEventListener !== undefined){
             el.addEventListener(ev,function(e){
                fn.call(el);
                 e.preventDefault();
                 e.stopPropagation();
             },false);
         }else{
             el.attachEvent("on"+ev,function(){
                fn.call(el);
                 window.event.cancelBubble = false;
                 window.event.returnValue = true;
             });
         }
    }
}




function GYJQuery(Varg){
    this.elements = [];
	switch(typeof Varg){
		case "function":
			addEvent(window,"load",Varg);
		break;
		case "string":
            switch(Varg.charAt(0)){
                case "#":
                this.elements.push(document.getElementById(Varg.substr(1,parseInt(Varg.length-1))));
                    break;
                case ".":
                    var elementArr = document.getElementsByTagName("*");
                    for(var i=0; i<elementArr.length; i++){
                        if(elementArr[i].className != "" && elementArr[i].className == Varg.substr(1,parseInt(Varg.length-1))){
                            this.elements.push(elementArr[i]);
                        }
                    }
                    break;
                default:
                    this.elements = document.getElementsByTagName(Varg);
                    break;
            }
		break;
		case "object":
			return Varg;
		break;
	}
    return this;
}

/**
 * css方法,如果是一个参数:如果是tring表示属性，获取属性值，如果是json表示设置属性，
 * 如果是两个参数就是设置属性
 * @returns {obj.css.value}
 */
GYJQuery.prototype.css = function(){
    if(arguments.length ==1){
        if(typeof arguments[0] == "string"){
            if(window.getComputedStyle){
                if(isNaN(parseInt(getComputedStyle(this.elements[0],null)[arguments[0]]))){
                    return getComputedStyle(this.elements[0],null)[arguments[0]];
                }else{
                    return parseInt(getComputedStyle(this.elements[0],null)[arguments[0]]);
                }

            }else{
                if(isNaN(parseInt(this.elements[0].currentStyle[arguments[0]]))){
                    return this.elements[0].currentStyle[arguments[0]];
                }else{
                    return parseInt(this.elements[0].currentStyle[arguments[0]]);
                }

            }
        }else if(typeof arguments[0] == "object"){
            for(var i=0; i<this.elements.length; i++){
                var k="";
                for(k in arguments[0]){
                    this.elements[i].style[k] = arguments[0][k];
                }
            }
            return this;
        }
    }else if(arguments.length ==2){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].style[arguments[0]] = arguments[1];
        }
        return this;
    }
}
/**
 * 获取offset值的方法
 * @returns {obj.offsetValue}
 */
GYJQuery.prototype.getoffSetValues = function(){
    switch(arguments[0]){
        case "width":
            return this.elements[0].offsetWidth
            break;
        case "top":
            return this.elements[0].offsetTop;
            break;
        case "height":
            return this.elements[0].offsetHeight;
            break;
        default:
            return this.elements[0].offsetLeft;
            break;
    }
}
/**
 * 获取表单值,如果没有参数表示获取值，如果有参数表示设置值
 * @returns {form.value}
 */
GYJQuery.prototype.val = function(){
    if(arguments.length == 1){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].value = arguments[0];
        }
        return this;
    }else{
        return this.elements[0].value;
    }
}

/**
 * 获取普通元素的内容，如果一个参数表示设置html，如果没有参数表示获取html
 * @returns {obj.html}
 */
GYJQuery.prototype.html = function(){
    if(arguments.length == 1){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].innerHTML = arguments[0];
        }
    }else{
        return this.elements[0].innerHTML;
    }
    return this;
}
/**
 * 获取或设置元素的自定义属性，如果是一个参数是字符串时表示获取指定的属性名称，如果是json表示设置自定义属性，如果是两个参数表示设置自定义属性
 * @returns {obj.attr}
 */
GYJQuery.prototype.attr = function(){
    if(arguments.length == 1){
        //获取属性值
        if(typeof arguments[0] == "string"){
            if(this.elements[0].dateset){
                    return this.elements[0].dataset.ucfirst(arguments[0]);
                }else{
                    return this.elements[0].getAttribute("data-" + arguments[0]);
                }
        }else if(typeof arguments[0] == "object"){//以json形式设置属性值
            for(var i=0; i<this.elements.length; i++){
                if(this.elements[i].dataset){
                    var k="";
                    for(k in arguments[0]){
                        this.elements[i].dataset[ucfirst(k)] = arguments[0][k];
                    }
                }else{
                    var k="";
                    for(k in arguments[0]){
                        this.elements[i].setAttribute(k,arguments[0][k]);
                    }
                }
            }
            return this;
        }
    }else if(arguments.length == 2){
        for(var i=0; i<this.elements.length; i++){
            if(this.elements[i].dataset){
                this.elements[i].dataset[ucfirst(arguments[0])] = arguments[1];
            }else{
                this.elements[i].setAttribute(arguments[0],arguments[1]);
            }
            
        }
        return this;
    }
    
    
    
    
        /**
         *  字符串首字母大写
         *  create 2015-06-11 by bluelifeleer
         *  @param string
         *  return ucfiset string
         *  @email thebuleilfe@163.com
         *  说明：如果属性名是单式直接写，如果属性名是复式则用“－”隔开。
         */
        function ucfirst(str){
            var status = str.indexOf("-");
            var newStr = "";
            if(status>0){
                var strToArr = str.split("-");
                for(var i=1; i<strToArr.length; i++){
                newStr += strToArr[i].charAt(0).toUpperCase()+strToArr[i].substr(1,strToArr[i].length);
                }
                return strToArr[0]+newStr;
            }else{
                return str;
            }
        }
    
    
    
    

}
/**
 * 删除元素的属性，参数至少一个，多个用豆号隔开，
 * @returns {GYJQuery}
 */
GYJQuery.prototype.removeAttr = function(){
    for(var i=0; i<this.elements.length; i++){
        for(var k=0; k<arguments.length; k++){
            this.elements[i].removeAttribute(arguments[k]);
        }
    }
    return this;
}
GYJQuery.prototype.bind = function(){
    
}
/**
 * 简单添加事件，两个参数，第一个为事件，第二个为处理事件的函数
 * @returns {GYJQuery}
 */
GYJQuery.prototype.on = function(){
    for(var i=0; i<this.elements.length; i++){
        addEvent(this.elements[i],arguments[0],arguments[1]);
    }
    return this;
}
/*
 * 添加类名：addClass(classname)
 * pram:className,
 * 多个类名用空格分开,
 * return {GYJQuery}
 */
GYJQuery.prototype.addClass = function(){
    for(var i=0; i<this.elements.length; i++){
         var oldClassName = this.elements[i].className;
         this.elements[i].className = oldClassName + " " + arguments[0];
    }
    return this;
}
/*
* 删除类名removerClass()
*
* */
GYJQuery.prototype.removeClass = function(){
    if(arguments.length == 0){
        for(var i=0; i<this.elements.length; i++){
            this.elements[i].className = "";
        }
    }else if(arguments.length == 1){
        if(typeof arguments[0] == "string"){
            
        }
    }
    return this;
}

/*GYJQuery.prototype.hover = function(){
    
}*/



function GQ(Varg){
	return new GYJQuery(Varg);
}






