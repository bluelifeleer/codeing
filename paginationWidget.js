/**
 * 分页控件-paginationWidget
 * @author bulelife
 * @email thebulelife@163||outlook.com
 * @using
 * <div id='page'></div>
 * javascript code:
 *  var pageWidget = new paginationWidget();
 *  var opation = {
 *      //显示分页的元素，[必填]
 *      'id':,
 *      //总数据条数，[必填]
 *      'total':,
 *      //一页显示条数，[选填]
 *      'num':,
 *      //请求url,[必填]
 *      'url':,
 *      //当前显示页数，[选填]
 *      'currentPage':,
 *      //首页按纽文本，[选填]
 *      'firstText':,
 *      //上一页按纽文本，[选填]
 *      'prevText':,
 *      //下一页按纽文本，[选填]
 *      'nextText':,
 *      //尾页按纽文本，[选填]
 *      'lastText':,
 *      //配色，
 *      'color':,
 *      //请求方式，默认true
 *      'isAjax'
 *      //回调函数，值为匿名函数，[必填]
 *      'callback':function(){},
 *  }
 *  pageWidget.initialize(<object> opation).creativeTages();
 */

function paginationWidget() {
    var _this = this;
    this.total;
    this.num;
    this.url;
    this.id;
    this.currentPage;
    this.firstText;
    this.prevText;
    this.nextText;
    this.lastText;
    this.callback;
    this.author = 'bulelife';
    this.email = 'thebulelife@163||outlook.com';
    this.version = '0.1';
    this.color;
    this.isAjax;
    this.initialize = function(conf) {
        this.total = this.isEmpty(conf['total']) ? conf['total'] : 0;
        this.num = this.isEmpty(conf['num']) ? conf['num'] : 20;
        this.url = this.isEmpty(conf['url']) ? conf['url'] : '';
        this.id = this.isEmpty(conf['id']) ? conf['id'] : '';
        this.currentPage = document.getElementById('content-body-block').getAttribute('data-pages') ? parseInt(document.getElementById('content-body-block').getAttribute('data-pages')) : (this.isEmpty(conf['currentPage']) ? conf['currentPage'] : 1);
        this.firstText = this.isEmpty(conf['firstText']) ? conf['firstText'] : 'first';
        this.prevText = this.isEmpty(conf['prevText']) ? conf['prevText'] : 'prev';
        this.nextText = this.isEmpty(conf['nextText']) ? conf['nextText'] : 'next';
        this.lastText = this.isEmpty(conf['lastText']) ? conf['lastText'] : 'last';
        this.color = this.isEmpty(conf['color']) ? conf['color'] : '#cf2525';
        this.isAjax = this.isEmpty(conf['isAjax']) ? conf['isAjax'] : false;
        this.callback = this.isEmpty(conf['callback']) ? conf['callback'] : null;
        return this;
    }
    this.isEmpty = function(param) {
        return param === void(0) || param == '' || param == null ? false : true;
    }
    this.getElement = function(els) {
        var arg = els ? els : this.id;
        var temp = [];
        var elements;
        switch (arg.charAt(0)) {
            case '#':
                temp.push(document.getElementById(arg.substr(1, parseInt(arg.length - 1))));
                return temp;
                break;
            case '.':
                if (document.getElementsByClassName(arg.substr(1, parseInt(arg.length - 1)))) {
                    elements = document.getElementsByClassName(arg.substr(1, parseInt(arg.length - 1)));
                    temp = elements;
                } else {
                    var allElements = document.getElementsByTagName('*');
                    var i = 0;
                    for (i; i < allElements.length; i++) {
                        if (allElements[i].className == arg.substr(1, parseInt(arg.length - 1))) {
                            temp.push(allElements[i]);
                        }
                    }
                }
                return temp;
                break;
            default:
                elements = document.getElementsByTagName(arg);
                var i = 0;
                for (i; i < elements.length; i++) {
                    temp.push(elements[i]);
                }
                return temp;
                break;
        }
    }
    this.test = function() {
        return this;
    }
    this.creativeTages = function() {
        this.createpagesBut();
        return this;
    }
    this.mouseoverEvent = function(els) {
        var i = 0;
        for (i; i < els.length; i++) {
            if (els[i].className.indexOf('page-widget-buts') > 0) {
                this.addEventListerent(els[i], 'mouseover', function() {
                    if (this.getAttribute('data-current') == 'true') {
                        return false;
                    }
                    var j = 0;
                    for (j; j < els.length; j++) {
                        if (els[j].className.indexOf('page-widget-buts') > 0) {
                            if (els[j].getAttribute('data-current') == 'true') {
                                els[j].style.background = _this.color;
                                els[j].style.color = '#FFF';
                                els[j].style.borderColor = _this.color;
                                els[j].style.cursor = 'default';
                            } else {
                                els[j].style.border = '1px solid #e6e6e6';
                                els[j].style.color = '#3d3d3d';
                            }
                        }
                    }
                    this.style.border = '1px solid ' + _this.color;
                    this.style.color = _this.color;
                });
            }
        }
    }
    this.mouseoutEvent = function(els) {
        var i = 0;
        for (i; i < els.length; i++) {
            this.addEventListerent(els[i], 'mouseout', function() {
                var pageWidgetButs = _this.getElement('.page-widget-buts');
                for (var j = 0; j < pageWidgetButs.length; j++) {
                    if (pageWidgetButs[j].getAttribute('data-current') == 'true') {
                        pageWidgetButs[j].style.background = _this.color;
                        pageWidgetButs[j].style.color = '#FFF';
                        pageWidgetButs[j].style.borderColor = _this.color;
                        pageWidgetButs[j].style.cursor = 'default';
                    } else {
                        pageWidgetButs[j].style.border = '1px solid #e6e6e6';
                        pageWidgetButs[j].style.color = '#3d3d3d';
                        pageWidgetButs[j].style.background = '#FFF';
                        pageWidgetButs[j].style.cursor = 'pointer';
                    }
                }
            });
        }
    }
    this.clickEvent = function(els) {
        var _this = this;
        for (var i = 0; i < els.length; i++) {
            this.addEventListerent(els[i], 'click', function() {
                if (els[i].getAttribute('data-but-type') == 'page-but' && els[i]['data-page-num'] >= Math.ceil(this.total / this.num)) {
                    alert('全部数据已加载完');
                    return false;
                }
            });
        }

    }

    this.addEventListerent = function(els, ev, fn) {
        if (els.addEventListener) {
            els.addEventListener(ev, function(e) {
                fn.call(els);
                e.stopPropagation();
                e.preventDefault();
            }, false);
        } else {
            els.attachEvent("on" + ev, function() {
                fn.call(el);
                window.event.cancelBubble = false;
                window.event.returnValue = true;
            });
        }
    }

    this.information = function() {
        return this;
    }
    this.createpagesBut = function() {
        var index, html = '',
            num = 10;
        var numPages = Math.ceil(this.total / this.num);
        var firstHtmlStr = Math.ceil(numPages) == 1 || this.currentPage == 1 ? '<a href="' + _this.url + '/' + parseInt(_this.num) + '/1" class="first-buts page-widget-buts" style="display:none;float:left;padding:0 10px;height:33px;text-align:center;line-height:33px;border:1px solid #e6e6e6;font-size:14px;color:#3d3d3d;text-decoration:none;" data-page-num="0">' + this.firstText + '</a>' : '<a href="' + _this.url + '/' + parseInt(_this.num) + '/1" class="first-buts page-widget-buts" style="display:block;float:left;padding:0 10px;height:33px;text-align:center;line-height:33px;border:1px solid #e6e6e6;font-size:14px;color:#3d3d3d;text-decoration:none;" data-page-num="0">' + this.firstText + '</a>';
        var lastHtmlStr = Math.ceil(numPages) == 1 ? '<a href="' + _this.url + '/' + parseInt(_this.num) + '/' + numPages + '" class="last-buts page-widget-buts" style="display:none;float:left;padding:0 10px;height:33px;text-align:center;line-height:33px;border:1px solid #e6e6e6;font-size:14px;color:#3d3d3d;text-decoration:none;" data-page-num="' + numPages + '">' + this.lastText + '</a>' : (this.currentPage == numPages ? '<a href="' + _this.url + '/' + parseInt(_this.num) + '/' + numPages + '" class="last-buts page-widget-buts" style="display:none;float:left;padding:0 10px;height:33px;text-align:center;line-height:33px;border:1px solid #e6e6e6;font-size:14px;color:#3d3d3d;text-decoration:none;" data-page-num="' + numPages + '">' + this.lastText + '</a>' : '<a href="' + _this.url + '/' + parseInt(_this.num) + '/' + numPages + '" class="last-buts page-widget-buts" style="display:block;float:left;padding:0 10px;height:33px;text-align:center;line-height:33px;border:1px solid #e6e6e6;font-size:14px;color:#3d3d3d;text-decoration:none;" data-page-num="' + numPages + '">' + this.lastText + '</a>');
        var prevHtmlStr = Math.ceil(numPages) == 1 || this.currentPage == 1 ? '<a href="' + _this.url + '/' + parseInt(_this.num) + '/' + parseInt(this.currentPage - 1) + '" class="prev-buts page-widget-buts" style="display:none;float:left;padding:0 10px;height:33px;text-align:center;line-height:33px;border:1px solid #e6e6e6;font-size:14px;color:#3d3d3d;text-decoration:none;" data-page-num="' + (this.currentPage == 0 ? 0 : parseInt(this.currentPage - 1)) + '">' + this.prevText + '</a>' : '<a href="' + _this.url + '/' + parseInt(_this.num) + '/' + parseInt(this.currentPage - 1) + '" class="prev-buts page-widget-buts" style="display:block;float:left;padding:0 10px;height:33px;text-align:center;line-height:33px;border:1px solid #e6e6e6;font-size:14px;color:#3d3d3d;text-decoration:none;" data-page-num="' + (this.currentPage == 0 ? 0 : parseInt(this.currentPage - 1)) + '">' + this.prevText + '</a>';
        var nextHtmlStr = Math.ceil(numPages) == 1 ? '<a href="' + _this.url + '/' + parseInt(_this.num) + '/' + parseInt(this.currentPage + 1) + '" class="next-buts page-widget-buts" style="display:none;float:left;padding:0 10px;height:33px;text-align:center;line-height:33px;border:1px solid #e6e6e6;font-size:14px;color:#3d3d3d;text-decoration:none;" data-page-num="' + (this.currentPage + 1) + '">' + this.nextText + '</a>' : (this.currentPage == numPages ? '<a href="' + _this.url + '/' + parseInt(_this.num) + '/' + parseInt(this.currentPage + 1) + '" class="next-buts page-widget-buts" style="display:none;float:left;padding:0 10px;height:33px;text-align:center;line-height:33px;border:1px solid #e6e6e6;font-size:14px;color:#3d3d3d;text-decoration:none;" data-page-num="' + (this.currentPage + 1) + '">' + this.nextText + '</a>' : '<a href="' + _this.url + '/' + parseInt(_this.num) + '/' + parseInt(this.currentPage + 1) + '" class="next-buts page-widget-buts" style="display:block;float:left;padding:0 10px;height:33px;text-align:center;line-height:33px;border:1px solid #e6e6e6;font-size:14px;color:#3d3d3d;text-decoration:none;" data-page-num="' + (this.currentPage + 1) + '">' + this.nextText + '</a>');
        var searchHtmlStr = Math.ceil(numPages) == 1 ? '<div style="float:left;"><span style="display:block;float:left;width:60px;height:35px;margin-left:10px;line-height:35px;font-size:13px;color:#999;">共' + Math.ceil(this.total / this.num) + '页，</span></div>' : '<div style="float:left;"><span style="display:block;float:left;width:60px;height:35px;margin-left:10px;line-height:35px;font-size:13px;color:#999;">共' + numPages + '页，</span><span style="display:block;float:left;width:30px;height:35px;line-height:35px;font-size:13px;color:#999;">到第</span><input style="display:block;float:left;width:50px;height:33px;9line-height:33px;border:1px solid #e6e6e6;font-size:14px;color:#999" id="page-num" value="" /><span style="display:block;float:left;width:30px;height:35px;line-height:35px;text-align:center;font-size:13px;color:#999;">页</span><a href="javascript:void(0);" class="submit-buts page-widget-buts" style="display:block;float:left;width:50px;height:33px;text-align:center;line-height:33px;border:1px solid #e6e6e6;font-size:12px;color:#3d3d3d;text-decoration:none;border-radius:2px;" data-but-type="search-submit-but">确定</a></div>';

        if (this.currentPage <= 3) {
            index = 1;
        } else if (numPages <= 9) {
            index = 1;
        } else if (numPages > 9 && this.currentPage < numPages && ((numPages - this.currentPage) >= 9)) {
            index = this.currentPage - 3;
        } else if (this.currentPage >= numPages || ((numPages - this.currentPage) < 10)) {
            index = numPages - 9;
        } else {
            index = this.currentPage == 9;
        }

        for (var i = 0; i < (numPages >= 9 ? num : numPages); i++) {
            if ((index + i) == this.currentPage) {
                html += '<a href="' + _this.url + '/' + parseInt(_this.num) + '/' + parseInt(index + i) + '" class="page-buts page-widget-buts" data-but-type="page-but" data-page-num="' + (index + i) + '" style="display:block;float:left;width:30px;height:33px;text-align:center;line-height:33px;border:1px solid #EE2C2C;background:#EE2C2C;color:#FFF;text-decoration:none;font-size:15px;" data-current="true">' + (index + i) + '</a>';
            } else {
                html += '<a href="' + _this.url + '/' + parseInt(_this.num) + '/' + parseInt(index + i) + '" class="page-buts page-widget-buts" data-but-type="page-but" data-page-num="' + (index + i) + '" style="display:block;float:left;width:30px;height:33px;text-align:center;line-height:33px;border:1px solid #e6e6e6;background:#FFF;color:#3d3d3d;text-decoration:none;font-size:15px;" data-current="false">' + (index + i) + '</a>';
            }
        }
        this.getElement()[0].innerHTML = firstHtmlStr + prevHtmlStr + (this.currentPage > 20 ? ('<span style="display:block;float:left;width:30px;height:30px;text-align:center;line-height:30px;">...</span>' + html) : (this.currentPage >= numPages || ((numPages - this.currentPage) < 10) ? html : html + '<span style="display:block;float:left;width:30px;height:30px;text-align:center;line-height:30px;">...</span>')) + nextHtmlStr + lastHtmlStr + searchHtmlStr;
        var pageButs = this.getElement('.page-widget-buts');
        this.mouseoverEvent(pageButs);
        this.mouseoutEvent(pageButs);
        this.clickEvent(pageButs);
    }
}