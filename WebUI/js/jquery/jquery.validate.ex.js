jQuery.validator.addMethod("moreThanNumber", function(value, element, params) {
    var v = parseFloat(value);
    var result = (v >= params[0]);
    if (result)
        $(params[1]).css("background-color", "");
    else
        $(params[1]).css("background-color", "red");
    return this.optional(element) || result;
}, "必须大于{0}");

jQuery.validator.addMethod("specialChar", function(value, element) {
    //var pattern = new RegExp("[`~!@%#$^&*()=|{}':;',　\\[\\]<>/? \\.；：%……+￥（）【】‘”“'。，、？]");    
    var result = value.search(/['"]/);
    return this.optional(element) || (result == -1);
}, "不能输入标点符号等特殊字符");

jQuery.validator.addMethod("isPhone", function(value, element) {
    var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
    return this.optional(element) || (tel.test(value));
}, "请正确填写您的电话号码!");

jQuery.validator.addMethod("isIDCard", function(value, element) {
    var tel = /^[0-9XY]{18}$/g;
    return this.optional(element) || (tel.test(value));
}, "请输入正确的身份证号码!");

jQuery.validator.addMethod("isIDCard2", function(value, element) {
    var aCity = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " }
    var code = /^[0-9]{17}[0-9X]$/g;
    if (code.test(value) == false)
        return false;
    if (aCity[parseInt(value.substr(0, 2))] == null)
        return false;
    var birthday = /^((19[0-9]{2})|(20[0-9]{2}))((0[1-9])|(1[012]))((0[1-9])|([12][0-9])|(3[01]))$/;
    if (birthday.test(value.substr(6, 8)) == false)
        return false;
    return true;
}, "请输入正确的身份证号码!");

jQuery.validator.addMethod("itemNameSelected", function(value, element) {
    var selectValue = $("#ddl_name_ajax").val();
    return this.optional(element) || (selectValue == value);
}, "请选择培训项目!");


jQuery.validator.addMethod("frontPersonNum", function(value, element) {
    var v = parseInt(value);
    var t = parseInt($("#txtpersonNum").val());
    var result = (v <= t);
    return this.optional(element) || result;
}, "必须小于等于总人数");

jQuery.validator.addMethod("frontMoney", function(value, element) {
    var v = parseFloat(value);
    var t = parseFloat($("#txtMoney").val());
    var result = (v <= t);
    return this.optional(element) || result;
}, "必须小于等于总金额");


jQuery.validator.addMethod("isMoney", function(value, element, para) {
    var regex = new RegExp("/^((0(.\\d{1," + para + "})?)|([1-9]{1,10}(.\\d{1," + para + "})?))$/g");
    return this.optional(element) || (regex.test(value));
}, "请输入正确的金额!");
 