$(document).click(function (e) {
    //if (window.frameElement.parentNode.parentNode.style.zIndex != top.zIndexs) {
    //    window.frameElement.parentNode.parentNode.style.zIndex = ++top.zIndexs;
    //}
});

function toolmenu(toolmenu, toolmenucontent) {
    var menuTime;
    $("#" + toolmenu).mouseover(function (e) {
        $(this).parent().removeClass().addClass("menuover").addClass("tool_menu");
    }).mouseout(function () {
        var t = this;
        menuTime = setTimeout(function () {
            $(t).parent().removeClass().addClass("menu").addClass("tool_menu");
        }, 500);
    }).click(function () {
        $(this).parent().removeClass().addClass("menuclick").addClass("tool_menu");
    });

    $("#" + toolmenucontent).mouseover(function () {
        clearTimeout(menuTime);
        $(document).unbind("mousedown");
        $(document).mousedown(function (e) {
            if (e.target !== $("#" + toolmenucontent).get(0) && !$.contains($("#" + toolmenucontent).get(0), e.target)) {
                $("#" + toolmenu).parent().removeClass().addClass("menu").addClass("tool_menu");
                $(document).unbind("mousedown");
            }
        });
    });

    $("#" + toolmenucontent + " li").mouseover(function (e) { $(this).addClass("e") }).mouseout(function (e) { $(this).removeClass("e") }).click(function (e) {
        $("#" + toolmenu).parent().removeClass().addClass("menu").addClass("tool_menu");
        if (top.$("#" + this.id).length > 0) {
            top.Dialog.Iframe.ExecuteDbClick(top.$("#" + this.id).attr("title"), top.$("#" + this.id).attr("href"), top.$("#" + this.id).get(0));
        }
        e.stopPropagation();
        return false;
    });
}