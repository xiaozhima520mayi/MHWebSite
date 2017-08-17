//获取ID
function getById(acre) {
    return document.getElementById(acre);
}
/*浮层区域*/
function onscrolls(backtop) {
    var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;
    if (isIE6) {
        backtop.style.position = "absolute";
        backtop.style.top = (document.documentElement.scrollTop) + 0 + "px";
        backtop.style.left = "0px";
    }
    else {
        backtop.style.position = "fixed";
        backtop.style.top = 0 + "px";
        backtop.style.left = "0px";
    }
}
$(function () {
    $(".ab_nav a").click(function () {
        $(this).addClass("e").siblings("a").removeClass("e");
    })
    //Ie6下支持头部fixed属性
    onscrolls(getById("ab_nav"));
})

window.onscroll = function () {
    //Ie6下支持头部fixed属性
    onscrolls(getById("ab_nav"));
    if (document.documentElement.scrollTop < 768) {
        $(".ab_nav a").removeClass("e");
        $(".ab_nav a").eq(0).addClass("e");
    }
    else if (document.documentElement.scrollTop < 1022) {
        $(".ab_nav a").removeClass("e");
        $(".ab_nav a").eq(1).addClass("e");
    }
    else if (document.documentElement.scrollTop < 1400) {
        $(".ab_nav a").removeClass("e");
        $(".ab_nav a").eq(2).addClass("e");
    }
}
//页面刷新回到第一屏
function getSreenHeight() {
    setTimeout(function () { $(window).scrollTop(0); }, 500)
}
getSreenHeight();