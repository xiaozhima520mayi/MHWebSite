/// <reference path="../jquery-1.4.1.min.js" />
var mutualMask = {
    show: function (v) {
        var obj = $(window.frameElement).parents('.windowsbox');
        if (obj.length == 0)
            obj = $(window.frameElement).parents('.tipsbox');
        if (obj.length == 0)
            obj = $(window.frameElement).parents('.FileView');
        if (obj.length == 0) {
            return;
        }
        var box = $(obj).find(".boxstatetips");
        if (box.length > 0) {
            $(obj).find(".boxstatetips").show();
            $(obj).find(".boxstatetips>.boxstatetipscontent").html((v == undefined ? "数据处理中" : v));
        } else {
            var tipDiev;
            var width = obj.width();
            var height = obj.height();
            if (obj.hasClass("tipsbox"))
                tipDiev = $("<div />").addClass("boxstatetips").css({ top: "8px", left: "8px", width: (width - 16) + "px", height: (height - 16) + "px" });
            else
                tipDiev = $("<div />").addClass("boxstatetips").css({ width: (width) + "px", height: (height) + "px", "box-shadow": "0 0 10px black" });
            var dimg = $("<img />").attr("src", "/WebUI/images/login/loading2.gif").width(55).height(55).css({ "margin-left": ((width - ([0, 16][+obj.hasClass("tipsbox")]) - 55) / 2) + "px", "margin-top": (((height - ([0, 16][+obj.hasClass("tipsbox")]) - 55) / 2) - height * 0.1) + "px" });
            var diveTips = $("<p />").html((v == undefined ? "数据处理中" : v)).addClass("boxstatetipscontent");
            tipDiev.append(dimg);
            tipDiev.append(diveTips);
            obj.append(tipDiev);
        }
    },
    hide: function (fun) {
        var obj = $(window.frameElement).parents('.windowsbox');
        if (obj.length == 0)
            obj = $(window.frameElement).parents('.tipsbox');
        if (obj.length == 0)
            obj = $(window.frameElement).parents('.FileView');
        if (obj.length == 0) {
            return;
        }
        var box = $(obj).find(".boxstatetips");
        if (box.length > 0) {
            if (fun == undefined)
                box.fadeOut();
            else
                box.fadeOut("slow", fun);
        }
    }
}