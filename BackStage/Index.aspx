<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="WebSite.BackStage.Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>上业科技-后台</title>
    <link href="../WebUI/css/back/base.css" rel="stylesheet" />
    <link href="../WebUI/css/back/Oabase.css" rel="stylesheet" /> 
    <link href="../WebUI/css/back/Gray/PopBox/boxgray.css" rel="stylesheet" />
    <link href="../WebUI/css/back/file_preview.css" rel="stylesheet" />
    <link href="../WebUI/css/back/uploader.css" rel="stylesheet" />
    <link href="../WebUI/css/back/ScrollBar/nanoscroller.css" rel="stylesheet" />
    <script src="../WebUI/js/back/sl.js"></script>
    <script src="../WebUI/js/jquery/jquery-1.8.0.min.js"></script>
    <script src="../WebUI/js/back/CommonBase.js"></script>
    <script src="../WebUI/js/Tool/deskIconRange.js"></script>
    <script src="../WebUI/js/Tool/dialog.js"></script>
    <script src="../WebUI/js/ScrollBar/jquery.nanoscroller.js"></script>
    <script src="../WebUI/js/Tool/Task.js"></script>
    <script src="../WebUI/js/Tool/tips.js"></script> 
    <script src="../WebUI/js/Tool/wrapper.js"></script> 
</head>
<body onload="bg()">
    <form id="form1" runat="server">
        <div id="desktop" class="desktop">
            <div class="newmanagebg" style="left: 45%">
                <div class="productlist" id="toolitem">
                    <a href="javascript://" class="productname e">
                        <span>上业门户</span> 
                        <img src="../WebUI/images/backImage/prolist_e_bg.png" />
                        <i></i>
                    </a> 
                </div>
                <div class="managebg_tool" style="float: left">
                    <a href="javascript://" class="tool_about" style="margin-left: 13px" title="关于" onclick="getHelp()"></a><a href="Logout.aspx" class="tool_canceled" title="注销"></a>
                </div>
            </div>
            <div class="middle">
                <div id="middle">
                    <div class="pagelist desktop_current" >
                        <div class="appIcons"> 
                            <div class="icon dialog" href="Data/UpPassWord.aspx?Mode=iframes&width=682&height=481" title="系统设置">
                                <div class="addButtonIco">
                                    <img src="../WebUI/images/backImage/sys_setting.png" />
                                </div>
                                <div class="appIconName">
                                    <div class="appIconNameinner">系统设置</div>
                                    <div class="appIconNameright"></div>
                                </div>
                            </div>
                            <div class="icon dialog" href="TryProductList.aspx?Mode=iframes&width=900&height=500" title="申请试用管理">
                                <div class="addButtonIco">
                                    <img src="../WebUI/images/backImage/website.png" />
                                </div>
                                <div class="appIconName">
                                    <div class="appIconNameinner">试用申请</div>
                                    <div class="appIconNameright"></div>
                                </div>
                            </div>
                            <div class="icon dialog" href="MessageList.aspx?Mode=iframes&width=900&height=500" title="留言管理">
                                <div class="addButtonIco">
                                    <img src="../WebUI/images/backImage/role.png" />
                                </div>
                                <div class="appIconName">
                                    <div class="appIconNameinner">留言管理</div>
                                    <div class="appIconNameright"></div>
                                </div>
                            </div>
                            <div class="icon dialog" href="ImageList.aspx?Mode=iframes&width=900&height=500" title="玩在上业">
                                <div class="addButtonIco">
                                    <img src="../WebUI/images/backImage/role.png" />
                                </div>
                                <div class="appIconName">
                                    <div class="appIconNameinner">玩在上业</div>
                                    <div class="appIconNameright"></div>
                                </div>
                            </div> 
                        </div>
                    </div>  
                </div>
            </div>
            <div class="bottomBarBgTask"></div>
            <div class="bottomBar">
                <div class="task">
                </div>
            </div>
        </div>
        <div id="zoomWallpaperGrid">
            <img src="../WebUI/images/backImage/blue_glow.jpg" style="position: absolute; width: 100%; height: 100%;" />
        </div>
    </form>
    <script>
        var zindexDef = 88888889;
        var app = sl(".pagelist>.appIcons").DeskIconRange();
        window.onresize = function () {
            bg();
            app.RangeHeightIcon(app);
        }
        function bg() {
            var w = document.documentElement.clientWidth;
            var h = document.documentElement.clientHeight;
            sl("#zoomWallpaperGrid")[0].style.cssText = "position:absolute; z-index:-10; left:0; top:0; overflow:hidden;width:" + w + "px;height:" + h + "px;";
            sl("#zoomWallpaperGrid>img")[0].style.cssText = "position:absolute; z-index:-10; left:0; top:0; overflow:hidden;width:" + w + "px;height:" + h + "px;";
            sl("#desktop")[0].style.cssText = "width:" + w + "px;height:" + (h) + "px;";
            sl("#middle")[0].style.cssText = "width:" + (w) + "px;height:" + (h) + "px;";
            //sl(".pagelist")[0].style.cssText = "width:" + w + "px;height:" + (h - 83) + "px;";
            sl(".pagelist").execCustomizeMethods(function () {
                this.style.cssText = "width:" + w + "px;height:" + (h) + "px;";
            })
        } 
        Dialog.Iframe.Init();
        $.tips.InitDiv();
        new wrapper();
    </script>
</body>
</html>
