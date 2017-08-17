/// <reference path="../jquery-1.4.1.min.js" />
(function () {
    $.fn.tipsHang = function (tipsSetting) {
        var setting = {
            src: "",
            width: 452,
            height: 320,
            sendObj: null
        }
        setting = $.extend(setting, tipsSetting);
        var _maskIf, _maskdiv, _layer, _inputs;
        this.close = function (type, obj) {
            _maskIf.remove();
            _maskdiv.remove();
            _layer.animate({ top: "-" + setting.height + "px" }, "500", "swing", function () {
                _layer.remove();
            });
            if (type.toLowerCase() == "ok") {
                if (setting.sendObj)
                    setting.sendObj(obj);
            }
            _inputs.focus();
        }
        var t = this;
        function create() {
            _maskIf = $("<iframe />", { frameborder: 0, id: ("maskifram") }).css({
                zIndex: "200",
                position: "absolute",
                top: 0,
                left: 0,
                width: $(document.body).width(),
                height: $(document.body).height(),
                filter: "alpha(opacity=0)",
                opacity: "0"

            });
            _maskdiv = $("<div />", { id: ("maskdiv") }).css({
                zIndex: "201",
                position: "absolute",
                top: 0,
                left: 0,
                filter: "alpha(opacity=0)",
                opacity: "0",
                width: $(document.body).width(),
                height: $(document.body).height()
            });
            $(document.body).append(_maskIf).append(_maskdiv);
//            $(document.body).find("form").css({ "-webkit-filter": "blur(3px)",
//                "-moz-filter": "blur(3px)",
//                "-o-filter": "blur(3px)",
//                "filter": "progid:DXImageTransform.Microsoft.Blur(PixelRadius='3')",
//                "filter": "url(#maskSvg)"
//            });
//            $(document.body).append("<svg width='0' height='0' style='position:absolute'><filter id='maskSvg'><feGaussianBlur in='SourceGraphic' stdDeviation='1'></filter></svg>");
            var layerLeft = (($(document.body).width() - setting.width) / 2);
            _layer = $("<div />").addClass("small_layer").css({ "z-index": "999999", top: "-" + setting.height + "px", left: layerLeft + "px" }).width(setting.width).height(setting.height);
            var _content = $("<div />").addClass("small_layer_content").height(setting.height);
            var _contentr = $("<div />").addClass("small_layer_content_r").height(setting.height);
            var _contentrscript = $("<div />").addClass("creatScript").height((setting.height - 13));
            var _scriptbox = $("<div />").addClass("script_boxs").height((setting.height - 13));
            var _ifram = $("<iframe />", { "frameBorder": 0 }).attr("src", setting.src).width("100%").height("100%");
            _inputs = $("<input />", { type: "text" }).css({ width: "1px", top: "-200px", "position": "absolute" });
            _ifram[0].close = t.close;
            _scriptbox.append(_ifram);
            _contentrscript.append(_scriptbox);
            _contentr.append(_contentrscript);
            _content.append(_contentr);

            var _bottom = $("<div />").addClass("small_layer_bottom");
            var _bottoml = $("<div />").addClass("small_layer_bot_l").addClass("layer");
            var _bottomm = $("<div />").addClass("small_layer_bot_m");
            var _bottomr = $("<div />").addClass("small_layer_bot_r").addClass("layer");
            _bottom.append(_bottoml).append(_bottomm).append(_bottomr);
            _layer.append(_content);
            _layer.append(_bottom);
            $(document.body).append(_layer);
            $(document.body).append(_inputs);
            _layer.animate({ top: "0" }, "500", "swing");
        }
        create();
        return this;
        //        var setting = {
        //            winId: "",
        //            saveId: "",
        //            closeId: "",
        //            mark: "",
        //            saveMethod: null
        //        }
        //        setting = $.extend(setting, tipsSetting);
        //        var _maskIf, _maskdiv;
        //        function create() {
        //            _maskIf = $("<ifram />", { frameborder: 0, id: ("maskifram") }).css({
        //                zIndex: "200",
        //                position: "absolute",
        //                top: 0,
        //                left: 0,
        //                width: $(document.body).width(),
        //                height: $(document.body).height(),
        //                filter: "alpha(opacity=0)",
        //                opacity: "0"

        //            });
        //            _maskdiv = $("<div />", { id: ("maskdiv") }).css({
        //                zIndex: "201",
        //                position: "absolute",
        //                top: 0,
        //                left: 0,
        //                filter: "alpha(opacity=0)",
        //                opacity: "0",
        //                width: $(document.body).width(),
        //                height: $(document.body).height()
        //            });
        //            $(document.body).append(_maskIf).append(_maskdiv);
        //        }
        //        function close() {
        //            var height = $("#" + setting.winId).height();
        //            alert(_maskIf);
        //            _maskIf.remove();
        //            _maskdiv.remove();
        //            $("#" + setting.winId).animate({ top: -height }, "500", "swing");
        //        }
        //        this.click(function () {
        //            create();
        //            $("#" + setting.winId).animate({ top: "0" }, "500", "swing");
        //        });
        //        $("#" + setting.saveId).click(function () {
        //            if (setting.saveMethod)
        //                setting.saveMethod();
        //            close();
        //        })
        //        $("#" + setting.closeId).click(function () {
        //            close();
        //        });
    }
})();