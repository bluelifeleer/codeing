    /**
     *  兼容的方式以className获取页面中的元素
     *  create 2015-06-11 by bluelifeleer
     *  @param className
     *  return el
     *  @email thebulelife@163.com
     */
    function getElementsByClassName(){
        var obj = null;
        var temp = [];
        if(arguments.length == 1){
            if(document.getElementsByClassName){
                return document.getElementsByClassName(arguments[0]);
            }else{
                var allElements = document.getElementsByTagName("*");
                for(var i=0; i<allElements.length; i++){
                    if(allElements[i].className == arguments[0]){
                        temp.push(allElements[i]);
                    }
                }
                return temp;
            }
        }else{
            if(arguments[0].getElementsByClassName){
                                return arguments[0].getElementsByClassName(arguments[1]);
            }else{
                var allElements = arguments[0].getElementsByTagName("*");
                for(var i=0; i<allElements.length; i++){
                    if(allElements[i].className == arguments[i]){
                        temp.push(allElements[i]);
                    }
                }
                return temp;
            }
        }            
    }



    /**
     *  添加事件
     *  create 2015-06-11 by bluelifeleer
     *  @param element
     *  @param event
     *  @param fn
     *  return null
     *  @email thebulelife@163.com
     */
    function addEvent(el,ev,fn){
        if(el.addEventListener){
            el.addEventListener(ev,function(e){
                fn.call(el);
                e.stopPropagation();
                e.preventDefault();
            },false);
        }else{
            el.attachEvent("on"+ev,function(){
                fn.call(el);
                window.event.cancelBubble = false;
                window.event.returnValue = true;
            });
        }
    }


    /**
     *  为元素添加或获取自定义属性
     *  create 2015-06-11 by bluelifeleer
     *  @fn set attr(el,attrName,attrValue) or set attr(el,{"attrName1":"attrValue1","attrName2":"attrValue2","attrName3":"attrValue3",...})
     *  @fn get attr(el,attrName) attrName:name or margin-left
     *  @param elements
     *  @param attrName
     *  @param attrValue
     *  @param or json;
     *  return getAttrValue or no return;
     *  @email thebulelife@163.com
     *  说明：1.此函数可以设置或获取元素的自定义属性值，如果是两个参数（如果第二个参数是字符串获取属性值，如果第二个参数是json设置属性值），如果是三个参数就是直接设置值。2.如果属性名是单式直接写，如果属性名是复式则用“－”隔开。
     */
    function attr(el,att,value){
        if(arguments.length == 2){
            if(typeof arguments[1] == "string"){
                if(arguments[0].dateset){
                    return arguments[0].dataset.ucfirst(arguments[1]);
                }else{
                    return arguments[0].getAttribute("data-" + arguments[1]);
                }
            }else{
                var i = "";
                for(i in arguments[1]){
                    if(arguments[0].dataset){
                        arguments[0].dataset[ucfirst(i)]= arguments[1][i];
                    }else{
                        arguments[0].setAttribute("data-" + i,arguments[1][i]);
                    }
                }
            }
        }else{

            if(arguments[0].dataset){
                arguments[0].dataset[ucfirst(arguments[1])] = arguments[2];
            }else{
                arguments[0].setAttribute("data-" + arguments[1],arguments[2]);
            }
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





function insertAfter(newNode,oldNode){
    var oParent = oldNode.parentNode;
    if(oldNode == oParent){
        oParent.appendChild(newNode)
    }else{
        oParent.insertBefore(newNode,oldNode.nextSibling);
    }
}





