
$(document).ready(function () {
    setTimeout(function () { setHeight();}, 200);

});

function setHeight() {
    var fbl = $(window).height();

    if (fbl <= 768) {
        $(".wdmapdiv").css("margin-top", "10px");
        $(".wdmapdiv").css("margin-left", "220px");
        var mh = $("#mainMap").height();
        var mw = $("#mainMap").width();
        $("#mainMap").height(mh * 0.734);
        $("#mainMap").width(mw * 0.734);
        $(".citybg").each(function () {
            var l = parseInt($(this).css("left"));
            var t = parseInt($(this).css("top"));
            $(this).css("left", l * 0.734 + "px");
            $(this).css("top", t * 0.734 + "px");

            var ql = parseInt($(this).find(".qi").css("left"));
            var qt = parseInt($(this).find(".qi").css("top"));
            $(this).find(".qi").css("left", ql * 0.734 + "px");
            $(this).find(".qi").css("top", qt * 0.734 + "px");
        });
        setTimeout(function () {
            $(".citybg").find("img").each(function () {
                var h = $(this).height();
                var w = $(this).width();
                $(this).height(h * 0.734);
                $(this).width(w * 0.734);
            });
        }, 100);

        $(".city a").each(function () {
            var l = parseInt($(this).css("left"));
            var t = parseInt($(this).css("top"));
            $(this).css("left", l * 0.734 + "px");
            $(this).css("top", t * 0.734 + "px");
        });

        var sl = parseInt($(".shanghaiqi").css("left"));
        var st = parseInt($(".shanghaiqi").css("top"));
        $(".shanghaiqi").css("left", sl * 0.734 + "px");
        $(".shanghaiqi").css("top", st * 0.734 + "px");
        $(".city a").css("font-size", "12px");
    }
}

function currentMap() {
    var current = 1;
    var index = $(".wdmap>.city").length;
    var setIn = setInterval(function () {
        showMap(current);
        current = parseInt(current) + 2;
        if (current >= index)
            clearInterval(setIn);
    }, 500);
}

function showMap(current) {
    var $con = $(".wdmap>.city:eq(" + current + ")");
    var $con1 = $(".wdmap>.city:eq(" + (current + 1) + ")");

    //$con.find(".citybg>img:eq(0)").hide();
    //$con.find(".citybg>img:eq(1)").show();
    //$con.find(".citybg>span").show();

    //$con1.find(".citybg>img:eq(0)").hide();
    //$con1.find(".citybg>img:eq(1)").show();
    //$con1.find(".citybg>span").show();
    //$con.find(".citybg>img:eq(1)").animate({ opacity: "show" }, 1500);
    //$con.find(".citybg>span").animate({ opacity: "show" }, 1500);
    //$con.find(".citybg>img:eq(1)").fadeIn();
    //$con.find(".citybg>span").fadeIn();

    $con.find(".citybg>img:eq(0)").fadeOut(1000);
    $con.find(".citybg>img:eq(1)").fadeTo(1000, 1);
    $con.find(".citybg>span").fadeTo(1000, 1);

    $con1.find(".citybg>img:eq(0)").fadeOut(1000);
    $con1.find(".citybg>img:eq(1)").fadeTo(1000, 1);
    $con1.find(".citybg>span").fadeTo(1000, 1);
}