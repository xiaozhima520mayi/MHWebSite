/// <reference path="../jquery-1.4.1.min.js" />
function placardTips(placardSetting) {
    var setting = {
        objContent: null,
        event:null
    }
    setting = $.extend(setting, placardSetting);
    if (setting.objContent != null && setting.objContent.length > 0)
        createBox(setting);
}
function createBox(setting) {
    var _multi_upload = $("<div />").addClass("multi_upload").addClass("announcement_right").css({ "width": "294px", "right": 0, "height": "245px", "bottom": "-245px", "z-index":"88887777" });
    var _multi_upload_title= $("<div />").addClass("multi_upload_title");
    var _multi_upload_title_l= $("<div />").addClass("multi_upload_title_l");
    var _multi_upload_title_c= $("<div />").addClass("multi_upload_title_c");

    var _con= $("<span />").addClass("multi_upload_title_content").addClass("con").html("公告");
    var _windowsbox_buttonBar = $("<div />").addClass("upload_buttonBar");
    var _windowsbox_close = $("<a />").addClass("upload_action_bar").addClass("upload_close").attr("href", "javascript://");

    var _multi_upload_title_r= $("<div />").addClass("multi_upload_title_r");
    _multi_upload_title.append(_multi_upload_title_l);
    _multi_upload_title.append(_multi_upload_title_c);
    _multi_upload_title.append(_multi_upload_title_r);

    _multi_upload_title_c.append(_con);
    _multi_upload_title_c.append(_windowsbox_buttonBar);
    _windowsbox_buttonBar.append(_windowsbox_close);
    _multi_upload.append(_multi_upload_title);

    var _multi_upload_content = $("<div />").addClass("multi_upload_content");
    var _multi_upload_content_r = $("<div />").addClass("multi_upload_content_r");
    var _upload_content_content = $("<div />").addClass("upload_content_content");
    _multi_upload_content_r.append(_upload_content_content);
    _multi_upload_content.append(_multi_upload_content_r);
    if (setting.objContent.length == 1) {
        var _h6 = $("<h6 />").addClass("bulletintitle").html(setting.objContent[0].title).attr("title", setting.objContent[0].titleall);
        var _online_text = $("<p />").addClass("online_text");
        var _online_text_indent = $("<span />").addClass("online_text_indent").html(setting.objContent[0].context);

        var _online_text_right = $("<div />").addClass("online_text_right");
        var _pdate = $("<p />").html(setting.objContent[0].date);
        var _aselect = $("<a />").attr("href", "javascript://").html("查看");
        _aselect.click(function () {
            if (setting.event)
                setting.event(setting.objContent[0].guid.toString());
        })
        _online_text_right.append(_pdate);
        _online_text_right.append(_aselect);

        _upload_content_content.append(_h6);
        _upload_content_content.append(_online_text);
        _online_text.append(_online_text_indent);

        _upload_content_content.append(_online_text_right);
    } else {
        var _ul = $("<ul />").addClass("announcement_list");
        for (var i = 0; i < setting.objContent.length; i++) {
            var _li = $("<li />");
            var _sp = $("<span />").html(setting.objContent[i].date);
            var _sa = $("<a />").attr("href", "javascript://").html(setting.objContent[i].title);
            _li.click(function (g) {
                return function () {
                    if (setting.event)
                        setting.event(setting.objContent[g].guid.toString());
                }
            } (i));
            _li.append(_sp).append(_sa);
            _ul.append(_li);
        }
        _upload_content_content.append(_ul);
    }
    _multi_upload.append(_multi_upload_content);

    var _multi_upload_bottom= $("<div />").addClass("multi_upload_bottom");
    var _multi_upload_bottom_l = $("<div />").addClass("multi_upload_bottom_l");
    var _multi_upload_bottom_c = $("<div />").addClass("multi_upload_bottom_c");
    var _multi_upload_bottom_r = $("<div />").addClass("multi_upload_bottom_r");
    _multi_upload_bottom.append(_multi_upload_bottom_l).append(_multi_upload_bottom_c).append(_multi_upload_bottom_r);
    _multi_upload.append(_multi_upload_bottom);
    $(document.body).append(_multi_upload);
    runEffect({ mainFrom: _multi_upload, close: _windowsbox_close });
}
function runEffect(setting) {
    var ppp;
    setting.mainFrom.animate({
        bottom: "-245"
    }, "slow", function () {
        setTimeout(function () {
            setting.mainFrom.animate({
                bottom: "0"
            }, "slow", function () {
                ppp = setTimeout(function () { vanish(setting) }, 6000);
            });
        }, 1000);
    });
    setting.close.click(function () {
        setting.mainFrom.remove();
    });
    setting.mainFrom.mouseover(function () {
        clearTimeout(ppp);
        var _bottom = parseInt(setting.mainFrom.css("bottom"));
        setting.mainFrom.animate();
        if (0 > _bottom) {
            setting.mainFrom.animate({
                bottom: 0
            }, "slow");
        }
    });
    setting.mainFrom.mouseout(function () {
        ppp = setTimeout(function () { vanish(setting) }, 6000);
    });
}
function vanish(setting) {
    setting.mainFrom.animate({
        bottom: "0"
    }, "slow", function () {
        setTimeout(function () {
            setting.mainFrom.animate({
                bottom: "-245"
            }, "slow", function () {
            });
        }, 1000);
    });
}