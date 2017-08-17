/// <reference path="D:\工作项目\ShangYeMHWebSite\WebSite\WebUI/js/jquery/jquery-1.4.1.min.js" />
var Tween = { Linear: function (t, b, c, d) { return c * t / d + b; } }
function pageIndex(jqobj, count, fun) {
    var isComplete = true, current = 0;
    jqobj.each(function (i) {
        $(this).attr("index", i);
    })
    jqobj.click(function () {
        if (!isComplete) return;
        var index = parseInt($(this).attr("index"));
        if (current > index) {
            var c = current - index;
            scrollwrap(-($(window).height() * c));
        } else if (current < index) {
            var c = index - current;
            scrollwrap(($(window).height() * c));
        }
        current = index;
    });
    function scrollwrap(value) {
        var currenth = current * ($(window).height());
        var t = 0, d = 30;
        function _run() {
            if (t < d) {
                isComplete = false;
                t++;
                var top = Math.ceil(Tween.Linear(t, currenth, value, d));
                window.scrollTo(0, top);
                setTimeout(_run, 10);
            } else {
                isComplete = true;
                if (fun) fun(current);
            }
        }
        _run();
    }
    $(document).bind('mousewheel', function (event, delta) {
        if (!isComplete) return;
        if (delta > 0) {
            if (current == 0) return;
            scrollwrap(-($(window).height()));
            current--;
        }
        else {
            if (current >= count - 1) return;
            scrollwrap(($(window).height()));
            current++;
        }
    });
    //键盘上下箭头事件
    $(document).keydown(function (event) {
        if (event.keyCode == 38) {  //按了上箭头   
            if (!isComplete) return;
            if (current == 0) return;
            scrollwrap(-($(window).height()));
            current--;
        }
        else if (event.keyCode == 40) { //按了下箭头
            //向下2
            if (current >= count - 1) return;
            scrollwrap(($(window).height()));
            current++;
        }
        //$(".items>li").eq(current).addClass("e").siblings("li").removeClass("e");
    })
    return function setScreen(index) {
        if (current > index) {
            var c = current - index;
            scrollwrap(-($(window).height() * c));
        } else if (current < index) {
            var c = index - current;
            scrollwrap(($(window).height() * c));
        }
        current = index;
    }
}