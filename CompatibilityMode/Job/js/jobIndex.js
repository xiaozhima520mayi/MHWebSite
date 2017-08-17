//实习园地js
var auto;
$(".inte_roundbg .mm").mouseover(function () {
    var indexs = $(this).index();
    $(this).addClass("e").siblings(".mm").removeClass("e");
    clearInterval(auto);
    $(".msg").eq(indexs).fadeIn().siblings(".msg").fadeOut();
    $(".msg").eq(indexs).mouseover(function () {
        clearInterval(auto);
        $(".mm").eq(indexs).addClass("e").siblings(".mm").removeClass("e");
    }).mouseout(function () {
        clearInterval(auto);
        auto = setTimeout(function () {
            $(".msg").hide();
            $(".mm").removeClass("e");
        }, 1000);
    })
}).mouseout(function () {
    auto = setTimeout(function () {
        $(".msg").hide();
    }, 1000)
})

$(".nav").width($(window).width());
$(window).resize(function () {
    $(".nav").width($(window).width());
})
var Tweens = { Linear: function (t, b, c, d) { return c * t / d + b; } }
function opacityInfo(o, z, c) {
    var t = 0, d = 10;
    function _run() {
        if (t < d) {
            t++;
            var w = Math.ceil(Tween.Linear(t, z, c, d));
            o.css("opacity", w);
            setTimeout(_run, 10);
        }
    }
    _run();
}

$(".sykj_content_rb>.rb_circle_e").mouseover(function (e) {
    if ($(this).parent().attr("s") != "放大完成") {
        clearTimeout($(this).parent()[0].time);
    }
});

var currentNav = 0;
function navEffor() {
    $(".nav-sykj>li").mouseover(function () {
        var index = $(this).index();
        FunLeft(index)
    }).click(function () {
        $(".nav-sykj>li").removeClass("e");
        $(this).addClass("e");
        currentNav = $(this).index();
        f(currentNav);
    });
    $(".nav-sykj>li").parent().mouseleave(function () {
        FunLeft(currentNav);
    });
}
navEffor();
//导航滑动切换
function FunLeft(inde) {
    $(".nav-sykj-right>span").stop(true, true).animate({
        left: inde * 148
    });
}
//弹出层禁掉滚轮事件
$(".modal").bind('mousewheel', function (event, delta) {
    event.stopPropagation();
    return false;
});
//公司环境切换js
$("#modal_main").imagelantern({ movelength: 1017, pageCount: $("#environment>ul").length, speed: 5000, contentwindows: $("#environment"), pagenumbut: $(".mod_item>span") });
var curPerson = 0;
$(function () {
    //人在上业
    $(".sykj_content_rb").click(function () {
        var indexs = $(this).index();
        $(".modal.rzsy").addClass("fadeIn");
        $(".modal").css("background", "url(image/pop.png) repeat");
        $(".modal.rzsy").find(".dialog").eq(indexs).addClass("bounceInRight").siblings(".dialog").removeClass("bounceInRight");
        $(".modal.rzsy").find(".dialog").removeClass("fadeOutRightBig");
        if ($(this).children("p").text() == "魅力上海")
            _videoPlay();
    })
    var closeID = "";
    $(".keep").click(function () {
        closeID = $(this).parent().attr("id");
        if (closeID == "spCLOSE") {
            $("#player").html("");
        }
        $(this).parent(".dialog").addClass("fadeOutRightBig");
        setTimeout(function () {
            $(".modal").removeClass("fadeIn");
            $(".modal").css("background", "none");
            $(".dialog").removeClass("bounceInRight");
            //$(".modal").hide();
        }, 200);
        $(".shouqi").click();
        var file = $("#File1");
        file.after(file.clone().val(""));
        file.remove();
        $("#hfJob").val("");
        $(".jianli").hide();
        $(".jianli>.dialog").hide();
    })
    $(".pepoles>ul>li").click(function () {
        var indexs = $(this).index();
        curPerson = indexs;
        getPerson();
    });
    $(".shouqi").click(function () {
        var indexs = $(this);
        $(".people_boxs>.fadeInRightBig2").addClass("fadeOutRightBig");
        $(".people_boxs>.fadeInRightBig3").addClass("fadeOutRightBig"); 
        setTimeout(function () {
            $(".people_intro").removeClass("fadeInRightBig2");
            $(indexs).parent(".people_intro").addClass("hide");
        }, 200);
    })

    getImg();

    //发送简历高度
    var modalHeight2 = $(".jianli").find(".dialog").height();
    var screenHeight2 = $(window).height();
    var Tops2 = (screenHeight2 - modalHeight2) / 2 * 0.6;
    $(".sendjl").click(function () {
        $("#hfJob").val($(this).find("label").text());
        $("#msg").text("");
        $("#docName").text("");
        $(".jianli").show();
        $(".jianli>.dialog").show();
        $(".jianli>.dialog").addClass("bounceInRight").removeClass("fadeOutRightBig");
    });
    $("#send").click(function () { $("#File1").click(); });
    $("#File1").live("change", function () {
        var name = $(this).attr("value");
        var list = name.split("\\");
        if (list.length > 1) $("#docName").text(list[list.length - 1]);
        else $("#docName").text(name);
    });
    var success = 0;
    $("#sendEmail").click(function () {
        var options = {
            url: "/ASHX/ProductHanlder.aspx",
            dataType: "text",
            data: { action: "sendEmail", job: $("#hfJob").val() },
            beforeSend: function () { $("#sendEmail").hide(); $("#sending").css("display", "block"); $("#msg").text(""); },
            success: function (responseText) {
                var file = $("#File1");
                file.after(file.clone().val(""));
                file.remove();
                if (responseText == 1) {
                    success = 1;
                }
                else if (responseText == -1) $("#msg").text("文件格式错误");
                else if (responseText == -2) $("#msg").text("请选择要上传的简历");
                else $("#msg").text("发送失败");
            },
            complete: function () {
                if (success == 1) {
                    var times = 5;
                    //$("#send").removeAttr("onclick");
                    //$("#File1").removeAttr("onclick");
                    $("#msg").text("");
                    $("#sending").hide();
                    var file = $("#File1");
                    file.after(file.clone().val(""));
                    file.remove();
                    $("#sendMailForm").find(".tishi").show();
                    var setIn = setInterval(function () {
                        times = times - 1;
                        $("#sendMailForm").find(".tishi>b").text(times);
                        if (times == -1) {
                            clearInterval(setIn);
                            success = 0;
                            $("#sendMailForm").find(".tishi>b").text("5");
                            $("#sendMailForm").find(".tishi").hide();
                            $("#sendEmail").show();
                            $(".keep").click();
                        }
                    }, 1000);
                } else {
                    $("#sendEmail").show();
                    $("#sending").hide();
                    $("#sendMailForm").find(".tishi").hide();
                }
            },
            error: function (data) { 
                alert(data.error);
            }
        };
        $("#sendMailForm").ajaxSubmit(options);
    });

    var securrent = 0;
    $(".society_group_itembg").click(function () {
        var index = parseInt($(this).attr("rel"));
        if (securrent == index) return;
        $(".society_rjob").find(".society_group_item:eq(" + securrent + ")").find(".society_group_itemcontent").animate({ height: 0, "padding-top": 0 });
        $(this).siblings(".society_group_itemcontent").show().animate({ height: 245, "padding-top": 25 });
        securrent = index;
    });
    $(".society_item>.society_item_info").click(function () {
        var index = $(this).index();
        $(this).addClass("e").siblings().removeClass("e");
        $(".society_rjob_group").hide();
        var cur = $(".society_rjob>.society_rjob_group:eq(" + index + ")");
        cur.show();
        if (index == 0) {
            securrent = 0;
            $(".wx-tab a:eq(0)").click();            
        } else {
            securrent = parseInt(cur.find(".society_group_itembg:eq(0)").attr("rel"));
            $(".society_group_itemcontent").css({ height: 0, "padding-top": 0 });
            cur.find(".society_group_itemcontent:eq(0)").css({ height: "245px", "padding-top": 25 });
        }
    });

    $(".society_rjob_group").each(function () {
        $(this).children(".wx-content:eq(0)").show();

    });
    $(".wx-tab a").click(function () {
        var indexs = $(this).index();
        $(this).addClass("change-color").siblings("a").removeClass("change-color")
               .parents(".society_rjob_group").find(".wx-content").eq(indexs).show().siblings(".wx-content").hide();
        var cur = $(".society_rjob_group:eq(0)").find(".wx-content:eq(" + indexs + ")").find(".society_group_item:eq(0)");
        securrent = parseInt(cur.find(".society_group_itembg").attr("rel"));
        $(".society_group_itemcontent").css({ height: 0, "padding-top": 0 });
        cur.find(".society_group_itemcontent").css({ height: "245px", "padding-top": 25 });
    });

    getFistjob();

    $(".peixun h2").click(function () {
        var index = $(this).index();
        $(this).addClass("e").siblings("h2").removeClass("e");
        $(".px_box>div").hide();
        $(".px_box>div:eq(" + index + ")").show();
    });

    $(".prePerson").click(function () {
        $(".prePerson,.nextPerson").removeClass("no");
        curPerson = curPerson - 1;
        if (curPerson <= -1) { curPerson = 0; $(".prePerson").addClass("no"); return; }
        getPerson2();
    });
    $(".nextPerson").click(function () {
        $(".prePerson,.nextPerson").removeClass("no");
        curPerson = curPerson + 1;
        if (curPerson >= 12) { curPerson = 11; $(".nextPerson").addClass("no"); return; }
        getPerson2();
    });
});

function getFistjob() {
    var cur = $(".society_rjob>.society_rjob_group:eq(0)");
    cur.find(".society_group_item:eq(0)").find(".society_group_itemcontent").css({ height: "245px", "padding-top": 25 });
}

function getPerson() {
    $(".prePerson,.nextPerson").removeClass("no");
    if (curPerson == 0) { $(".prePerson").addClass("no"); }
    if (curPerson == 11) { $(".nextPerson").addClass("no"); }
    $(".people_boxs>.people_intro").siblings().removeClass("fadeInRightBig2");
    $(".people_boxs>.people_intro").siblings().removeClass("fadeInRightBig3");
    $(".people_boxs>.people_intro").removeClass("fadeOutRightBig");
    $(".people_boxs>.people_intro:eq(" + curPerson + ")").addClass("fadeInRightBig2");
    $(".people_intro").eq(curPerson).removeClass("hide");
}
function getPerson2() {
    $(".prePerson,.nextPerson").removeClass("no");
    if (curPerson == 0) { $(".prePerson").addClass("no"); }
    if (curPerson == 11) { $(".nextPerson").addClass("no"); }
    $(".people_boxs>.people_intro").siblings().removeClass("fadeInRightBig2");
    $(".people_boxs>.people_intro").siblings().removeClass("fadeInRightBig3");
    $(".people_boxs>.people_intro").removeClass("fadeOutRightBig");
    $(".people_boxs>.people_intro:eq(" + curPerson + ")").addClass("fadeInRightBig3");
    $(".people_intro").eq(curPerson).removeClass("hide");
}

function _videoPlay() { 
    //$("#player").html("");
    var flashvars = {
        f: 'mp4/vedio.mp4',
        c: 0, //是否读取文本配置,0不是，1是
        b: 1,
        s: 0,
        b: 1,
        x: '', //调用xml风格路径，为空的话将使用ckplayer.js的配置
        r: '', //前置广告的链接地址，多个用竖线隔开，没有的留空
        y: '', //这里是使用网址形式调用广告地址时使用，前提是要设置l的值为空
        e: 0, //视频结束后的动作，0是调用js函数，1是循环播放，2是暂停播放并且不调用广告，3是调用视频推荐列表的插件，4是清除视频流并调用js功能和1差不多，5是暂停播放并且调用暂停广告
        v: '80', //默认音量，0-100之间
        p: 1, //视频默认0是暂停，1是播放
        h: 0, //播放http视频流时采用何种拖动方法，=0不使用任意拖动，=1是使用按关键帧，=2是按时间点，=3是自动判断按什么(如果视频格式是.mp4就按关键帧，.flv就按关键时间)，=4也是自动判断(只要包含字符mp4就按mp4来，只要包含字符flv就按flv来)
        q: '', //视频流拖动时参考函数，默认是start
        m: 0, //默认是否采用点击播放按钮后再加载视频，0不是，1是,设置成1时不要有前置广告
        ct: '2',
        my_url: encodeURIComponent(window.location.href)//本页面地址
    };
    var params = { bgcolor: '#FFF', allowFullScreen: true, allowScriptAccess: 'always', wmode: 'transparent' };
    CKobject.embedSWF('ckplayer/ckplayer.swf', 'player', 'ckplayer_a1', '100%', '510', flashvars, params);
    /*
    CKobject.embedSWF(播放器路径,容器id,播放器id/name,播放器宽,播放器高,flashvars的值,其它定义也可省略);
    下面三行是调用html5播放器用到的
    */
    var video = ['http://movie.ks.js.cn/flv/other/1_0.mp4->video/mp4', 'http://www.ckplayer.com/webm/0.webm->video/webm', 'http://www.ckplayer.com/webm/0.ogv->video/ogg'];
    var support = ['iPad', 'iPhone', 'ios', 'android+false', 'msie10+false'];
}

function getImg() {
    $.ajax({
        url: "../../../ASHX/ProductHanlder.aspx",
        data: { action: "picTure" },
        dataType: "json",
        success: function (responseText) {
            if (responseText == null || responseText == "" || responseText.Message != "1")
            { }
            else
            {
                if (responseText.records != null) {
                    var html = "";
                    var index = responseText.records.length;
                    $.each(responseText.records, function (i) {
                        if (i == 0 || i == 6 || i == 12) {
                            html += "<ul>";
                            if (i == 0) $(".mod_item2").append("<span class=\"e\"></span>");
                            else $(".mod_item2").append("<span></span>");
                        }
                        html += "<li><img src=\"" + responseText.records[i].url + "\" />";
                        html += "<div class=\"xz_intro\">" + responseText.records[i].title + "</div></li>";
                        if (i == 5 || i == 11 || i == 17) html += "</ul>";
                    });
                    $("#envir_content2").append(html);
                }
            }
        },
        complete: function () {
            $("#environment2").imagelantern({ movelength: 978, pageCount: $("#envir_content2>ul").length, speed: 5000, contentwindows: $("#envir_content2"), pagenumbut: $(".mod_item2>span") });
        }
    });
}
