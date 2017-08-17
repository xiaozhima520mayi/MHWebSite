

$(function () {
    var encywidth = $(".ency_noe .main1250").width();
    var encyheight = $(".ency_noe .img").height();
    var imgwidth = $(".ency_noe .img img").width();
    $(".ency_noe .img .img1").css("left", (encywidth - imgwidth) / 2);
    $(".ency_noe .img .img2").css("left", (encywidth - imgwidth) / 2);
    $(".ency_noe .img .img3").css("left", (encywidth - imgwidth) / 2);
    animate1();
    //百科第二屏图片
    $(".ency_two .tab_but>a").hover(function () {
        $(".ency_two .tab_but a").removeClass("e");
        $(this).addClass("e");
        var index = $(this).index();
        if (index == 1) {
            $(this).parent(".tab_but").siblings(".pic_tab").children("ul").animate({ left: "-1000px" })
        }
        else if (index == 0) {
            $(this).parent(".tab_but").siblings(".pic_tab").children("ul").animate({ left: "0" })
        }
    });
})
function animate1() {
    //百科第一屏图片
    $(".ency_noe .img .img1").animate({ bottom: "0", opacity: '1' }, 500, function () {
        $(".ency_noe .img .img2").animate({ bottom: "0", opacity: '1' }, 800, function () {
            $(".ency_noe .img .img3").animate({ bottom: "53px", opacity: '1' }, 1100);
        });
    });
}
//页面刷新回到第一屏
function getSreenHeight() {
    setTimeout(function () { $(window).scrollTop(0); }, 500)
}
getSreenHeight();