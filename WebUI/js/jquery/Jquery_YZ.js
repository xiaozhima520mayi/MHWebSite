
$(function () {
    LondVeriYz(".promain_div");
    LondVeriYz(".msgmain_div");
});

function Way_ClickYZ() {
    var $dx = $("input[ltype=text]"); //单行输入框
    var $dxtextarea = $("textarea[ltype=text]"); //多行输入框
    var $dxselect = $("select[ltype=text]"); //下拉列表框
    var $dxselect_zdy = $("select[ltype=text_zdy]"); //自定义的下拉列表框

    var errleng = 0;
    var _ValidationGroup = "";
    var dx_attr = $(this).attr("ValidationGroupName");

    if (dx_attr != null && dx_attr != "") {
        _ValidationGroup = dx_attr;
    }

    if ($dx.length > 0) {//input标签
        errleng = errleng + yztext($dx, _ValidationGroup);
    }
    if ($dxtextarea.length > 0) {
        errleng = errleng + yztextarea($dxtextarea, _ValidationGroup);
    }
    if ($dxselect.length > 0) {

        errleng = errleng + yzselect($dxselect, _ValidationGroup);
    }
    if ($dxselect_zdy.length > 0) {
        errleng = errleng + yzselect_zdy($dxselect_zdy, _ValidationGroup);
    }
    return errleng;
}


function LondVeriYz(id) {
    $(id + " [ltype=button]").unbind("click");
    $(id + " [ltype=button]").click(function () {
        var $dx = $(id + " input[ltype=text]"); //单行输入框
        var $dxtextarea = $(id + " textarea[ltype=text]"); //多行输入框
        var $dxselect = $(id + " select[ltype=text]"); //下拉列表框
        var $dxselect_zdy = $(id + " select[ltype=text_zdy]"); //自定义的下拉列表框

        var errleng = 0;
        var _ValidationGroup = "";
        var dx_attr = $(this).attr("ValidationGroupName");

        if (dx_attr != null && dx_attr != "") {
            _ValidationGroup = dx_attr;
        }

        if ($dx.length > 0) {//input标签
            errleng = errleng + yztext($dx, _ValidationGroup);
        }
        if ($dxtextarea.length > 0) {
            errleng = errleng + yztextarea($dxtextarea, _ValidationGroup);
        }
        if ($dxselect.length > 0) {

            errleng = errleng + yzselect($dxselect, _ValidationGroup);
        }
        if ($dxselect_zdy.length > 0) {
            errleng = errleng + yzselect_zdy($dxselect_zdy, _ValidationGroup);
        }
        if (errleng == 0) {
            eval($(this).attr("functionname"))();
        }
        else {
            return false;
        }
    });
    $('.tipsInfo').unbind("mouseup");
    $('.tipsInfo').live('mouseup', function () {
        $(this).parent().children("input").select();
        $(this).parent().children("textarea").select();
        $(this).remove();
    });
    $(id + " input[ltype=text]").unbind("focus");
    $(id + " input[ltype=text]").focus(function () {
        $(this).parent().children().remove(".tipsInfo");
    });

    //单行文本框失去焦点事件
    $(id + " input[ltype=text]").unbind("blur");
    $(id + " input[ltype=text]").blur(function () {
        //当需要验证的时候
        var $dddxxx = $(this);
        if ($(this).attr("isvalidate") != "false") {
            if ($(this).attr("lajax") != null) {
                var _joins = eval("(" + $(this).attr("lajax") + ")")
                if ($(this).val() != "") {
                    //alert(11);
                    if ($(this).attr("defaultvalue") != null && $(this).attr("defaultvalue") != "") {

                        if ($(this).attr("defaultvalue") == $(this).val()) {
                            //alert(111);
                            $('#' + _joins.savevalue).val("true");
                            fun_inputtextboxYes($(this));
                        }
                        else {
                            $.ajax({
                                type: "POST",
                                url: _joins.url,
                                data: {
                                    action: _joins.ptype,
                                    C_Name: $dddxxx.val()
                                },
                                dataType: "text",
                                success: function (data) {
                                    var errleng = 0;
                                    var dc_z1 = new Array();
                                    if ($dddxxx.attr("validate") != null && $dddxxx.attr("validate") != "") {
                                        dc_z1 = $dddxxx.attr("validate").replace("{", "").replace("}", "").split(",");
                                        for (var j = 0; j < dc_z1.length; j++) {
                                            if (MyArray(dc_z1[j], $dddxxx, "fun_inputtextboxNo") == 1) {
                                                errleng++;
                                                break;
                                            }
                                        }
                                        if (errleng == 0) {
                                            if (data == "true") {
                                                fun_inputtextboxYes($dddxxx);
                                            }
                                            else {
                                                fun_inputtextboxNo($dddxxx, _joins.returntext);
                                            }
                                        }
                                    }
                                    else {
                                        if (data == "true") {
                                            fun_inputtextboxYes($dddxxx);
                                        }
                                        else {
                                            fun_inputtextboxNo($dddxxx, _joins.returntext);
                                        }
                                    }

                                    $('#' + _joins.savevalue).val(data);


                                },
                                error: function (msg) {
                                    alert('系统错误');
                                }
                            });
                        }
                    }
                    else {
                        $.ajax({
                            type: "POST",
                            url: _joins.url,
                            data: {
                                action: _joins.ptype,
                                C_Name: $dddxxx.val()
                            },
                            dataType: "text",
                            success: function (data) {
                                if ($dddxxx.attr("validate") != null && $dddxxx.attr("validate") != "") {
                                    //alert('bbbb');
                                    var errleng = 0;
                                    var dc_z1 = new Array();
                                    dc_z1 = $dddxxx.attr("validate").replace("{", "").replace("}", "").split(",");
                                    for (var j = 0; j < dc_z1.length; j++) {
                                        if (MyArray(dc_z1[j], $dddxxx, "fun_inputtextboxNo") == 1) {
                                            errleng++;
                                            break;
                                        }
                                    }
                                    if (errleng == 0) {
                                        if (data == "true") {
                                            fun_inputtextboxYes($dddxxx);
                                        }
                                        else {
                                            fun_inputtextboxNo($dddxxx, _joins.returntext);
                                        }
                                    }
                                }
                                else {
                                    if (data == "true") {
                                        //alert(3333);
                                        fun_inputtextboxYes($dddxxx);
                                    }
                                    else {
                                        fun_inputtextboxNo($dddxxx, _joins.returntext);
                                    }
                                }
                                $('#' + _joins.savevalue).val(data);


                            },
                            error: function (msg) {
                                alert('系统错误');
                            }
                        });
                    }
                }
                else {
                    var errleng = 0;
                    var dc_z1 = new Array();
                    if ($(this).attr("validate") != null) {
                        dc_z1 = $(this).attr("validate").replace("{", "").replace("}", "").split(",");
                        for (var j = 0; j < dc_z1.length; j++) {
                            if (MyArray(dc_z1[j], $(this), "fun_inputtextboxNo") == 1) {
                                //qj_errleng++;
                                errleng++;
                                break;
                            }
                        }
                        if (errleng == 0) {
                            $(this).parent().parent().removeClass("ok");
                            $(this).parent().parent().removeClass("error");
                            $(this).parent().children(".tipsInfo").remove();
                            //fun_inputtextboxYes($(this));
                        }
                    }
                    else {
                        $(this).parent().parent().removeClass("ok");
                        $(this).parent().parent().removeClass("error");
                        $(this).parent().children(".tipsInfo").remove();
                        //fun_inputtextboxYes($(this));
                    }
                }
            }
            else {
                var errleng = 0;
                var dc_z1 = new Array();
                if ($(this).attr("validate") != null) {
                    dc_z1 = $(this).attr("validate").replace("{", "").replace("}", "").split(",");
                    for (var j = 0; j < dc_z1.length; j++) {
                        if (MyArray(dc_z1[j], $(this), "fun_inputtextboxNo") == 1) {
                            //qj_errleng++;
                            errleng++;
                            break;
                        }
                    }
                    if (errleng == 0) {
                        if ($(this).val() == "") {
                            $(this).parent().parent().removeClass("ok");
                            $(this).parent().parent().removeClass("error");
                            $(this).parent().children(".tipsInfo").remove();
                        }
                        else {
                            fun_inputtextboxYes($(this));
                        }
                    }
                }
                else {
                    //fun_inputtextboxYes($(this));
                    $(this).parent().parent().removeClass("ok");
                    $(this).parent().parent().removeClass("error");
                    $(this).parent().children(".tipsInfo").remove();
                }
            }
        }
            //当不需要验证的时候
        else {
            $(this).parent().parent().removeClass("ok");
            $(this).parent().parent().removeClass("error");
            $(this).parent().children(".tipsInfo").remove();
        }
    });
    $(id + " textarea[ltype=text]").unbind("blur");
    $(id + " textarea[ltype=text]").blur(function () {
        var errleng = 0;
        var dc_z1 = new Array();
        if ($(this).attr("validate") != null) {
            dc_z1 = $(this).attr("validate").replace("{", "").replace("}", "").split(",");
            for (var j = 0; j < dc_z1.length; j++) {
                if (MyArray(dc_z1[j], $(this), "fun_textareatextboxNo") == 1) {
                    //qj_errleng++;
                    errleng++;
                    break;
                }
            }
            if (errleng == 0) {
                if ($(this).val() == "") {
                    $(this).parent().parent().removeClass("ok");
                    $(this).parent().parent().removeClass("error");
                    $(this).parent().children(".tipsInfo").remove();
                }
                else {
                    fun_textareatextboxYes($(this));
                }
            }
        }
        else {
            $(this).parent().parent().removeClass("ok");
            $(this).parent().parent().removeClass("error");
            $(this).parent().children(".tipsInfo").remove();
            //fun_textareatextboxYes($(this));
        }
    });
    $(id + " select[ltype=text]").unbind("change");
    $(id + " select[ltype=text]").change(function () {
        if ($(this).attr("validate") != null) {
            var _val_json = eval("(" + $(this).attr("validate") + ")");
            if (_val_json.select != null) {
                var _val = _val_json.select
                if ($(this).val() == _val) {
                    fun_selectNo($(this));
                }
                else {
                    fun_selectYes($(this));
                }
            }
            else {
                fun_selectYes($(this));
            }
        }
        else {
            fun_selectYes($(this));
        }
    });
}

//====================清空验证样式===================//
function fun_YZQKClass() {
    $(".field").removeClass("ok");
    $(".field").removeClass("error");
    $(".tipsInfo").remove();
}

//======当验证控件设为不验证的时候改变样式=============//
function fun_validatefalse() {
    var $dx = $("input[isvalidate=false]");
    var $dxtextarea = $("textarea[ltype=text]"); //多行输入框
    var $dxselect = $("select[ltype=text]"); //下拉列表框
    var $dxselect_zdy = $("select[ltype=text_zdy]"); //自定义的下拉列表框

    $dx.parent().parent().removeClass("ok");
    $dx.parent().parent().removeClass("error");
    $dx.parent().children(".tipsInfo").remove();

    $dxtextarea.parent().parent().removeClass("ok");
    $dxtextarea.parent().parent().removeClass("error");

    $dxselect.parent().parent().removeClass("ok");
    $dxselect.parent().parent().removeClass("error");

    $dxselect_zdy.parent().parent().removeClass("ok");
    $dxselect_zdy.parent().parent().removeClass("error");
}

//===========之间调用验证方法=================//
function fun_keypress(funName) {
    var $dx = $("input[ltype=text]"); //单行输入框
    var $dxtextarea = $("textarea[ltype=text]"); //多行输入框
    var $dxselect = $("select[ltype=text]"); //下拉列表框
    var $dxselect_zdy = $("select[ltype=text_zdy]"); //自定义的下拉列表框

    var errleng = 0;
    var _ValidationGroup = "";
    var dx_attr = $(this).attr("ValidationGroupName");

    if (dx_attr != null && dx_attr != "") {
        _ValidationGroup = dx_attr;
    }

    if ($dx.length > 0) {//input标签
        errleng = errleng + yztext($dx, _ValidationGroup);
    }
    if ($dxtextarea.length > 0) {
        errleng = errleng + yztextarea($dxtextarea, _ValidationGroup);
    }
    if ($dxselect.length > 0) {

        errleng = errleng + yzselect($dxselect, _ValidationGroup);
    }
    if ($dxselect_zdy.length > 0) {
        errleng = errleng + yzselect_zdy($dxselect_zdy, _ValidationGroup);
    }
    else {
        return false;
    }
}

//===============================之间调用验证方法===============================//
function fffff_dddddddd($dx) {
    if ($dx.attr("ltype") != null) {
        if ($dx.attr("validate") != null) {
            var _val_json = eval("(" + $dx.attr("validate") + ")");
            if (eval(_val_json.functionname)()) {

                fun_selectYes($dx);
            }
            else {
                fun_selectNo($dx);
            }
        }
        else {
            fun_selectYes($dx);
        }
    }
}
//下拉列表框
function yzselect($dx, _ValidationGroup) {
    var qj_errleng = 0;
    $dx.each(function () {
        var dx_txtattrv = $(this).attr("ValidationGroupName");
        var _val_txt_va = "";
        if (dx_txtattrv != null && dx_txtattrv != "") {
            _val_txt_va = dx_txtattrv;
        }
        if (_val_txt_va == _ValidationGroup) {
            if ($(this).attr("validate") != null) {
                var _val_json = eval("(" + $(this).attr("validate") + ")");
                if (_val_json.select != null) {
                    var _val = _val_json.select
                    if ($(this).val() == _val) {
                        fun_selectNo($(this));
                        qj_errleng++;
                    }
                    else {
                        fun_selectYes($(this));
                    }
                }
                else {
                    fun_selectYes($(this));
                }
            }
            else {
                //fun_selectYes($(this));
                $(this).parent().parent().removeClass("ok");
                $(this).parent().parent().removeClass("error");
                $(this).parent().children(".tipsInfo").remove();
            }
        }
    });
    return qj_errleng;
}
//自定义下拉列表框
function yzselect_zdy($dx, _ValidationGroup) {
    var qj_errleng = 0;
    $dx.each(function () {
        //alert("进入");
        var dx_txtattrv = $(this).attr("ValidationGroupName");
        var _val_txt_va = "";
        if (dx_txtattrv != null && dx_txtattrv != "") {
            _val_txt_va = dx_txtattrv;
        }
        if (_val_txt_va == _ValidationGroup) {

            if ($(this).attr("validate") != null) {
                //alert('$(this).attr("validate")不为空');
                var _val_json = eval("(" + $(this).attr("validate") + ")");
                //alert('方法名字' + _val_json.functionname);
                if (eval(_val_json.functionname)()) {
                    if ($(this).attr("id") == "Select_Specialty") {
                        $("#div_Specialtyff").removeClass("ok");
                        $("#div_Specialtyff").removeClass("error");
                        $("#div_Specialtyff").addClass("ok");
                    }
                    else {
                        fun_selectYes($(this));
                    }
                }
                else {
                    if ($(this).attr("id") == "Select_Specialty") {

                        $("#div_Specialtyff").removeClass("ok");
                        $("#div_Specialtyff").removeClass("error");
                        $("#div_Specialtyff").addClass("error");
                    }
                    else {
                        fun_selectNo($(this));
                    }
                    qj_errleng++;
                }
            }
            else {
                $(this).parent().parent().removeClass("ok");
                $(this).parent().parent().removeClass("error");
                $(this).parent().children(".tipsInfo").remove();
                //alert('$(this).attr("validate")为空');
                //fun_selectYes($(this));
            }
        }
    });
    return qj_errleng;
}
//下拉列表框验证正确提示信息
function fun_selectYes($dx) {
    $dx.parent().parent().removeClass("ok");
    $dx.parent().parent().removeClass("error");
    $dx.parent().parent().addClass("ok");
}
//下拉列表框验证错误提示信息
function fun_selectNo($dx) {
    $dx.parent().parent().removeClass("ok");
    $dx.parent().parent().removeClass("error");
    $dx.parent().parent().addClass("error");
}

//多行输入框验证
function yztextarea($dx, _ValidationGroup) {
    var qj_errleng = 0;
    $dx.each(function () {
        var dx_txtattrv = $(this).attr("ValidationGroupName");
        var _val_txt_va = "";
        if (dx_txtattrv != null && dx_txtattrv != "") {
            _val_txt_va = dx_txtattrv;
        }
        if (_val_txt_va == _ValidationGroup) {
            var errleng = 0;
            var dc_z1 = new Array();
            if ($(this).attr("validate") != null) {
                dc_z1 = $(this).attr("validate").replace("{", "").replace("}", "").split(",");
                for (var j = 0; j < dc_z1.length; j++) {
                    if (MyArray(dc_z1[j], $(this), "fun_textareatextboxNo") == 1) {
                        qj_errleng++;
                        errleng++;
                        break;
                    }
                }
                if (errleng == 0) {
                    if ($(this).val() == "") {
                        $(this).parent().parent().removeClass("ok");
                        $(this).parent().parent().removeClass("error");
                        $(this).parent().children(".tipsInfo").remove();
                    }
                    else {
                        fun_textareatextboxYes($(this));
                    }
                }
            }
            else {
                //fun_textareatextboxYes($(this));
                $(this).parent().parent().removeClass("ok");
                $(this).parent().parent().removeClass("error");
                $(this).parent().children(".tipsInfo").remove();
            }
        }
    });
    return qj_errleng;
}
//多行输入框验证正确提示信息
function fun_textareatextboxYes($dx) {
    $dx.parent().parent().removeClass("ok");
    $dx.parent().parent().removeClass("error");
    //$dx.parent().children(".tipsInfo").remove();
    $dx.parent().parent().addClass("ok");
}
//多行输入框验证错误提示信息
function fun_textareatextboxNo($dx, _ErrorTextval) {
    $dx.parent().parent().removeClass("ok");
    $dx.parent().parent().removeClass("error");
    //$dx.parent().children(".tipsInfo").remove();
    $dx.parent().parent().addClass("error");
    //$dx.parent().append("<div class='tipsInfo'>" + _ErrorTextval + "</div>");
}

//单行输入框验证方法
function yztext($dx, _ValidationGroup) {
    var qj_errleng = 0;
    $dx.each(function () {
        var dx_txtattrv = $(this).attr("ValidationGroupName");
        var _val_txt_va = "";
        if (dx_txtattrv != null && dx_txtattrv != "") {
            _val_txt_va = dx_txtattrv;
        }
        if (_val_txt_va == _ValidationGroup) {
            if ($(this).attr("isvalidate") != "false") {
                var errleng = 0;
                var dc_z1 = new Array();
                if ($(this).attr("validate") != null) {
                    dc_z1 = $(this).attr("validate").replace("{", "").replace("}", "").split(",");
                    for (var j = 0; j < dc_z1.length; j++) {
                        if (MyArray(dc_z1[j], $(this), "fun_inputtextboxNo") == 1) {
                            qj_errleng++;
                            errleng++;
                            break;
                        }
                    }
                    if (errleng == 0) {
                        if ($(this).attr("lajax") != null) {
                            var _joins = eval("(" + $(this).attr("lajax") + ")")
                            if ($(this).val() != "") {
                                if ($("#" + _joins.savevalue).val() == "true") {
                                    fun_inputtextboxYes($(this));
                                }
                                else {
                                    qj_errleng++;
                                    fun_inputtextboxNo($(this), _joins.returntext);
                                }
                            }
                            else {
                                //fun_inputtextboxYes($(this));
                                $(this).parent().parent().removeClass("ok");
                                $(this).parent().parent().removeClass("error");
                                $(this).parent().children(".tipsInfo").remove();
                            }
                        }
                        else {
                            if ($(this).val() != "") {
                                fun_inputtextboxYes($(this));
                            }
                            else {
                                $(this).parent().parent().removeClass("ok");
                                $(this).parent().parent().removeClass("error");
                                $(this).parent().children(".tipsInfo").remove();
                            }
                        }
                    }
                }
                else {
                    if ($(this).attr("lajax") != null) {
                        var _joins = eval("(" + $(this).attr("lajax") + ")")
                        if ($(this).val() != "") {
                            if ($("#" + _joins.savevalue).val() == "true") {
                                fun_inputtextboxYes($(this));
                            }
                            else {
                                qj_errleng++;
                                fun_inputtextboxNo($(this), _joins.returntext);
                            }
                        }
                        else {
                            fun_inputtextboxYes($(this));
                        }
                    }
                    else {
                        $(this).parent().parent().removeClass("ok");
                        $(this).parent().parent().removeClass("error");
                        $(this).parent().children(".tipsInfo").remove();
                    }
                }
            }
            else {
                $(this).parent().parent().removeClass("ok");
                $(this).parent().parent().removeClass("error");
                $(this).parent().children(".tipsInfo").remove();
            }
        }
    });
    return qj_errleng;
}

//单行输入框验证正确提示信息
function fun_inputtextboxYes($dx) {
    $dx.parent().parent().removeClass("ok");
    $dx.parent().parent().removeClass("error");
    $dx.parent().children(".tipsInfo").remove();
    $dx.parent().parent().addClass("ok");
}
//单行输入框验证错误提示信息
function fun_inputtextboxNo($dx, _ErrorTextval) {
    $dx.parent().parent().removeClass("ok");
    $dx.parent().parent().removeClass("error");
    $dx.parent().children(".tipsInfo").remove();
    $dx.parent().parent().addClass("error");
    $dx.parent().append("<div class='tipsInfo'>" + _ErrorTextval + "</div>");
}
//验证方法
function MyArray(vv, $dx, textType) {
    if (vv.indexOf("required:true") != -1) {//判断字符串中是否包含该字符串
        if (!FeiKong($dx.val())) { //当为空的时候
            var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
            var _returntext = "不能为空";
            if (dc_functionsz.required_text != null) {
                _returntext = dc_functionsz.required_text;
            }
            eval(textType)($dx, _returntext);
            return 1;
        }
        else {
            return 0;
        }
    }
    else if (vv.indexOf("email:true") != -1) {
        if (!fun_email($dx.val())) {
            var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
            var _returntext = "邮箱格式错误";
            if (dc_functionsz.email_text != null) {
                _returntext = dc_functionsz.email_text;
            }
            eval(textType)($dx, _returntext);
            return 1;

        }
        else {
            return 0;
        }
    }
    else if (vv.indexOf("pinteger:true") != -1) {
        if (!fun_pinteger($dx.val())) {
            var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
            var _returntext = "请输入正整数";
            if (dc_functionsz.pinteger_text != null) {
                _returntext = dc_functionsz.pinteger_text;
            }
            eval(textType)($dx, _returntext);
            return 1;

        }
        else {
            return 0;
        }
    }
    else if (vv.indexOf("ninteger:true") != -1) {
        if (!fun_ninteger($dx.val())) {
            var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
            var _returntext = "请输入负整数";
            if (dc_functionsz.ninteger_text != null) {
                _returntext = dc_functionsz.ninteger_text;
            }
            eval(textType)($dx, _returntext);
            return 1;

        }
        else {
            return 0;
        }
    }
    else if (vv.indexOf("integer:true") != -1) {
        if (!fun_integer($dx.val())) {
            var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
            var _returntext = "请输入整数";
            if (dc_functionsz.integer_text != null) {
                _returntext = dc_functionsz.integer_text;
            }
            eval(textType)($dx, _returntext);
            return 1;

        }
        else {
            return 0;
        }
    }

    else if (vv.indexOf("pfloat:true") != -1) {
        if (!fun_pfloat($dx.val())) {
            var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
            var _returntext = "请输入正数";
            if (dc_functionsz.pfloat_text != null) {
                _returntext = dc_functionsz.pfloat_text;
            }
            eval(textType)($dx, _returntext);
            return 1;

        }
        else {
            return 0;
        }
    }
    else if (vv.indexOf("nfloat:true") != -1) {
        if (!fun_nfloat($dx.val())) {
            var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
            var _returntext = "请输入负数";
            if (dc_functionsz.nfloat_text != null) {
                _returntext = dc_functionsz.nfloat_text;
            }
            eval(textType)($dx, _returntext);
            return 1;

        }
        else {
            return 0;
        }
    }
        //else if (vv == "float:true") {
    else if (vv.indexOf("float:true") != -1) {
        if (!fun_float($dx.val())) {
            var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
            var _returntext = "请输入数字";
            if (dc_functionsz.float_text != null) {
                _returntext = dc_functionsz.float_text;
            }
            eval(textType)($dx, _returntext);
            return 1;

        }
        else {
            return 0;
        }
    }
    else if (vv.indexOf("min:") != -1) {
        if (!fun_float($dx.val())) {
            eval(textType)($dx, "请输入数字");
            return 1;

        }
        else {
            var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
            var Yzval = dc_functionsz.min; //  vv.replace("min:", "");
            if (!fun_min($dx.val(), Yzval)) {

                var _returntext = "最小值为：" + Yzval + "";
                if (dc_functionsz.min_text != null) {
                    _returntext = dc_functionsz.min_text;
                }
                eval(textType)($dx, _returntext);
                return 1;

            }
            else {
                return 0;
            }
        }
    }
    else if (vv.indexOf("max:") != -1) {
        if (!fun_float($dx.val())) {
            eval(textType)($dx, "请输入数字");
            return 1;

        }
        else {
            var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
            var Yzval = dc_functionsz.max; //  vv.replace("max:", "");
            if (!fun_max($dx.val(), Yzval)) {
                var _returntext = "最大值为：" + Yzval + "";
                if (dc_functionsz.max_text != null) {
                    _returntext = dc_functionsz.max_text;
                }
                eval(textType)($dx, _returntext);
                return 1;

            }
            else {
                return 0;
            }
        }
    }
    else if (vv.indexOf("minlength:") != -1) { //最小长度验证
        var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
        var Yzval = dc_functionsz.minlength; //  vv.replace("minlength:", "");
        if (!fun_minlength($dx.val(), Yzval)) {
            var _returntext = "输入长度最少为“" + Yzval + "”位";
            if (dc_functionsz.minlength_text != null) {
                _returntext = dc_functionsz.minlength_text;
            }
            eval(textType)($dx, _returntext);
            return 1;

        }
        else {
            return 0;
        }
    }
    else if (vv.indexOf("maxlength:") != -1) { //最大长度验证
        var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
        var Yzval = dc_functionsz.maxlength; //  vv.replace("maxlength:", "");
        if (!fun_maxlength($dx.val(), Yzval)) {
            var _returntext = "输入长度最大为“" + Yzval + "”位";
            if (dc_functionsz.maxlength_text != null) {
                _returntext = dc_functionsz.maxlength_text;
            }
            eval(textType)($dx, _returntext);
            return 1;
        }
        else {
            return 0;
        }
    }
    else if (vv.indexOf("phone:true") != -1) {
        if (!fun_phone($dx.val())) {
            var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
            var _returntext = "电话号码输入有误";
            if (dc_functionsz.phone_text != null) {
                _returntext = dc_functionsz.phone_text;
            }
            eval(textType)($dx, _returntext);
            return 1;

        }
        else {
            return 0;
        }
    }
    else if (vv.indexOf("url:true") != -1) {
        if (!fun_url($dx.val())) {
            var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
            var _returntext = "URL格式错误";
            if (dc_functionsz.url_text != null) {
                _returntext = dc_functionsz.url_text;
            }
            eval(textType)($dx, _returntext);
            return 1;

        }
        else {
            return 0;
        }
    }
    else if (vv.indexOf("contrast:") != -1) {
        var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
        var val_Contrast = dc_functionsz.contrast;
        if (!fun_Contrast($("#" + val_Contrast).val(), $dx.val())) {
            var _returntext = "两次输入有误";
            if (dc_functionsz.contrast_text != null) {
                _returntext = dc_functionsz.contrast_text;
            }
            eval(textType)($dx, _returntext);
            return 1;
        }
        else {
            return 0;
        }
    }
    else if (vv.indexOf("functionname:") != -1) {
        var functionName = vv.replace("functionname:", "").replace("'", "").replace("'", "");
        //alert(functionName);
        var dc_functionsz = eval("(" + $dx.attr("validate") + ")");
        var _returntext = "输入有误";
        if (dc_functionsz[functionName + "_text"] != null) {
            _returntext = dc_functionsz[functionName + "_text"];
        }
        //alert(dc_functionsz[functionName + "_text"]);
        //var functionName = vv.replace("functionname:", "").replace;
        if (!eval(functionName)($dx, $dx.val())) {
            eval(textType)($dx, _returntext);
            return 1;
        }
        else {
            return 0;
        }
    }
    else {
        return 0;
    }
}



//对比验证
function fun_Contrast(val, Contrastval) {
    if (val != Contrastval) {
        return false;
    }
    return true;
}
//非空验证方法
function FeiKong(val) {
    //if (val.replace(/\s/gi, "") == "") { //当为空的时候
    if (val == "") { //当为空的时候
        return false;
    }
    else {
        return true;
    }
}
//邮件验证方法
function fun_email(val) {
    //    if (val.replace(/\s/gi, "") != "") {
    if (val != "") {
        var parat = /^([a-zA-Z0-9_\-\.\+]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (parat.exec(val) == null)//不成功
        {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}
//整数验证
function fun_integer(val) {
    if (val.replace(/\s/gi, "") != "") {
        var parat = /^-?[0-9]+$/;
        if (parat.exec(val) == null)//不成功
        {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}
//正整数验证
function fun_pinteger(val) {
    if (val.replace(/\s/gi, "") != "") {
        var parat = /^\d+$/;
        if (parat.exec(val) == null)//不成功
        {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}
//负整数验证
function fun_ninteger(val) {
    if (val.replace(/\s/gi, "") != "") {
        var parat = /^-{1}\d+$/;
        if (parat.exec(val) == null)//不成功
        {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}
//浮点数验证
function fun_float(val) {
    if (val.replace(/\s/gi, "") != "") {
        var parat = /^-?\d+(\.\d+)?$/;
        if (parat.exec(val) == null)//不成功
        {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}
//正浮点数验证
function fun_pfloat(val) {
    if (val.replace(/\s/gi, "") != "") {
        var parat = /^\d+(\.\d+)?$/;
        if (parat.exec(val) == null)//不成功
        {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}
//负浮点数验证
function fun_nfloat(val) {
    if (val.replace(/\s/gi, "") != "") {
        var parat = /^-{1}\d+(\.\d+)?$/;
        if (parat.exec(val) == null)//不成功
        {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}
//最小值验证
function fun_min(textval, yzval) {
    if (textval.replace(/\s/gi, "") != "") {
        if (parseFloat(textval) < parseFloat(yzval)) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}
//最大值验证
function fun_max(textval, yzval) {
    if (textval.replace(/\s/gi, "") != "") {
        if (parseFloat(textval) > parseFloat(yzval)) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}
//最小长度验证
function fun_minlength(val, vallength) {
    if (val.length < parseInt(vallength)) {
        return false;
    }
    else {
        return true;
    }
}
//最大长度验证
function fun_maxlength(val, vallength) {
    if (val.length > parseInt(vallength)) {
        return false;
    }
    else {
        return true;
    }
}
//电话号码验证
function fun_phone(val) {
    if (val != "") {
        var parat = /^(\+?(\d{1,4}[-])?\d{3,8}([-]\d{1,8})?)$/;
        var paratq = /^(\+\d{1,4})?(13[0-9]|15[0-9]|18[0-9])[0-9]{8}$/;
        if (!parat.exec(val) && !paratq.exec(val)) {
            return false;
        }
        else {
            return true;
        }
    }
    else {
        return true;
    }
}
//电话号码验证
function fun_url(val) {
    if (val.replace(/\s/gi, "") != "") {
        var parat = "^((https|http|ftp|rtsp|mms)?://)"
                    + "{1}(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?" //ftp的user@     
                    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184     
                    + "|" // 允许IP和DOMAIN（域名）     
                    + "([0-9a-zA-Z_!~*'()-]+\.)*" // 域名- www.     
                    + "([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z]\." // 二级域名     
                    + "[a-zA-Z]{2,6})" // first level domain- .com or .museum     
                    + "(:[0-9]{1,6})?" // 端口- :80     
                    + "((/?)|"
                    + "(/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$";
        var re = new RegExp(parat);
        if (re.test(val)) {
            return true;
        }
        else {
            return false
        }
    }
    else {
        return true;
    }
}
function yyyy($dx, val) {
    if (val == "zs@163.com") {
        return false;
    }
    return true;
}