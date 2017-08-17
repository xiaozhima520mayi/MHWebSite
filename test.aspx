<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="test.aspx.cs" Inherits="WebSite.test" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title></title>
    <script src="WebUI/js/jquery/jquery-1.8.3.min.js"></script>
    <script src="WebUI/js/jquery/jquery.form.js"></script>
</head>
<body>
    <form id="form1" method="post" enctype="multipart/form-data"><a id="send" style="cursor:pointer;">dianji</a>
        <input id="File1" name="File1" type="file" style="display:none;" /><input type="button" value="发送简历" id="sendEmail" />
    </form>
</body>
</html>
<script>
    $(function () {
        $("#send").click(function () { $("#File1").click();});
        $("#sendEmail").click(function () {
            var options = {
                url: "ASHX/ProductHanlder.aspx",
                data: { action: "sendEmail", job: "市场专员" },
                async: false,
                beforeSend: function () { $("#sendEmail").val("正在发送，请稍后..."); $("#sendEmail").attr("disabled", true); },
                success: function (responseText) {
                    if (responseText == 1) {
                        File1.after(File1.clone().val(""));
                        File1.remove();
                        $("#sendEmail").val("发送简历"); $("#sendEmail").attr("disabled", false);
                        alert('发送成功');
                    }
                    else if (responseText == "-1") alert("文件格式错误");
                    else if (responseText == "-2") alert("请选择要上传的简历");
                    else alert("发送失败");
                },
                complete: function () { $("#sendEmail").val("发送简历"); $("#sendEmail").attr("disabled", false); }
            };
            $("#form1").ajaxSubmit(options);
        });
    });
</script>
