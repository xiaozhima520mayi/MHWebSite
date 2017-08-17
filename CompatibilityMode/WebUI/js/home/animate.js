/// <reference path="../jquery/jquery-1.8.0.min.js" />


$(function () {
    var popW = $(window).width();
    var screenH = $(window).height();
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
    //第一屏圆圈动画
    $(".circle li").mouseover(function () {
        $(this).find(".c1").hide();
        $(this).find(".c2").css("display", "block");
        $(this).find("p").css("display", "block");
    }).mouseout(function () {
        $(this).find(".c2").css("display", "none");
        $(this).find(".c1").css("display", "block");
        $(this).find("p").css("display", "none");
    })
    //第二屏营销中心动画
    $(".marke_content li .a_hre").mouseover(function () {
        $(this).find(".h_show").hide();
        $(this).find(".h_hide").show();
    }).mouseout(function () {
        $(this).find(".h_show").show();
        $(this).find(".h_hide").hide();
    })
    //营销中心选项卡调用
    Restab();

    //申请试用点击弹出
    $("#trial").click(function () {
        $("#sqsy").fadeIn(500);
        $("#sqsy .pop_content").animate({ right: (popW - 1000) / 2 }, 500);
        var modalHeight2 = $("#sqsy").find(".pop_content").height();
        var screenHeight2 = $(window).height();
        var Tops2 = (screenHeight2 - modalHeight2) / 2 * 0.4;
        if (Tops2 > 100) {
            $("#sqsy").find(".pop_content").css("margin-top", Tops2);
        }
        else {
            $("#sqsy").find(".pop_content").css("margin-top", "100px");
        }
    });
    //申请试用点击关闭
    $(".pop_tit_ri a").click(function () {
        $("#sqsy").fadeOut(500);
        $("#sqsy .pop_content").animate({ right: -(popW - 1000) / 2 }, 500);
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
    //股东之声
    $(".GDZS").click(function () {
        $("#gudong").fadeIn(500);
        $("#gudong .pop_content").animate({ right: (popW - 600) / 2 }, 500);
        var modalHeight2 = $("#gudong").find(".pop_content").height();
        var screenHeight2 = $(window).height();
        var Tops2 = (screenHeight2 - modalHeight2) / 2 * 0.4;
        if (Tops2 > 100) {
            $("#gudong").find(".pop_content").css("margin-top", Tops2);
        }
        else {
            $("#gudong").find(".pop_content").css("margin-top", "100px");
        }
    });
    $("#gdzsclose").click(function () {
        $("#gudong").fadeOut(500);
        $("#gudong .pop_content").animate({ right: -(popW - 600) / 2 }, 500);
    });
    //服务之声地图
    currentMap();
    //服务之声切换处
    $(".markete").click(function () {
        $(this).siblings().removeClass("e");
        $(this).addClass("e");
        var index = $(this).index();
        $(".service_content .case").hide();
        $(".service_content .case:eq(" + index + ")").show();
    });
    //客户案例
    $("#anli_all").imagelantern({ movelength: 996, pageCount: $("#anli_list>ul").length, speed: 4000, contentwindows: $("#anli_list"), pagenumbut: $(".case_tab>a") });
    //客户案例图标切换
    $(".case .list ul li a").hover(function () {
        $(this).stop();
        $(this).animate({ top: '-74px' }, 300);
    }, function () {
        $(this).stop();
        $(this).animate({ top: '0' }, 300);
    });
    //在线咨询点击弹出
    $("#consultationp").click(function () {
        $("#zxzxpop").fadeIn(500);
        $("#zxzxpop>.pop_content1").animate({ right: (popW - 1000) / 2 }, 500);
        var modalHeight2 = $("#zxzxpop").find(".pop_content1").height();
        var screenHeight2 = $(window).height();
        var Tops2 = (screenHeight2 - modalHeight2) / 2 * 0.6;
        if (Tops2 > 100) {
            $("#zxzxpop").find(".pop_content1").css("margin-top", Tops2);
        }
        else {
            $("#zxzxpop").find(".pop_content1").css("margin-top", "100px");
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

})
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
//头部关闭展开方法注明
function GNB() {
    $(".btn_go_gnb").bind("click", function () {
        if ($("#gnb p>a").is(':hidden')) {
            $(".btn_go_gnb").removeClass("off").addClass("on");
            $(".btn_go_gnb").find(".bt_close").show();
            $(".btn_go_gnb").find(".zhankai").hide();
            $("#gnb").stop().animate({ width: "100%" }, 300, "easeOutQuart", function () {
                $(".top_main .logo ").css({ "display": "block" });
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
                $(".top_main .logo ").css({ "display": "none" });
                $("#gnb p>a,#gnb p>i").css({ "display": "none" });
            });
            $("#header").stop().animate({ width: "65px" }, 300);
            $("#gnb p>i").css({ "opacity": 0 });
            $('#gnb p>a').each(function (i) {
                $(this).delay(30 * i).animate({ opacity: 0 }, 200, "easeOutQuart");
            })
            $(".btn_go_gnb").removeClass("on").addClass("off");
            $(".btn_go_gnb").find(".zhankai").show();
            $(".btn_go_gnb").find(".bt_close").hide();
        }
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
//营销活动切换方法
function Restab() {
    $("#marketing1>li:first").addClass("e");
    $("#marketing1>li").not(":last").click(function () {
        $(this).addClass("e").siblings().removeClass("e");
        var index = $(this).index();
        $(".marke_content>ul").eq(index).fadeIn().siblings("ul").hide();
    });
}
//弹出层禁掉滚轮事件
$(".pop").bind('mousewheel', function (event, delta) {
    event.stopPropagation();
    return false;
});