(function ($) {
    $.fn.ScrollBar = function (Vscroll, Hscroll) {
        if (!Hscroll && !Vscroll)
            return;
        var rand = Math.round(Math.random() * 9999 + 1);
        var h = this.height(); var scroll_s, scroll_s_c;
        var w = this.width();
        var cw = this.get(0).scrollWidth;
        var ch = this.get(0).scrollHeight;
        var t = this;
        var _dd = $("<div />").height(h).css({ overflow: "hidden", position: "relative" });
        if (Vscroll)
            _dd.width(w);
        t.before(_dd);
        _dd.append(t);
        var scnotent = $("<div />").css({
            overflow: "hidden",
            position: "relative"
        }).height(h);
        if (Vscroll)
            scnotent.width(w);
        _dd.before(scnotent);
        scnotent.append(_dd);
        scnotent.attr("id", "scnotent" + rand);
        t.height(ch);
        if (Vscroll)
            t.width(cw);
        this.changed = function () {
            ch = 0;
            t.children().each(function () {
                ch += this.scrollHeight + parseInt($(this).css("marginTop")) + parseInt($(this).css("marginBottom"));
            })
            h = scnotent.get(0).scrollHeight;
            t.height(ch);
            if ($("#scroll_s" + rand).length == 0) {
                if (Hscroll)
                    if (h < ch)
                        CreateFirm(true);
                if (Vscroll)
                    if (w < cw)
                        CreateFirm(false);
            } else {
                if (h >= ch) {
                    scnotent.find("div").get(0).scrollTop = 0;
                    $("#scrollrigth" + rand).remove();
                } else {
                    scroll_s.height((h * (h / ch)));
                    scroll_s_c.height((h * (h / ch)) - 4);
                    var r = scrollrigth.find(">div");
                    var m = parseInt(r.css("top"));
                    var sh = h - (h * (h / ch));
                    if (m <= 0) {
                        setscroll(r, false, 0, 0);
                    } else if (m > 0 && m < sh) {
                        setscroll(r, false, m, m * (ch / h));
                    } else if (m > sh) {
                        setscroll(r, false, sh, sh * (ch / h));
                    } else {
                        setscroll(r, false, sh, sh * (ch / h));
                    }
                }
            }
        }
        this.Unload = function () {
            if (scnotent.length == 0) return;
            var next = scnotent.next();
            t.height(scnotent.height());
            if (next.length == 0) {
                scnotent.parent().append(t);
            } else {
                t.insertBefore(next);
            }
            scnotent.remove();
        }
        var scrollrigth, scrollbottom;
        if (Hscroll)
            if (h < ch)
                CreateFirm(true);
        if (Vscroll)
            if (w < cw)
                CreateFirm(false);
        function CreateFirm(s) {
            scroll_s = $("<div />").addClass("scroll_s");
            scroll_s.append($("<div />").addClass("scroll_s_t"));
            scroll_s.attr("id", "scroll_s" + rand);
            scroll_s_c = $("<div />").addClass("scroll_s_c");
            scroll_s_c.attr("id", "scroll_s_c" + rand);
            scroll_s.append(scroll_s_c);
            scroll_s.append($("<div />").addClass("scroll_s_b"));
            if (s) {
                scroll_s.height((h * (h / ch)));
                scroll_s_c.height((h * (h / ch)) - 4);
                scrollrigth = $("<div />").addClass("scrollrigth").append(scroll_s).css({
                    display: "none"
                });
                scrollrigth.attr("id", "scrollrigth" + rand);
                scroll_s_c.attr("id", "scroll_s_c" + rand);
                scnotent.append(scrollrigth);
            } else {
                scroll_s.width((w * (w / cw)));
                scroll_s_c.width((w * (w / cw)) - 4);
                scrollbottom = $("<div />").addClass("scrollbottom").append(scroll_s).css({
                    display: "none"
                });
                scnotent.append(scrollbottom);
            }
            scrollMethod(scroll_s, !s);
        }
        function scrollMethod(obj, Vertical) {
            obj.bind({
                mousedown: function (e) {
                    this.xoy = [(e.pageY), (e.pageX)][+Vertical];
                    var tt = this;
                    var sh = [(h - (h * (h / ch))), (w - (w * (w / cw)))][+Vertical];
                    var tops = [parseInt(obj.css("top")), parseInt(obj.css("left"))][+Vertical];
                    var hander = this;
                    $(document).bind({
                        mousemove: function (e) {
                            var m = [(e.pageY - tt.xoy + tops), (e.pageX - tt.xoy + tops)][+Vertical];
                            if (m < 0) {
                                setscroll(obj, Vertical, 0, 0);
                            } else if (m > 0 && m < sh) {
                                setscroll(obj, Vertical, m, ([(m * (ch / h)), (m * (cw / w))][+Vertical]));
                            } else if (m > sh) {
                                setscroll(obj, Vertical, sh, ([(sh * (ch / h)), (sh * (cw / w))][+Vertical]));
                            }
                            if (document.all) {
                                hander.setCapture(); e.cancelBubble = true;
                            } else {
                                window.onblur = function (e) {
                                    e = window.event || e;
                                    $(document).unbind("mousemove").unbind("mouseup");
                                    e.preventDefault();
                                    e.stopPropagation();
                                };
                            }
                            e.preventDefault();
                            e.stopPropagation();
                            window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                        },
                        mouseup: function (e) {
                            $(document).unbind("mousemove").unbind("mouseup");
                            if (document.all) {
                                hander.onlosecapture = null; hander.releaseCapture();
                            } else { window.onblur = null }
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
        function setscroll(o, Vertical, v, scrollv) {
            if (!Vertical) {
                o.css({ top: v + "px" });
                scnotent.find("div").get(0).scrollTop = scrollv;
            } else {
                o.css({ left: v + "px" });
                scnotent.find("div").get(0).scrollLeft = scrollv;
            }
        }
        function Scrollshow() {
            scnotent.bind({
                mouseover: function () {
                    clearTimeout(this.times);
                    if (scrollrigth)
                        scrollrigth.show();
                    if (scrollbottom)
                        scrollbottom.show();
                },
                mouseout: function () {
                    this.times = setTimeout(function () {
                        if (scrollrigth)
                            scrollrigth.hide();
                        if (scrollbottom)
                            scrollbottom.hide();
                    }, 500);
                },
                mousewheel: function (e, delta, deltaX, deltaY) {
                    if (!scrollrigth) return;
                    var r = scrollrigth.find(">div");
                    var m = parseInt(r.css("top")) + ([5, -5][+(delta > 0)]);
                    var sh = h - (h * (h / ch));
                    if (m <= 0) {
                        setscroll(r, false, 0, 0);
                    } else if (m > 0 && m < sh) {
                        setscroll(r, false, m, m * (ch / h));
                    } else if (m > sh) {
                        setscroll(r, false, sh, sh * (ch / h));
                    } else {
                        setscroll(r, false, sh, sh * (ch / h));
                    }
                    e.stopPropagation();
                }
            })
        }
        Scrollshow();
        return this;
    }
})(jQuery);