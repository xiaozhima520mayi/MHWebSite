<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ImageList.aspx.cs" Inherits="WebSite.BackStage.ImageList" %>

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

    <script src="../WebUI/js/jquery/jquery-1.8.0.min.js"></script>
    <script src="../WebUI/js/grid/grid.locale-cn.js"></script>
    <script src="../WebUI/js/grid/jquery.jqGrid.js"></script>
    <script src="../WebUI/js/Tool/tips.js"></script>
    <script src="../WebUI/js/Tool/windowsInit.js"></script>
    <script src="../WebUI/js/Tool/tipsFade.js"></script>
    <script src="../WebUI/js/back/imageList.js"></script>


    <script src="../ueditor/ueditor.config.js"></script>
    <script src="../ueditor/ueditor.all.min.js"></script>
    <link href="../ueditor/themes/default/css/ueditor.min.css" rel="stylesheet" />
    <!--建议手动加在语言，避免在ie下有时因为加载语言失败导致编辑器加载失败-->
    <!--这里加载的语言文件会覆盖你在配置项目里添加的语言类型，比如你在配置项目里配置的是英文，这里加载的中文，那最后就是中文-->
    <script type="text/javascript" charset="utf-8" src="lang/zh-cn/zh-cn.js"></script>
</head>

<body style="background: #fff">
    <form id="form1" runat="server">
        <div class="tool">
            <ul class="toolbut">
                <li><a href="javascript://" class="tool_new" hidefocus="true" onclick="upImage()">上传</a></li>
                <li><a href="javascript://" class="tool_del" id="Delete" hidefocus="true">删除</a></li>
                <script type="text/plain" id="j_ueditorupload" style="height: 5px; display: none;"></script>
                <script>
                    //实例化编辑器
                    var o_ueditorupload = UE.getEditor('j_ueditorupload',
                    {
                        autoHeightEnabled: false
                    });
                    o_ueditorupload.ready(function () {
                        o_ueditorupload.hide();//隐藏编辑器
                        //监听图片上传
                        o_ueditorupload.addListener('beforeInsertImage', function (t, arg) {
                            //alert('这是图片地址：'+arg[0].src);
                            //alert("点击了确定按钮");
                            jQuery("#list19").trigger("reloadGrid");
                        });
                        /* 文件上传监听
                         * 需要在ueditor.all.min.js文件中找到
                         * d.execCommand("insertHtml",l)
                         * 之后插入d.fireEvent('afterUpfile',b)
                         */
                        o_ueditorupload.addListener('afterUpfile', function (t, arg) {
                            alert('这是文件地址：' + arg[0].url);
                        });
                    });
                    //弹出图片上传的对话框
                    function upImage() {
                        var myImage = o_ueditorupload.getDialog("insertimage");
                        myImage.open();
                    }
                    //弹出文件上传的对话框
                    function upFiles() {
                        var myFiles = o_ueditorupload.getDialog("attachment");
                        myFiles.open();
                    }
                </script>
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
        MESSAGEL.LISTINIT();
    </script>
</body>
</html>
