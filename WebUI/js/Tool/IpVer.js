function getNumberValue(op) {
    var sun = "错";
    switch (op) {
        case 48:
        case 96:
            sun = 0;
            break;
        case 49:
        case 97:
            sun = 1;
            break;
        case 50:
        case 98:
            sun = 2;
            break;
        case 51:
        case 99:
            sun = 3;
            break;
        case 52:
        case 100:
            sun = 4;
            break;
        case 53:
        case 101:
            sun = 5;
            break;
        case 54:
        case 102:
            sun = 6;
            break;
        case 55:
        case 103:
            sun = 7;
            break;
        case 56:
        case 104:
            sun = 8;
            break;
        case 57:
        case 105:
            sun = 9;
            break;
    }
    return sun;
}

function IpVer(obj,e) {
    var result = 0;
    var key = "";
    if (!document.all) { //非IE浏览器  
        result = obj.selectionStart;
        var staIndex = obj.selectionStart;
        var endIndex = obj.selectionEnd;
        if (staIndex != endIndex) {
            key = obj.value.substring(staIndex, endIndex);
        }
    } else { //IE  
        var rng;
        if (obj.tagName == "TEXTAREA") { //如果是文本域  
            rng = e.srcElement.createTextRange();
            rng.moveToPoint(e.x, e.y);
        } else { //输入框  
            rng = document.selection.createRange();
        }
        rng.moveStart("character", -e.srcElement.value.length);
        result = rng.text.length == 0 ? 0 : rng.text.length - 1;
        key = document.selection == undefined ? document.getSelection().toString() : document.selection.createRange().text;
    }
    var currKey = 0
    currKey = e.keyCode || e.which || e.charCode;
    var keyvalue = getNumberValue(currKey); //(String.fromCharCode(currKey));
    if (e.keyCode == 8 || e.keyCode == 9)
        return true;
    if (/[0-9]/.test(keyvalue)) {
        if (key == "") {
            if ($(obj).val().length == result) {
                if ((parseInt($(obj).val() + keyvalue)) > 0 && (parseInt($(obj).val() + keyvalue)) <= 255) {
                    return true;
                }
            } else {
                var starvalue = $(obj).val().substring(0, result);
                var endvalue = $(obj).val().substring(result);
                if ((parseInt($(obj).val() + keyvalue)) > 0 && parseInt(starvalue + keyvalue + endvalue) <= 255) {
                    return true;
                }
            }
        } else {
            var starvalue = $(obj).val().substring(0, result);
            var sevalue = $(obj).val().substring(result, (key.length + 1));
            var endvalue = $(obj).val().substring((result + key.length));
            if ((parseInt($(obj).val() + keyvalue)) > 0 && parseInt(starvalue + keyvalue + endvalue) <= 255) {
                return true;
            }
        }
    }
    return false;
}