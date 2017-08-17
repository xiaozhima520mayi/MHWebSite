<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TryProductList.aspx.cs" Inherits="WebSite.BackStage.TryProductList" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head id="Head1" runat="server">
    <title>上业科技-在线试用管理</title>
    <link href="../WebUI/css/back/base.css" rel="stylesheet" /> 
    <link href="../WebUI/css/back/Gray/public.css" rel="stylesheet" />
    <link href="../WebUI/css/back/Gray/control.css" rel="stylesheet" />
    <link href="../WebUI/css/back/Gray/site.css" rel="stylesheet" />
    <link href="../WebUI/css/back/Gray/grid/ui.jqgrid.css" rel="stylesheet" />
    <link href="../WebUI/css/back/Gray/grid.css" rel="stylesheet" />
    <link href="../WebUI/css/back/Gray/grid/jquery-ui-1.8.22.custom.css" rel="stylesheet" />
    <script src="../WebUI/js/jquery/jquery-1.8.0.min.js"></script>
    <script src="../WebUI/js/grid/grid.locale-cn.js"></script>
    <script src="../WebUI/js/grid/jquery.jqGrid.js"></script>
    <script src="../WebUI/js/Tool/tips.js"></script>
    <script src="../WebUI/js/Tool/windowsInit.js"></script>
    <script src="../WebUI/js/Tool/tipsFade.js"></script> 
    <script src="../WebUI/js/back/tryProduct.js"></script>
</head>

<body style="background: #fff">
    <form id="form1" runat="server">
        <div class="tool"> 
            <ul class="toolbut"> 
                <%--<li><a href="javascript://" class="tool_del" id="Delete" hidefocus="true">删除</a></li>
                <li><a href="javascript://" class="tool_edit" id="Update" hidefocus="true">编辑</a></li>--%>
                <input type="button" value="处理" onclick="btnConfirm()"/>
                <input type="button" value="批量删除" onclick="btnDel()"/>
            </ul>
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
    <script>

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
        TRYPRODUCT.LISTINIT();
        //是否确认申请
        function btnConfirm() {
            var id = $("#list19").jqGrid('getGridParam', 'selrow');
            if (id == null || id == "") {
                $(".win_content_r").tipsFade({ mode: "error", locationPixel: 25, text: "请选择一条数据" });
            }
            else {
                $.ajax({
                    url: "/ASHX/ProductHanlder.aspx?action=confirm&id=" + id,
                    type: "post",
                    success: function () {
                        $("#list19").trigger("reloadGrid");
                    }
                })
            }
        }
        //批量删除
        function btnDel() {
            var ids = $("#list19").jqGrid("getGridParam", "selarrrow");
            if (ids == null || ids == "") {
                $(".win_content_r").tipsFade({ mode: "error", locationPixel: 25, text: "您还没有选择删除数据" });
            }
            else {
                $.ajax({
                    url: "/ASHX/ProductHanlder.aspx?action=allDel&ids=" + ids,
                    type: "post",
                    success: function () {
                        $("#list19").trigger("reloadGrid");
                    }
                })
            }
        }
    </script>
</body>
</html>
