$(function () {
    isBrowser();
});

function isBrowser() {
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
    //$(".big_box").hide();
    //$("#update").show();
    if (browser.ie6() || browser.ie7()) {
        $(".big_box").hide();
        $("#update").show();
        setTimeout(function () { $("#fp-nav").css("position", "none"); }, 2000);
    }
    else {
        $(".big_box").show();
        $("#update").hide();
    }
}

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURIComponent(r[2]); return null; //返回参数值
}