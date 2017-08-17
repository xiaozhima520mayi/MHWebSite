<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="WebSite.BackStage.Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>上业门户后台-登录</title>
    <link href="../WebUI/css/back/base.css" rel="stylesheet" />
    <link href="../WebUI/css/back/login.css" rel="stylesheet" />
    <link href="../WebUI/css/back/Gray/PopBox/boxgray.css" rel="stylesheet" type="text/css" /> 
    <link href="../WebUI/css/back/Gray/PopBox/boxgray.css" rel="stylesheet" type="text/css" />
    <script src="../WebUI/js/jquery/jquery-1.8.0.min.js"></script>
    <script src="../WebUI/js/Tool/tips.js"></script> 
</head>
<body>
    <form id="form1" runat="server">
    <div class="logo">
        <asp:Image ID="Image1" ImageUrl="~/WebUI/images/backImage/l1.png" runat="server" />
    </div>
    <asp:HiddenField ID="HiddenField1" runat="server" Value="0" />
    <div class="fbox">
        <div class="help">
            <a href="javascript://">
                <img src="../WebUI/images/backImage/l3.png" onclick="getHelp()" />
            </a>
        </div>
        <ul class="tl" id="tl">
            <li class="name">
                <label for="name">
                </label>
                <asp:TextBox ID="txt_DefaultName" runat="server" MaxLength="30" autocomplete="off"></asp:TextBox><%--<input type="text" id="name" />--%></li>
            <li class="password">
                <label for="password">
                </label>
                <asp:TextBox ID="txt_DefaultPwd" TextMode="Password" MaxLength="20" runat="server"></asp:TextBox><%--<input type="text" id="password" />--%></li>
            <li class="concode" style="display: none;">
            <!--
                <asp:TextBox ID="txt_DefaultYZ" MaxLength="4" runat="server"></asp:TextBox><%--<input type="text" />--%>
                <img id="vimg" title="看不清,点击更换图片" onclick="this.src=this.src+'?'" src="VerifyCode.aspx"
                    style="cursor: pointer; height: 38px;" /><%--<img src="UI/images/Gray/l9.png" />--%></li>
            -->
            <li class="forget">忘记密码了吗？<a id="zzpwd" href="javascript://" hidefocus="true" title="忘记密码">请点击这里</a></li>
            <li class="lg"><!--return loginVery();-->
                <asp:Button ID="Button1" runat="server" Text="" CssClass="but_logo" 
                    OnClientClick="" onclick="Button1_Click" />
            </li>
        </ul>
    </div>
    <div class="footer">
        <asp:Literal ID="Literal_BXQX" runat="server"></asp:Literal>
        <%--产品所有权：<a href="http://www.shangyekj.com">上业科技</a>--%>
    </div>
    <p class="footers">
        Copyright © 2015<a href="http://www.shangyekj.com" target="_blank"><img src="../WebUI/images/backImage/sykjlogo.png"
            style="vertical-align: middle; margin:0 3px;" />上海上业信息科技有限公司</a> 电子资源管理平台 &nbsp;&nbsp;<a
                href="http://www.shangyekj.com/Sy_cpzx/ssgp.aspx?channel_ID=56&section_id=76"
                target="_blank"><asp:Literal ID="ltversion" runat="server" Visible="false"></asp:Literal> </a>
    </p>
    </form>
</body>
</html>
