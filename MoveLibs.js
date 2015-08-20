charset="utf-8";
	/**
	 * 获取class类元素getElementsByClassName(clssNamae)的重写；
	 * 思路：判断浏览器是否支持document.getElementsByClassName方法；
	 * 如果支持就直接返回document.getElementsByClassName获取的元素，
	 * 如果不支持就先用所有的标签获取元素
	 * 再判断元素的className是否跟要获取的元素的相同如果g一样就添加到一个临时的数组中最后返回这个临时数组；
	 * 需要传入clssNamae
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
	 * 运动函数startMove(el,json,[fn])，支持链式操作
	 * 所需参数：
	 * 		1要运动的物体，
	 *		2要改变的属性、目标值等json形式，
	 *		3当前运动结束时执行的操作，可选；
	 * 时间：2014-11-06 12:00:00
	 * 修改时间：2014-11-14 08:50:00
	 * 作者：李鹏thebuleilfe@163.com
	 */
	function startMove(el,json,fn){

				var iSpeed=null;
				clearInterval(el.timer);
				el.timer=setInterval(function(){
					var attr="";
					//判断是否到达目标点，默认为true
					var isStop=true;

					for(attr in json){
						var styleValue=0;
						//处理透明度，如果是透明度
						if(attr=="opacity"){
							styleValue=parseFloat(getStyleValue(el,attr))*100;//透明度
						}else{
							styleValue=parseInt(getStyleValue(el,attr));//其它属性
						}

						//计算运动的速度
						iSpeed=(json[attr]-styleValue)/8;
						iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);

						//如果当前的值末到达目标点isStop为false;
						if(styleValue!=json[attr]){
							isStop=false;
						}

						if(attr=="opacity"){
							//设置透明度
							el.style.opacity=parseInt(styleValue+iSpeed)/100;
							el.style.filter="alpha(opacity:"+(styleValue+iSpeed)+")";
						}else{
							//设置其它值
							el.style[attr]=parseInt(styleValue+iSpeed)+"px";
						}
					}

					//如果到达目标点，清除定时器
					if(isStop){
						clearInterval(el.timer);
						//如果有传入执行函数就调用
						if(fn){
							fn.call(el);
						}
					}

				},30);

				//获取页面计算后的样式；
				function getStyleValue(el,attr){
					if(el.currentStyle){
						return el.currentStyle[attr];
					}else{
						return getComputedStyle(el,false)[attr];
					}
				}

			}
















	/**
	 * 获取元素计算后的样式值
	 *
	 */
	function getElementStyleValue(el,attr){
		if(el.currentStyle){
			return el.currentStyle[attr];
		}else{
			return getComputedStyle(el,false)[attr];
		}
	}












//添加事件
function MYAddEvent(el,sEvent,fn){
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