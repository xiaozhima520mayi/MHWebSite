var zIndexs = 60;
var zoomIndexs = 7000
var Dialog = {
    Transparent: function (arg) {
        var title = arg.Title ? arg.Title : '';
        var width = arg.Width ? arg.Width : 295;
        var height = arg.Height ? arg.Height : 295;
        var windcos = document.createElement("div");
        var id = "simulationLayer" + Math.random();
        windcos.className = "windows windows_transp";
        windcos.style.cssText = "width:" + width + "px;height:" + height + "px; z-index:" + (zIndexs++);

        var windows_title = document.createElement("div");
        windows_title.className = "windows_title";
        var windows_transp_buttonBar = document.createElement("div");
        windows_transp_buttonBar.className = "windows_transp_buttonBar";
        var windows_transp_close = document.createElement("a");
        windows_transp_close.href = "javascript://";
        windows_transp_close.className = "windows_transp_action_bar windows_transp_close";
        windows_transp_close.style.display = "none";
        windows_transp_buttonBar.appendChild(windows_transp_close);
        windows_title.appendChild(windows_transp_buttonBar);
        windcos.appendChild(windows_title);

        var windows_content_Mask = document.createElement("div");
        windows_content_Mask.className = "windows_content_Mask";
        windows_content_Mask.style.cssText = "width:" + width + "px;height:" + (height - 24) + "px;";
        windcos.appendChild(windows_content_Mask);

        var windows_content = document.createElement("div");
        windows_content.className = "windows_content";
        windows_content.style.cssText = "width:" + width + "px;height:" + (height - 24) + "px;";
        windcos.appendChild(windows_content);
        var iframe = document.createElement("iframe");
        iframe.id = "windows_iframe" + Math.round(Math.random() * 999 + 1);
        iframe.width = width + "px";
        iframe.height = (height - 24) + "px";
        iframe.frameBorder = 0;
        iframe.allowTransparency = true;
        iframe.src = arg.Href;
        windows_content.appendChild(iframe);
        arg.Obj.parentNode.parentNode.appendChild(windcos);
        return new DialogMoves({ moveControlLayer: windows_content_Mask, moveLayer: windcos, close: windows_transp_close, BarControlMode: "move", showLayer: windows_transp_close, showBarLayer: windcos });
    },
    iframes: function (arg) {
        var title = arg.Title ? arg.Title : '';
        var width = arg.Width ? arg.Width : 295;
        var height = arg.Height ? arg.Height : 295;
        var isMagify = arg.isMagify ? arg.isMagify : true;
        var windcos = document.createElement("div");
        var id = "simulationLayeriframes" + Math.random();
        windcos.className = "windowsbox";
        var currentWindows = !arg.IsTask && RangeSelectedzIndexStatus();
        var top = (($(window).height() / 2) - (height / 2));
        var left = (($(window).width() / 2) - (width / 2));
        if (currentWindows) {
            var currenttop = parseInt($(currentWindows).css("top"));
            var currentleft = parseInt($(currentWindows).css("left"));
            if ((currenttop + parseInt(height) + 30) > $(document.body).height()) {
                top = 40;
            } else {
                top = currenttop + 30;
            }
            if ((currentleft + parseInt(width) + 30) > $(document.body).width()) {
                left = 40;
            } else {
                left = currentleft + 30;
            }
        }
        windcos.style.cssText = "width:" + width + "px;height:" + height + "px;left:" + left + "px;top:" + top + "px;z-index:" + (zIndexs++);
        var windowsbox_rigthline = document.createElement("div");
        windowsbox_rigthline.className = "windowsbox_rigthline";
        windcos.appendChild(windowsbox_rigthline);

        var windowsbox_bottomline = document.createElement("div");
        windowsbox_bottomline.className = "windowsbox_bottomline";
        windcos.appendChild(windowsbox_bottomline);
        //创建标题栏
        var windows_title = document.createElement("div");
        windows_title.className = "windowsbox_title";
        var windows_buttonBar = document.createElement("div");
        windows_buttonBar.className = "windowsbox_buttonBar";
        var windows_minify = document.createElement("a");
        windows_minify.href = "javascript://";
        windows_minify.className = "windows_action_bar windowsbox_minify";

        var windows_magify = document.createElement("a");
        windows_magify.href = "javascript://";
        windows_magify.className = "windows_action_bar windowsbox_magify";
        var windows_revert = document.createElement("a");
        windows_revert.href = "javascript://";
        windows_revert.className = "windows_action_bar windowsbox_revert";
        windows_revert.style.display = "none";

        var windows_close = document.createElement("a");
        windows_close.href = "javascript://";
        windows_close.className = "windows_action_bar windowsbox_close";
        windows_buttonBar.appendChild(windows_close);
        if (eval(isMagify)) {
            windows_buttonBar.appendChild(windows_magify);
            windows_buttonBar.appendChild(windows_revert);
        }
        if (!arg.IsTask) {
            windows_buttonBar.appendChild(windows_minify);
        }



        var windows_titleText = document.createElement("div");
        windows_titleText.className = "title_content";
        //windows_titleText.innerHTML = title;

        $(windows_title).append($("<div />").addClass("title_left"));
        $(windows_titleText).append($("<span />").addClass("title_content_f").html(title));
        windows_titleText.appendChild(windows_buttonBar);
        windows_title.appendChild(windows_titleText);
        $(windows_title).append($("<div />").addClass("title_right"));

        //创建内容区
        var windows_content = document.createElement("div");
        windows_content.className = "windowsbox_content";
        windows_content.style.height = (height - 31) + "px";
        var iframe = document.createElement("iframe");
        iframe.id = "windows_iframe" + Math.round(Math.random() * 999 + 1);
        iframe.style.width = "100%";
        iframe.style.height = (height - 31) + "px";
        iframe.frameBorder = 0;
        iframe.scrolling = "no"
        iframe.allowTransparency = true;
        iframe.src = arg.Href;
        windows_content.appendChild(iframe);

        windcos.appendChild(windows_title);
        windcos.appendChild(windows_content);

        if (arg.AppendObj) {
            arg.AppendObj.appendChild(windcos);
        } else {
            arg.Obj.parentNode.parentNode.appendChild(windcos);
        }
        var taskobj = null;
        if (!arg.IsTask) {
            taskobj = new Task({ src: arg.Src, Text: title, Dialog: windcos, desklocation: arg.DeskLocation });
        }
        return new DialogMoves({ moveControlLayer: windows_title, moveLayer: windcos, close: windows_close, minify: windows_minify, magify: windows_magify, revert: windows_revert, clone: false, isMagifys: isMagify, TaskObj: taskobj });
    },
    url: function (p, a) {
        var b = "[\?&]" + p + "=([^&]*)";
        var c = new RegExp(b, "gi");
        if (!c.test(a)) return "";
        c.exec(a);
        return RegExp.$1
    }
};
Dialog.Iframe = {
    FullScreen: false,
    Init: function (fun) {
        var s = sl(".dialog");
        for (var i = 0; i < s.length; i++) {
            var o = s[i];
            var t = o.title || o.name || null;
            var a = o.getAttribute('href');
            var p = o.getAttribute('Custom');
            if (p == "Custom") {
                o.ondblclick = function () {
                    fun(o);
                }
            } else {
                o.ondblclick = (function (t, a, obj) {
                    return function () {
                        Dialog.Iframe.ExecuteDbClick(t, a, obj)
                        this.blur();
                        return false;
                    }
                })(t, a, o);
            }
        }
    },
    ExecuteDbClick: function (t, a, obj) {
        var index = obj.parentNode.parentNode.getAttribute("index");
        index = index == null ? 0 : index;
        deskMove(index);
        deskwrapper(index);
        if (obj.info) {
            if (obj.info.closeStatus)
                obj.info = Dialog.Iframe.Execute(t, a, obj, sl(">.addButtonIco>img", obj)[0].src, index);
            else {
                if (obj.info.minifyStatus) {
                    obj.info.moveLayerShow();
                }
                obj.info.setting.moveLayer.style.zIndex = ++zIndexs;
                obj.info.setting.TaskObj && obj.info.setting.TaskObj.RangeSelectedStatus(obj.info.setting.TaskObj.taskObj);
            }
        } else {
            obj.info = Dialog.Iframe.Execute(t, a, obj, sl(">.addButtonIco>img", obj)[0].src, index);
        }
    },
    Execute: function (title, href, obj, src, index, appendObj, isTask) {
        var r = /^[+-]?\d+(\.\d+)?$/;
        var width = Dialog.url('width', href);
        var height = Dialog.url('height', href);
        var Modes = Dialog.url('Mode', href);
        var ismagify = Dialog.url('isMagify', href);
        width = r.test(width) ? width : 0;
        height = r.test(height) ? height : 0;
        var dial = null;
        switch (Modes) {
            case "Transparent":
                dial = new Dialog.Transparent({ Width: width, Height: height, Title: title, Href: href, Obj: obj });
                break;
            case "iframes":
                dial = new Dialog.iframes({ Width: width, Height: height, Title: title, Href: href, Obj: obj, Src: src, DeskLocation: index, isMagify: ismagify, AppendObj: appendObj, IsTask: isTask });
                break;
        }
        return dial;
    }
};
var DialogMoves = function (moveSetting) {
    this.setting = {
        //移动控制层
        moveControlLayer: null,
        //移动层
        moveLayer: null,
        //show始终显示，move移上未层显示
        BarControlMode: "show",
        //显示控制层
        showBarLayer: null,
        //显示层
        showLayer: null,
        //关闭
        close: null,
        //缩小
        minify: null,
        //放大
        magify: null,
        //还原
        revert: null,
        clone: true,
        isMagifys: true,
        TransparentTitleLayer: null,
        TaskObj: null
    };
    this.minifyStatus = false;
    this.closeStatus = false;
    var movesgph = false;
    this.setting = sl.extend(this.setting, moveSetting);
    var op = this.setting;
    var dialogobj = this;
    if (this.setting.moveControlLayer == null)
        return;
    if (this.setting.BarControlMode == "move") {
        this.setting.showLayer.style.display = "none";
        this.setting.showBarLayer.onmouseover = function (e) {
            clearTimeout(this.cleartime);
            op.showLayer.style.display = "block";
        }
        this.setting.showBarLayer.onmouseout = function (e) {
            this.cleartime = setTimeout(function () { op.showLayer.style.display = "none"; }, 100);
        }
    }
    var movelayerWidth = parseInt(this.setting.moveLayer.style.width);
    var movelayerHeight = parseInt(this.setting.moveLayer.style.height);
    var movelayerleft = this.setting.moveLayer.getBoundingClientRect().left;
    var movelayerrigth = this.setting.moveLayer.getBoundingClientRect().right;
    var movelayertop = this.setting.moveLayer.getBoundingClientRect().top;
    var movelayerbottom = this.setting.moveLayer.getBoundingClientRect().bottom;
    if (this.setting.close) {
        this.setting.close.onmousedown = function (e) {
            e = window.event || e;
            if (window.event) {
                e.cancelBubble = true;
            } else { e.stopPropagation(); }
        }
        this.setting.close.onclick = function (e) {
            e = window.event || e;
            dialogobj.closeStatus = true;
            $("#middle").parent().css({ "z-index": "500" });
            op.moveLayer.parentNode.removeChild(op.moveLayer);
            op.TaskObj && op.TaskObj.DeleteTaskInfo(op.TaskObj);
            op.TaskObj && op.TaskObj.RangeSelectedzIndexStatus();
            if (window.event) {
                e.cancelBubble = true;
            } else { e.stopPropagation(); }
        };
    }
    if (this.setting.magify) {
        this.setting.magify.onclick = function (e) {
            e = window.event || e;
            var deskw = document.documentElement.clientWidth;
            var deskh = document.documentElement.clientHeight;
            $("#middle").parent().css({ "z-index": zoomIndexs });
            op.moveLayer.style.cssText = "width:" + deskw + "px;height:" + deskh + "px;top:0;left:0; z-index:" + (++zIndexs);
            $(">.windowsbox_content", op.moveLayer).height(deskh - 31);
            $(">.windowsbox_content>iframe", op.moveLayer).height(deskh - 31);
            op.revert.style.display = "block";
            this.style.display = "none";
            op.moveControlLayer.setAttribute("revert", "revert");
            op.TaskObj && op.TaskObj.RangeSelectedStatus(op.TaskObj.taskObj);
            if (window.event) {
                e.cancelBubble = true;
            } else { e.stopPropagation(); }
        };
        this.setting.magify.onmousedown = function (e) {
            e = window.event || e;
            if (window.event) {
                e.cancelBubble = true;
            } else { e.stopPropagation(); }
        }
        this.setting.revert.onclick = function (e) {
            e = window.event || e;
            $("#middle").parent().css({ "z-index": "500" });
            op.moveLayer.style.cssText = "width:" + movelayerWidth + "px;height:" + movelayerHeight + "px;top:" + movelayertop + "px;left:" + movelayerleft + "px; z-index:" + (zIndexs++);
            $(">.windowsbox_content", op.moveLayer).height(movelayerHeight - 31);
            $(">.windowsbox_content>iframe", op.moveLayer).height(movelayerHeight - 31);
            op.magify.style.display = "block";
            this.style.display = "none";
            op.moveControlLayer.setAttribute("revert", "magify");
            if (window.event) {
                e.cancelBubble = true;
            } else { e.stopPropagation(); }
        };
        this.setting.revert.onmousedown = function (e) {
            e = window.event || e;
            if (window.event) {
                e.cancelBubble = true;
            } else { e.stopPropagation(); }
        }
    }
    if (this.setting.minify) {
        this.setting.minify.onmousedown = function (e) {
            e = window.event || e;
            if (window.event) {
                e.cancelBubble = true;
            } else { e.stopPropagation(); }
        }
        this.setting.minify.onclick = function (e) {
            e = window.event || e;
            op.moveLayer.style.display = "none";
            dialogobj.minifyStatus = true;
            op.TaskObj && op.TaskObj.RangeSelectedzIndexStatus();
            if (window.event) {
                e.cancelBubble = true;
            } else { e.stopPropagation(); }
        }
        this.moveLayerShow = function () {
            op.moveLayer.style.display = "";
            op.moveLayer.style.zIndex = ++zIndexs;
            dialogobj.minifyStatus = false;
        }
    }
    if (this.setting.moveControlLayer) {
        $(this.setting.moveControlLayer).bind("contextmenu", function (e) {
            e.preventDefault();
            e.stopPropagation();
        });
        this.setting.moveControlLayer.onmousedown = function (e) {
            e = window.event || e;
            if (e.button == 2) {
                if (document.all) {
                    e.cancelBubble = true;
                } else { e.preventDefault(); e.stopPropagation() }
                return;
            }
            if (this.getAttribute("revert") != undefined && this.getAttribute("revert") != "magify") {
                return;
            }
            var maskDiv = $("<div />").height($(document).height()).width($(document).width()).css({
                zIndex: ++zIndexs,
                filter: 'alpha(opacity=0)',
                position: "absolute",
                top: 0,
                left: 0,
                opacity: '0'
            });
            var maskContentDiv = $("<div />").height($(document).height()).width($(document).width()).css({
                zIndex: ++zIndexs,
                filter: 'alpha(opacity=0)',
                position: "absolute",
                top: 0,
                left: 0,
                opacity: '0'
            });
            op.moveLayer.style.zIndex = ++zIndexs;
            op.moveControlLayer.prev_x = e.clientX;
            op.moveControlLayer.prev_y = e.clientY;
            var hander = op.moveControlLayer;
            op.TaskObj && op.TaskObj.RangeSelectedStatus(op.TaskObj.taskObj);
            //            clearTimeout(op.moveControlLayer.time);
            //            if (!op.clone) {
            //                op.moveControlLayer.time = setTimeout(movesg, 100);
            //            } else {
            //                movesg();
            //            }
            movesg();
            if (document.all) {
                hander.setCapture(); e.cancelBubble = true;
            } else { e.preventDefault(); e.stopPropagation() }
            function movesg() {
                op.moveControlLayer.x = op.moveControlLayer.prev_x - op.moveLayer.offsetLeft;
                op.moveControlLayer.y = op.moveControlLayer.prev_y - op.moveLayer.offsetTop;
                $(op.moveLayer).before(maskDiv);
                $("+ div", op.moveControlLayer).append(maskContentDiv);
                $(document).mousemove(function (e) {
                    e = window.event || e;
                    var x = e.clientX - hander.x, y = e.clientY - hander.y;
                    movesgph = true;
                    op.moveLayer.style.left = x + "px";
                    if (y <= 1)
                        op.moveLayer.style.top = 1 + "px";
                    else
                        op.moveLayer.style.top = y + "px";
                    if (document.all) {
                        hander.setCapture(); e.cancelBubble = true;
                    } else { window.onblur = dragStop; e.preventDefault(); e.stopPropagation() }
                    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                });
                function dragStop(e) {
                    e = window.event || e;
                    $(document).unbind();
                    document.onmouseup = null;
                    var mx = parseInt(op.moveLayer.style.left);
                    var my = parseInt(op.moveLayer.style.top);
                    op.moveLayer.style.left = mx + "px";
                    op.moveLayer.style.top = my + "px";
                    maskDiv.remove();
                    maskContentDiv.remove();
                    if (movesgph) {
                        movelayerleft = op.moveLayer.getBoundingClientRect().left;
                        movelayerrigth = op.moveLayer.getBoundingClientRect().right;
                        movelayertop = op.moveLayer.getBoundingClientRect().top;
                        movelayerbottom = op.moveLayer.getBoundingClientRect().bottom;
                    }
                    movesgph = false;
                    if (document.all) {
                        hander.onlosecapture = null; hander.releaseCapture();
                    } else { window.onblur = null }
                }
                document.onmouseup = dragStop;
            }
        }
        this.setting.moveControlLayer.onmouseup = function (e) {
            e = window.event || e;
            if (e.button == 2) {
                if (document.all) {
                    e.cancelBubble = true;
                } else { e.preventDefault(); e.stopPropagation() }
                return;
            }
            if (op.clone)
                return;
            if (op.moveControlLayer) {
                if (eval(op.isMagifys)) {
                    if (movesgph) return;
                    var count = this.count == null ? 1 : parseInt(this.count) + 1;
                    var time = this.time == null ? new Date().format("yyyy-MM-dd hh:mm:ss").toTime() : this.time;
                    this.count = count;
                    this.time = time;
                    var days = (new Date().format("yyyy-MM-dd hh:mm:ss").toTime() - this.time) / (86400000 / 24 / 60 / 60);
                    if (count >= 2 && days < 1) {
                        this.count = null;
                        this.time = null;
                        e = window.event || e;
                        var deskw = document.documentElement.clientWidth;
                        var deskh = document.documentElement.clientHeight;
                        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                        if (this.getAttribute("revert") == undefined || this.getAttribute("revert") == "magify") {
                            $("#middle").parent().css({ "z-index": zoomIndexs });
                            op.moveLayer.style.cssText = "width:" + deskw + "px;height:" + deskh + "px;top:0;left:0; z-index:" + (zIndexs++);
                            $(">.windowsbox_content", op.moveLayer).height(deskh - 31);
                            $(">.windowsbox_content>iframe", op.moveLayer).height(deskh - 31);
                            op.revert.style.display = "block";
                            op.magify.style.display = "none";
                            this.setAttribute("revert", "revert");
                        } else {
                            $("#middle").parent().css({ "z-index": 500 });
                            op.moveLayer.style.cssText = "width:" + movelayerWidth + "px;height:" + movelayerHeight + "px;top:" + movelayertop + "px;left:" + movelayerleft + "px; z-index:" + (zIndexs++);
                            $(">.windowsbox_content", op.moveLayer).height(movelayerHeight - 31);
                            $(">.windowsbox_content>iframe", op.moveLayer).height(movelayerHeight - 31);
                            op.magify.style.display = "block";
                            op.revert.style.display = "none";
                            this.setAttribute("revert", "magify");
                        }
                    } else if (count >= 2) {
                        this.count = null;
                        this.time = null;
                    }
                }
            }
        }
    }

    if (this.setting.moveControlLayer) {
        if (eval(op.isMagifys)) {
            //            this.setting.moveControlLayer.ondblclick = function (e) {
            //                clearTimeout(op.moveControlLayer.time);
            //                e = window.event || e;
            //                var deskw = document.documentElement.clientWidth;
            //                var deskh = document.documentElement.clientHeight;
            //                if (document.all) {
            //                    op.moveControlLayer.setCapture(); e.cancelBubble = true;
            //                } else { e.preventDefault(); e.stopPropagation() }
            //                window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
            //                if (this.getAttribute("revert") == undefined || this.getAttribute("revert") == "magify") {
            //                    op.moveLayer.style.cssText = "width:" + deskw + "px;height:" + deskh + "px;top:0;left:0; z-index:" + (zIndexs++);
            //                    $(">.windowsbox_content", op.moveLayer).height(deskh - 31);
            //                    $(">.windowsbox_content>iframe", op.moveLayer).height(deskh - 31);
            //                    op.revert.style.display = "block";
            //                    op.magify.style.display = "none";
            //                    this.setAttribute("revert", "revert");
            //                } else {
            //                    op.moveLayer.style.cssText = "width:" + movelayerWidth + "px;height:" + movelayerHeight + "px;top:" + movelayertop + "px;left:" + movelayerleft + "px; z-index:" + (zIndexs++);
            //                    $(">.windowsbox_content", op.moveLayer).height(movelayerHeight - 31);
            //                    $(">.windowsbox_content>iframe", op.moveLayer).height(movelayerHeight - 31);
            //                    op.magify.style.display = "block";
            //                    op.revert.style.display = "none";
            //                    this.setAttribute("revert", "magify");
            //                }
            //                op.moveControlLayer.releaseCapture();
            //            }
        }
    }
    if (this.setting.isMagifys == true) {
        if (this.setting.moveLayer) {
            var ondown = false;
            var s = true;
            this.setting.moveLayer.onmousemove = function (e) {
                e = window.event || e;
                if ((this.getBoundingClientRect().right - 8) <= e.clientX && (this.getBoundingClientRect().right + 8) >= e.clientX) {
                    this.style.cursor = "e-resize";
                    s = true;
                }
                else if ((this.getBoundingClientRect().bottom - 30) <= e.clientY && this.getBoundingClientRect().bottom + 30 >= e.clientY) {
                    this.style.cursor = "n-resize";
                    s = true;
                }
                else {
                    this.style.cursor = "default";
                    s = false;
                }
                op.moveLayer.onmousedown = function (e) {
                    if (!s)
                        return;
                    e = window.event || e;
                    op.moveLayer.prev_x = e.clientX;
                    op.moveLayer.prev_y = e.clientY;
                    //                var rect = op.moveLayer.cloneNode(op.clone);
                    //                with (rect.style) {
                    //                    top = movelayertop + "px";
                    //                    left = movelayerleft + "px";
                    //                    filter = 'alpha(opacity=50)';
                    //                    opacity = "0.5";
                    //                    position = "absolute";
                    //                    cursor = "auto";
                    //                    overFlow = " hidden;";
                    //                }
                    //                var vvvv = null;
                    //                if (!op.clone) {
                    //                    var recttitle = op.moveControlLayer.cloneNode(true);
                    //                    var rectControl = $(">div", op.moveLayer)[1].cloneNode(false);
                    //                    var rectControlAlpha = $(">div", op.moveLayer)[1].cloneNode(true);
                    //                    with (rectControl.style) {
                    //                        border = "none";
                    //                        overFlow = " hidden;";
                    //                    }
                    //                    rectControl.appendChild(rectControlAlpha);
                    //                    vvvv = $("<div />").css({
                    //                        top: 0,
                    //                        left: 0,
                    //                        position: 'absolute',
                    //                        width: 1444,
                    //                        height: 900
                    //                    });
                    //                    $(rectControl).append(vvvv);
                    //                    rect.appendChild(recttitle);
                    //                    rect.appendChild(rectControl);
                    //                }
                    //                var mover = document.body.appendChild(rect);
                    if (document.all) {
                        op.moveLayer.setCapture(); e.cancelBubble = true;
                    } else { window.onblur = dragStop; e.preventDefault(); e.stopPropagation() }
                    var diskDiv = $("<div />").css({
                        top: 0,
                        left: 0,
                        position: 'absolute',
                        width: 1444,
                        height: 900
                    });
                    $(">.windowsbox_content", op.moveLayer).append(diskDiv);
                    var width = parseInt(op.moveLayer.style.width);
                    var height = parseInt(op.moveLayer.style.height);
                    document.onmousemove = function (e) {
                        e = window.event || e;
                        var x = e.clientX - op.moveLayer.prev_x, y = e.clientY - op.moveLayer.prev_y;
                        op.moveLayer.style.width = ((width + x) >= 720) ? (width + x) + "px" : "720px";
                        op.moveLayer.style.height = ((height + y) >= 400) ? (height + y) + "px" : "400px";
                        $(".windowsbox_content", op.moveLayer).height(((height + y) >= 400) ? (height + y - 31) : 400 - 31);
                        $(".windowsbox_content>iframe", op.moveLayer).height(((height + y) >= 400) ? (height + y - 31) : 400 - 31);
                        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                        if (document.all) {
                            op.moveLayer.setCapture(); e.cancelBubble = true;
                        } else { e.preventDefault(); e.stopPropagation() }
                        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                    }
                    function dragStop(e) {
                        e = window.event || e;
                        document.onmousemove = document.onmouseup = null;
                        op.moveLayer.style.width = op.moveLayer.style.width;
                        op.moveLayer.style.height = op.moveLayer.style.height;
                        movelayerWidth = parseInt(op.moveLayer.style.width);
                        movelayerHeight = parseInt(op.moveLayer.style.height);
                        $(">.windowsbox_content", op.moveLayer).height(parseInt(op.moveLayer.style.height) - 31);
                        $(">.windowsbox_content>iframe", op.moveLayer).height(parseInt(op.moveLayer.style.height) - 31);
                        s = false;
                        diskDiv.remove();
                        if (document.all) {
                            op.moveLayer.onlosecapture = null; op.moveLayer.releaseCapture();
                        } else {
                            window.onblur = null;
                        }
                        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                    }
                    document.onmouseup = dragStop;
                    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
                }
            }
        }
    }
}