//屏幕高度自适应
function imgH() {
    var screenH = $(window).height();
    //$(".screen").height(screenH - 44);
    $(".screen").height(screenH);
    $(".mm").each(function (i) {
        var thisH = $(this);
        var mainH = $(thisH).height();
        var heights =((screenH - mainH) / 2) * 0.6;
        if (heights > 0) {
        $(thisH).css("margin-top", heights);
        }
        else {
            $(thisH).css("margin-top", "5px");
        }
    })
}
//第一屏打字效果方法
function sayHello(heading, text) {
    var helloText = text,
    letters = helloText.split('');
    say();
    setInterval(function () {
        heading.addClass('blinking-cursor');
        heading.html('');
        say();
    }, letters.length * 100 + 5000);
    function say() {
        $.each(letters, function (i, v) {
            setTimeout(function () {
                heading.append('<b>' + v + '</b>');
                if (i == letters.length - 1) {
                    heading.removeClass('blinking-cursor');
                }
            }, i * 100);
        });
    }
}
$(function () {
    //屏幕高度自适应调用
    imgH();
    //下箭头提示效果
    var div = $(".downtb");
    function runIt() {
        div.show("fast");
        div.animate({ bottom: '+=25', "opacity": 0.8 }, 800, 'easeInOutQuad').animate({ bottom: '-=25', "opacity": 0.5 }, 800, 'easeInOutQuad');
        div.show("fast");
        div.animate({ bottom: '+=25', "opacity": 0.8 }, 800, 'easeInOutQuad').animate({ bottom: '-=25', "opacity": 0.5 }, 800, 'easeInOutQuad');
    }
    setInterval(function () {
        div.show("fast");
        div.animate({ bottom: '+=25', "opacity": 0.8 }, 800, 'easeInOutQuad').animate({ bottom: '-=25', "opacity": 0.5 }, 800, 'easeInOutQuad');
    }, 800);

    //第一屏打字效果调用
    sayHello($(".hellotext_wrapper"), "这次革新，将彻底改变您的用户体验...");
})

