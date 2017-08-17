/// <reference path="../jquery/jquery-1.8.0.min.js" />


$(function () {
    fnLoad();
    //每个模块的高==屏幕的高
    screenHight();
    var popW = $(window).width();
    var screenH = $(window).height();
    //营销中心切换
    Restab();
    //导航滑动切换

    $(".top_content p").each(function () {
        var ths = $(this);
        var tli = ths.find("a");
        var tle = ths.find(".tab_active");
        tli.mouseover(function () {
            FunLeft($(this).index());
        });
        $(".top_content p").mouseleave(function () {
            FunLeft(current);
        });
        tli.click(function () {
            current = $(this).index();
            $(this).addClass("e").siblings("a").removeClass("e");
        })
        $(".items>li").eq(current).addClass("e").siblings("li").removeClass("e");
        $(".top_content p a").eq(current).addClass("e").siblings("a").removeClass("e");
    });

    //头部关闭展开调用
    GNB();
    //第一屏打字效果调用
    sayHello($(".hellotext_wrapper"), "客户至上 基业长青   快乐   成功   分享");

    //下箭头提示效果
    var div = $(".downtb");
    function runIt() {
        div.show("fast");
        div.animate({ bottom: '+=15', "opacity": 0.8 }, 800, 'easeInOutQuad').animate({ bottom: '-=15', "opacity": 0.5 }, 800, 'easeInOutQuad');
        div.show("fast");
        div.animate({ bottom: '+=15', "opacity": 0.8 }, 800, 'easeInOutQuad').animate({ bottom: '-=15', "opacity": 0.5 }, 800, 'easeInOutQuad');
    }
    setInterval(function () {
        div.show("fast");
        div.animate({ bottom: '+=15', "opacity": 0.8 }, 800, 'easeInOutQuad').animate({ bottom: '-=15', "opacity": 0.5 }, 800, 'easeInOutQuad');
    }, 800);

    //客户案例图标切换
    $(".case .list ul li a").hover(function () {
        $(this).stop();
        $(this).animate({ top: '-74px' }, 300);
    }, function () {
        $(this).stop();
        $(this).animate({ top: '0' }, 300);
    });
    //申请试用点击弹出
    $("#trial").click(function () {
        $("#sqsy").fadeIn(500);
        $("#sqsy .pop_content").animate({ right: (popW - 1000) / 2 }, 500);
        var modalHeight2 = $("#sqsy").find(".pop_content").height();
        var screenHeight2 = $(window).height();
        var Tops2 = (screenHeight2 - modalHeight2) / 2 * 0.6;
        if (Tops2 > 30) {
            $("#sqsy").find(".pop_content").css("margin-top", Tops2);
        }
        else {
            $("#sqsy").find(".pop_content").css("margin-top", "30px");
        }
    });
    //申请试用点击关闭
    $(".pop_tit_ri a").click(function () {
        $("#sqsy").fadeOut(500);
        $("#sqsy .pop_content").animate({ right: -(popW - 1000) / 2 }, 500);
        $("#sqsy").find(".pop_content").css("margin-top", "0px");
        $(".checkNone").hide();
        $("#txtName").val("");
        $("#txtPhone").val("");
        $("#txtEMail").val("");
        $("#txtSchool").val("");
        $("#txtDept").val("");
        $("#txtJob").val("");
        $("#txtAName").val("");
        $("#txtAPhone").val("");
        $("#txtAEMail").val("");
        $("#txtASchool").val("");
        $("#txtAJob").val("");
        $("#txtATitle").val("");
        $("#txtMessage").val("");
    });
    //股东之声
    $(".GDZS").click(function () {
        $("#gudong").fadeIn(500);
        $("#gudong .pop_content").animate({ right: (popW - 600) / 2 }, 500);
    });
    $("#gdzsclose").click(function () {
        $("#gudong").fadeOut(500);
        $("#gudong .pop_content").animate({ right: -(popW - 600) / 2 }, 500);
    });
    //在线咨询点击弹出
    $("#consultationp").click(function () {
        $("#zxzxpop").fadeIn(500);
        $("#zxzxpop>.pop_content1").animate({ right: (popW - 1000) / 2 }, 500);
        var modalHeight2 = $("#zxzxpop").find(".pop_content1").height();
        var screenHeight2 = $(window).height();
        var Tops2 = (screenHeight2 - modalHeight2) / 2 * 0.6;
        if (Tops2 > 30) {
            $("#zxzxpop").find(".pop_content1").css("margin-top", Tops2);
        }
        else {
            $("#zxzxpop").find(".pop_content1").css("margin-top", "30px");
        }
    });
    //在线咨询击关闭
    $(".pop_tit_ri a").click(function () {
        $("#zxzxpop").fadeOut(500);
        $("#zxzxpop .pop_content1").animate({ right: -(popW - 1000) / 2 }, 500);
        $(".checkNone").hide();
        $("#txtName").val("");
        $("#txtPhone").val("");
        $("#txtEMail").val("");
        $("#txtSchool").val("");
        $("#txtDept").val("");
        $("#txtJob").val("");
        $("#txtAName").val("");
        $("#txtAPhone").val("");
        $("#txtAEMail").val("");
        $("#txtASchool").val("");
        $("#txtAJob").val("");
        $("#txtATitle").val("");
        $("#txtMessage").val("");
    });
    //申请试用input焦点
    $(".pop_text ul li .inp input").focus(function () {
        $(".pop_text ul li").children(".inp").removeClass("e");
        $(".pop_text ul li").children(".textarea").removeClass("e");
        $(this).parent(".inp").addClass("e");
    }).blur(function () {
        $(".pop_text ul li").children(".inp").removeClass("e");
        $(".pop_text ul li").children(".textarea").removeClass("e");
    });
    //申请试用textarea焦点
    $(".pop_text ul li .textarea textarea").focus(function () {
        $(".pop_text ul li").children(".inp").removeClass("e");
        $(".pop_text ul li").children(".textarea").removeClass("e");
        $(this).parent(".textarea").addClass("e");
    }).blur(function () {
        $(".pop_text ul li").children(".inp").removeClass("e");
        $(".pop_text ul li").children(".textarea").removeClass("e");
    });

    
});

//头部关闭展开方法注明
function GNB() {
    $(".btn_go_gnb").bind("click", function () {
        if ($("#gnb p>a").is(':hidden')) {
            $(".btn_go_gnb").removeClass("off").addClass("on");
            $(".btn_go_gnb").find("i").html("&#xe601;");
            $("#gnb").stop().animate({ width: "100%" }, 300, "easeOutQuart", function () {
                $("#gnb p>a,#gnb p>i").css({ "display": "block" });
                $('#gnb p>a').each(function (i) {
                    $(this).delay(50 * i).animate({ opacity: 1 }, 300, "easeInOutBack");
                    $("#gnb p>i").animate({ opacity: 1 }, 1500, "easeInOutBack");
                });
                FunLeft($("#gnb p").find(".e").index());
            });
            $("#header").stop().animate({ width: "100%" }, 300);
        } else {
            $("#gnb").stop().animate({ width: 0 }, 300, "easeOutQuart", function () {
                $("#gnb p>a,#gnb p>i").css({ "display": "none" });
            });
            $("#header").stop().animate({ width: "65px" }, 300);
            $("#gnb p>i").css({ "opacity": 0 });
            $('#gnb p>a').each(function (i) {
                $(this).delay(30 * i).animate({ opacity: 0 }, 200, "easeOutQuart");
            })
            $(".btn_go_gnb").removeClass("on").addClass("off");
            $(".btn_go_gnb").find("i").html("&#xe600;");
        }
    });
}

//导航滑动切换
var current = 0;
function FunLeft(inde) {
    var thiss = $(".top_content p a:eq(" + inde + ")");
    var tw = $(thiss).width();
    $(".top_content p a").removeClass("e");
    $(thiss).addClass("e");
    $(".top_content .tab_active").stop(true, true).animate({
        left: $(thiss).position().left
    })
}

//每个模块在屏幕居中位置（）
function screenHight() {
    var screenH = $(window).height();
    $(".screen").css("height", screenH);
    autoHeight($(".margin1"), $(".margin1").height(), 0.8);
    autoHeight($(".margins"), $(".margins").height(), 0.8);
    autoHeight($(".margin4"), $(".margin4").height(), 0.8);
    autoHeight($(".margin3"), $(".margin3").height(), 0.8);
    autoHeight($(".margin5"), $(".margin5").height(), 0.8);
    //autoHeight($(".margin6"), $(".margin6").height(), 0.8);
    //autoHeight($(".margin7"), $(".margin7").height(), 0.8);
    //autoHeight($(".margin8"), $(".margin8").height(), 0.8);
    
    autoHeight3($(".margin6"), $(".margin6").height(), 0.8);
    autoHeight3($(".margin7"), $(".margin7").height(), 0.8);
    autoHeight3($(".margin8"), $(".margin8").height(), 0.8);
    autoHeight2($(".margin9"), 839, 0.8);
    autoHeight($(".margin10"), $(".margin10").height(), 0.8);
    autoHeight($(".margin11"), $(".margin11").height(), 0.8);
    autoHeight($(".margin12"), $(".margin12").height(), 0.8);
    autoHeight($(".margin13"), $(".margin13").height(), 0.8);
    var main1250 = $(window).height();
    $(".main1250").css("height", main1250);
    autoHeight($(".margin1250"), 0, 0.8);    
}
 
function fnLoad() {
    var screenH = $(window).height();

    if (screenH > 768) {

        $(".margin4 .recruitment").show();
        $(".margin4 .recruitment768").hide();
        //var mainHeight4 = $(".margin4").height();
        //var m4H =(screenH - mainHeight4 )/ 2;
        //if(m4H>0){
        //$(".margin4").css("margin-top", m4H);
        //}
        //else {
        //    $(".margin4").css("margin-top", 0);
        //}
    } else {

        $(".margin4 .recruitment").hide();
        $(".margin4 .recruitment768").show();
        //var mainHeight4 = $(".margin4").height();
        //var m4H = (screenH - mainHeight4) / 2;
        //if (m4H > 0) {
        //    $(".margin4").css("margin-top", m4H);
        //}
        //else {
        //    $(".margin4").css("margin-top", 0);
        //}
    }
}

function autoHeight(obj, height, p) {
    if (obj.length == 0) return;
    var h = $(window).height();
    var sh = ((h - height) / 2) * p;
    if (sh < 0) sh = 0;
    obj.css("margin-top", sh + "px");
}
function autoHeight2(obj2, height2, p2) {
    if (obj2.length == 0) return;
    var h2 = $(window).height();
    var sh2 = ((h2 - height2) / 2) * p2;
    if (sh2 < 0) sh2 =30;
    obj2.css("margin-top", sh2 + "px");
}
function autoHeight3(obj3, height3, p3) {
    if (obj3.length == 0) return;
    var h3 = $(window).height();
    var sh3 = ((h3 - height3) / 2) * p3;
    if (sh3 < 80) sh3 = 80;
    obj3.css("margin-top", sh3 + "px");
}
function Restab() {
    $("#marketing1>li:first").addClass("e");
    $("#marketing1>li").not(":last").click(function () {
        $(this).addClass("e").siblings().removeClass("e");
        var index = $(this).index();
        $(".marke_content>ul").eq(index).fadeIn().siblings("ul").hide();
    });    
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
                if (v == "快") { heading.html(""); heading.append('<b>&nbsp;&nbsp;&nbsp;' + v + '</b>'); }
                else heading.append('<b>' + v + '</b>');
                if (i == letters.length - 1) {
                    heading.removeClass('blinking-cursor');
                }
            }, i * 200);
        });
    }
}

/////////////以下是浏览器加载和窗体尺寸变化调用相应动画方法////////////////////
//首页第四屏
$(window).resize(function () {
    fnLoad();
    //每个模块的高==屏幕的高
    screenHight();
});

//弹出层禁掉滚轮事件
$("#gudong").bind('mousewheel', function (event, delta) {
    event.stopPropagation();
    return false;
});