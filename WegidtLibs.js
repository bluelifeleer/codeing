addEvent(window,'load',function(){
    var oWidgets = getElementsByClassName("J_Widget");
    for(var i=0; i<oWidgets.length; i++){
        switch(attr(oWidgets[i],'widget-name')){
                //分页
            case "separate-page":
                var configs = eval("("+attr(oWidgets[i],'widget-config')+")");
                SeparatePage(configs);
                break;
            case "carousel"://轮播
                var _this = oWidgets[i];
                 var configs = eval("("+attr(oWidgets[i],'widget-config')+")");
                carousels(_this,configs);
                break;
            case "vaildata":
                var _this = oWidgets[i];
                new vailFormData(_this);
                break;
            case "pop":
                var _this = oWidgets[i];
                popLayer(_this);
                break;
        }
    }
});


/**
 *  分页
 */
function SeparatePage(configs){
    var trigger = null;
    var pageButStr = "";
    if(configs['trigger'].charAt(0) == "."){
        trigger = getElementsByClassName(this,configs['trigger'].substr(1,configs['trigger'].length-1))[0];
    }else{
        trigger = document.getElementById(configs['trigger'].substr(1,configs['trigger'].length-1));
    }
    for(var i=0; i<configs['total']; i++){
        if(i>=10){
            pageButStr += '<a href="'+configs['url']+'/'+i+'">'+parseInt(i+1)+'</a><span>......</span>';
        }else{
            pageButStr += '<a href="'+configs['url']+'/'+i+'">'+parseInt(i+1)+'</a>';
        }
    }
    trigger.innerHTML = '<span>共'+configs['total']+'页</span><a href="'+configs['url']+'">第一页</a><a href="'+configs['url']+'">上一页</a>'+pageButStr+'<a href="'+configs['url']+'">下一页</a><a href="'+configs['url']+'">最后一页</a><span><input type="text" id="page-num" value=""/><a href="javascript:void(0);" id="go-to-page">确定</a></span><style>'+configs['trigger']+' span{display:inline-block;width:auto;height:auto;padding:5px;margin-right:10px;}'+configs['trigger']+' a{display:inline-block;width:auto;height:auto;padding:5px;margin-right:10px;color:#0099CC;}'+configs['trigger']+' a:hover{background:#0099CC;border-radius:3px;color:#FFF;}#page-num{width:30px;height:20px;border:1px solid #c1c1c1;margin-right:5px;}</style>';
    
}





/*
 * 轮播
 */
function carousels(obj,config){
    switch(config['type']){
        case "":
            break;
        case "":
            break;
        default:
            var oCarouselBlockBox = getElementsByClassName(obj,config['carouselBox'])[0];
            var oCarouselLists = getElementsByClassName(obj,config['carouselLists']);
            oCarouselBlockBox.style.width = parseInt(oCarouselLists[0].offsetWidth*oCarouselLists.length) + "px";
            oCarouselBlockBox.style.height = parseInt(oCarouselLists[0].offsetHeight) + "px";
            for(var i=0;i<oCarouselLists.length;i++){
                var cButs = document.createElement('div');
                cButs.className = "carousel-buts";
                cButs.innerHTML = i;
                obj.appendChild(cButs);
            }
            
            break;
    }
}



/**
 *  验证表单数据
 */
function vailFormData(obj){
    var _this = this;
    var reg = {
        "name" :/^[\u4E00-\u9FA5A-Za-z0-9]+$/,//中文、英文、数字但不包括下划线等符号
        "password" :/^[a-zA-Z]\w{5,17}$/,//以字母开头，长度在6~18之间，只能包含字符、数字和下划线
        "email" : /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,//邮箱
        "phone" : /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
    }
    oInputs = obj.getElementsByTagName('input');
        for(var k=0; k<oInputs.length; k++){
            
            addEvent(oInputs[k],'blur',function(){
                switch(attr(this,'varil-type')){
                    case "name":
                        var oVailDataConfig = eval("("+attr(this,'varil-config')+")");
                        var oTip = getElementsByClassName(this.parentNode.parentNode,oVailDataConfig.tip.substr(1,oVailDataConfig.tip.length-1));
                        if(this.value == ""){
                            oTip[0].innerHTML = oVailDataConfig.warn;
                            oTip[0].style.color = "#00bffe";
                            oTip[0].style.background = "url(../../public/image/warn_ico_bg.png) no-repeat 0 12px";
                        }else if(reg.name.test(this.value)){
                            oTip[0].innerHTML = oVailDataConfig.correct;
                            oTip[0].style.color = "#16c2b4";
                            oTip[0].style.background = "url(../../public/image/proper_ico_bg.png) no-repeat 0 12px";
                        }else{
                            oTip[0].innerHTML = oVailDataConfig.error;
                            oTip[0].style.color = "#c50200";
                            oTip[0].style.background = "url(../../public/image/error_ico_bg.png) no-repeat 0 12px";
                        }
                        break;
                    case "password":
                        var oVailDataConfig = eval("("+attr(this,'varil-config')+")");
                        var oTip = getElementsByClassName(this.parentNode.parentNode,oVailDataConfig.tip.substr(1,oVailDataConfig.tip.length-1));
                        if(this.value == ""){
                            oTip[0].innerHTML = oVailDataConfig.warn;
                            oTip[0].style.color = "#00bffe";
                            oTip[0].style.background = "url(../../public/image/warn_ico_bg.png) no-repeat 0 12px";
                        }else if(reg.password.test(this.value)){
                            oTip[0].innerHTML = oVailDataConfig.correct;
                            oTip[0].style.color = "#16c2b4";
                            oTip[0].style.background = "url(../../public/image/proper_ico_bg.png) no-repeat 0 12px";
                        }else{
                            oTip[0].innerHTML = oVailDataConfig.error;
                            oTip[0].style.color = "#c50200";
                            oTip[0].style.background = "url(../../public/image/error_ico_bg.png) no-repeat 0 12px";
                        }
                        break;
                    case 'email':
                        var oVailDataConfig = eval("("+attr(this,'varil-config')+")");
                        var oTip = getElementsByClassName(this.parentNode.parentNode,oVailDataConfig.tip.substr(1,oVailDataConfig.tip.length-1));
                        if(this.value == ""){
                            oTip[0].innerHTML = oVailDataConfig.warn;
                            oTip[0].style.color = "#00bffe";
                            oTip[0].style.background = "url(../../public/image/warn_ico_bg.png) no-repeat 0 12px";
                        }else if(reg.email.test(this.value)){
                            oTip[0].innerHTML = oVailDataConfig.correct;
                            oTip[0].style.color = "#16c2b4";
                            oTip[0].style.background = "url(../../public/image/proper_ico_bg.png) no-repeat 0 12px";
                        }else{
                            oTip[0].innerHTML = oVailDataConfig.error;
                            oTip[0].style.color = "#c50200";
                            oTip[0].style.background = "url(../../public/image/error_ico_bg.png) no-repeat 0 12px";
                        }
                        break;
                    case "phone":
                        var oVailDataConfig = eval("("+attr(this,'varil-config')+")");
                        var oTip = getElementsByClassName(this.parentNode.parentNode,oVailDataConfig.tip.substr(1,oVailDataConfig.tip.length-1));
                        if(this.value == ""){
                            oTip[0].innerHTML = oVailDataConfig.warn;
                            oTip[0].style.color = "#00bffe";
                            oTip[0].style.background = "url(../../public/image/warn_ico_bg.png) no-repeat 0 12px";
                        }else if(reg.phone.test(this.value)){
                            oTip[0].innerHTML = oVailDataConfig.correct;
                            oTip[0].style.color = "#16c2b4";
                            oTip[0].style.background = "url(../../public/image/proper_ico_bg.png) no-repeat 0 12px";
                        }else{
                            oTip[0].innerHTML = oVailDataConfig.error;
                            oTip[0].style.color = "#c50200";
                            oTip[0].style.background = "url(../../public/image/error_ico_bg.png) no-repeat 0 12px";
                        }
                        break;
                }
            })
        }
}


/***
 * 弹出层
 */
function popLayer(obj){
    var _this = this;
    this.options = {
        'cursor':'pointer',
        'index':0,
        'configs':null,
        'position':'',
        'touch':null,
        'pop':null,
    }
    addEvent(obj,'mouseover',function(){
        this.style.cursor = _this.options['cursor'];
        _this.options['index']++;
        if(this.getAttribute("data-widget-name") == "pop"){
            _this.options['configs'] = eval("("+this.getAttribute("data-widegt-config")+")");
            _this.options['touch'] = this.getElementsByClassName(_this.options['configs']['touchLayer'].substr(1,_this.options['configs']['touchLayer'].length-1))[0];
            _this.options['pop'] = this.getElementsByClassName(_this.options['configs']['popLayer'].substr(1,_this.options['configs']['popLayer'].length-1))[0];
            var oPosition = this.configs['position'];
            var oOffset = this.configs['offset'];
            switch(oPosition){
                case "tl tl":
                    _this.options['position'] = {'left':0,'top':0};
                    break;
                case "tc tl":
                    _this.options['position'] = {'left':_this.options['touch'].offsetWidth/2,'top':0};
                    break;
                case "tr tl":
                    _this.options['position'] = {'left':_this.options['touch'].offsetWidth,'top':0};
                    break;
                case "cl tl":
                    _this.options['position'] = {'left':0,'top':_this.options['touch'].offsetHeight/2};
                    break;
                case "cc tl":
                    _this.options['position'] = {'left':_this.options['touch'].offsetWidth/2,'top':_this.options['touch'].offsetHeight/2};
                    break;
                case "cr tl":
                    _this.options['position'] = {'left':_this.options['touch'].offsetWidth,'top':_this.options['touch'].offsetHeight/2};
                    break;
                case "bl tl":
                    _this.options['position'] = {'left':0,'top':_this.options['touch'].offsetHeight};
                    break;
                case "bc tl":
                    _this.options['position'] = {'left':_this.options['touch'].offsetWidth/2,'top':_this.options['touch'].offsetHeight};
                    break;
                case "br tl":
                    _this.options['position'] = {'left':_this.options['touch'].offsetWidth,'top':_this.options['touch'].offsetHeight};
                    break;
            }
            //console.log(this.position['left']);
            _this.options['touch'].style.display = "block";
            _this.options['touch'].style.position = "absolute";
            _this.options['touch'].style.left = 0;
            _this.options['touch'].style.top =0;
            _this.options['pop'].style.display = "block";
            _this.options['pop'].style.position = "absolute";
            _this.options['pop'].style.left = parseInt( _this.options['position']['left']+oOffset[0]) + "px";
            _this.options['pop'].style.top = parseInt( _this.options['position']['top']+oOffset[1]) + "px";
            _this.options['pop'].style.zIndex =  _this.options['index'];
        }
    });
    addEvent(obj,'mouseout',function(){
        this.style.cursor = "";
        _this.options['touch'].style.display = "block";
        _this.options['pop'].style.display = "none";
        _this.options['pop'].style.left = "";
        _this.options['pop'].style.top = "";
        _this.options['pop'].style.zIndex = 0;
    });
}