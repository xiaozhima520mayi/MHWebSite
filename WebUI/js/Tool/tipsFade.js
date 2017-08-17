/// <reference path="../jquery-1.4.1.min.js" />
(function () {
    $.fn.tipsFade = function (tipsSetting) {
        var setting = {
            location: "bottom",
            locationPixel: 0,
            mode: "success",
            text: '保存成功'
        }
        setting = $.extend(setting, tipsSetting);
        var width = this.width();
        var height = this.height();
        var mode = "success_tips";
        if (setting.mode != "success")
            mode = "error_tips";
        var _div = $("<div />").addClass(mode).css({
            filter: "alpha(opacity=0)",
            opacity: "0"
        }).width(width - 2);
        _div.html(setting.text);
        switch (setting.location) {
            case "bottom":
                _div.css({ "bottom": setting.locationPixel + "px" });
                break;
            case "top":
                _div.css({ "top": setting.locationPixel + "px" });
                break;
        };
        this.append(_div);
        _div.animate({
            opacity: "1"
        }, "slow", function () {
            setTimeout(function () {
                _div.animate({
                    opacity: "0"
                }, "slow", function () {
                    _div.remove();
                });
            }, 1000);
        });
    }
})();