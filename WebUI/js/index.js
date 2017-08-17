/// <reference path="jquery/jquery-1.8.0.min.js" />

//试用申请中的选择需求多选框
$(function () {

    $(".checkNone").click(function () {
        $(this).html("").hide();
        $(this).prev().focus();

    });

    $("#SubMit1").click(function () {
        var regex1 = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
        var regex2 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
        var regex3 = /^\w{1,15}(?:@(?!-))(?:(?:[a-z0-9-]*)(?:[a-z0-9](?!-))(?:\.(?!-)))+[a-z]{2,4}$/;
        var name = false;
        var phone = false;
        var mail = false;
        var item = false;
        if ($("#txtName").val() == "") {
            $("#txtName").next().html("请输入您的姓名");
            $("#txtName").next().show();
            name = false;
        }
        else {
            name = true;
        }
        if (!regex1.test($("#txtPhone").val())) {
            if (!regex2.test($("#txtPhone").val())) {
                $("#txtPhone").next().html("固话格式021-68325081   手机请直接输入");
                $("#txtPhone").next().show();
                phone = false;
            }
            else {
                phone = true;
            }
        } else {
            phone = true;
        }
        if (!regex3.test($("#txtEMail").val())) {
            $("#txtEMail").next().html("请输入正确的电子邮箱地址");
            $("#txtEMail").next().show();
            mail = false;
        }
        else {
            mail = true;
        }

        if ($("#selectProduct li span").hasClass("e")) {
            item = true;
        } else {
            $("#itemChecked").show();
            item = false;
        }

        var suc = 0;
        //if (1==1) {
        if (name && phone && mail && item) {
            var txtName = $("#txtName").val();
            var txtPhone = $("#txtPhone").val();
            var txtEMail = $("#txtEMail").val();
            var txtSchool = $("#txtSchool").val();
            var txtDept = $("#txtDept").val();
            var txtJob = $("#txtJob").val();
            var selectProduct = "";
            $("#selectProduct li").each(function () {
                if ($(this).children("span").hasClass("e")) {
                    selectProduct += $(this).attr("id") + ",";
                }
            });
            $.ajax({
                url: "/ASHX/ProductHanlder.aspx",
                type: "post",
                data: { action: "applyTry", proList: selectProduct, txtName: txtName, txtPhone: txtPhone, txtEMail: txtEMail, txtSchool: txtSchool, txtDept: txtDept, txtJob: txtJob },
                async: false,
                success: function (responseText) {
                    if (responseText == "1") {
                        suc = 1;
                    } else
                        alert("提交失败");
                }, complete: function () {

                }
            });
            //$("#formTry").ajaxSubmit(options);
        }
        if (suc == 1) {
            $("#formTry>.pop_content>.pop_text").find("input").val("");
            $("#formTry>.pop_content>.pop_text").find("textarea").val("");
            $("#formTry>").find("#selectProduct>li>span").removeClass("e");
            $(this).hide();
            $(".trytip").show();
            $(this).parent(".button").css("width", "478px");
            var times = 5;
            var setIn = setInterval(function () {
                times = times - 1;
                $("#formTry").find(".trytip>label").text(times);
                if (times == -1) {
                    $("#formTry").find(".trytip>label").text("5");
                    $("#formTry").find(".trytip").hide();
                    $("#SubMit1").show();
                    $(".trytip").hide();
                    $("#SubMit1").parent(".button").css("width", "128px");
                    $(".pop_tit_ri a").click();
                    clearInterval(setIn);
                }
            }, 1000);
        }
    });

    $("#SubMit2").click(function () {
        var regex1 = /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/;
        var regex2 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
        var regex3 = /^\w{1,15}(?:@(?!-))(?:(?:[a-z0-9-]*)(?:[a-z0-9](?!-))(?:\.(?!-)))+[a-z]{2,4}$/;
        var name = false;
        var phone = false;
        var mail = false;
        var item = false;
        if ($("#txtAName").val() == "") {
            $("#txtAName").next().html("请输入您的姓名");
            $("#txtAName").next().show();
            name = false;
        }
        else {
            name = true;
        }
        if (!regex1.test($("#txtAPhone").val())) {
            if (!regex2.test($("#txtAPhone").val())) {
                $("#txtAPhone").next().html("固话格式021-68325081   手机请直接输入");
                $("#txtAPhone").next().show();
                phone = false;
            }
            else {
                phone = true;
            }
        } else {
            phone = true;
        }
        if (!regex3.test($("#txtAEMail").val())) {
            $("#txtAEMail").next().html("请输入正确的电子邮箱地址");
            $("#txtAEMail").next().show();
            mail = false;
        }
        else {
            mail = true;
        }

        if ($("#txtMessage").val() == "") {
            $("#txtMessage").next().html("请输入您的留言");
            $("#txtMessage").next().show();
            item = false;
        }
        else {
            item = true;
        }

        if (name && phone && mail && item) {
            $.ajax({
                url: "/ASHX/ProductHanlder.aspx",
                data: { action: "addMessage", txtAName: $("#txtAName").val(), txtAPhone: $("#txtAPhone").val(), txtAEMail: $("#txtAEMail").val(), txtASchool: $("#txtASchool").val(), txtAJob: $("#txtAJob").val(), txtATitle: $("#txtATitle").val(), txtMessage: $("#txtMessage").val() },
                async: false,
                success: function (responseText) {
                    if (responseText == "1") {

                    } else
                        alert(responseText);
                }
            });
            //$("#formMsg").ajaxSubmit(options);
            $("#formMsg>.pop_text").find("input").val("");
            $("#formMsg>.pop_text").find("textarea").val("");
            $(this).hide();
            $(".msgTip").show();
            $(this).parent(".button").css("width", "278px");
            var times = 5;
            var setIn = setInterval(function () {
                times = times - 1;
                $("#formMsg").find(".msgTip>label").text(times);
                if (times == -1) {
                    clearInterval(setIn);
                    $("#formMsg").find(".msgTip>label").text("5");
                    $("#formMsg").find(".msgTip").hide();
                    $("#SubMit2").show();
                    $(".msgTip").hide();
                    $("#SubMit2").parent(".button").css("width", "128px");
                    $(".pop_tit_ri a").click();
                }
            }, 1000);
        }
    });

    $("#btnSendEmail").click(function () {
        $.ajax({
            url: "/ASHX/ProductHanlder.aspx",
            data: { action: "sendEmail" },
            dataType: "json",
            success: function (responseText) {
                if (responseText == "1") {
                    alert("发送成功");
                }
                else { }
            }
        });
    });
});

var INDEXDATA = {
    INIT: function () {
        getProList();
    },
    SUBMITAPPLY: function () {
        applyTryProduct();
    },
    SUBMITMESSAGE: function () {
        addMessage();
    }
};

function getProList() {
    $.ajax({
        url: "/ASHX/ProductHanlder.aspx",
        data: { action: "getProduct" },
        dataType: "json",
        success: function (responseText) {
            if (responseText == null || responseText == "" || responseText.Message != "1")
            { }
            else
            {
                if (responseText.records != null) {
                    var items = responseText.records;
                    var $Items = $("#selectProduct");
                    $Items.html("");
                    $.each(responseText.records, function (i) {
                        //$Items.append("<input type=\"checkbox\" value=\"" + responseText.records[i].pID + "\" />" + responseText.records[i].pName);
                        $Items.append("<li id='" + responseText.records[i].pID + "'><span></span><label>" + responseText.records[i].pName + "</label></li>");
                    });
                }
            }
        },
        complete: function () {
            $("#selectProduct").children("li").click(function () {
                if ($(this).children("span").hasClass("e")) {
                    $(this).children("span").removeClass("e");
                }
                else {
                    $(this).children("span").addClass("e");
                    $("#itemChecked").hide();
                }
            });
        },
        error: function (re) { alert(re.Message) }
    });
}

function applyTryProduct() {
    var $pro = $("#selectProduct input[type='checkbox']:checked");
    var proList = "";
    if ($pro.length <= 0) {
        $.tips.Alert.Warning({ Content: "请至少选择一项您的需求", IsCancel: "no", OKClass: "bot_confirm" });
        return;
    } else {
        $.each($pro, function () {
            proList += $(this).val() + ",";
        });
    }
    var options = {
        url: "/ASHX/ProductHanlder.aspx",
        data: { action: "applyTry", proList: proList },
        async: false,
        success: function (responseText) {
            if (responseText == "1") {

            } else
                alert(responseText);
        }
    };
    $("#formTry").ajaxSubmit(options);
}

function addMessage() {
    var options = {
        url: "/ASHX/ProductHanlder.aspx",
        data: { action: "addMessage" },
        async: false,
        success: function (responseText) {
            if (responseText == "1") {
                $.tips.Alert.Success({ Content: "提交成功" });
                $(".msgmain_div input[type='text']").attr("value", "");
                $(".msgmain_div textarea").attr("value", "");
                $.tips.Alert.tops = top.window.document.body;
            } else
                $.tips.Alert.Warning({ Content: responseText, IsCancel: "no", OKClass: "bot_confirm" });
        }
    };
    $("#formMsg").ajaxSubmit(options);
}

function TOURL(url) {
    location.href = url;
}