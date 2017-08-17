(function ($) {
    $.fn.ScrollBar = function (Vscroll, Hscroll) {
        if (!Hscroll && !Vscroll)
            return;
        var h = this.height(); var scroll_s, scroll_s_c;
        var w = this.width();
        var cw = this.get(0).scrollWidth;
        var t = this;
        var _dd = $("<div />").width(cw).append(t.children());
        var scnotent = $("<div />").css({
            overflow: "hidden"
        }).width(w).height(h).append(_dd);
        t.append(scnotent);
        var ch = scnotent.get(0).scrollHeight;
        _dd.height(ch);
        this.changed = function (obj) {
            h = t.height();
            ch = scnotent.get(0).scrollHeight;
            _dd.height(ch);
            scroll_s.height((h * (h / ch)));
            scroll_s_c.height((h * (h / ch)) - 4);
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
            scroll_s_c = $("<div />").addClass("scroll_s_c");
            scroll_s.append(scroll_s_c);
            scroll_s.append($("<div />").addClass("scroll_s_b"));
            if (s) {
                scroll_s.height((h * (h / ch)));
                scroll_s_c.height((h * (h / ch)) - 4);
                scrollrigth = $("<div />").addClass("scrollrigth").append(scroll_s).css({
                    display: "none"
                });
                t.append(scrollrigth);
            } else {
                scroll_s.width((w * (w / cw)));
                scroll_s_c.width((w * (w / cw)) - 4);
                scrollbottom = $("<div />").addClass("scrollbottom").append(scroll_s).css({
                    display: "none"
                });
                t.append(scrollbottom);
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
                            e.preventDefault();
                            e.stopPropagation();
                        },
                        mouseup: function (e) {
                            $(document).unbind();
                            e.preventDefault();
                            e.stopPropagation();
                        }
                    });
                    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                }
            });
        }
        function setscroll(o, Vertical, v, scrollv) {
            if (!Vertical) {
                o.css({ top: v + "px" });
                t.find("div").get(0).scrollTop = scrollv;
            } else {
                o.css({ left: v + "px" });
                t.find("div").get(0).scrollLeft = scrollv;
            }
        }
        function Scrollshow() {
            t.bind({
                mouseover: function (e) {
                    if (scrollrigth)
                        scrollrigth.show();
                    if (scrollbottom)
                        scrollbottom.show();
                    e.preventDefault();
                },
                mouseout: function () {
                    if (scrollrigth)
                        scrollrigth.hide();
                    if (scrollbottom)
                        scrollbottom.hide();
                },
                mousewheel: function (e) {
                    if (scrollrigth.length == 0) return;
                    var r = scrollrigth.find(">div");
                    var sp = Math.abs(e.wheelDelta) - 3;
                    var m = parseInt(r.css("top")) + ([5, -5][+(e.wheelDelta > 0)]);
                    var sh = h - (h * (h / ch));
                    if (m <= 0) {
                        setscroll(r, false, 0, 0);
                    } else if (m > 0 && m < sh) {
                        setscroll(r, false, m, m * (ch / h));
                    } else if (m > sh) {
                        setscroll(r, false, sh, sh * (ch / h));
                    }
                    e.stopPropagation();
                },
                DOMMouseScroll: function (e) {
                    if (scrollrigth.length == 0) return;
                    var r = scrollrigth.find(">div");
                    var m = parseInt(r.css("top")) + e.detail;
                    var sh = h - (h * (h / ch));
                    if (m <= 0) {
                        setscroll(r, false, 0, 0);
                    } else if (m > 0 && m < sh) {
                        setscroll(r, false, m, m * (ch / h));
                    } else if (m > sh) {
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