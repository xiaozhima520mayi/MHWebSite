$(function () {
    $("#fadetab li").mouseover(function () {
        var indexs = $(this).index();
        $(this).addClass("current").siblings("li").removeClass("current");
        $("#fadecon").find(".sublist").hide();
        $("#fadecon").find(".sublist").eq(indexs).show();
    })
    $("#fadetab2 li").mouseover(function () {
        var indexs = $(this).index();
        $(this).addClass("current").siblings("li").removeClass("current");
        $("#fadecon2").find(".sublist").hide();
        $("#fadecon2").find(".sublist").eq(indexs).show();
    })
    $("#fadetab3 li").mouseover(function () {
        var indexs = $(this).index();
        $(this).addClass("current").siblings("li").removeClass("current");
        $("#fadecon3").find(".sublist").hide();
        $("#fadecon3").find(".sublist").eq(indexs).show();
    })
})