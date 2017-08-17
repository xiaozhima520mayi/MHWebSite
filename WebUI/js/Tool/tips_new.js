/// <reference path="../jquery-1.4.1.min.js" />
(function ($) {
    $.extend({
        tips: {
            indexs: 88888888,
            Init: function () {
                var s = $("a");
                for (var i = 0; i < s.length; i++) {
                    var o = s.get(i);
                    var t = o.title || o.name || null;
                    var a = o.getAttribute('href') || o.alert;
                    if (o.className.indexOf("tips") != -1) {
                        o.onclick = (function (t, a) {
                            return function () {
                                $.tips.Execute(t, a)
                                this.blur();
                                return false;
                            }
                        })(t, a);
                    }
                }
            },
            InitDiv: function () {
                var s = $("div");
                for (var i = 0; i < s.length; i++) {
                    var o = s.get(i);
                    var t = o.title || o.name || null;
                    var a = o.getAttribute('href') || o.alert;
                    if (o.className.indexOf("tips") != -1) {
                        o.ondblclick = (function (t, a) {
                            return function () {
                                $.tips.Execute(t, a)
                                this.blur();
                                return false;
                            }
                        })(t, a);
                    }
                }
            },
            Execute: function (title, href) {
                var r = /^[+-]?\d+(\.\d+)?$/;
                var width = $.tips.url('width', href);
                var height = $.tips.url('height', href);
                var top = $.tips.url('top', href);
                var ass = $.tips.url('ass', href);
                var assid = $.tips.url('assid', href);
                var assfun = $.tips.url('assfun', href);
                width = r.test(width) ? width : 0;
                height = r.test(height) ? height : 0;
                var isMagnify = $.tips.url('isMagnify', href) ? true : false;
                if (top == undefined || top == null || top == "")
                    top = true;
                else
                    top = top.toUpperCase() == "TRUE" ? true : false;
                if (ass == undefined || ass == null || ass == "")
                    ass = true;
                else
                    ass = ass.toUpperCase() == "TRUE" ? true : false;
                if (assid == undefined || assid == null || assid == "")
                    assid = "";
                $.tips.UI.Html({ Width: width, Height: height, IsMagnify: isMagnify, Href: href, Title: title, Top: top, Ass: ass, Assfun: assfun, AssId: assid }, 'iframe');
            },
            url: function (p, a) {
                var b = "[\?&]" + p + "=([^&]*)";
                var c = new RegExp(b, "gi");
                if (!c.test(a)) return "";
                c.exec(a);
                return RegExp.$1
            },
            UI: {
                Html: function (arg, v) {
                    $.tips.Alert.Args = arg;
                    $.tips.Alert.tops = arg.Top ? top.document.body : document.body;
                    $.tips.Alert.remObj = arg.Top ? top.document : document;
                    var top$ = arg.Top ? top.$ : $;
                    $.tips.Alert.topJquer = top$;
                    var title = arg.Title ? arg.Title : '';
                    //                    var OKText = arg.OKText ? arg.OKText : '确定';
                    //                    var CancelText = arg.CancelText ? arg.CancelText : '取消';
                    var OKClass = arg.OKClass ? arg.OKClass : 'bot_save';
                    var CancelClass = arg.CancelClass ? arg.CancelClass : 'bot_cancel';
                    var Assfun = arg.Assfun ? arg.Assfun : '';
                    var content = arg.Content ? arg.Content : '';
                    var width = arg.Width ? arg.Width : 450;
                    var height = arg.Height ? arg.Height : 250;
                    var id = Math.round(Math.random() * 999 + 1);
                    var indes = top.window.zindexDef ? top.window.zindexDef : $.tips.indexs;
                    indes = indes + 3;
                    var l = (($($.tips.Alert.tops).width() / 2) - (width / 2));
                    var t = (($($.tips.Alert.tops).height() / 2) - (height / 2));
                    var tipsbox = top$("<div />", $.tips.Alert.tops).addClass("tipsbox").css({
                        zIndex: (indes),
                        left: l + "px",
                        top: t + "px",
                        width: width + "px",
                        height: height + "px"
                    });
                    tipsbox.attr("id", ("tips" + id));
                    var tipsbox_title = top$("<div />", $.tips.Alert.tops).addClass("tipsbox_title");
                    var tipsbox_title_left = top$("<div />", $.tips.Alert.tops).addClass("tipsbox_title_left");
                    var tipsbox_title_content = top$("<div />", $.tips.Alert.tops).addClass("tipsbox_title_content");
                    var tipsbox_buttonBar = top$("<a />", $.tips.Alert.tops).addClass("tipsbox_buttonBar");
                    var tipsbox_buttonmagify = top$("<a />", $.tips.Alert.tops).addClass("tipsbox_buttonmagify");
                    var tipsbox_buttonrevert = top$("<a />", $.tips.Alert.tops).addClass("tipsbox_buttonrevert");
                    var tipsbox_title_f = top$("<span />", $.tips.Alert.tops).addClass("tipsbox_title_f");
                    tipsbox_title_f.append(title);
                    tipsbox_title_content.append(tipsbox_buttonBar).append(tipsbox_title_f);
                    tipsbox_title.attr("xs", l).attr("ys", t);
                    tipsbox_title.attr("isMag", "0");
                    if (arg.IsMagnify) {
                        tipsbox_title_content.append(tipsbox_buttonmagify);
                        tipsbox_title_content.append(tipsbox_buttonrevert);
                        tipsbox_buttonrevert.hide();
                    }
                    var tipsbox_title_right = top$("<div />", $.tips.Alert.tops).addClass("tipsbox_title_right");
                   // tipsbox_title.append(tipsbox_title_left).append(tipsbox_title_content).append(tipsbox_title_right);
                    tipsbox.append(tipsbox_title);

                    var tipsbox_content = top$("<div />", $.tips.Alert.tops).addClass("tipsbox_content");
                    var tipsbox_content_r = top$("<div />", $.tips.Alert.tops).addClass("tipsbox_content_r");
                    var tipsbox_content_rc = top$("<div />", $.tips.Alert.tops).addClass("tipsbox_content_rc").height(height - 58);
                    tipsbox_content.append(tipsbox_content_r.append(tipsbox_content_rc));
                    tipsbox.append(tipsbox_content);

                    var tipsbox_content_bot = top$("<div />", $.tips.Alert.tops).addClass("tipsbox_content_bot");
                    var bot_save = top$("<input />", $.tips.Alert.tops).addClass(OKClass);
                    bot_save.attr("type", "button");
                    //                    bot_save.attr("value", OKText);
                    var bot_cancel = top$("<input />", $.tips.Alert.tops).addClass(CancelClass);
                    bot_cancel.attr("type", "button");
                    //                    bot_cancel.attr("value", CancelText);
                    tipsbox_buttonBar.rid = id;
                    bot_save.rid = id;
                    bot_cancel.rid = id;
                    tipsbox_buttonBar.mousedown(function (e) {
                        e.stopPropagation();
                    });
                    tipsbox_buttonBar.click(function (e) {
                        $.tips.UI.Remove(false, tipsbox_buttonBar.rid);
                        e.stopPropagation();
                    });
                    tipsbox_buttonmagify.mousedown(function (e) {
                        e.stopPropagation();
                    });
                    tipsbox_buttonmagify.click(function (e) {
                        tipsbox_title.attr("isMag", "1");
                        var deskw = $.tips.Alert.remObj.documentElement.clientWidth;
                        var deskh = $.tips.Alert.remObj.documentElement.clientHeight;
                        tipsbox.css({ "top": "0", "left": "0", "width": deskw + "px", height: deskh + "px" });
                        tipsbox_content_rc.height(deskh - 58);
                        tipsbox_buttonrevert.show();
                        tipsbox_buttonmagify.hide();
                        jQuery("iframe", tipsbox)[0].contentWindow.Magify();
                        e.stopPropagation();
                    })
                    tipsbox_buttonrevert.click(function (e) {
                        e.stopPropagation();
                    });
                    tipsbox_buttonrevert.click(function (e) {
                        tipsbox.css({ "top": tipsbox_title.attr("ys") + "px", "left": tipsbox_title.attr("xs") + "px", "width": width + "px", height: height + "px" });
                        tipsbox_buttonrevert.hide();
                        tipsbox_buttonmagify.show();
                        tipsbox_content_rc.height(height - 58);
                        tipsbox_title.attr("isMag", "0");
                        jQuery("iframe", tipsbox)[0].contentWindow.Revert();
                        e.stopPropagation();
                    })
                    bot_save.click(function (e) {
                        $.tips.UI.Remove(true, bot_save.rid);
                    });
                    bot_cancel.click(function (e) {
                        $.tips.UI.Remove(false, bot_save.rid);
                    });
                    var frameElement = $(window.frameElement);
                    var b = [];
                    var pt = null;
                    switch (v) {
                        case "warning":
                        case "error":
                        case "confirm":
                        case "success":
                            //                            b.push('<div class="tipsbox_content_info" style="height:' + (height - 58 - 67) + 'px;">');
                            //                            b.push('    <span class="' + v + '"></span>');
                            //                            b.push('    <p>' + content + '</p>');
                            //                            b.push('</div>');

                            var vt = top$("<div />").addClass("tipsbox_content_info").height((height - 58 - 46));
                            var st = top$("<span />").addClass(v);
                            pt = top$("<p />").html(content);
                            vt.append(st).append(pt);
                            tipsbox_content_rc.append(vt);
                            if (arg.IsCancel == "yes") {
                                tipsbox_content_bot.append(bot_cancel);
                            }
                            if (arg.IsOK == "yes") {
                                tipsbox_content_bot.append(bot_save);
                            }
                            tipsbox_content_rc.append(tipsbox_content_bot);
                            break;
                        case 'iframe':
                            if (frameElement.length <= 0)
                                b.push("<iframe src=\"" + arg.Href + "\" frameBorder=\"0\" marginHeight=\"0\" marginWidth=\"0\" width=\"100%\" height=\"100%\" id=\"" + "ifram" + id + "\"></iframe>");
                            else
                                b.push("<iframe src=\"" + arg.Href + "\" ass=\"" + (arg.AssId == "" ? frameElement.attr("id") : arg.AssId) + "\" assfun=\"" + Assfun + "\" frameBorder=\"0\" marginHeight=\"0\" marginWidth=\"0\" width=\"100%\" height=\"100%\" id=\"" + "ifram" + id + "\"></iframe>");
                            tipsbox_content_rc.append(b.join(''));
                            break;
                    }
                    var tipsbox_bottom = top$("<div />", $.tips.Alert.tops).addClass("tipsbox_bottom");
                    var tipsbox_bottom_left = top$("<div />", $.tips.Alert.tops).addClass("tipsbox_bottom_left");
                    var tipsbox_bottom_content = top$("<div />", $.tips.Alert.tops).addClass("tipsbox_bottom_content");
                    var tipsbox_bottom_right = top$("<div />", $.tips.Alert.tops).addClass("tipsbox_bottom_right");
                    tipsbox_bottom.append(tipsbox_bottom_left).append(tipsbox_bottom_content).append(tipsbox_bottom_right);
                    tipsbox.append(tipsbox_bottom);
                    $.tips.UI.Mask(id, indes);
                    top$($.tips.Alert.tops).prepend(tipsbox);
                    $.tips.indexs = $.tips.indexs + 3;
                    if (pt) {
                        if (parseInt(pt.height()) == 28) {
                            pt.css({ marginTop: "30px" });
                        }
                    }
                    setTimeout(function () {
                        bot_save.focus();
                    }, 50);
                    top.window.zindexDef && (top.window.zindexDef = top.window.zindexDef + 3);
                    new tipsMoblie({ move: tipsbox_title, moveLayer: tipsbox, top$: top$, isTop: arg.Top })
                },
                Mask: function (id, indes) {
                    var _maskIf = $.tips.Alert.topJquer("<ifram />", { frameborder: 0, id: ("maskifram" + id) }, $.tips.Alert.tops).css({
                        zIndex: (indes - 1),
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: $($.tips.Alert.tops).width(),
                        height: $($.tips.Alert.tops).height(),
                        filter: "alpha(opacity=0)",
                        opacity: "0"

                    });
                    _maskIf.bind("contextmenu", function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                    });
                    _maskIf.attr("id", ("maskifram" + id));
                    var _maskdiv = $.tips.Alert.topJquer("<div />", { id: ("maskdiv" + id) }, $.tips.Alert.tops).css({
                        zIndex: (indes - 2),
                        position: "absolute",
                        top: 0,
                        left: 0,
                        filter: "alpha(opacity=0)",
                        opacity: "0",
                        width: $.tips.Alert.topJquer($.tips.Alert.tops).width(),
                        height: $.tips.Alert.topJquer($.tips.Alert.tops).height()
                    });
                    _maskdiv.attr("id", ("maskdiv" + id));
                    $.tips.Alert.topJquer($.tips.Alert.tops).prepend(_maskIf);
                    $.tips.Alert.topJquer($.tips.Alert.tops).prepend(_maskdiv);
                    setTimeout(function () {
                        _maskIf.css({
                            backgroundColor: "#fff"
                        })
                    }, 100);
                },
                Remove: function (v, id) {
                    if (!$.tips.Alert.topJquer) {
                        $.tips.Alert.topJquer = top.$;
                    }
                    if (id == null || id == undefined || id == "") {
                        id = $(window.frameElement).parent().parent().parent().parent().attr("id").replace("tips", "");
                    }
                    $.tips.Alert.tops = $.tips.Alert.remObj; // $.tips.Alert.tops ? $.tips.Alert.tops : top.window.document.body;
                    var o = $.tips.Alert.topJquer("#tips" + id, $.tips.Alert.tops);
                    var maskifram = $.tips.Alert.topJquer("#maskifram" + id, $.tips.Alert.tops);
                    var maskdiv = $.tips.Alert.topJquer("#maskdiv" + id, $.tips.Alert.tops);
                    $.tips.Alert.Args.Redirect && (location.href = $.tips.Alert.Args.Redirect);
                    top.$("#Text2").focus();
                    v && $.tips.Alert.Args.OK && $.tips.Alert.Args.OK();
                    !v && $.tips.Alert.Args.Cancel && $.tips.Alert.Args.Cancel();
                    o.remove();
                    maskifram.remove();
                    maskdiv.remove();
                },
                ExecMethod: function (obj) {
                    var iframe = $(obj.frameElement);
                    if (iframe.attr("ass") == "" || iframe.attr("ass") == null || iframe.attr("ass") == undefined) return;
                    var ass = $("#" + iframe.attr("ass"), top.window.document.body).contentWindow;
                    var fun = iframe.attr("assfun");
                    if (fun == null || fun == "" || fun == undefined) return;
                    eval("$('#' + iframe.attr('ass'), top.window.document.body)[0].contentWindow." + fun)(arguments);
                }
            },
            Alert: {
                Args: "",
                tops: null,
                topJquer: null,
                Warning: function (arg) {
                    var setting = {
                        Title: "系统提示",
                        Content: "",
                        Width: 350,
                        Height: 222,
                        Top: true,
                        OK: null,
                        Cancel: null,
                        IsOK: "yes",
                        IsCancel: "yes",
                        OKClass: "",
                        CancelClass: "",
                        Redirect: null
                    }
                    arg = $.extend(setting, arg);
                    $.tips.UI.Html(arg, 'warning');
                },
                Success: function (arg) {
                    var setting = {
                        Title: "系统提示",
                        Content: "",
                        Width: 350,
                        Height: 222,
                        Top: true,
                        OK: null,
                        Cancel: null,
                        IsOK: "yes",
                        IsCancel: "yes",
                        OKClass: "",
                        CancelClass: "",
                        Redirect: null
                    }
                    arg = $.extend(setting, arg);
                    $.tips.UI.Html(arg, 'success');
                },
                Error: function (arg) {
                    var setting = {
                        Title: "系统提示",
                        Content: "",
                        Width: 350,
                        Height: 222,
                        Top: true,
                        OK: null,
                        Cancel: null,
                        IsOK: "yes",
                        IsCancel: "yes",
                        OKClass: "",
                        CancelClass: "",
                        Redirect: null
                    }
                    arg = $.extend(setting, arg);
                    $.tips.UI.Html(arg, 'error');
                },
                Confirm: function (arg) {
                    var setting = {
                        Title: "系统提示",
                        Content: "",
                        Width: 350,
                        Height: 222,
                        Top: true,
                        OK: null,
                        Cancel: null,
                        IsOK: "yes",
                        IsCancel: "yes",
                        OKClass: "bot_yes",
                        CancelClass: "bot_no",
                        Redirect: null
                    }
                    arg = $.extend(setting, arg);
                    $.tips.UI.Html(arg, 'confirm');
                }
            }
        }
    })
})(jQuery);
function tipsMoblie(ini) {
    var isTopdocument = ini.isTop ? top.window.document : window.document;
    var isTopwindow = ini.isTop ? top.window : window;
    ini.move.mousedown(function (e) {
        if (ini.move.attr("isMag") == "1") return;
        this.prev_x = e.clientX;
        this.prev_y = e.clientY;
        var hander = this;
        if (isTopdocument.all) {
            hander.setCapture(); e.cancelBubble = true;
        } else { e.preventDefault(); e.stopPropagation() }
        var maskContentDiv = ini.top$("<div />").height($(document).height()).width($(document).width()).css({
            filter: 'alpha(opacity=0)',
            position: "absolute",
            top: 0,
            left: 0,
            opacity: '0'
        });
        ini.top$("+ div", this).append(maskContentDiv);
        this.x = this.prev_x - ini.moveLayer[0].offsetLeft;
        this.y = this.prev_y - ini.moveLayer[0].offsetTop;
        ini.top$(isTopdocument).mousemove(function (e) {
            var x = e.clientX - hander.x, y = e.clientY - hander.y;
            ini.moveLayer.css({ left: x + "px" });
            if (y <= 1)
                ini.moveLayer.css({ top: "1px" });
            else
                ini.moveLayer.css({ top: y + "px" });
            if (top.window.document.all) {
                hander.setCapture(); e.cancelBubble = true;
            } else { isTopwindow.onblur = dragStop; e.preventDefault(); e.stopPropagation() }
            isTopwindow.getSelection ? isTopwindow.getSelection().removeAllRanges() : isTopdocument.selection.empty();
        });
        function dragStop(e) {
            e = window.event || e;
            ini.top$(isTopdocument).unbind();
            isTopdocument.onmouseup = null;
            var mx = parseInt(ini.moveLayer.css("left"));
            var my = parseInt(ini.moveLayer.css("top"));
            ini.moveLayer.css({ left: mx + "px" });
            ini.moveLayer.css({ top: my + "px" });
            ini.move.attr("xs", mx).attr("ys", my);
            maskContentDiv.remove();
            if (document.all) {
                hander.onlosecapture = null; hander.releaseCapture();
            } else { top.window.onblur = null }
        }
        isTopdocument.onmouseup = dragStop;
    });
}