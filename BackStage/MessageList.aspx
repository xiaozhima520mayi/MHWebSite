<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="MessageList.aspx.cs" Inherits="WebSite.BackStage.MessageList" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>上业科技-在线试用管理</title>
    <link type="text/css" href="../WebUI/css/back/base.css" rel="stylesheet" />
    <link type="text/css" href="../WebUI/css/back/Gray/public.css" rel="stylesheet" />
    <link type="text/css" href="../WebUI/css/back/Gray/control.css" rel="stylesheet" />
    <link type="text/css" href="../WebUI/css/back/Gray/site.css" rel="stylesheet" />
    <link href="../WebUI/css/back/Gray/grid/jquery-ui-1.8.22.custom.css" rel="stylesheet" />
    <link type="text/css" href="../WebUI/css/back/Gray/grid/ui.jqgrid.css" rel="stylesheet" />
    <link type="text/css" href="../WebUI/css/back/Gray/grid.css" rel="stylesheet" />

    <script src="../WebUI/js/jquery/jquery-1.8.0.min.js" type="text/javascript"></script>
    <script src="../WebUI/js/grid/grid.locale-cn.js" type="text/javascript"></script>
    <script src="../WebUI/js/grid/jquery.jqGrid.js" type="text/javascript"></script>
    <script src="../WebUI/js/Tool/tips.js" type="text/javascript"></script>
    <script src="../WebUI/js/Tool/windowsInit.js" type="text/javascript"></script>
    <script src="../WebUI/js/Tool/tipsFade.js" type="text/javascript"></script>
    <script src="../WebUI/js/back/messageList.js" type="text/javascript"></script>
</head>

<body style="background: #fff">
    <form id="form1" runat="server">
        <div class="tool">
            <input type="button" value="处理" onclick="btnclick()" />
            <input type="button" value="删除" onclick="messagedel()" />
            <div class="seach">
                <div class="seach_import">
                    <input id="txtSearch" type="text" />
                </div>
                <a class="seach_but"></a>
            </div>
        </div>
        <div class="win_content">
            <div class="win_content_l_poson">
                <a href="javascript://" class="win_position_out" hidefocus="true" title="提示" id="out"></a>
            </div>
            <div class="win_content_r" style="position: relative">
                <table id="list19"></table>
                <div id="pager2"></div>
            </div>
        </div>
    </form>
    <script type="text/javascript">
        var su = 1;
        $("#in").click(function () {
            $(this).parent().parent().addClass("win_contents");
            jQuery("#list19").setGridWidth(($(window).width() - 10));
            su = 0;
        })
        $("#out").click(function () {
            $(this).parent().parent().removeClass("win_contents");
            jQuery("#list19").setGridWidth(($(window).width() - 214));
            su = 1;
        })
        function resizeJgrid() {
            if (su == 0) {
                jQuery("#list19").setGridWidth(($(window).width() - 10));
            } else if (su == 1) {
                jQuery("#list19").setGridWidth(($(window).width() - 214));
            }
        }
        $(window).resize(function () {
            resizeJgrid();
            var gridHeight = ($(window).height() - 101);
            var gridRowNum = (gridHeight / 26);
            jQuery("#list19").setGridHeight(($(window).height() - 101));
            $("#in").parent().height(($(window).height() - 50));
            $("#out").parent().height(($(window).height() - 50));
        });
        toolmenu("toolmenu", "toolmenucontent");
        MESSAGEL.LISTINIT();
        //$(document).ready(function () {
        //    $("#btn1").click(function (e) {
        //        return ("1");
        //    })
        //    $("#btn1").click(function (e) {
        //        $("p").html(e.result);
        //    });
        //});
        function btnclick() {
            var id = $("#list19").jqGrid('getGridParam', 'selrow');
            if (id == null || id == "") {
                $(".win_content_r").tipsFade({ mode: "error", locationPixel: 25, text: "请选择一条数据" });
            }
            else {
                $.ajax({
                    url: "/ASHX/ProductHanlder.aspx?action=btnclick&id=" + id,
                    type: "POST",
                    success: function () {
                        //$("#list19").trigger("reloadGrid");
                        $("#list19").setGridParam({ datatype: 'xml', page: 1 }).trigger('reloadGrid');
                    }
                })
            }
        }
        //批量删除
        function messagedel() {
            var ids = $("#list19").jqGrid("getGridParam", "selarrrow");
            if (ids == null || ids == "") {
                $(".win_content_r").tipsFade({ mode: "error", locationPixel: 25, text: "您还没有选择所要删除数据" });
            }
            else {
                $.ajax({
                    url: "/ASHX/ProductHanlder.aspx?action=messagedel&ids=" + ids,
                    type: "post",
                    success: function () {
                        //$("#list19").trigger("reloadGrid");
                        $("#list19").setGridParam({ datatype: 'xml', page: 1 }).trigger('reloadGrid');
                    }
                })
            }
        }
    </script>
</body>
</html>
