
$(function () {
    //第一屏打字效果调用
    sayHello($(".hellotext_wrapper"), "这次革新，将彻底改变您的用户体验...");
})
//打字方法
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
