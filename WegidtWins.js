/*
 * @create by brackets
 * @create 2015-06-02 by bluelifeleer
 * @email thebulelife@163.com
 * @function wegidt-windws
 * @param JSON {"width":300,"height":280,"background":"#FF9C08"}
 * @param 
 * @return null
 * @version 0.0.01
 */

function addEvent(el,ev,fn){
    if(el.addEventListener){
        el.addEventListener(ev,function(){
            fn.call(el);
        },false);
    }else{
        el.attachEvent("on"+ev,function(){
            fn.call(el);
        });
    }
}



function getElementsByClassName(arguments){
    var temp = [];
    var allElements = null;
    if(document.getElementsByClassName){
        return document.getElementsByClassName(arguments);
    }else{
        allElements = documnet.getElementsByTagName("*");
        for(var i=0; i<allElements.length; i++){
            if(allElements[i].className == arguments){
                temp.push(allElements[i]);
            }
        }
        return temp;
    }
}



function WegidtWins(paramJson){
    this.winW = document.documentElement.clientWidth || document.body.clientWidth;
    this.winH = document.documentElement.clientHeight || document.body.clientHeight;
    this.winL = document.documentElement.clientLeft || document.body.clientLeft;
    this.winT = document.documentElement.clientTop || document.body.clientTop;
    this.bgColor = paramJson.background;
    this.opacity = paramJson.opacity;
    this.width = paramJson.width;
    this.height = paramJson.height;
    this.maskLayer = null;
    this.mesgLayer = null;
    this.footer = null;
}

WegidtWins.prototype.create = function(title,text){
    var _this = this;
    this.maskLayer = document.createElement("div");
    this.maskLayer.style.width = this.winW + "px";
    this.maskLayer.style.height = this.winH + "px";
    this.maskLayer.style.background = this.bgColor;
    this.maskLayer.style.position = "fixed";
    this.maskLayer.style.left = 0;
    this.maskLayer.style.top = 0;
    this.maskLayer.style.opacity = this.opacity;
    this.maskLayer.style.filter = "alpha(opacity:"+this.opacity*100+")";
    this.maskLayer.style.zIndex = 999;
    document.body.appendChild(this.maskLayer);
    this.mesgLayer = document.createElement("div");
    this.mesgLayer.className = "pop-layer";
    this.mesgLayer.setAttribute("isBig",false);
    this.mesgLayer.style.width = this.width + "px";
    this.mesgLayer.style.height = this.height + "px";
    this.mesgLayer.style.background = "#FFF";
    this.mesgLayer.style.position = "fixed";
    this.mesgLayer.style.left = parseInt((this.winW-this.width)/2) + "px";
    this.mesgLayer.style.top = parseInt((this.winH-this.height)/2) + "px";
    this.mesgLayer.style.zIndex = 1000;
    this.mesgLayer.style.border = "7px solid "+this.bgColor;
    this.mesgLayer.style.borderTop = "none";
    this.mesgLayer.innerHTML = '<div class="wegidt-top-box"><span class="wegidt-top-text">'+title+'</span><a href="javascript:void(0);" class="wegidt-colse-but" title="关闭"></a><a href="javascript:void(0);" class="wegidt-enlarge-but" title="最大化"></a><a href="javascript:void(0);" class="wegidt-shrink-but" title="最小化"></a></div>'+
        '<div>'+text+'</div>'+
        '<style>'+
        '.wegidt-top-box{width:100%;height:40px;background:'+this.bgColor+';overflow:hidden;}'+
        '.wegidt-top-text{display:inline-block;float:left;width:'+parseInt(this.width-130)+'px;height:40px;line-height:40px;color:#FFF;font-size:15px;padding-left:10px;}'+
        '.wegidt-shrink-but{display:inline-block;float:right;width:20px;height:20px;line-height:40px;text-align:center;color:#FFF;font-size:18px;font-weight:bold;text-decoration:none;background:url("http://localhost/public/image/wegidt_window_but_ico.png") no-repeat 5px 5px;margin-top:10px;}'+
        '.wegidt-enlarge-but{display:inline-block;float:right;width:20px;height:20px;line-height:40px;text-align:center;color:#FFF;font-size:18px;font-weight:bold;text-decoration:none;background:url("http://localhost/public/image/wegidt_window_but_ico.png") no-repeat -10px 5px;margin-top:10px;}'+
        '.wegidt-colse-but{display:inline-block;float:right;width:20px;height:20px;line-height:40px;text-align:center;color:#FFF;font-size:18px;font-weight:bold;text-decoration:none;background:url("http://localhost/public/image/wegidt_window_but_ico.png") no-repeat -28px 5px;margin-top:10px;}'+
        '</style>';
    document.body.appendChild(this.mesgLayer);
    this.footer = document.createElement("div");
    this.footer.className = "wegidt-win-footer";
    this.footer.style.width = this.winW + "px";
    this.footer.style.height = 40 + "px";
    this.footer.style.background = this.bgColor;
    this.footer.style.position = "fixed";
    this.footer.style.left = 0;
    this.footer.style.bottom = 0;
    this.footer.style.zIndex = 1000;
    this.footer.style.opacity = .6;
    this.footer.style.filter = "alpha(opacity:60)";
    this.footer.innerHTML = '<span class="wegidt-footer-box" data-is-show="false">'+
        title+
        '</span>'+
        '<style>'+
        '.wegidt-footer-box{display:inline-block;width:60px;height:40px;line-height:40px;font-size:14px;color:#FFF;margin-left:10px;border:1px solid #AAACA8;box-shadow:0 0 3px #AAACA8}'+
        '.wegidt-footer-box:hover{cursor:pointer;}'+
        '</style>';
    document.body.appendChild(this.footer);
    //关闭弹出窗口事件
    var oColseBut = getElementsByClassName("wegidt-colse-but");
    addEvent(oColseBut[0],"click",function(){
        document.body.removeChild(_this.maskLayer);
        document.body.removeChild(_this.mesgLayer);
        document.body.removeChild(_this.footer);
    });
    //最小化
    var oSmallBut = getElementsByClassName("wegidt-shrink-but");
    addEvent(oSmallBut[0],"click",function(){
        var oMesgBox = getElementsByClassName("pop-layer")[0];
        var oFooterList = getElementsByClassName("wegidt-footer-box")[0];
        oMesgBox.style.display = "none";
        oFooterList.setAttribute("data-is-show",true);
    });
    //最大化
    var oBigBut = getElementsByClassName("wegidt-enlarge-but");
    addEvent(oBigBut[0],"click",function(){
        var oMesgBox = getElementsByClassName("pop-layer")[0];
        if(oMesgBox.getAttribute("isBig") == "false"){
            oMesgBox.style.left = 0;
            oMesgBox.style.top = 0;
            oMesgBox.style.width = parseInt(_this.winW-14) + "px";
            oMesgBox.style.height = parseInt(_this.winH-7) + "px";
            oMesgBox.setAttribute("isBig",true);
        }else{
            oMesgBox.style.left = parseInt((_this.winW - _this.width)/2) + "px";
            oMesgBox.style.top = parseInt((_this.winH - _this.height)/2) + "px";
            oMesgBox.style.width = _this.width + "px";
            oMesgBox.style.height = _this.height + "px";
            oMesgBox.setAttribute("isBig",false);
        }
    });
    //页脚
    var oWegidtFooters = getElementsByClassName("wegidt-footer-box")[0];
    addEvent(oWegidtFooters,"click",function(){
        var oMesgBoxs = getElementsByClassName("pop-layer")[0];
        if(this.getAttribute("data-is-show") == "true"){
            oMesgBoxs.style.display = "block";
            this.setAttribute("data-is-show",false);
        }else{
            oMesgBoxs.style.display = "none";
            this.setAttribute("data-is-show",true);
        }
    });
}



function WegidtW(paramJson){
    return new WegidtWins(paramJson);
}