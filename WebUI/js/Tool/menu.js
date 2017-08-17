function menu(ini, e, obj,uni) {
    var menuItem;
    function Lond() {
        menuItem = $("<div />").addClass("context_menu");
        menuItem.attr("id", "menuItem" + uni);
        var menu = $("<div />").addClass("menucol");
        var _ul = $("<ul />");
        menu.append(_ul);
        menuItem.append(menu);
        for (var i in ini) {
            CreateNode(ini[i], _ul);
        }
        $(document.body).prepend(menuItem);
        var x = e.clientX, y = e.clientY;
        var l = showLocation(_ul, x, y);
        menuItem.css({ top: l.y + "px", left: l.x + "px" });
        menuItem.mouseout(function () {
            var t = $(this);
            this.times = setTimeout(function () {
                t.remove();
            }, 300);
        });
        menuItem.mouseover(function () {
            clearTimeout(this.times);
        });
        $(document).click(function () {
            menuItem.remove();
            $(document).unbind("click");
        })
    }

    function showLocation(obj, x, y) {
        var l = { x: 0, y: 0 };
        var _height = $(document.body).height();
        var _width = $(window).width();
        var _objheight = $(obj).height();
        var _objwidth = $(obj).width();
        if (_height - _objheight > 0) {
            if ((_height) > (y + _objheight))
                l.y = y;
            else{
                l.y = y - _objheight;
            }
        } else if ((_height - _objheight) == 0)
            l.y = 0;
        else if ((_height - _objheight) < 0) {
            l.y = (_height - _objheight) / 2;
        }
        if ((_width - _objwidth) > 0) {
            if ((_width - x) > _objwidth)
                l.x = x;
            else {
                l.x = x - _objwidth;
            }
        } else if ((_width - _objwidth) == 0)
            l.x = 0;
        else if ((_width - _objwidth) < 0) {
            l.x = (_width - _objwidth) / 2;
        }
        return l;
    }

    function CreateNode(node, parnet) {
        var kts;
        var _li = $("<li />");
        if (node.node != null) { var _span = $("<span />").addClass("r"); _li.append(_span); }
        var _a = $("<a />").html(node.name);
        _li.append(_a);
        _li.attr("id", Math.round(Math.random() * 999 + 1));
        _li[0].IsNode = node.node != null ? true : false;
        _li.mouseover(function (e) {
            $(this).addClass("e");
            if (this.IsNode) {
                var _id = $("#next" + $(this).attr("id"));
                if (_id.length > 0) {
                    clearTimeout(kts);
                    _id.show();
                    node.fun.call(_id);
                    var x = $(this).offset().left + $(this).width();
                    var y = $(this).offset().top;
                    var l = showLocation(_id, x, y);
                    if ((l.x - $(this).offset().left) >= $(this).width())
                        l.x = l.x - x + $(this).width();
                    else
                        l.x = l.x - x;
                    l.y = y - menuItem.offset().top;
                    _id.css({ top: l.y + "px", left: l.x + "px" });
                }
            }
        });
        _li.mouseout(function (e) {
            $(this).removeClass();
            if (this.IsNode) {
                var _id = $("#next" + $(this).attr("id"));
                if (_id.length > 0) {
                    kts = setTimeout(function () {
                        _id.hide();
                    }, 300);
                }
            }
        });
        if (!_li[0].IsNode) {
            if (node.fun) {
                _li.click(function () {
                    node.fun.call(obj);
                });
            }
        }
        if (_li[0].IsNode) {
            _li.click(function (e) {
                e.stopPropagation();
            });
            var me = $("<div />").addClass("menucol").hide();
            var _ul = $("<ul />");
            me.attr("id", "next" + _li.attr("id"));
            menuItem.append(me.append(_ul));
            for (var i in node.node) {
                CreateNode(node.node[i], _ul);
            }
            me.mouseout(function () {
                var t = $(this);
                this.times = setTimeout(function () {
                    t.hide();
                }, 300);
            });
            me.mouseover(function () {
                clearTimeout(this.times);
                clearTimeout(kts);
                $(this).show();
            });
        }
        parnet.append(_li);
    }
    if ($("#menuItem" + uni).length <= 0)
        Lond();
    else {
        $("#menuItem" + uni).remove();
        Lond();
    }
}