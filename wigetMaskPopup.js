/*
 * create by bluelifeleer
 * 弹出层 2015-05-05 17:28
 * 使用方法：var maskpop = new maskPopup(json);
 * maskpop.createBox("title","text");
 */

function maskPopup(){
    var winW = document.documentElement.clientWidth || document.body.clientWidth;
    var winH = document.documentElement.clientHeight || document.body.clientHeight;
    this.borderWidth = 8;
    this.width = arguments[0]["width"];
    this.height = arguments[0]["height"];
    this.background = arguments[0]["background"];
    this.borderColor = arguments[0]["border-color"];
    this.maskDiv = document.createElement("div");
    this.maskDiv.style.width = winW + "px";
    this.maskDiv.style.height = winH + "px";
    this.maskDiv.style.background = "#FFF";
    this.maskDiv.style.opacity = 0;
    this.maskDiv.style.filter = "alpha(opacity:0)";
    this.maskDiv.style.position = "fixed";
    this.maskDiv.style.left = 0;
    this.maskDiv.style.top = 0;
    this.maskDiv.style.zIndex = 10000;
    this.cbox = document.createElement("div");
    this.cbox.style.width = this.width + "px";
    this.cbox.style.height = this.height + "px";
    this.cbox.style.background = this.background;
    this.cbox.style.border = this.borderWidth + "px solid "+this.borderColor;
    this.cbox.style.position = "fixed";
    this.cbox.style.left = parseInt((winW-this.width)/2) + "px";
    this.cbox.style.top = parseInt((winH-this.height)/2) + "px";
    this.cbox.style.opacity = 0.4;
    this.cbox.style.filter = "alpha(opacity:40)";
    this.cbox.style.zIndex = 10001;
    this.contetBox = document.createElement("div");
    this.contetBox.style.width = this.width + "px";
    this.contetBox.style.height = this.height + "px";
    this.contetBox.style.background = this.background;
    this.contetBox.style.position = "fixed";
    this.contetBox.style.left = parseInt((winW-this.width)/2+this.borderWidth) + "px";
    this.contetBox.style.top = parseInt((winH-this.height)/2+this.borderWidth) + "px";
    this.contetBox.style.opacity = 1;
    this.contetBox.style.filter = "alpha(opacity:100)";
    this.contetBox.style.zIndex = 10002;
}

maskPopup.prototype.createBox = function(title,content){
    var _this = this;
    document.body.appendChild(this.maskDiv);
    document.body.appendChild(this.cbox);
    document.body.appendChild(this.contetBox);
    this.contetBox.innerHTML = "<div style='width:100%;height:50px;background:"+this.borderColor+";line-height:50px;color:#FFF;'><span style='display:inline-block;width:auto;height:50px;float:left;padding:0 10px;font-weight:bold;'>"+title+"</span><span style='display:inline-block;width:30px;height:50px;float:right;margin-right:10px;background:url(http://localhost/public/image/maskPopup_colse_but.png) no-repeat 0 10px;' title='关闭' id='colse-mask-popup'></sapn></div><div style='width:" + parseInt(this.width-40) + "px;height:auto;padding:20px;'>"+content+"</div>";
    
    var oCloseMaskPopupBut = document.getElementById("colse-mask-popup");
    addEvent(oCloseMaskPopupBut,"mouseover",function(){
        this.style.cursor = "pointer";
    });
    addEvent(oCloseMaskPopupBut,"click",function(){
        document.body.removeChild(_this.maskDiv);
        document.body.removeChild(_this.cbox);
        document.body.removeChild(_this.contetBox);
        window.location.reload();
    });
}


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