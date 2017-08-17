///=======================================================
/// Author:  Qin
/// Date:    2009-11-07
/// Desc:    该文件中包含了一些常用的JS函数
///=======================================================
var CommonBase = {};

///=======================================================
/// Function Name:Asy
/// Function Desc:获取异步对象
///=======================================================
CommonBase.Asy = function (t) {
    CommonBase.domain();
    CommonBase.AsyObj = t.contentWindow;
}
CommonBase.AsyObj = null;
///=======================================================
/// Function Name:domain
/// Function Desc:设置域
///=======================================================
CommonBase.domain = function () {
    document.domain = window.location.host.match(/[^.]+\.[^.]+$/)[0];
}

///=======================================================
/// Function Name:format
/// Function Desc:格式化时间
///=======================================================
Date.prototype.format = function (style) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),      //day
        "h+": this.getHours(),     //hour
        "m+": this.getMinutes(),   //minute
        "s+": this.getSeconds(),   //second
        "w+": "天一二三四五六".charAt(this.getDay()),   //week
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(style)) {
        style = style.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(style)) {
            style = style.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return style;
};
///=======================================================
/// Function Name:format
/// Function Desc:格式化字符串
///=======================================================
String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function (m, i) {
        return args[i];
    });
};
///=======================================================
/// Function Name:TimeSpan
/// Function Desc:时间差
///=======================================================
Date.prototype.TimeSpan = function (endTime) {
    var date3 = endTime.getTime() - this.getTime();  //时间差的毫秒数
    //计算出相差天数
    var days = Math.round(date3 / (24 * 3600 * 1000));
    //计算出小时数
    var leave1 = date3 % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
    var hours = Math.floor(leave1 / (3600 * 1000));
    //计算相差分钟数
    var leave2 = leave1 % (3600 * 1000);        //计算小时数后剩余的毫秒数
    var minutes = Math.floor(leave2 / (60 * 1000));
    //计算相差秒数
    var leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
    var seconds = Math.round(leave3 / 1000);
    return { d: days, h: hours, m: minutes, s: seconds };
}
///=======================================================
/// Function Name:toTime
/// Function Desc:字符串转换成时间格式
///=======================================================
String.prototype.toTime = function () {
    var val = this.match(/\d+|\D+/g);
    var st = "";
    if (val.length == 11)
        st = val[0] + "/" + val[2] + "/" + val[4] + " " + val[6] + ":" + val[8] + ":" + val[10];
    else if (val.length == 5)
        st = val[0] + "/" + val[2] + "/" + val[4];
    var dt = Date.parse(st)
    return new Date(dt);
}
///=======================================================
/// Function Name:addFavorites
/// Function Desc:添加到收藏夹
///=======================================================
function addFavorites(title, url) {
    var urls = url || location.href;
    if (window.sidebar) {
        window.sidebar.addPanel(title, urls, "");
    } else if (document.all) {
        window.external.AddFavorite(urls, title);
    } else if (window.opera && window.print) {
        var mbm = document.createElement('a');
        mbm.setAttribute('rel', 'sidebar');
        mbm.setAttribute('href', urls);
        mbm.setAttribute('title', title);
        mbm.click();
    } else {
        alert("收藏失败！请使用Ctrl+D进行收藏");
    }
}
///=======================================================
/// Function Name:setHome
/// Function Desc:设为首页
///=======================================================
function setHome(url) {
    var urls = url || location.href;
    if (document.all) {
        document.body.style.behavior = 'url(#default#homepage)';
        document.body.setHomePage(urls);
    } else if (window.sidebar) {
        if (window.netscape) {
            try {
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            } catch (e) {
                alert("该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入about:config,然后将项signed.applets.codebase_principal_support值改为true");
            }
        }
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage', urls);
    }
}
function IsIp(ip) {
    var exp = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    var reg = ip.match(exp);
    if (reg == null) {
        return false;
    }
    else {
        return true;
    } 
}
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.displayHtml = function () {
    return this.replace("&amp;", "&").replace("&amp", "&").replace("&quot;", "\"").replace("&lt;", "<").replace("&gt;", ">").replace("'';", "'");
}
function toggleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement) {  // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else {
            $.tips.Alert.Warning({ Content: "该功能目前只支持Firefox,Google Chrome,Safair最新版", IsCancel: "no", OKClass: "bot_confirm" });
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        } else {
            $.tips.Alert.Warning({ Content: "该功能目前只支持Firefox最新版", IsCancel: "no", OKClass: "bot_confirm" });
        }
    }
}