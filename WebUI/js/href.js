//参数1、低版本//参数2、本页面//参数3、高版本页面
function isBrowser(href, curHref, heiHref) {
    //升级浏览器area
    var browser = {
        ua: navigator.userAgent.toLowerCase(),
        msie: function () {
            return /msie/.test(this.ua);
        },
        ie6: function () {
            var self = this;
            return self.msie() && /msie 6./.test(self.ua);
        },
        ie7: function () {
            var self = this;
            return self.msie() && /msie 7.0/.test(self.ua);
        },
        ie8: function () {
            var self = this;
            return self.msie() && /msie 8.0/.test(self.ua);
        }
    };
    if (browser.ie6() || browser.ie7()) { 
        if (curHref != href)
            location.href = href;
    }
    else {
        if (curHref != heiHref)
            location.href = heiHref;
    }
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURIComponent(r[2]); return null; //返回参数值
}