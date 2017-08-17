/*js通用方法*/
// JavaScript Document
/*如有侵权行为请及时联系本网站，我们将及时处理相应内容*/
if (navigator.userAgent.indexOf('Firefox') >= 0 && window.HTMLElement) {
    HTMLElement.prototype.__defineGetter__("innerText", function() {
        var anyString = "";
        var childS = this.childNodes;
        for (var i = 0; i < childS.length; i++) {
            if (childS[i].nodeType == 1) {
                anyString += childS[i].tagName == "BR" ? '\n' : childS[i].innerText;
            } else if (childS[i].nodeType == 3) {
                anyString += childS[i].nodeValue;
            }
        }
        return anyString;
    });
    HTMLElement.prototype.__defineSetter__("innerText", function(sText) {
        this.textContent = sText;
    });
    HTMLElement.prototype.__defineSetter__('outerHTML', function(sHTML) {
        var r = this.ownerDocument.createRange();
        r.setStartBefore(this);
        var df = r.createContextualFragment(sHTML);
        this.parentNode.replaceChild(df, this);
        return sHTML;
    });

    HTMLElement.prototype.__defineGetter__('outerHTML', function() {
        var attr;
        var attrs = this.attributes;
        var str = '<' + this.tagName.toLowerCase();
        for (var i = 0; i < attrs.length; i++) {
            attr = attrs[i];
            if (attr.specified)
                str += ' ' + attr.name + '="' + attr.value + '"';
        }
        if (!this.canHaveChildren) {
            return str + '>';
        }
        return str + '>' + this.innerHTML + '</' + this.tagName.toLowerCase() + '>';
    });

    HTMLElement.prototype.__defineGetter__('canHaveChildren', function() {
        switch (this.tagName.toLowerCase()) {
            case 'area': case 'base': case 'basefont': case 'col': case 'frame': case 'hr': case 'img': case 'br': case 'input': case 'isindex': case 'link': case 'meta': case 'param':
                return false;
        }
        return true;
    });
}

function getId(id)//获取id的函数 
{
    if (document.getElementById && document.getElementById(id)) {
        return document.getElementById(id); // W3C DOM
    } else if (document.all && document.all(id)) {
        return document.all(id); // MSIE 4 DOM
    } else if (document.layers && document.layers[objectId]) {
        return document.layers[id]; // NN 4 DOM.. note: this won't find nested layers
    } else {
        return false;
    }
}

//string wrapper
//替换所有字符串
String.prototype.replaceAll = function(search, replace) {
    var regex = new RegExp(search, "g");
    return this.replace(regex, replace);
};

//去右空格; 
String.prototype.rtrim = function() {
    return this.replace(/\s*$/, "");
}

//去左空格;
String.prototype.ltrim = function() {
    return this.replace(/^\s*/, "");
};

//去除字符串首尾空格
String.prototype.trim = function() {
    return this.replace(/(^\s+)|(\s+$)/g, "");
};

//返回字符串长度，中文字符算作两个
String.prototype.len = function() {
    return this.replace(/[^\x00-\xff]/g, "aa").length;
};

function StringBuffer() {
    this._strings = [];
    if (arguments.length == 1) {
        this._strings.push(arguments[0]);
    }
}

StringBuffer.prototype.append = function(s) {
    this._strings.push(s);
    return this;
};

StringBuffer.prototype.toString = function() {
    return this._strings.join("");
};

//利用数组的join构造字符串，提高字符串拼接效率
window.buildString = function() {
    var str = [];
    for (var i = 0; i < arguments.length; i++) {
        str[i] = arguments[i];
    }
    return str.join("");
}

//判断当前对象是否为空
window.isNULL = function(obj) {
    return (obj == null || typeof obj == "undefined" || obj.length == 0)
};

//判断当前对象是否非空 
window.isNotNULL = function(obj) {
    return !isNULL(obj);
};

//判断是否是方法
window.isFunc = function(fun) {
    return (fun != null && typeof fun == "function");
};

//返回 true 且啥也不处理的回调函数
window.doNothing = function() {
    return true;
};

//更新浏览器地址栏链接地址
window.updateUrl = function(url) {
    if (window.history && window.history.pushState) {
        window.history.pushState(null, url, url);
    }
};

//判断当前是否处在iframe中
window.isIframe = function() {
    return top.location != self.location;
};

//判断当前不处在iframe中
window.isNotIframe = function() {
    return !isIframe();
};

//window.open时，在很多情况下，弹出的窗口会被浏览器阻止
window.openwin = function(url) {
    var a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.setAttribute("id", "openwin");
    document.body.appendChild(a);
    a.click();
};

//满屏
window.openAllscreenwin = function(url) {
    window.open(url, "", "toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no");
}

//暂时不用下面的代码
var Y = {}; //Y || {};
Y.version = "1.1.0";
Y.util = {
    getId: function(id)//获取id的函数 
    {
        if (document.getElementById && document.getElementById(id)) {
            return document.getElementById(id); // W3C DOM
        } else if (document.all && document.all(id)) {
            return document.all(id); // MSIE 4 DOM
        } else if (document.layers && document.layers[objectId]) {
            return document.layers[id]; // NN 4 DOM.. note: this won't find nested layers
        } else {
            return false;
        }
    },
    getBrowser: function() {
        var browser = {};
        var userAgent = navigator.userAgent.toLowerCase();
        browser.IE = /msie/.test(userAgent);
        browser.OPERA = /opera/.test(userAgent);
        browser.MOZ = /gecko/.test(userAgent);
        browser.IE6 = /msie 6/.test(userAgent);
        browser.IE7 = /msie 7/.test(userAgent);
        browser.IE8 = /msie 8/.test(userAgent);
        browser.IE9 = /msie 9/.test(userAgent);
        browser.IE10 = /msie 10/.test(userAgent);
        browser.SAFARI = /safari/.test(userAgent);
        browser.CHROME = /chrome/.test(userAgent);
        browser.IPHONE = /iphone os/.test(userAgent);
        browser.MAXTHON = /maxthon/.test(userAgent);
        return browser;
    },
    userAgent: function() {
        var ua = navigator.userAgent.toLowerCase();
        var match = /(webkit)[ \/]([\w.]+)/.exec(ua) ||
                /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua) ||
                /(msie) ([\w.]+)/.exec(ua) ||
                !/compatible/.test(ua) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) ||
                [];
        //match[2]判断版本号
        switch (match[1]) {
            case "msie": //ie
                if (parseInt(match[2]) == 6)//ie6
                    return ("ie6");
                else if (parseInt(match[2]) == 7)//ie7
                    return ("ie7");
                else if (parseInt(match[2]) == 8)//ie8
                    return ("ie8");
                else if (parseInt(match[2]) == 9)//ie9
                    return ("ie9");
                else
                    return ("ie");
                break;
            case "webkit": //safari or chrome
                return ("chrome");
                break;
            case "opera": //opera
                return ("opera");
                break;
            case "mozilla": //Firefox
                return ("firefox");
                break;
            default:
                return ("other");
                break;
        }
    },
    setHome: function(obj, url)//设置主页 eg:setHome(this,window.location);
    {
        if (userAgent() == 'chrome') {
            alert("您的浏览器不支持该操作，请使用浏览器菜单手动设置.");
            return true;
        }
        if (document.all) {
            document.body.style.behavior = 'url(#default#homepage)';
            document.body.setHomePage(url);
        } else if (window.sidebar) {
            if (window.netscape) {
                try {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                } catch (e) {
                    alert("您的浏览器不支持该操作，请使用浏览器菜单手动设置.");
                    return true;
                }
            }
            if (window.confirm("你确定要设置" + url + "为首页吗？") == 1) {
                var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                prefs.setCharPref('browser.startup.homepage', url);
            }
        }
    },
    addFavorite: function(sURL, sTitle)//添加收藏夹 eg:addFavorite(document.location.href,document.title)
    {
        if (document.all) {
            window.external.addFavorite(sURL, sTitle); //IE 360 世界之窗
        }
        else if (window.sidebar) {
            window.sidebar.addPanel(sTitle, sURL, ""); //FF
        }
        else {
            alert("你可以尝试通过快捷键Ctrl+D加入收藏夹~"); //谷歌 搜狗 猎豹
        }
    },
    getParameter: function(name) //Parameter获取地址栏参数值//别名函数QueryString
    {
        if (arguments.length < 1) //Params 数组
        {
            var url = location.search; //获取url中"?"符后的字串
            var requestArray = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    requestArray[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
                }
            }
            return requestArray;
        }
        else if (arguments.length == 1) //Param 单个
        {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]); return null;
        }
    },
    QueryString: function(name) { return this.getParameter(name); }, //别名函数getParameter
    hasClass: function(ele, cls) //判断类样式
    {
        return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    },
    addClass: function(ele, cls) //添加类样式
    {
        if (!this.hasClass(ele, cls))
            ele.className += " " + cls;
    },
    removeClass: function(ele, cls) //移除类样式
    {
        if (this.hasClass(ele, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            ele.className = ele.className.replace(reg, ' ');
        }
    },
    className: function(n) {
        var el = [], _el = document.getElementsByTagName('*');
        for (var i = 0; i < _el.length; i++) {
            if (_el[i].className == n) {
                el[el.length] = _el[i];
            }
        }
        return el;
    },
    addEvent: function(elem, type, handle)//绑定事件 addEvent(getById("s1_1"),"click",function(){ alert("绑定事件"); });
    {
        if (elem.addEventListener) {//firefox
            elem.addEventListener(type, handle, false);
        } else if (elem.attachEvent) {//IE
            elem.attachEvent("on" + type, handle);
        } else {
            elem["on" + type] = handle;
        }
    },
    removeEvent: function(elem, type, handle)//移除事件
    {
        if (elem.removeEventListener) {//firefox
            elem.removeEventListener(type, handle, false);
        } else if (elem.detachEvent) {//IE
            elem.detachEvent("on" + type, handle);
        } else {
            elem["on" + type] = null;
        }
    },
    json2str: function(o) {
        var arr = [];
        var fmt = function(s) {
            if (typeof s == 'object' && s != null)
                return json2str(s);
            //return /^(string|number)$/.test(typeof s) ? "'" + s + "'" : s;
            return s;
        };
        for (var i in o)
            arr.push(i + "=" + fmt(o[i]));
        return arr.join('&');
    },
    funPlaceholder: function(element)//文本框placeholder 
    {
        //检测是否需要模拟placeholder  
        var placeholder = '';
        if (element && !("placeholder" in document.createElement("input")) && (placeholder = element.getAttribute("placeholder"))) {
            var idLabel = element.id;//当前文本控件是否有id, 没有则创建
            if (!idLabel) {
                idLabel = "placeholder_" + new Date().getTime();
                element.id = idLabel;
            }
            //创建label元素  
            var eleLabel = document.createElement("label");
            eleLabel.htmlFor = idLabel;
            eleLabel.style.position = "absolute";  
            eleLabel.style.margin = "2px 0 0 3px";
            eleLabel.style.color = "graytext";
            eleLabel.style.cursor = "text";
            //插入创建的label元素节点  
            element.parentNode.insertBefore(eleLabel, element); 
            element.onfocus = function() {
                eleLabel.innerHTML = "";
            };
            element.onblur = function() {
                if (this.value === "") {
                    eleLabel.innerHTML = placeholder;
                } 
            }; 
            if (element.value === "") {
                eleLabel.innerHTML = placeholder;
            }
        }  
    },
    mouseCoords: function(ev)//鼠标位置取得
    {
        if (ev.pageX || ev.pageY) {
            return { x: ev.pageX, y: ev.pageY };
        }
        return {
            x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
            y: ev.clientY + document.body.scrollTop - document.body.clientTop
        };
    },
    HTMLEncode: function(html) {
        var temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    },
    HTMLDecode: function(text) {
        var temp = document.createElement("div");
        temp.innerHTML = text;
        var output = temp.innerText || temp.textContent;
        temp = null;
        return output;
    },
    refresh: function(url)//刷新页面
    {
        window.location.href = url;
    },
    refreshIframe: function(id)//刷新指定iframe
    {
        var iframe = this.getId(id);
        iframe.src = iframe.src;
    },
    preloadImages: function() //预加载图片
    {
        var d = document;
        if (d.images) {
            if (!d.p_i_a) d.p_i_a = new Array();
            var i, j = d.p_i_a.length, a = arguments;
            for (i = 0; i < a.length; i++) {
                d.p_i_a[j] = new Image();
                d.p_i_a[j++].src = a[i];
            }
        }
    },
    getFileSize:function (path) //得到文件大小KB
    {
        var fso, f1;
        fso = new ActiveXObject("Scripting.FileSystemObject");
        f1 = fso.GetFile(path);
        return f1.Size / 1024.0;
    }
};


Y.cookie = {
    isEnable: function() {//是否禁用cookie
        var result = false;
        if (navigator.cookiesEnabled) return true;
        document.cookie = "testcookie=yes;";
        var cookieSet = document.cookie;
        if (cookieSet.indexOf("testcookie=yes") > -1)
            result = true;
        document.cookie = "";
        return result;
    },
    get: function(name) {
        if (!this.isEnable()) {
            alert("您的浏览器的Cookie功能被禁用，请开启；推荐操作：浏览器工具-->INTERNET选项-->隐私-->Cookie安全级别设置为中!");
            return null;
        }
        var r = new RegExp("(^|;|\\s+)" + name + "=([^;]*)(;|$)");
        var m = document.cookie.match(r);
        return (!m ? "" : unescape(m[2]));
    },
    getChild: function(cookieName, cookieChildName) {//获取cookie子键的值
        var cookieVal = get(cookieName);
        if (cookieVal == null)
            return null;
        var childCookies = cookieVal.split('&');
        var szChildValue = "";
        for (var i = 0; i < childCookies.length; i++) {
            //substr 方法用于返回一个从指定位置开始的指定长度的子字符串。
            //语法：stringObject.substr(start [, length ])
            if (childCookies[i].replace(/(^\s+)|(\s+$)/g, "").substr(0, cookieChildName.length) == cookieChildName) {
                szChildValue = childCookies[i].replace(/(^\s+)|(\s+$)/g, "").substr(cookieChildName.length + 1);
                break;
            }
        }
        return szChildValue;
    },
    set: function(cookieName, value, days, domain)//设置cookie
    {
        if (!this.isEnable()) {
            alert("您的浏览器的Cookie功能被禁用，请开启；推荐操作：浏览器工具-->INTERNET选项-->隐私-->Cookie安全级别设置为中!");
            return;
        }
        var expire = new Date();
        if (days == null || days == 0) days = 1;
        expire.setTime(expire.getTime() + days * 24 * 60 * 60 * 1000); //getTime():1970/01/01至今毫秒数
        var re = new RegExp("(?:;?" + cookieName + "\s*=)\w+[^;];*");
        var sCookie = document.cookie;
        if (re.test(sCookie)) {
            document.cookie = sCookie.replace(re, escape(value) + ";");
        }
        else {
            document.cookie = cookieName + "=" + escape(value) + ";" + (domain ? ("domain=" + domain) + ";" : '') + "expires=" + expire.toGMTString();
        }
    },
    del: function(name, domain, path) {
        if (!this.isEnable()) {
            alert("您的浏览器的Cookie功能被禁用，请开启；推荐操作：浏览器工具-->INTERNET选项-->隐私-->Cookie安全级别设置为中!");
            return;
        }
        document.cookie = name + "=;" + (domain ? ("domain=" + domain + ";") : '') + "expires=" + (new Date(0)).toGMTString();
    }
};
Y.validate = {};
Y.app = {};
Y.fn = Y.prototype = {};
Y.extend = Y.fn.extend = {};

//功能;
//延时事件;
function setDeferEvent(type, action, time) {
    if (trim(time).length == 0) time = 1;
    if (typeof (time) != "number") time = 1;

    switch (type.toLowerCase()) {
        case "go":
            window.setTimeout("window.location='" + action + "'", time);
            break;
        case "alert":
            window.setTimeout("alert('" + action + "')", time);
            break;
        case "js":
        case "javascript":
            window.setTimeout("'" + action.toString() + "'", time);
            break;
        default:
            alert("Nothing will do!");
            break
    }
}
function addLoadListener(handler) {
    if (typeof window.addEventListener != 'undefined')
        window.addEventListener('load', handler, false);
    else if (typeof document.addEventListener != 'undefined')
        document.addEventListener('load', handler, false);
    else if (typeof window.attachEvent != 'undefined')
        window.attachEvent('onload', handler);
};
function addEventListener(element, eventType, handler, capture) {
    try {
        if (element.addEventListener)
            element.addEventListener(eventType, handler, capture);
        else if (element.attachEvent)
            element.attachEvent("on" + eventType, handler);
    }
    catch (e) { }
};

function removeEventListener(element, eventType, handler, capture) {
    try {
        if (element.removeEventListener)
            element.removeEventListener(eventType, handler, capture);
        else if (element.detachEvent)
            element.detachEvent("on" + eventType, handler);
    }
    catch (e) { }
};


/*****Image Start******/
function imageAutoSize(obj, width) //处理图片自适应大小
{
    var image = new Image();
    image.src = obj.src;
    var imagew = image.width;
    var imageh = image.height;
    if (imagew > width) {
        obj.height = (imageh * width) / imagew;
        obj.width = width;
    }
}
function reSizeThis(_obj) {
    var _img = new Image();
    _img.src = _obj.src;
    if (_img.width > 500) {
        _obj.width = 500;
    }
}
//等比例缩放 img
function reSizeImg(_obj) {
    var w = 100;
    var h = 75;
    var _img = new Image();
    _img.src = _obj.src;
    _h = _img.height;
    _w = _img.width;
    _is = _h / _w;
    _r = w / h;
    //说明 要对高进行缩放 宽自适应
    if (_h > h || _w > w) {
        if (_is > _r) {
            _obj.height = h;
        } else {
            _obj.width = w;
        }
    }
}
/*****Image Start******/

/***日期时间 Start***/
function DateWeek()//输出日期-星期
{
    var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    todayDate = new Date();
    date = todayDate.getDate();
    month = todayDate.getMonth() + 1;
    year = todayDate.getFullYear();
    var DateHTML = year + "年" + month + "月" + date + "日 ";
    DateHTML += " " + weeks[todayDate.getDay()];
    document.write(DateHTML);
}

var _timerID = null;
var _timerRunning = false;
function StopClock() {
    if (_timerRunning)
        clearTimeout(_timerID);
    timerRunning = false;
}
function StartClock() {
    StopClock();
    ShowTime();
}
function ShowTime() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var timeValue = "" + ((hours >= 12) ? "下午 " : "上午 ");
    timeValue += ((hours > 12) ? hours - 12 : hours);
    timeValue += ((minutes < 10) ? ":0" : ":") + minutes;
    timeValue += ((seconds < 10) ? ":0" : ":") + seconds;
    document.getElementById("RunningTime").innerHTML = timeValue;
    _timerID = setTimeout("ShowTime()", 1000);
    _timerRunning = true;
}
/***日期时间 End***/

/***正在加载特效．．．．． Start***/
var _dots = 0;
var _dotmax = 5;
var _timeWaitID;
function ShowWait()//正在加载
{
    var _output = "";
    _dots++;
    if (_dots >= _dotmax)
        _dots = 0;
    for (i = 0; i <= _dots; i++) {
        _output += '．';
    }
    document.getElementById("divDot").innerHTML = "<span style=\"float:left;\">正在加载</span><span style=\"float:left;margin-top:-4px;\">" + _output + "</span>";
}
function StartShowWait(appendObj) //eg:StartShowWait(document.body);
{
    var oDot = document.createElement("div");
    oDot.id = "divDot";
    oDot.className = "dots";
    oDot.style.height = "24px";
    oDot.style.width = "160px";
    oDot.style.lineHeight = "24px";
    oDot.style.margin = "0 auto";
    appendObj.appendChild(oDot);
    oDot.style.display = "block";
    _timeWaitID = window.setInterval('ShowWait()', 1000);
}
function StopHideWait() {
    var oDot = document.getElementById("divDot");
    if (oDot != null) {
        oDot.style.display = "none";
        oDot.parentNode.removeChild(oDot);
    }
    window.clearInterval(_timeWaitID);
}
/***正在加载．．．．． End***/

/******checkbox复选框 Start******/
function CheckboxCheckedValID(objID, separator) //获得id里面的CheckBoxList选中项的值
{
    var tempVal = "";
    var checkboxlist = document.getElementById(objID);
    var chkinput = checkboxlist.getElementsByTagName("input");
    for (var i = 0; i < chkinput.length; i++) {
        if (chkinput[i].type == "checkbox") {
            if (chkinput[i].checked) {
                tempVal += chkinput[i].value + separator;
            }
        }
    }
    if (tempVal != "")
        tempVal = tempVal.substring(0, tempVal.length - separator.length);
    return tempVal;
}

function CheckboxCheckedVal(objName, separator) //获得CheckBoxList选中项的值
{
    var checkboxlist = document.getElementsByName(objName);
    var array = new Array();
    var ai = 0;
    for (var i = 0; i < checkboxlist.length; i++) {
        if (checkboxlist[i].type == "checkbox") {
            if (checkboxlist[i].checked) {
                array[ai] = checkboxlist[i].value;
                ai++;
            }
        }
    }
    return array.join(separator);
    /*方法2*/
    //    var tempVal = "";
    //    var checkboxlist = document.getElementsByName(objName);
    //    for (var i = 0; i < checkboxlist.length; i++) {
    //        if (checkboxlist[i].type == "checkbox") {
    //            if (checkboxlist[i].checked) {
    //                tempVal += checkboxlist[i].value + separator;
    //            }
    //        }
    //    }
    //    if (tempVal != "")
    //        tempVal = tempVal.substring(0, tempVal.length - separator.length);
    //    return tempVal;
}

function CheckboxChecked(objName, Value, separator) //设置checkbox选中项
{
    var array = new Array();
    array = Value.split(separator);
    var Aggregate = document.getElementsByName(objName);
    for (k = 0; k < array.length; k++) {
        for (i = 0; i < Aggregate.length; i++) {
            if (Aggregate[i].value == array[k]) {
                Aggregate[i].checked = true;
                break;
            }
        }
    }
}

function ClickCheckAll(Obj, ObjName) //checkbox全选与全不选
{
    var Checkboxs = document.getElementsByName(ObjName);
    if (Checkboxs != null) {
        if (Obj.checked == true) {
            for (i = 0; i < Checkboxs.length; i++) {
                if (Checkboxs[i].type == "checkbox")
                    Checkboxs[i].checked = true;
            }
        }
        else {
            for (i = 0; i < Checkboxs.length; i++) {
                if (Checkboxs[i].type == "checkbox")
                    Checkboxs[i].checked = false;
            }
        }
    }
}

function CheckboxSelectAll(objName) //全选
{
    var objs = document.getElementsByName(objName);
    for (var i = 0; i < objs.length; i++) {
        if (objs[i].type == "checkbox") {
            objs[i].checked = true;
        }
    }
}

function CheckboxUnselectAll(objName) //全不选 
{
    var objs = document.getElementsByName(objName);
    for (var i = 0; i < objs.length; i++) {
        if (objs[i].type == "checkbox") {
            if (objs[i].checked) {
                objs[i].checked = false;
            }
        }
    }
}

function CheckboxUnselect(objName) //反选 
{
    var objs = document.getElementsByName(objName);
    for (var i = 0; i < objs.length; i++) {
        if (objs[i].type == "checkbox") {
            if (objs[i].checked) {
                objs[i].checked = false;
            }
            else {
                objs[i].checked = true;
            }
        }
    }
}

//高级功能
function CheckboxChangeRadioMore(objName) //一组checkbox变成一组单选按钮
{
    var objs = document.getElementsByName(objName);
    for (var k = 0; k < objs.length; k++) {
        objs[k].attachEvent("onclick", hooyesFnX(k)); //为每一个checkbox绑定一个onclick事件
    }
    function hooyesFnX(x) {
        return function() {
            for (var l = 0; l < objs.length; l++) {
                if (x != l)
                    objs[l].checked = false; //如果不是当前选中的,则将其状态改为false
                else
                    objs[l].checked = true; //如果是当前选中的,则状态保持
            }
        }
    }
}

function CheckboxChangeRadioSingle(objItem) //单个checkbox变成单个单选按钮
{
    if (objItem.checked == false) {
        objItem.checked = true;
    }
}
/******checkbox End******/

/******radio单选按钮 Start******/
function RadioCheckedVal(objName) //获取radio选中项的值
{
    var tempVal = "";
    var objs = document.getElementsByName(objName);
    for (var i = 0; i < objs.length; i++) {
        if (objs[i].checked) {
            tempVal = objs[i].value;
            break;
        }
    }
    return tempVal;
}

function RadioCheckedValID(objID, separator)//获取radio选中项的值
{
    var tempVal = "";
    var rdolist = document.getElementById(objID);
    var objs = rdolist.getElementsByTagName("input");
    for (var i = 0; i < objs.length; i++) {
        if (objs[i].type == "radio") {
            if (objs[i].checked)
                tempVal += objs[i].value + separator;
        }
    }
    if (tempVal != "")
        tempVal = tempVal.substring(0, tempVal.length - separator.length);
    return tempVal;
}

function RadioChecked(objName, Value) //设置radio选中项
{
    var Aggregate = document.getElementsByName(objName);
    for (i = 0; i < Aggregate.length; i++) {
        if (Aggregate[i].value == Value) {
            Aggregate[i].checked = true;
            break;
        }
    }
}

//高级功能
var tempradio = null;
function RadioChangeCheckboxSingle(checkedRadio) //单个radio变成单个checkbox
{
    if (tempradio == checkedRadio) {
        tempradio.checked = false;
        tempradio = null;
    }
    else {
        tempradio = checkedRadio;
        checkedRadio.checked = true;
    }
}

var tempradioA = null;
function RadioChangeCheckboxMore(objID) //一组单选按钮变成一组checkbox
{
    var rdolist = document.getElementById(objID);
    var objs = rdolist.getElementsByTagName("input");
    for (var k = 0; k < objs.length; k++) {
        if (objs[k].type == "radio") {
            objs[k].attachEvent("onclick", hooyesFnY(k)); //为每一个radio绑定一个onclick事件
        }
    }
    function hooyesFnY(x) {
        return function() {
            if (tempradioA == objs[x]) {
                tempradioA.checked = false;
                tempradioA = null;
            }
            else {
                tempradioA = objs[x];
                objs[x].checked = true;
            }
        }
    }
}
/******radio End******/

/******select option下拉列表 Start******/
function SelectOptionChecked(ObjID, Value) //设置下拉列表选中的值
{
    var _Obj = document.getElementById(ObjID);
    for (i = 0; i < _Obj.options.length; i++) {
        if (_Obj.options[i].value == Value) {
            _Obj.options[i].selected = true;
            break;
        }
    }
}

function SelectOptionAdd(ObjID, Values, Texts)//下拉列表添加选项option
{
    var _Obj = document.getElementById(ObjID);
    for (var i = 0; i < Values.length; i++) {
        _Obj.options.add(new Option(Texts[i], Values[i]));
    }
}

function GetSelectOptionVal(ObjID)//下拉列表选中值
{
    var _Obj = document.getElementById(ObjID);
    return _Obj.options(_Obj.selectedIndex).value;
}
