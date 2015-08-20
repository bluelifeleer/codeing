function WegidtBrowPop(param){
    this.winW = document.documentElement.clientWidth || document.body.clientWidth;
    this.width = param['width'];
    this.height = param['height'];
    this.color = param['color'];
    this.bgColor = param['background'];
    this.BrowBox = document.createElement("div");
    this.BrowBox.style.width = this.width + "px";
    this.BrowBox.style.height = this.height + "px";
    this.BrowBox.style.color = this.color;
    this.BrowBox.style.background = this.bgColor;
    this.BrowBox.style.border = "1px solid " + this.color;
    this.BrowBox.style.lineHeight = this.height + "px";
    this.BrowBox.style.textAlign = "center";
    this.BrowBox.style.zIndex = 99999;
    this.BrowBox.style.position = "absolute";
    this.BrowBox.style.left = parseInt((this.winW-this.width)/2) + "px";
    this.BrowBox.style.top = 0;
    return this;
}
    
WegidtBrowPop.prototype.create = function(str){
    var _this= this;
    this.BrowBox.innerHTML = str;
    document.body.appendChild(this.BrowBox);
    setTimeout(function(){
        _this.BrowBox.top = -_this.height + "px";
        document.body.removeChild(_this.BrowBox);
    },10000);
}
    
    
function WegidtBrow(param){
    return new WegidtBrowPop(param);
}